"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay before animation starts (in ms)
  duration?: number; // duration of animation
  ease?: string; // gsap ease string
  splitType?: "chars" | "words"; // split by characters or words
  from?: Record<string, any>; // gsap from config
  to?: Record<string, any>; // gsap to config
  triggerOnScroll?: boolean; // scroll-based animation trigger
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  triggerOnScroll = false,
  onLetterAnimationComplete,
}) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll("span");

    const animation = gsap.fromTo(
      chars,
      from,
      {
        ...to,
        delay: delay / 1000,
        duration,
        ease,
        stagger: 0.05,
        onComplete: onLetterAnimationComplete,
        scrollTrigger: triggerOnScroll
          ? {
              trigger: textRef.current,
              start: "top 85%", // when the text comes into view
              toggleActions: "play none none none",
            }
          : undefined,
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay, duration, ease, from, to, triggerOnScroll, onLetterAnimationComplete]);

  // Split the text based on props
  const splitText = (txt: string) =>
    splitType === "words"
      ? txt.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-1">
            {word}&nbsp;
          </span>
        ))
      : txt.split("").map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            {char === " " ? "\u00A0" : char}
          </span>
        ));

  return (
    <div ref={textRef} className={`inline-block ${className}`}>
      {splitText(text)}
    </div>
  );
};

export default SplitText;
