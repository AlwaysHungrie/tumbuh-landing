"use client";

import { AdminCard } from "./AdminCard";

type Token = {
  id: number;
  mint_address: string;
  name: string;
  symbol: string;
  uri: string;
  creator: string;
  signature: string;
  created_at: string;
};

type Props = {
  tokens: Token[];
  onRefresh: () => void;
};

export function TokenList({ tokens, onRefresh }: Props) {
  return (
    <AdminCard
      title="Created Tokens"
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
        {tokens.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-[12px] text-muted">
            No tokens yet.
          </div>
        ) : (
          tokens.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-1.5 border-b border-line px-4 py-3 last:border-0"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-ink">
                  {t.name}{" "}
                  <span className="text-[11px] font-normal text-muted">
                    {t.symbol}
                  </span>
                </span>
                <span className="text-[10px] text-muted">
                  {new Date(t.created_at).toLocaleDateString()}
                </span>
              </div>

              <span className="break-all font-mono text-[10px] text-muted">
                {t.mint_address}
              </span>

              <div className="flex gap-3">
                <a
                  href={`https://solscan.io/token/${t.mint_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold tracking-wider text-accent uppercase hover:text-accent/80"
                >
                  Solscan ↗
                </a>
                <a
                  href={`https://solscan.io/tx/${t.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold tracking-wider text-muted uppercase hover:text-ink"
                >
                  Tx ↗
                </a>
                {t.uri && (
                  <a
                    href={t.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold tracking-wider text-muted uppercase hover:text-ink"
                  >
                    Metadata ↗
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </AdminCard>
  );
}
