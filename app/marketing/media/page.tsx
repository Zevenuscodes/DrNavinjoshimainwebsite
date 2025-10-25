"use client";

import SectionHeading from "@/components/SectionHeading";
import Container from "@/components/Container";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type VideoCard = { id: string; url: string; title?: string; thumb?: string };

export default function MediaFeed() {
  const [videos, setVideos] = useState<VideoCard[]>([
    { id: "RpErga7GF78", url: "https://youtu.be/RpErga7GF78?si=cEY_j4rNPEh_4YPa" },
    { id: "TYtD04xWbOg", url: "https://youtu.be/TYtD04xWbOg?si=WJj0D_a7BQfap8A3" },
    { id: "WZ6PUT58ljQ", url: "https://youtu.be/WZ6PUT58ljQ?si=WL9R1T_R9TpEGGYK" },
  ]);

  useEffect(() => {
    async function loadTitles() {
      try {
        const updated = await Promise.all(
          videos.map(async (v) => {
            try {
              const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(v.url)}&format=json`;
              const res = await fetch(oembedUrl);
              if (!res.ok) throw new Error("oEmbed failed");
              const data = await res.json();
              return { ...v, title: data?.title as string, thumb: (data?.thumbnail_url as string) || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` };
            } catch {
              return { ...v, title: "Watch on YouTube", thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` };
            }
          })
        );
        setVideos(updated);
      } catch {}
    }
    loadTitles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-16 bg-gray-50 space-y-20">
      <Container>
        <SectionHeading
          title="Watch Dr. Navin on YouTube"
          subtitle="Latest talks, wellness sessions, and Ayurvedic insights"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {videos.map((v, i) => (
            <motion.a
              key={`${v.id}-${i}`}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition block overflow-hidden"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.015 }}
            >
              <div className="relative">
                <img
                  src={v.thumb || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title || "YouTube video"}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{v.title || "Watch on YouTube"}</h3>
                <p className="text-xs text-gray-500 mt-1">YouTube</p>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://www.youtube.com/@ayushdarpan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-herbal-700 text-white rounded-xl shadow hover:bg-herbal-900 transition"
          >
            View More on YouTube
          </a>
        </div>
      </Container>

      {/* Follow us CTA */}
      <Container>
        <SectionHeading title="Follow Us" subtitle="Stay connected on social media" />
        <div className="flex items-center justify-center gap-6 mt-2">
          <a
            href="https://www.instagram.com/drnavinjoshi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group inline-flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow hover:shadow-lg hover:scale-105 transition"
          >
            <img src="/instagram.svg" alt="" className="h-7 w-7 group-hover:opacity-90" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/drnavinjoshi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group inline-flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow hover:shadow-lg hover:scale-105 transition"
          >
            <img src="/facebook.svg" alt="" className="h-7 w-7 group-hover:opacity-90" />
            <span className="sr-only">Facebook</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
