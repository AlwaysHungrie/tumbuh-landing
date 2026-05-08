import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

async function ensurePlantsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS plants (
      id          SERIAL PRIMARY KEY,
      wallet      TEXT NOT NULL,
      latitude    TEXT NOT NULL,
      longitude   TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function GET() {
  await ensurePlantsTable();

  const rows = await sql`
    SELECT id, wallet, latitude, longitude, created_at
    FROM plants
    ORDER BY created_at DESC
  `;

  return NextResponse.json({ plants: rows });
}

export async function POST(req: NextRequest) {
  await ensurePlantsTable();

  const body = await req.json();
  const { wallet, latitude, longitude } = body;

  if (!wallet || !latitude || !longitude) {
    return NextResponse.json(
      { error: "wallet, latitude, longitude required" },
      { status: 400 }
    );
  }

  const [row] = await sql`
    INSERT INTO plants (wallet, latitude, longitude)
    VALUES (${wallet}, ${latitude}, ${longitude})
    RETURNING id, wallet, latitude, longitude, created_at
  `;

  return NextResponse.json({ plant: row }, { status: 201 });
}
