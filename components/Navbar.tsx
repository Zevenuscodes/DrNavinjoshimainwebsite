
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-[#214b3d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/20 transition transform group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.35)]">
            <Image src="/drnavinmain.jpg" alt="Dr. Navin Joshi" fill sizes="40px" className="object-cover" />
          </div>
          <span className="text-xl font-semibold tracking-wide">Dr. Navin Joshi</span>
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 hover:bg-white/10"
          onClick={() => setOpen(v => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul className="hidden md:flex space-x-7 text-base">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/marketing/about">About</Link></li>
          <li><Link href="/marketing/workshops">Workshops</Link></li>
          <li><Link href="/marketing/media">Media</Link></li>
          <li><Link href="/marketing/contact">Contact</Link></li>
          <li><Link href="/admin">Admin</Link></li>
        </ul>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <ul className="px-6 py-3 space-y-3 text-base">
            <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link href="/marketing/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="/marketing/workshops" onClick={() => setOpen(false)}>Workshops</Link></li>
            <li><Link href="/marketing/media" onClick={() => setOpen(false)}>Media</Link></li>
            <li><Link href="/marketing/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link href="/admin" onClick={() => setOpen(false)}>Admin</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
