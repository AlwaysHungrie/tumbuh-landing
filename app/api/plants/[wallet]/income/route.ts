import sql from "@/lib/db";

export async function POST(
  _req: Request,
  ctx: RouteContext<"/api/plants/[wallet]/income">
) {
  const { wallet } = await ctx.params;

  const [row] = await sql`
    UPDATE plants
    SET recurring_income = recurring_income + 1
    WHERE wallet = ${wallet}
    RETURNING id, wallet, recurring_income
  `;

  if (!row) {
    return Response.json({ error: "plant not found" }, { status: 404 });
  }

  return Response.json({ wallet: row.wallet, recurring_income: row.recurring_income });
}
