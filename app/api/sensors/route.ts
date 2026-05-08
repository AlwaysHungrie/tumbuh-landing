import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS sensors2 (
      id            SERIAL PRIMARY KEY,
      sensor_wallet TEXT NOT NULL UNIQUE,
      plant_wallet  TEXT NOT NULL,
      mint_address  TEXT NOT NULL,
      signature     TEXT NOT NULL,
      name          TEXT NOT NULL DEFAULT '',
      type          TEXT NOT NULL DEFAULT 'sensor',
      tab_label     TEXT NOT NULL DEFAULT '',
      unit_symbol   TEXT NOT NULL DEFAULT '',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE sensors2 ADD COLUMN IF NOT EXISTS name        TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE sensors2 ADD COLUMN IF NOT EXISTS type        TEXT NOT NULL DEFAULT 'sensor'`;
  await sql`ALTER TABLE sensors2 ADD COLUMN IF NOT EXISTS tab_label   TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE sensors2 ADD COLUMN IF NOT EXISTS unit_symbol TEXT NOT NULL DEFAULT ''`;
}

export async function GET() {
  await ensureTable();

  const rows = await sql`
    SELECT id, sensor_wallet, plant_wallet, mint_address, signature, name, type, tab_label, unit_symbol, created_at
    FROM sensors2
    ORDER BY created_at DESC
  `;

  return NextResponse.json({ sensors: rows });
}

export async function POST(req: NextRequest) {
  await ensureTable();

  const body = await req.json();
  const { sensor_wallet, plant_wallet, mint_address, signature, name, type: sensorType, tab_label, unit_symbol } = body;

  if (!sensor_wallet || !plant_wallet || !mint_address || !signature || !name || !sensorType || !tab_label || !unit_symbol) {
    return NextResponse.json(
      { error: "sensor_wallet, plant_wallet, mint_address, signature, name, type, tab_label, unit_symbol required" },
      { status: 400 }
    );
  }

  const [row] = await sql`
    INSERT INTO sensors2 (sensor_wallet, plant_wallet, mint_address, signature, name, type, tab_label, unit_symbol)
    VALUES (${sensor_wallet}, ${plant_wallet}, ${mint_address}, ${signature}, ${name}, ${sensorType}, ${tab_label}, ${unit_symbol})
    ON CONFLICT (sensor_wallet) DO NOTHING
    RETURNING id, sensor_wallet, plant_wallet, mint_address, signature, name, type, tab_label, unit_symbol, created_at
  `;

  if (!row) {
    return NextResponse.json(
      { error: "sensor with this wallet already exists" },
      { status: 409 }
    );
  }

  return NextResponse.json({ sensor: row }, { status: 201 });
}
