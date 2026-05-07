import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { ensureChatTable } from "@/lib/chat-schema";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  await ensureChatTable();

  const cursor = request.nextUrl.searchParams.get("cursor");
  const limit = Math.min(
    parseInt(request.nextUrl.searchParams.get("limit") ?? String(PAGE_SIZE), 10),
    50
  );

  const rows = cursor
    ? await sql`
        SELECT id, "from", "to", body, action,
               TO_CHAR(ts AT TIME ZONE 'UTC', 'HH24:MI') AS ts,
               ts AS raw_ts
        FROM chat_messages
        WHERE id < ${parseInt(cursor, 10)}
        ORDER BY id DESC
        LIMIT ${limit}
      `
    : await sql`
        SELECT id, "from", "to", body, action,
               TO_CHAR(ts AT TIME ZONE 'UTC', 'HH24:MI') AS ts,
               ts AS raw_ts
        FROM chat_messages
        ORDER BY id DESC
        LIMIT ${limit}
      `;

  const messages = rows.map((r) => ({
    id: r.id,
    from: r.from,
    to: r.to,
    body: r.body,
    action: r.action,
    ts: r.ts,
  }));

  const nextCursor =
    rows.length === limit ? String(rows[rows.length - 1].id) : null;

  return Response.json({ messages, nextCursor });
}

export async function POST(request: Request) {
  await ensureChatTable();

  const body = await request.json();
  const { from, to, body: msgBody, action = "accept" } = body;

  if (!from || !to || !msgBody) {
    return Response.json(
      { error: "from, to, and body are required" },
      { status: 400 }
    );
  }

  const validActions = ["accept", "ignore", "update_code"];
  if (!validActions.includes(action)) {
    return Response.json(
      { error: `action must be one of: ${validActions.join(", ")}` },
      { status: 400 }
    );
  }

  const [row] = await sql`
    INSERT INTO chat_messages ("from", "to", body, action)
    VALUES (${from}, ${to}, ${msgBody}, ${action})
    RETURNING id, "from", "to", body, action,
              TO_CHAR(ts AT TIME ZONE 'UTC', 'HH24:MI') AS ts
  `;

  return Response.json({ message: row }, { status: 201 });
}
