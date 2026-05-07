import sql from "./db";

export async function ensureChatTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id        SERIAL PRIMARY KEY,
      "from"    TEXT NOT NULL,
      "to"      TEXT NOT NULL,
      body      TEXT NOT NULL,
      action    TEXT NOT NULL DEFAULT 'accept'
                CHECK (action IN ('accept', 'ignore', 'update_code')),
      ts        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}
