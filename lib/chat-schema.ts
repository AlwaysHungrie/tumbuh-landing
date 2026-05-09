import sql from "./db";

export async function ensureChatTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id        SERIAL PRIMARY KEY,
      "from"    TEXT NOT NULL,
      "to"      TEXT NOT NULL,
      body      TEXT NOT NULL,
      action    TEXT NOT NULL DEFAULT 'undecided'
                CHECK (action IN ('accept', 'ignore', 'update_code', 'undecided')),
      ts        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Migrate existing constraint if table already exists without 'undecided'
  await sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_name = 'chat_messages'
          AND constraint_name = 'chat_messages_action_check'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints
        WHERE constraint_name = 'chat_messages_action_check'
          AND check_clause LIKE '%undecided%'
      ) THEN
        ALTER TABLE chat_messages DROP CONSTRAINT chat_messages_action_check;
        ALTER TABLE chat_messages
          ADD CONSTRAINT chat_messages_action_check
          CHECK (action IN ('accept', 'ignore', 'update_code', 'undecided'));
        ALTER TABLE chat_messages ALTER COLUMN action SET DEFAULT 'undecided';
      END IF;
    END
    $$
  `;
}
