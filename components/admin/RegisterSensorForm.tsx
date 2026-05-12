"use client";

import { useState } from "react";
import { generateKeyPair, getAddressFromPublicKey } from "@solana/kit";
import bs58 from "bs58";
import { AdminCard } from "./AdminCard";
import { mintTokens } from "@/lib/token-utils";
import type { ConnectedStandardSolanaWallet } from "@privy-io/react-auth/solana";

type Phase = "idle" | "minting" | "saving" | "success" | "error";

type Token = {
  id: number;
  mint_address: string;
  symbol: string;
};

type Plant = {
  id: number;
  wallet: string;
};

type Props = {
  solanaWallet: ConnectedStandardSolanaWallet | undefined;
  tokens: Token[];
  plants: Plant[];
  onSuccess: () => void;
};

const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;
const MINT_AMOUNT = 10000;

const SENSOR_TYPES = [
  { value: "sensor", label: "Sensor" },
  { value: "sensor_and_actuator", label: "Sensor and Actuator" },
];

export function RegisterSensorForm({
  solanaWallet,
  tokens,
  plants,
  onSuccess,
}: Props) {
  const [selectedMint, setSelectedMint] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [name, setName] = useState("");
  const [sensorType, setSensorType] = useState("sensor");
  const [tabLabel, setTabLabel] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [revealedPrivKey, setRevealedPrivKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const busy = phase === "minting" || phase === "saving";

  const selectedToken = tokens.find((t) => t.mint_address === selectedMint);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!solanaWallet || !selectedMint || !selectedPlant || !selectedToken)
      return;

    setPhase("minting");
    setError(null);
    setRevealedPrivKey(null);

    try {
      const kp = await generateKeyPair(true);
      const sensorAddress = await getAddressFromPublicKey(kp.publicKey);

      const result = await mintTokens(
        solanaWallet,
        selectedMint,
        sensorAddress,
        MINT_AMOUNT,
      );

      // const result = { signature: "empty" };

      const { signature = "empty" } = result;

      setPhase("saving");

      const res = await fetch("/api/sensors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sensor_wallet: sensorAddress,
          plant_wallet: selectedPlant,
          mint_address: selectedMint,
          signature,
          name: name.trim(),
          type: sensorType,
          tab_label: tabLabel.trim(),
          unit_symbol: selectedToken.symbol,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = `HTTP ${res.status}`;
        try {
          msg = JSON.parse(text).error ?? msg;
        } catch {
          msg = text || msg;
        }
        throw new Error(msg);
      }

      const pkcs8 = await crypto.subtle.exportKey("pkcs8", kp.privateKey);
      const seed = new Uint8Array(pkcs8).slice(16);
      setRevealedPrivKey(bs58.encode(seed));

      setPhase("success");
      setSelectedMint("");
      setSelectedPlant("");
      setName("");
      setSensorType("sensor");
      setTabLabel("");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setPhase("error");
    }
  }

  async function copyPrivKey() {
    if (!revealedPrivKey) return;
    await navigator.clipboard.writeText(revealedPrivKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  }

  return (
    <AdminCard title="Register Sensor">
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Name
            </label>
            <input
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Soil Moisture"
              required
              disabled={busy}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Type
            </label>
            <select
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={sensorType}
              onChange={(e) => setSensorType(e.target.value)}
              required
              disabled={busy}
            >
              {SENSOR_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Tab Label
            </label>
            <input
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={tabLabel}
              onChange={(e) => setTabLabel(e.target.value)}
              placeholder="e.g. Moisture"
              required
              disabled={busy}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Plant Wallet
            </label>
            <select
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              required
              disabled={busy}
            >
              <option value="">Select plant…</option>
              {plants.map((p) => (
                <option key={p.id} value={p.wallet}>
                  {SHORT(p.wallet)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Token
            </label>
            <select
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={selectedMint}
              onChange={(e) => setSelectedMint(e.target.value)}
              required
              disabled={busy}
            >
              <option value="">Select token…</option>
              {tokens.map((t) => (
                <option key={t.id} value={t.mint_address}>
                  {t.symbol}
                </option>
              ))}
            </select>
          </div>

          {selectedToken && (
            <div className="flex items-center gap-2 rounded-lg bg-cream px-3 py-2 ring-1 ring-line/30">
              <span className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
                Unit Symbol
              </span>
              <span className="text-[13px] text-ink font-mono">
                {selectedToken.symbol}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={!solanaWallet || busy || !selectedMint || !selectedPlant}
            className="mt-1 w-full rounded-lg bg-accent py-2.5 text-[11px] font-bold tracking-widest text-white uppercase transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-cream disabled:text-muted"
          >
            {phase === "minting"
              ? "Minting…"
              : phase === "saving"
                ? "Saving…"
                : "Register"}
          </button>
        </form>

        {phase === "success" && revealedPrivKey && (
          <div className="mt-4 flex flex-col gap-2 rounded-lg bg-amber-50 p-3 ring-1 ring-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-amber-700 uppercase">
                Private Key — shown once
              </span>
              <button
                onClick={copyPrivKey}
                className="text-[10px] font-bold tracking-wider text-amber-700 uppercase hover:text-amber-900"
              >
                {copiedKey ? "Copied!" : "Copy"}
              </button>
            </div>
            <span className="break-all font-mono text-[11px] text-amber-900 select-all">
              {revealedPrivKey}
            </span>
            <span className="text-[10px] text-amber-600">
              Store this key now. It will not be shown again.
            </span>
          </div>
        )}

        {phase === "error" && error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-[11px] font-mono text-red-600 ring-1 ring-red-100 break-all">
            {error}
          </div>
        )}
      </div>
    </AdminCard>
  );
}
