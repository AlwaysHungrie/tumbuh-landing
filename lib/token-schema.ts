import sql from "./db";

export async function ensureTokensTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS tokens (
      id           SERIAL PRIMARY KEY,
      mint_address TEXT NOT NULL UNIQUE,
      name         TEXT NOT NULL,
      symbol       TEXT NOT NULL,
      uri          TEXT NOT NULL DEFAULT '',
      creator      TEXT NOT NULL,
      signature    TEXT NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}
