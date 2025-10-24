"use client";

import Container from "@/components/Container";
import ImageSlideshow from "@/components/ImageSlideshow";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-cream to-herbal-50 border-b border-herbal-100 overflow-x-hidden">
      <Container>
        <div className="py-16 md:py-24 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <span className="badge">Ayurvedic Physician</span>
            <h1 className="text-5xl font-serif font-semibold text-herbal-900 leading-tight">
              Reviving wellness through Ayurveda
            </h1>
            <p className="mt-5 text-gray-700">
              Personalized treatments, lifestyle guidance, and restorative therapies blending
              classical wisdom with modern care.
            </p>
            <a
              href="/consultation"
              className="inline-block mt-8 px-6 py-3 bg-herbal-700 text-white rounded-xl shadow hover:bg-herbal-900 transition"
            >
              Book Consultation
            </a>
          </div>

          <div className="relative w-full max-w-[720px] ml-auto">
            <ImageSlideshow width={4} height={3} roundedClassName="rounded-2xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
