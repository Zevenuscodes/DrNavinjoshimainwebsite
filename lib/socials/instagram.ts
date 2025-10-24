
export async function fetchInstagramPosts() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN!;
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Instagram posts");
  const data = await res.json();
  return data.data.slice(0, 3).map((p: any) => ({
    id: p.id,
    image: p.media_url,
    caption: p.caption,
    link: p.permalink,
  }));
}
