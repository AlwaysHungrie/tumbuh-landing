"use client";

import { AdminCard } from "./AdminCard";

type Plant = {
  id: number;
  wallet: string;
  latitude: string;
  longitude: string;
  created_at: string;
};

type Props = {
  plants: Plant[];
  onRefresh: () => void;
};

const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;

export function PlantList({ plants, onRefresh }: Props) {
  return (
    <AdminCard
      title="Registered Plants"
      action={
        <button
          onClick={onRefresh}
          className="text-[10px] font-bold tracking-widest text-muted uppercase transition hover:text-ink"
        >
          Refresh
        </button>
      }
      className="flex-1 min-h-0"
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        {plants.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-[12px] text-muted">
            No plants yet.
          </div>
        ) : (
          plants.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-1.5 border-b border-line px-4 py-3 last:border-0"
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-mono text-[11px] text-ink"
                  title={p.wallet}
                >
                  {SHORT(p.wallet)}
                </span>
                <span className="text-[10px] text-muted">
                  {new Date(p.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-4 text-[11px] text-muted">
                <span>
                  <span className="font-bold tracking-wider uppercase text-[10px]">
                    Lat{" "}
                  </span>
                  {p.latitude}
                </span>
                <span>
                  <span className="font-bold tracking-wider uppercase text-[10px]">
                    Lng{" "}
                  </span>
                  {p.longitude}
                </span>
              </div>

              <span className="break-all font-mono text-[10px] text-muted/60">
                {p.wallet}
              </span>
            </div>
          ))
        )}
      </div>
    </AdminCard>
  );
}
