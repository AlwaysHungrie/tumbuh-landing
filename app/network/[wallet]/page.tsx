"use client";

import { useEffect, use } from "react";
import { PlantStage } from "@/components/landing/Hero/PlantStage";
import { SensorPanel } from "@/components/network/SensorPanel";
import { GlobalChat } from "@/components/network/GlobalChat";
import { CapitalCard } from "@/components/network/CapitalCard";

const DEFAULT_WALLET = "5RnVY4jqrWfhnHNSyAhRJBXYDKoGHVbr6gF71du1ejwj";

export default function NetworkGenesisPage({
  params,
}: {
  params: Promise<{ wallet: string }>;
}) {
  const { wallet } = use(params);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (!path.includes(DEFAULT_WALLET)) {
        window.location.href = `/network/${DEFAULT_WALLET}`;
      }
    }
  }, []);

  return (
    <div className="grid h-full grid-cols-3 gap-4 overflow-hidden py-4 max-w-site mx-auto">
      <SensorPanel wallet={wallet} />

      <div className="flex flex-col gap-4 overflow-y-auto">
        <CapitalCard wallet={wallet} />

        <PlantStage wallet={wallet} />
      </div>

      <GlobalChat />
    </div>
  );
}
