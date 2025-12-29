"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSlideshowProps {
  images?: { src: string; alt: string }[];
  intervalMs?: number;
  width?: number; // used only to compute aspect ratio
  height?: number; // used only to compute aspect ratio
  roundedClassName?: string;
  fit?: "cover" | "contain";
  useFirestore?: boolean; // If true, fetch images from Firestore
}

export default function ImageSlideshow({
  images,
  intervalMs = 3000,
  width = 4,
  height = 3,
  roundedClassName = "rounded-2xl",
  fit = "cover",
  useFirestore = false,
}: ImageSlideshowProps) {
  const [firestoreImages, setFirestoreImages] = useState<{ src: string; alt: string }[] | null>(null);
  
  // Fetch from API if useFirestore is true
  useEffect(() => {
    if (useFirestore && !images) {
      fetch("/api/homepage")
        .then((res) => res.json())
        .then((data) => {
          if (data.content?.slideshowImages && data.content.slideshowImages.length > 0) {
            setFirestoreImages(data.content.slideshowImages);
          } else {
            // Fallback to default images
            setFirestoreImages([
              { src: "/drnavinmain.jpg", alt: "Dr. Navin Joshi" },
              { src: "/pic2.jpg", alt: "Clinic photo" },
              { src: "/pic3.jpg", alt: "Workshop photo" },
            ]);
          }
        })
        .catch(() => {
          // Fallback on error
          setFirestoreImages([
            { src: "/drnavinmain.jpg", alt: "Dr. Navin Joshi" },
            { src: "/pic2.jpg", alt: "Clinic photo" },
            { src: "/pic3.jpg", alt: "Workshop photo" },
          ]);
        });
    }
  }, [useFirestore, images]);
  
  const slides = useMemo(() => {
    if (images) return images;
    if (firestoreImages) return firestoreImages;
    // Default fallback
    return [
      { src: "/drnavinmain.jpg", alt: "Dr. Navin Joshi" },
      { src: "/pic2.jpg", alt: "Clinic photo" },
      { src: "/pic3.jpg", alt: "Workshop photo" },
    ];
  }, [images, firestoreImages]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div
      className={`relative w-full overflow-hidden ${roundedClassName} shadow-lg`}
    >
      {/* Aspect ratio sizer to ensure height in all browsers */}
      <div aria-hidden="true" style={{ paddingTop: `${(height / width) * 100}%` }} />
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].src}
          initial={{ opacity: 0.0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
            className={fit === "contain" ? "object-contain" : "object-cover"}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full transition-all ${i === index ? "bg-white/90" : "bg-white/40"}`}
            />)
          )}
        </div>
      )}
    </div>
  );
}
