"use client";

import { useEffect, useState, useRef } from "react";
import { Info, Wallet2 } from "lucide-react";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const JPL_MINT = "27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4";
const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom";
  style?: React.CSSProperties;
};

function Tooltip({ content, children, side = "top", style }: TooltipProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function show() {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: r.left + r.width / 2,
      y: side === "top" ? r.top : r.bottom,
    });
  }

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={() => setPos(null)}
      style={style}
    >
      {children}
      {pos && (
        <div
          className="max-w-60 pointer-events-none fixed z-1000 -translate-x-1/2 rounded-lg border border-line bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg"
          style={
            side === "top"
              ? {
                  left: pos.x + 4,
                  top: pos.y,
                  transform: "translate(-50%, -100%)",
                }
              : { left: pos.x, top: pos.y + 8, transform: "translateX(-50%)" }
          }
        >
          {content}
        </div>
      )}
    </div>
  );
}

async function fetchTokenBalance(
  rpc: string,
  owner: string,
  mint: string,
): Promise<number> {
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenAccountsByOwner",
      params: [owner, { mint }, { encoding: "jsonParsed" }],
    }),
  });
  const data = await res.json();
  const accounts: Array<{
    account: {
      data: { parsed: { info: { tokenAmount: { uiAmount: number } } } };
    };
  }> = data?.result?.value ?? [];
  return accounts.reduce(
    (sum, a) => sum + (a.account.data.parsed.info.tokenAmount.uiAmount ?? 0),
    0,
  );
}

async function fetchJplPrice(): Promise<number> {
  try {
    const res = await fetch(`https://api.jup.ag/price/v2?ids=${JPL_MINT}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return Number(data?.data?.[JPL_MINT]?.price ?? 1);
  } catch {
    return 1;
  }
}

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; usdc: number; jpl: number; jplPrice: number };

export function CapitalCard({ wallet }: { wallet: string }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const rpc = process.env.NEXT_PUBLIC_HELIUS_RPC!;

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ status: "loading" });

    Promise.all([
      fetchTokenBalance(rpc, wallet, USDC_MINT),
      fetchTokenBalance(rpc, wallet, JPL_MINT),
      fetchJplPrice(),
    ])
      .then(([usdc, jpl, jplPrice]) => {
        if (!cancelled) setState({ status: "ok", usdc, jpl, jplPrice });
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setState({
            status: "error",
            message: e instanceof Error ? e.message : "Failed to fetch",
          });
      });

    return () => {
      cancelled = true;
    };
  }, [wallet, rpc]);

  const isLoading = state.status === "loading";
  const isError = state.status === "error";

  const usdcVal = state.status === "ok" ? state.usdc : 0;
  const jplVal = state.status === "ok" ? state.jpl * state.jplPrice : 0;
  const total = usdcVal + jplVal;
  const usdcPct = total > 0 ? (usdcVal / total) * 100 : 50;
  const jplPct = 100 - usdcPct;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-white px-5 pt-4 pb-2 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="flex gap-1 items-center text-[10px] font-bold tracking-[0.15em] text-muted uppercase">
            <Wallet2 className="w-3 h-3" /> {SHORT(wallet)}
          </span>
          <span className="font-mono text-[13px] font-semibold text-ink"></span>
        </div>

        <Tooltip
          content="Plant wallet auto-balances working vs idle capital and invests idle capital for passive income."
          side="top"
        >
          <button className="flex px-2 h-6 gap-2 text-[12px] font-semibold items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-ink">
            Auto
            <Info className="h-3.5 w-3.5" />
          </button>
        </Tooltip>
      </div>

      {/* Total */}
      <div className="flex justify-center items-baseline gap-1.5">
        {isLoading ? (
          <span className="h-7 w-24 animate-pulse rounded-lg bg-cream" />
        ) : isError ? (
          <span className="text-[12px] text-red-500">{state.message}</span>
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight text-ink">
              $
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-[11px] text-muted">USD</span>
          </>
        )}
      </div>

      {/* Capital bar */}
      <div className="flex h-2 w-full rounded-full mt-2">
        <Tooltip
          content="Working Capital"
          side="bottom"
          style={{
            width: `${usdcPct}%`,
            backgroundColor: "#2f6d3c",
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
          }}
        >
          <div
            className="h-2 cursor-default rounded-l-full bg-accent transition-all duration-500"
            style={{ width: `${usdcPct}%` }}
          />
        </Tooltip>

        <Tooltip
          content="Idle Capital"
          side="bottom"
          style={{
            width: `${jplPct}%`,
            minWidth: "12px",
            backgroundColor: "#2f6d3c40",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        >
          <div
            className="h-2 cursor-default rounded-l-full bg-accent transition-all duration-500"
            style={{ width: `${jplPct}%` }}
          />
        </Tooltip>
      </div>
    </div>
  );
}
