export async function fetchYouTubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.error("❌ Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID");
    return [];
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6`
    );

    const data = await res.json();

    if (!data.items) {
      console.error("⚠️ YouTube API returned no items:", data);
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails?.high?.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error("❌ Error fetching YouTube videos:", error);
    return [];
  }
}
