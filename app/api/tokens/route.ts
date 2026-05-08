import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { ensureTokensTable } from "@/lib/token-schema";

export async function GET() {
  await ensureTokensTable();

  const rows = await sql`
    SELECT id, mint_address, name, symbol, uri, creator, signature, created_at
    FROM tokens
    ORDER BY created_at DESC
  `;

  return NextResponse.json({ tokens: rows });
}

export async function POST(req: NextRequest) {
  await ensureTokensTable();

  const body = await req.json();
  const { mint_address, name, symbol, uri = "", creator, signature } = body;

  if (!mint_address || !name || !symbol || !creator || !signature) {
    return NextResponse.json(
      { error: "mint_address, name, symbol, creator, signature required" },
      { status: 400 }
    );
  }

  const [row] = await sql`
    INSERT INTO tokens (mint_address, name, symbol, uri, creator, signature)
    VALUES (${mint_address}, ${name}, ${symbol}, ${uri}, ${creator}, ${signature})
    ON CONFLICT (mint_address) DO NOTHING
    RETURNING id, mint_address, name, symbol, uri, creator, signature, created_at
  `;

  if (!row) {
    return NextResponse.json(
      { error: "token with this mint already exists" },
      { status: 409 }
    );
  }

  return NextResponse.json({ token: row }, { status: 201 });
}
