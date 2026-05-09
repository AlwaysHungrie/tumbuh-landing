import sql from "@/lib/db";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/plants/[wallet]">
) {
  const { wallet } = await ctx.params;

  const [row] = await sql`
    SELECT id, wallet, latitude, longitude, recurring_income, created_at
    FROM plants
    WHERE wallet = ${wallet}
  `;

  if (!row) {
    return Response.json({ error: "plant not found" }, { status: 404 });
  }

  return Response.json({ plant: row });
}
