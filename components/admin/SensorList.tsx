"use client";

import { Sensor } from "@/app/admin/page";
import { AdminCard } from "./AdminCard";

type Props = {
  sensors: Sensor[];
  onRefresh: () => void;
};

const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;

export function SensorList({ sensors, onRefresh }: Props) {
  return (
    <AdminCard
      title="Registered Sensors"
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
        {sensors.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-[12px] text-muted">
            No sensors yet.
          </div>
        ) : (
          sensors
            .filter((s) => s.sensor_wallet)
            .map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-1.5 border-b border-line px-4 py-3 last:border-0"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold text-ink">
                    {s.name || <span className="text-muted">—</span>}
                  </span>
                  <span className="text-[10px] text-muted">
                    {new Date(s.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 text-[10px] text-muted">
                  <span>
                    <span className="font-bold tracking-wider uppercase">
                      Type{" "}
                    </span>
                    {s.type === "sensor_and_actuator"
                      ? "Sensor and Actuator"
                      : "Sensor"}
                  </span>
                  <span>
                    <span className="font-bold tracking-wider uppercase">
                      Tab{" "}
                    </span>
                    {s.tab_label}
                  </span>
                  <span>
                    <span className="font-bold tracking-wider uppercase">
                      Unit{" "}
                    </span>
                    <span className="font-mono">{s.unit_symbol}</span>
                  </span>
                </div>

                <div className="flex gap-4 text-[10px] text-muted">
                  <span>
                    <span className="font-bold tracking-wider uppercase">
                      Plant{" "}
                    </span>
                    <span className="font-mono" title={s.plant_wallet}>
                      {SHORT(s.plant_wallet)}
                    </span>
                  </span>
                  <span>
                    <span className="font-bold tracking-wider uppercase">
                      Wallet{" "}
                    </span>
                    <span className="font-mono" title={s.sensor_wallet}>
                      {SHORT(s.sensor_wallet)}
                    </span>
                  </span>
                </div>

                <a
                  href={`https://solscan.io/tx/${s.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold tracking-wider text-accent uppercase hover:text-accent/80"
                >
                  Tx ↗
                </a>
              </div>
            ))
        )}
      </div>
    </AdminCard>
  );
}
