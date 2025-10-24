import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

function normalize(s?: string) { return (s || "").trim(); }
function signSession(token: string, secret: string) {
  return `v1.${crypto.createHmac("sha256", secret).update(token).digest("hex")}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(()=>({}));
    const token = normalize(body?.token);
    const password = normalize(body?.password);

    const envToken = normalize(process.env.ADMIN_TOKEN);
    const envPass = normalize(process.env.ADMIN_PASSWORD || "");
    const secret = normalize(process.env.ADMIN_SESSION_SECRET || envPass);
    if (!envToken || !secret) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const cookie = cookies().get("admin_session")?.value;
    if (!token && cookie) {
      const valid = cookie === signSession(envToken, secret);
      return valid ? NextResponse.json({ session: cookie }) : NextResponse.json({ error: "Invalid" }, { status: 401 });
    }

    const tokenOk = token === envToken;
    const passOk = envPass ? password === envPass : true;
    if (!tokenOk || !passOk) return NextResponse.json({ error: "Invalid" }, { status: 401 });

    const session = signSession(envToken, secret);
    return NextResponse.json({ session });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
