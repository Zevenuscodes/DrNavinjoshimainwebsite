import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function parseMeta(html: string) {
  const metas: Record<string, string> = {};
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  for (const tag of tags) {
    const prop = /(?:property|name)=["']([^"']+)["']/i.exec(tag)?.[1];
    const content = /content=["']([^"']+)["']/i.exec(tag)?.[1];
    if (prop && content) metas[prop.toLowerCase()] = content;
  }
  return metas;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get("url");
    if (!target) return NextResponse.json({ error: "Missing url" }, { status: 400 });

    const res = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });
    if (!res.ok) return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
    const html = await res.text();

    const meta = parseMeta(html);
    const title = meta["og:title"] || meta["twitter:title"] || null;
    const image = meta["og:image"] || meta["twitter:image"] || null;

    return NextResponse.json({ title, image });
  } catch (e) {
    console.error("GET /api/og error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
