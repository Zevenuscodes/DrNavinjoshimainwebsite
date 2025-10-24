"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SocialFeedCard } from "@/components/SocialFeedCard";

export default function MediaFeed({ yt, ig, fb }: any) {
  return (
    <div className="space-y-24 py-16">
      {/* 🎥 YouTube Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Container>
          <SectionHeading
            title="Check Out Dr. Navin’s YouTube"
            subtitle="Latest talks, wellness sessions, and Ayurvedic insights"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {yt.length > 0 ? (
              yt.map((video: any, i: number) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <SocialFeedCard
                    image={video.thumb}
                    title={video.title}
                    link={video.link}
                    platform="YouTube"
                  />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No recent YouTube videos found.</p>
            )}
          </div>

          {/* 🌿 Gradient Glow Button */}
          <div className="flex justify-center mt-12">
            <a
              href="https://www.youtube.com/@ayushdarpan" // ✅ Replace with actual YouTube channel URL
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block px-8 py-3 text-lg font-semibold text-white 
                         rounded-lg transition-all duration-300 
                         bg-gradient-to-r from-[#3A7D64] to-[#2E5C4D] 
                         shadow-[0_0_15px_rgba(46,92,77,0.5)] 
                         hover:shadow-[0_0_25px_rgba(46,92,77,0.9)] 
                         hover:scale-105"
            >
              View More on YouTube →
            </a>
          </div>
        </Container>
      </motion.section>

      {/* 📸 Instagram Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Container>
          <SectionHeading
            title="From Instagram"
            subtitle="Glimpses from Dr. Navin’s Ayurvedic practice and daily life"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {ig.length > 0 ? (
              ig.map((post: any, i: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <SocialFeedCard
                    image={post.image}
                    caption={post.caption}
                    link={post.link}
                    platform="Instagram"
                  />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No recent Instagram posts found.</p>
            )}
          </div>

          {/* 🌿 Instagram Button */}
          <div className="flex justify-center mt-12">
            <a
              href="https://www.instagram.com/drnavinjoshi" // ✅ Replace with actual Instagram handle
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block px-8 py-3 text-lg font-semibold text-white 
                         rounded-lg transition-all duration-300 
                         bg-gradient-to-r from-[#3A7D64] to-[#2E5C4D] 
                         shadow-[0_0_15px_rgba(46,92,77,0.5)] 
                         hover:shadow-[0_0_25px_rgba(46,92,77,0.9)] 
                         hover:scale-105"
            >
              View More on Instagram →
            </a>
          </div>
        </Container>
      </motion.section>

      {/* 📘 Facebook Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Container>
          <SectionHeading
            title="On Facebook"
            subtitle="Updates from events, conferences, and community workshops"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {fb.length > 0 ? (
              fb.map((post: any, i: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <SocialFeedCard
                    image={post.image}
                    caption={post.text}
                    link={post.link}
                    platform="Facebook"
                  />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No recent Facebook posts found.</p>
            )}
          </div>

          {/* 🌿 Facebook Button */}
          <div className="flex justify-center mt-12">
            <a
              href="https://www.facebook.com/drnavinjoshi" // ✅ Replace with actual Facebook page URL
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block px-8 py-3 text-lg font-semibold text-white 
                         rounded-lg transition-all duration-300 
                         bg-gradient-to-r from-[#3A7D64] to-[#2E5C4D] 
                         shadow-[0_0_15px_rgba(46,92,77,0.5)] 
                         hover:shadow-[0_0_25px_rgba(46,92,77,0.9)] 
                         hover:scale-105"
            >
              View More on Facebook →
            </a>
          </div>
        </Container>
      </motion.section>
    </div>
  );
}
