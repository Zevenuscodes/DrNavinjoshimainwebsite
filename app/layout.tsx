
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dr. Navin Joshi | Ayurveda & Wellness",
  description:
    "Official website of Dr. Navin Joshi — Ayurvedic Physician offering holistic consultations, workshops, and integrative care.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const dynamic = "auto";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
