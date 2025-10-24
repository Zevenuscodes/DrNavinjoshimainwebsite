import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const raw = process.env.ADMIN_TOKEN || "";
  const token = raw.trim();
  const configured = token.length > 0;
  const meta = configured
    ? {
        length: token.length,
        startsWith: token.slice(0, 3),
        endsWith: token.slice(-3),
        sha256: crypto.createHash("sha256").update(token).digest("hex"),
      }
    : null;
  return NextResponse.json({ configured, meta });
}
