"use client";

import { useState } from "react";

const WALLET = "5RnVY4jqrWfhnHNSyAhRJBXYDKoGHVbr6gF71du1ejwj";
const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;

type SensorTab = "water" | "light";

const waterReadings = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  date: `2026-05-${String(8 - Math.floor(i / 3)).padStart(2, "0")}`,
  time: `${String(10 + (i % 12)).padStart(2, "0")}:${String((i * 17) % 60).padStart(2, "0")}`,
  value: (38 + Math.sin(i * 0.7) * 12).toFixed(1) + "%",
}));

const lightReadings = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  date: `2026-05-${String(8 - Math.floor(i / 3)).padStart(2, "0")}`,
  time: `${String(10 + (i % 12)).padStart(2, "0")}:${String((i * 17) % 60).padStart(2, "0")}`,
  value: (580 + Math.cos(i * 0.9) * 200).toFixed(0) + " lx",
}));

export function SensorPanel() {
  const [tab, setTab] = useState<SensorTab>("water");
  const readings = tab === "water" ? waterReadings : lightReadings;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      <div className="flex border-b border-line">
        {(["water", "light"] as SensorTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${
              tab === t
                ? "border-b-2 border-accent text-accent"
                : "text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11px] text-ink-dim">{SHORT(WALLET)}</span>
        <span className="text-ink-dim">→</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {readings.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[12px] last:border-0"
          >
            <div className="flex gap-3 text-ink-dim">
              <span>{r.date}</span>
              <span>{r.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium tabular-nums text-ink">{r.value}</span>
              <span className="text-[11px] text-accent">txn →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
