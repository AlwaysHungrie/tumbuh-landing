"use client";

const WALLET = "5RnVY4jqrWfhnHNSyAhRJBXYDKoGHVbr6gF71du1ejwj";
const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;
const ME = SHORT(WALLET);

type ActionButton = "accept" | "ignore" | "update_code";

interface ChatMessage {
  id: number;
  from: string;
  to: string;
  body: string;
  action: ActionButton;
  ts: string;
}

const peers = ["8Xy3…mN2k", "Pq7R…vW5j", "Lk9T…hB1f", "Nm4C…dE8r"];

const MESSAGES: ChatMessage[] = [
  {
    id: 1,
    from: ME,
    to: peers[0],
    body: "Moisture reading above threshold — requesting peer validation.",
    action: "accept",
    ts: "09:14",
  },
  {
    id: 2,
    from: peers[1],
    to: ME,
    body: "Light sensor drift detected at node 3. Update calibration?",
    action: "update_code",
    ts: "09:21",
  },
  {
    id: 3,
    from: peers[2],
    to: peers[0],
    body: "Confirmed block 4821. Plant stake settled.",
    action: "ignore",
    ts: "09:35",
  },
  {
    id: 4,
    from: ME,
    to: peers[3],
    body: "Requesting co-signature for irrigation event.",
    action: "accept",
    ts: "10:02",
  },
  {
    id: 5,
    from: peers[3],
    to: ME,
    body: "Soil pH out of optimal range. Suggest intervention.",
    action: "update_code",
    ts: "10:18",
  },
  {
    id: 6,
    from: peers[0],
    to: peers[2],
    body: "New peer joined the grove. Handshake complete.",
    action: "ignore",
    ts: "10:44",
  },
  {
    id: 7,
    from: ME,
    to: peers[1],
    body: "Nightly report: 14 readings recorded, 2 anomalies flagged.",
    action: "accept",
    ts: "11:00",
  },
];

/* ── action config ───────────────────────────────────────────── */

type ActionMeta = {
  label: string;
  active: string; // classes when this segment is selected
  inactive: string; // classes when not selected
};

const ACTION_CONFIG: Record<ActionButton, ActionMeta> = {
  accept: {
    label: "Accept",
    active: "bg-accent text-white",
    inactive: "text-muted hover:text-ink-dim",
  },
  ignore: {
    label: "Ignore",
    active: "bg-cream-dark text-ink-dim",
    inactive: "text-muted hover:text-ink-dim",
  },
  update_code: {
    label: "Update",
    active: "bg-ink text-white",
    inactive: "text-muted hover:text-ink-dim",
  },
};

const ACTION_ORDER: ActionButton[] = ["accept", "ignore", "update_code"];

/* ── component ───────────────────────────────────────────────── */

export function GlobalChat() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-[11px] font-semibold tracking-[0.15em] text-muted uppercase">
          Global Chat
        </span>
        <span className="font-mono text-[10px] text-muted/70">{ME}</span>
      </div>

      {/* ── Feed ── */}
      <div className="flex-1 divide-y divide-line overflow-y-auto">
        {MESSAGES.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-2.5 px-4 py-3.5">
            {/* Meta row: from / to / timestamp */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex min-w-0 gap-3 font-mono text-[10px]">
                <span className="flex min-w-0 gap-1">
                  <span className="shrink-0 text-muted/50 uppercase">from</span>
                  <span className="truncate text-ink-dim">{msg.from}</span>
                </span>
                <span className="flex min-w-0 gap-1">
                  <span className="shrink-0 text-muted/50 uppercase">to</span>
                  <span className="truncate text-ink-dim">{msg.to}</span>
                </span>
              </div>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted/60">
                {msg.ts}
              </span>
            </div>

            {/* Body */}
            <p className="text-[12.5px] leading-[1.6] text-ink">{msg.body}</p>

            {/* Segmented action group */}
            <div className="flex overflow-hidden rounded-md border border-line bg-cream text-[10.5px] font-medium">
              {ACTION_ORDER.map((a, i) => {
                const isActive = a === msg.action;
                const meta = ACTION_CONFIG[a];
                return (
                  <button
                    key={a}
                    disabled={!isActive}
                    className={[
                      "flex flex-1 items-center justify-center py-1.5 transition-colors",
                      i > 0 ? "border-l border-line" : "",
                      isActive ? meta.active : meta.inactive,
                      !isActive ? "cursor-default" : "",
                    ].join(" ")}
                  >
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-line px-4 py-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-line bg-cream px-3 py-2.5">
          <span
            className="relative h-2 w-2 shrink-0 rounded-full bg-accent after:absolute after:-inset-1 after:animate-plant-pulse after:rounded-full after:border-2 after:border-accent after:opacity-60 after:content-['']"
            aria-hidden
          />
          <span className="text-[12px] font-medium text-ink-dim">
            Plant Brain
          </span>
        </div>
      </div>
    </div>
  );
}
