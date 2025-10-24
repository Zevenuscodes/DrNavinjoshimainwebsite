/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com", // ✅ YouTube thumbnails
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com", // Instagram CDN
      },
      {
        protocol: "https",
        hostname: "scontent.xx.fbcdn.net", // Facebook CDN
      },
    ],
  },
};

export default nextConfig;
