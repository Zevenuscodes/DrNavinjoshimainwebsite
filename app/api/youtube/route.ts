import { NextResponse } from "next/server";

const API = "https://www.googleapis.com/youtube/v3";

async function getJson(url: string) {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  return res.json();
}

function parseRss(xml: string) {
  const items: { id: string; title: string; thumbnail: string; url: string }[] = [];
  const entries = xml.split("<entry>").slice(1);
  for (const raw of entries) {
    const videoId = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(raw)?.[1];
    const title = /<title>([^<]+)<\/title>/.exec(raw)?.[1];
    const thumb = /<media:thumbnail\s+url=\"([^\"]+)\"/.exec(raw)?.[1];
    if (videoId && title) {
      items.push({
        id: videoId,
        title,
        thumbnail: thumb || `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  }
  return items;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const maxResults = Number(searchParams.get("maxResults") ?? 6);
    const channelIdParam = searchParams.get("channelId");

    const apiKey = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YT_API_KEY;
    const channelId = channelIdParam || process.env.NEXT_PUBLIC_YT_CHANNEL_ID || "UC0IvFJr5lEBV0uQw0K0ZKzQ";

    let items: any[] = [];

    if (apiKey) {
      try {
        // Try search API first
        const searchUrl = `${API}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;
        const data = await getJson(searchUrl);
        items = Array.isArray(data?.items) ? data.items : [];
      } catch {}

      if (!items.length) {
        try {
          // Fallback to uploads playlist
          const ch = await getJson(`${API}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`);
          const uploadsId = ch?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
          if (uploadsId) {
            const pl = await getJson(`${API}/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=${maxResults}&key=${apiKey}`);
            items = Array.isArray(pl?.items)
              ? pl.items.map((it: any) => ({ id: { videoId: it?.snippet?.resourceId?.videoId }, snippet: it?.snippet }))
              : [];
          }
        } catch {}
      }

      if (items.length) {
        const normalized = items
          .filter((i: any) => i?.id?.videoId && i?.snippet)
          .map((i: any) => ({
            id: i.id.videoId,
            title: i.snippet.title,
            thumbnail: i.snippet.thumbnails?.medium?.url || i.snippet.thumbnails?.default?.url,
            url: `https://www.youtube.com/watch?v=${i.id.videoId}`,
          }));
        if (normalized.length) return NextResponse.json({ items: normalized.slice(0, maxResults) });
      }
    }

    // Final fallback: RSS (no API key needed)
    const rssRes = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, { next: { revalidate: 300 } });
    if (rssRes.ok) {
      const xml = await rssRes.text();
      const rssItems = parseRss(xml).slice(0, maxResults);
      return NextResponse.json({ items: rssItems });
    }

    return NextResponse.json({ items: [] });
  } catch (e) {
    console.error("GET /api/youtube error", e);
    return NextResponse.json({ items: [] });
  }
}
