import { PlantStage } from "@/components/landing/Hero/PlantStage";

export default function NetworkGenesisPage() {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-[min(100%,420px)] flex-col gap-4">
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
  );
}
