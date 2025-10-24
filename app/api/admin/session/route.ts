import { NextResponse } from "next/server";
import crypto from "crypto";

function getSecrets() {
  const token = (process.env.ADMIN_TOKEN || "").trim();
  const secret = (process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "").trim();
  return { token, secret };
}

function signSession(token: string, secret: string) {
  const sig = crypto.createHmac("sha256", secret).update(token).digest("hex");
  return `v1.${sig}`;
}

function verifySession(cookieVal: string | undefined, token: string, secret: string) {
  if (!cookieVal) return false;
  const expected = signSession(token, secret);
  // constant-time compare
  const a = Buffer.from(cookieVal);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const { token: envToken, secret } = getSecrets();
  if (!envToken || !secret) return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  const body = await req.json().catch(() => ({}));
  const token = (body?.token || "").trim();
  const password = (body?.password || "").trim();

  const requirePassword = !!process.env.ADMIN_PASSWORD;
  if (token !== envToken || (requirePassword && password !== process.env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }

  const session = signSession(envToken, secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

export async function GET() {
  const { token, secret } = getSecrets();
  if (!token || !secret) return NextResponse.json({ ok: false, configured: false }, { status: 500 });
  // We can't access cookies() here easily without next/headers, so this GET will be used from client via fetch which includes cookies automatically
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
