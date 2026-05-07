"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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

interface ApiResponse {
  messages: ChatMessage[];
  nextCursor: string | null;
}

type ActionMeta = {
  label: string;
  active: string;
  inactive: string;
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

export function GlobalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const fetchPage = useCallback(async (cursor: string | null) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const url = cursor ? `/api/chat?cursor=${cursor}` : `/api/chat`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("fetch failed");
      const data: ApiResponse = await res.json();
      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const fresh = data.messages.filter((m) => !existingIds.has(m.id));
        return [...prev, ...fresh];
      });
      setNextCursor(data.nextCursor);
    } catch {
      // silently fail — chat is non-critical UI
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPage(null);
  }, [fetchPage]);

  // Infinite scroll — watch sentinel at bottom
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor && !loadingRef.current) {
          fetchPage(nextCursor);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [nextCursor, fetchPage]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-[11px] font-semibold tracking-[0.15em] text-muted uppercase">
          Global Chat
        </span>
        <span className="font-mono text-[10px] text-muted/70">{ME}</span>
      </div>

      {/* Feed */}
      <div className="flex-1 divide-y divide-line overflow-y-auto">
        {initialLoading && (
          <div className="flex items-center justify-center py-8">
            <span className="text-[11px] text-muted">Loading…</span>
          </div>
        )}

        {!initialLoading && messages.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <span className="text-[11px] text-muted">No messages yet.</span>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-2.5 px-4 py-3.5">
            {/* Meta row */}
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

            {/* Action group */}
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

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="py-1">
          {loading && !initialLoading && (
            <p className="py-2 text-center text-[10px] text-muted">
              Loading more…
            </p>
          )}
          {!loading && !nextCursor && messages.length > 0 && (
            <p className="py-2 text-center text-[10px] text-muted/40">
              End of feed
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
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
