"use client";

import { useEffect } from "react";
import { PlantStage } from "@/components/landing/Hero/PlantStage";
import { SensorPanel } from "@/components/network/SensorPanel";
import { GlobalChat } from "@/components/network/GlobalChat";

const WALLET = "5RnVY4jqrWfhnHNSyAhRJBXYDKoGHVbr6gF71du1ejwj";

export default function NetworkGenesisPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (!path.includes(WALLET)) {
        window.location.href = `/network/${WALLET}`;
      }
    }
  }, []);

  return (
    <div className="grid h-full grid-cols-3 gap-4 overflow-hidden py-4">
      <SensorPanel />

      <div className="flex flex-col gap-4 overflow-y-auto">
        <div
          className="rounded-xl border border-line bg-white px-5 py-4 text-center shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]"
          aria-live="polite"
        >
          <span className="block text-[11px] font-medium tracking-[0.2em] text-muted uppercase">
            This is a simulation
          </span>
          <span className="mt-1.5 block text-lg font-semibold tracking-[-0.015em] text-ink">
            Status: Under Construction
          </span>
        </div>

        <PlantStage />
      </div>

      <GlobalChat />
    </div>
  );
}
