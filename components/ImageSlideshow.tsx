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

// Get all available slideshow images
function getAllSlideshowImages() {
  return [
    { src: "/drnavinmain.jpg", alt: "Dr. Navin Joshi" },
    { src: "/pic2.jpg", alt: "Clinic photo" },
    { src: "/pic3.jpg", alt: "Workshop photo" },
    { src: "/148d9997-d72b-4762-9382-0d8f8594ea51.jpeg", alt: "Ayurvedic practice" },
    { src: "/488e5be4-9b06-4d25-b53c-d63e8015b074.jpeg", alt: "Ayurvedic therapy" },
    { src: "/526a33cd-90a7-4627-a0ac-15f35dfc3f0c.jpeg", alt: "Wellness session" },
    { src: "/5f222d16-20fc-45e8-ae97-7e92f42b9f18.jpeg", alt: "Clinical practice" },
    { src: "/7520284d-7aab-4eb1-bdf5-2884460bbde0.jpeg", alt: "Ayurvedic consultation" },
    { src: "/84e55def-4984-418a-acd8-0b8fbe96c4a2.jpeg", alt: "Traditional healing" },
    { src: "/b33ea471-4713-44ec-86ca-af9d416c1765.jpeg", alt: "Ayurvedic treatment" },
    { src: "/ebd6d538-5a68-4b01-91f5-ef4db8faafc1.jpeg", alt: "Holistic wellness" },
  ];
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
            setFirestoreImages(getAllSlideshowImages());
          }
        })
        .catch(() => {
          // Fallback on error
          setFirestoreImages(getAllSlideshowImages());
        });
    }
  }, [useFirestore, images]);

  const slides = useMemo(() => {
    if (images) return images;
    if (firestoreImages) return firestoreImages;
    // Default fallback
    return getAllSlideshowImages();
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
