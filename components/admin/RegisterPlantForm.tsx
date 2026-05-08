"use client";

import { useState } from "react";
import { AdminCard } from "./AdminCard";

type Phase = "idle" | "saving" | "success" | "error";

type Props = {
  onSuccess: () => void;
};

export function RegisterPlantForm({ onSuccess }: Props) {
  const [wallet, setWallet] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);

  const busy = phase === "saving";

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setPhase("saving");
    setError(null);

    try {
      const res = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: wallet.trim(),
          latitude: latitude.trim(),
          longitude: longitude.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      setPhase("success");
      setWallet("");
      setLatitude("");
      setLongitude("");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setPhase("error");
    }
  }

  return (
    <AdminCard title="Register Plant">
      <div className="p-4">
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
              Wallet Address
            </label>
            <input
              className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="Enter wallet address"
              required
              disabled={busy}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
                Latitude
              </label>
              <input
                className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g. 1.3521"
                required
                disabled={busy}
              />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
                Longitude
              </label>
              <input
                className="w-full rounded-lg bg-cream px-3 py-2 text-[13px] text-ink outline-none ring-1 ring-line/30 transition focus:ring-accent disabled:opacity-50"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g. 103.8198"
                required
                disabled={busy}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-1 w-full rounded-lg bg-accent py-2.5 text-[11px] font-bold tracking-widest text-white uppercase transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-cream disabled:text-muted"
          >
            {busy ? "Registering…" : "Register"}
          </button>
        </form>

        {phase === "success" && (
          <div className="mt-4 rounded-lg bg-green-50 p-3 text-[11px] text-green-700 ring-1 ring-green-100">
            Plant registered.
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
