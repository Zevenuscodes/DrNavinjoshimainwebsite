"use client";

import { useEffect, useMemo, useState } from "react";

type StatCardProps = {
  label: string;
  value?: string; // static fallback
  endValue?: number; // when provided, animates from 0 -> endValue
  durationMs?: number;
  suffix?: string; // e.g., "+"
};

export function StatCard({ label, value, endValue, durationMs = 1200, suffix = "" }: StatCardProps) {
  const [display, setDisplay] = useState<string>(value ?? "");

  const target = useMemo(() => (typeof endValue === "number" ? endValue : undefined), [endValue]);

  useEffect(() => {
    if (typeof target !== "number") return;
    let raf = 0;
    const start = performance.now();
    const startVal = 0;
    const run = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      setDisplay(current.toLocaleString() + suffix);
      if (t < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, suffix]);

  return (
    <div className="card p-6 text-center">
      <div className="text-3xl font-semibold text-herbal-600">{display || (value ?? "")}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}
