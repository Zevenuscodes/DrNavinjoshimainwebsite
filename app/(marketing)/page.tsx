
import Image from "next/image";
import Container from "@/components/Container";

export default function HomePage() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight text-[#214b3d]">
              Reviving wellness through Ayurveda
            </h1>
            <p className="mt-5 max-w-xl text-gray-700">
              Personalized treatments, lifestyle guidance, and restorative therapies blending
              classical wisdom with modern care.
            </p>
            <a href="/consultation" className="inline-block mt-8 px-6 py-3 bg-[#214b3d] text-white rounded-xl shadow-lg hover:bg-[#1a3a2f] transition">
              Book Consultation
            </a>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/drnavinmain.jpg"
                alt="Dr. Navin Joshi"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
