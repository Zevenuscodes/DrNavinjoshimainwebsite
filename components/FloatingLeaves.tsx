"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Leaf = { src: string; size: number; left: string };

const leaves: Leaf[] = [
  { src: "/leaves/leaf1.png", size: 80, left: "10%" },
  { src: "/leaves/leaf2.png", size: 100, left: "50%" },
  { src: "/leaves/leaf3.png", size: 70, left: "80%" },
];

export default function FloatingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: leaf.left, top: "-10%" }}
          animate={{
            y: ["0%", "110%"],
            rotate: [0, 360],
            x: [0, i % 2 === 0 ? 20 : -20],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={leaf.src}
            alt={`leaf-${i}`}
            width={leaf.size}
            height={leaf.size}
          />
        </motion.div>
      ))}
    </div>
  );
}
