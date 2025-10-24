
"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#214b3d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/20 transition transform group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.35)]">
            <Image src="/drnavinmain.jpg" alt="Dr. Navin Joshi" fill sizes="40px" className="object-cover" />
          </div>
          <span className="text-xl font-semibold tracking-wide">Dr. Navin Joshi</span>
        </Link>
        <ul className="flex space-x-7 text-base">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/workshops">Workshops</Link></li>
          <li><Link href="/media">Media</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}
