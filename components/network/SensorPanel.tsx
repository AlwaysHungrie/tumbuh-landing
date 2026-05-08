"use client";

import { useState, useEffect, useReducer } from "react";
import { Wallet, Cpu } from "lucide-react";

const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;

type SensorData = {
  name: string;
  type: string;
  tab_label: string;
  sensor_wallet: string;
  mint_address: string;
  unit_symbol: string;
};

type RawTx = {
  block_time: number;
  raw_transaction: {
    meta: {
      fee?: number;
      logMessages?: string[];
      preTokenBalances?: Array<{
        mint: string;
        uiTokenAmount?: { uiAmount: number | null };
      }>;
      postTokenBalances?: Array<{
        mint: string;
        uiTokenAmount: { uiAmount: number | null };
      }>;
    };
    transaction: { message: { accountKeys: string[] }; signatures: string[] };
  };
};

type BurnReading = {
  signature: string;
  block_time: number;
  fee: number;
  burned: number | null;
};

function extractBurns(
  transactions: RawTx[],
  mintAddress: string,
): BurnReading[] {
  return transactions
    .filter((t) => {
      const logs = t.raw_transaction.meta.logMessages ?? [];
      const isBurn = logs.some((l) => l.includes("Instruction: Burn"));
      const mintMatch = [
        ...(t.raw_transaction.meta.preTokenBalances ?? []),
        ...(t.raw_transaction.meta.postTokenBalances ?? []),
      ].some((b) => b.mint === mintAddress);
      return isBurn && mintMatch;
    })
    .map((t) => {
      const pre = t.raw_transaction.meta.preTokenBalances?.find(
        (b) => b.mint === mintAddress,
      );
      const post = t.raw_transaction.meta.postTokenBalances?.find(
        (b) => b.mint === mintAddress,
      );
      const preAmt = pre?.uiTokenAmount?.uiAmount ?? 0;
      const postAmt = post?.uiTokenAmount.uiAmount ?? 0;
      const burned = pre && post ? preAmt - postAmt : null;
      return {
        signature: t.raw_transaction.transaction.signatures[0] ?? "",
        block_time: t.block_time ?? 0,
        fee: t.raw_transaction.meta.fee ?? 0,
        burned,
      };
    });
}

async function fetchTxs(walletAddress: string, offset?: string) {
  const url = new URL("/api/transactions", window.location.origin);
  url.searchParams.set("address", walletAddress);
  url.searchParams.set("limit", "20");
  if (offset) url.searchParams.set("offset", offset);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<{ next_offset?: string; transactions: RawTx[] }>;
}

async function fetchSensors(plantWallet: string): Promise<SensorData[]> {
  const url = new URL("/api/sensors", window.location.origin);
  url.searchParams.set("plant_wallet", plantWallet);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { sensors: SensorData[] };
  return data.sensors;
}

function formatBlockTime(ts: number) {
  const d = new Date(ts / 1000);
  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { date, time };
}

type FetchState = {
  readings: BurnReading[];
  nextOffset: string | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
};

type FetchAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      readings: BurnReading[];
      nextOffset: string | null;
    }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "MORE_START" }
  | { type: "MORE_SUCCESS"; readings: BurnReading[]; nextOffset: string | null }
  | { type: "MORE_ERROR"; error: string };

const initialState: FetchState = {
  readings: [],
  nextOffset: null,
  loading: true,
  loadingMore: false,
  error: null,
};

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case "FETCH_START":
      return {
        readings: [],
        nextOffset: null,
        loading: true,
        loadingMore: false,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        readings: action.readings,
        nextOffset: action.nextOffset,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.error };
    case "MORE_START":
      return { ...state, loadingMore: true };
    case "MORE_SUCCESS":
      return {
        ...state,
        loadingMore: false,
        readings: [...state.readings, ...action.readings],
        nextOffset: action.nextOffset,
      };
    case "MORE_ERROR":
      return { ...state, loadingMore: false, error: action.error };
  }
}

export function SensorPanel({ wallet }: { wallet: string }) {
  const [sensors, setSensors] = useState<{ wallet: string; data: SensorData[] } | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let cancelled = false;
    fetchSensors(wallet)
      .then((data) => {
        if (!cancelled) {
          setSensors({ wallet, data });
          setTabIndex(0);
        }
      })
      .catch(() => { if (!cancelled) setSensors({ wallet, data: [] }); });
    return () => { cancelled = true; };
  }, [wallet]);

  const sensorsLoading = sensors === null || sensors.wallet !== wallet;
  const sensorList = sensorsLoading ? [] : sensors.data;
  const sensor = sensorList[tabIndex];
  const { readings, nextOffset, loading, loadingMore, error } = state;

  useEffect(() => {
    if (!sensor) return;
    let cancelled = false;
    dispatch({ type: "FETCH_START" });
    fetchTxs(sensor.sensor_wallet)
      .then((data) => {
        if (!cancelled)
          dispatch({
            type: "FETCH_SUCCESS",
            readings: extractBurns(data.transactions, sensor.mint_address),
            nextOffset: data.next_offset ?? null,
          });
      })
      .catch((e: unknown) => {
        if (!cancelled)
          dispatch({
            type: "FETCH_ERROR",
            error: e instanceof Error ? e.message : "Failed to fetch",
          });
      });
    return () => {
      cancelled = true;
    };
  }, [sensor?.sensor_wallet, sensor?.mint_address]);

  async function handleLoadMore() {
    if (!nextOffset || !sensor) return;
    dispatch({ type: "MORE_START" });
    try {
      const data = await fetchTxs(sensor.sensor_wallet, nextOffset);
      dispatch({
        type: "MORE_SUCCESS",
        readings: extractBurns(data.transactions, sensor.mint_address),
        nextOffset: data.next_offset ?? null,
      });
    } catch (e: unknown) {
      dispatch({
        type: "MORE_ERROR",
        error: e instanceof Error ? e.message : "Failed to fetch",
      });
    }
  }

  if (sensorsLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-line bg-white text-[12px] text-muted shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
        Loading sensors…
      </div>
    );
  }

  if (sensorList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-line bg-white text-[12px] text-muted shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
        No sensors found
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      <div className="flex gap-1 overflow-x-auto border-b border-line p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sensorList.map((s, i) => (
          <button
            key={s.sensor_wallet}
            onClick={() => setTabIndex(i)}
            className={`shrink-0 rounded-lg px-4 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-all ${
              tabIndex === i
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:bg-cream/50 hover:text-ink"
            }`}
          >
            {s.tab_label}
          </button>
        ))}
      </div>

      <div className="border-b border-line bg-cream/30 p-3">
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-3 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20">
                <Cpu className="h-5 w-5 text-accent" />
                <span
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-accent shadow-sm after:absolute after:inset-0 after:animate-plant-pulse after:rounded-full after:bg-accent after:content-['']"
                  aria-hidden
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider text-accent uppercase">
                  {sensor.type}
                </span>
                <span className="text-sm font-semibold text-ink leading-snug">
                  {sensor.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line/10 pt-2.5">
            <div className="flex items-center gap-1.5 rounded-lg bg-cream/50 px-2 py-1 ring-1 ring-line/5">
              <Wallet className="h-3 w-3 text-muted" />
              <span className="font-mono text-[11px] font-medium text-ink-dim">
                {SHORT(sensor.sensor_wallet)}
              </span>
            </div>
            <a
              href={`https://explorer.solana.com/address/${sensor.sensor_wallet}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-accent transition-colors hover:text-accent/80"
            >
              View →
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-8 text-[12px] text-muted">
            Loading…
          </div>
        )}
        {error && (
          <div className="px-4 py-4 text-[12px] text-red-500">{error}</div>
        )}
        {!loading && !error && readings.length === 0 && (
          <div className="flex items-center justify-center py-8 text-[12px] text-muted">
            No readings found
          </div>
        )}
        {readings.map((r) => {
          const { date, time } = formatBlockTime(r.block_time);
          return (
            <div
              key={r.signature}
              className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[12px] last:border-0"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-medium text-ink">{date}</span>
                <span className="text-[10px] text-muted">{time}</span>
              </div>
              <span className="font-medium tabular-nums text-ink">
                {r.burned !== null ? r.burned.toFixed(2) : "—"}
                {sensor.unit_symbol}
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={`https://explorer.solana.com/tx/${r.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-accent hover:text-accent/80"
                >
                  txn →
                </a>
              </div>
            </div>
          );
        })}
        {nextOffset && !loading && (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="w-full py-3 text-[11px] font-semibold text-accent hover:text-accent/80 disabled:text-muted"
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        )}
        {!nextOffset && (
          <div className="w-full py-3 text-[11px] text-center text-muted">
            End of list
          </div>
        )}
      </div>
    </div>
  );
}
