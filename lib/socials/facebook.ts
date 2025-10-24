
export async function fetchFacebookPosts() {
  const pageId = process.env.FACEBOOK_PAGE_ID!;
  const token = process.env.FACEBOOK_ACCESS_TOKEN!;
  const url = `https://graph.facebook.com/${pageId}/posts?fields=message,permalink_url,full_picture&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Facebook posts");
  const data = await res.json();
  return data.data.slice(0, 3).map((p: any) => ({
    id: p.id,
    image: p.full_picture,
    text: p.message,
    link: p.permalink_url,
  }));
}
