import sql from "@/lib/db";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/chat/[id]">
) {
  const { id } = await ctx.params;
  const msgId = parseInt(id, 10);

  if (isNaN(msgId)) {
    return Response.json({ error: "invalid id" }, { status: 400 });
  }

  const body = await request.json();
  const { from, to, msgBody, action } = body as {
    from?: string;
    to?: string;
    msgBody?: string;
    action?: string;
  };

  const validActions = ["accept", "ignore", "update_code"];
  if (action && !validActions.includes(action)) {
    return Response.json(
      { error: `action must be one of: ${validActions.join(", ")}` },
      { status: 400 }
    );
  }

  const existing = await sql`
    SELECT id FROM chat_messages WHERE id = ${msgId}
  `;
  if (existing.length === 0) {
    return Response.json({ error: "message not found" }, { status: 404 });
  }

  const [updated] = await sql`
    UPDATE chat_messages
    SET
      "from"  = COALESCE(${from ?? null}, "from"),
      "to"    = COALESCE(${to ?? null}, "to"),
      body    = COALESCE(${msgBody ?? null}, body),
      action  = COALESCE(${action ?? null}, action)
    WHERE id = ${msgId}
    RETURNING id, "from", "to", body, action,
              TO_CHAR(ts AT TIME ZONE 'UTC', 'HH24:MI') AS ts
  `;

  return Response.json({ message: updated });
}
