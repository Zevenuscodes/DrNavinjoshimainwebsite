const IG = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const FB = process.env.NEXT_PUBLIC_FACEBOOK_URL;
const YT = process.env.NEXT_PUBLIC_YOUTUBE_URL;

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {IG && <a className="btn-ghost" href={IG} target="_blank" rel="noreferrer">Instagram</a>}
      {FB && <a className="btn-ghost" href={FB} target="_blank" rel="noreferrer">Facebook</a>}
      {YT && <a className="btn-ghost" href={YT} target="_blank" rel="noreferrer">YouTube</a>}
    </div>
  );
}
