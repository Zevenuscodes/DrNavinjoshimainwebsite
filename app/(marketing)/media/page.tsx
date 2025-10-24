"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import Container from "@/components/Container";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export default function MediaFeed() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const channelId = "UC0IvFJr5lEBV0uQw0K0ZKzQ"; // fixed channel ID
        const res = await fetch(`/api/youtube?channelId=${channelId}&maxResults=3`);
        const data = await res.json();
        setVideos(Array.isArray(data?.items) ? data.items : []);
      } catch (e) {
        console.error("Failed to load videos", e);
      }
    }
    load();
  }, []);

  return (
    <section className="py-16 bg-gray-50 space-y-20">
      <Container>
        <SectionHeading
          title="Check Out Dr. Navin’s YouTube"
          subtitle="Latest talks, wellness sessions, and Ayurvedic insights"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {videos.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 text-center text-gray-600">
              No videos available right now.
            </div>
          )}
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded-t-lg w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{video.title}</h3>
                <p className="text-xs text-gray-500 mt-2">YouTube</p>
              </div>
            </a>
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

      {/* Instagram Placeholder */}
      <Container>
        <SectionHeading title="From Instagram" subtitle="Glimpses from practice and daily life" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="h-52 w-full bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/drnavinjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-herbal-700 text-white rounded-xl shadow hover:bg-herbal-900 transition"
          >
            View More on Instagram
          </a>
        </div>
      </Container>

      {/* Facebook Placeholder */}
      <Container>
        <SectionHeading title="On Facebook" subtitle="Updates from events and workshops" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="h-52 w-full bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://www.facebook.com/drnavinjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-herbal-700 text-white rounded-xl shadow hover:bg-herbal-900 transition"
          >
            View More on Facebook
          </a>
        </div>
      </Container>
    </section>
  );
}
