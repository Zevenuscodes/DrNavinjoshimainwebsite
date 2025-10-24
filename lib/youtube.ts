
const API = "https://www.googleapis.com/youtube/v3";

async function getJson(url: string) {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  return res.json();
}

export async function resolveChannelId(apiKey: string, handle?: string) {
  if (!handle) return null;
  const clean = handle.replace(/^@/, "");
  const url = `${API}/channels?part=id&forHandle=${encodeURIComponent(clean)}&key=${apiKey}`;
  const data = await getJson(url);
  return data.items?.[0]?.id ?? null;
}

export async function fetchLatestVideos(apiKey: string, channelId: string, maxResults = 6) {
  const url = `${API}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;
  const data = await getJson(url);
  return (data.items ?? []).map((i: any) => ({
    id: i.id.videoId,
    title: i.snippet.title,
    thumb: i.snippet.thumbnails?.high?.url || i.snippet.thumbnails?.medium?.url,
    url: `https://www.youtube.com/watch?v=${i.id.videoId}`,
    channelTitle: i.snippet.channelTitle
  }));
}
