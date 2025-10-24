export function EventCard({
  title,
  date,
  location,
  ctaHref,
  ctaText = "Details",
}: {
  title: string;
  date: string;
  location: string;
  ctaHref?: string;
  ctaText?: string;
}) {
  return (
    <div className="card p-6 space-y-2">
      <div className="text-sm text-gray-500">
        {date} • {location}
      </div>
      <div className="text-lg md:text-xl font-bold text-gray-900">{title}</div>
      {ctaHref && (
        <a className="btn-primary mt-3 inline-block" href={ctaHref} target="_blank" rel="noopener noreferrer">
          {ctaText}
        </a>
      )}
    </div>
  );
}
