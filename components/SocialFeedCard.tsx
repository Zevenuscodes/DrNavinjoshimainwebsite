interface SocialFeedCardProps {
  image: string;
  title?: string;
  caption?: string; // ✅ Added this line
  link: string;
  platform?: string;
}

export default function SocialFeedCard({
  image,
  title,
  caption,
  link,
  platform,
}: SocialFeedCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <img
        src={image}
        alt={title || caption || "Post image"}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        {title && (
          <h3 className="text-base font-medium text-gray-800 line-clamp-2">
            {title}
          </h3>
        )}
        {caption && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{caption}</p>
        )}
        {platform && (
          <p className="text-xs text-gray-400 mt-2 italic">{platform}</p>
        )}
      </div>
    </a>
  );
}
