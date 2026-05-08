"use client";

import { useState } from "react";
import { AdminCard } from "./AdminCard";
import { createSensorToken } from "@/lib/token-utils";

type Phase = "idle" | "pending" | "saving" | "success" | "error";

type Result = { mintAddress: string; signature: string };

type Props = {
  solanaWallet: { address: string; signTransaction: unknown } | undefined;
  onSuccess: () => void;
};

export function CreateTokenForm({ solanaWallet, onSuccess }: Props) {
  const [name, setName] = useState("Sensor Token");
  const [symbol, setSymbol] = useState("SNSR");
  const [phase, setPhase] = useState<Phase>("idle");
  const [, setLastResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const busy = phase === "pending" || phase === "saving";

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!solanaWallet) return;

    setPhase("pending");
    setError(null);
    setLastResult(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await createSensorToken(solanaWallet as any, {
        name: name.trim(),
        symbol: symbol.trim(),
        uri: undefined,
      });

      setPhase("saving");

      await fetch("/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mint_address: res.mintAddress,
          name: name.trim(),
          symbol: symbol.trim(),
          uri: "NOT_APPLICABLE",
          creator: solanaWallet.address,
          signature: res.signature,
        }),
      });

      setLastResult(res);
      setPhase("success");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setPhase("error");
    }
  }

  return (
    <AdminCard title="Create Token">
      <div className="p-4">
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Token Name
            </label>
            <input
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sensor Token"
              required
              disabled={busy}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Symbol
            </label>
            <input
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="SNSR"
              maxLength={10}
              required
              disabled={busy}
            />
          </div>

          <button
            type="submit"
            disabled={!solanaWallet || busy}
            className="mt-1 w-full rounded-lg bg-accent py-2.5 text-[11px] font-bold tracking-widest text-white uppercase transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-cream disabled:text-muted"
          >
            {phase === "pending"
              ? "Waiting for signature…"
              : phase === "saving"
                ? "Saving…"
                : "Create Token"}
          </button>
        </form>

        {phase === "error" && error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-[11px] font-mono text-red-600 ring-1 ring-red-100 break-all">
            {error}
          </div>
        )}
      </div>
    </AdminCard>
  );
}
