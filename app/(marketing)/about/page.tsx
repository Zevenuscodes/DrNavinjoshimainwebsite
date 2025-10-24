"use client";

import Image from "next/image";
import { motion, useAnimation, Variants, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function AboutPage() {
  return (
    <section className="section space-y-20">
      {/* 🌿 Hero Bio */}
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <SectionHeading
              title="About Dr. Navin Chandra Joshi"
              subtitle="Associate Professor — Faculty of Ayurveda, Uttarakhand Ayurved University (Dehradun)"
            />
            <p className="text-gray-700 leading-relaxed">
              Dr. Navin Chandra Joshi is an Ayurvedic clinician–educator with more than two decades of
              experience in clinical care, teaching and training. His areas of expertise include
              <strong> Marma Therapy</strong>, <strong>Viddha–Agnikarma</strong>, <strong>Nadi Pariksha</strong> and
              <strong> Clinical Ayurveda</strong>. He has led numerous workshops and community health
              initiatives, and continues to integrate classical Ayurvedic wisdom with modern, preventive
              healthcare for meaningful, patient‑centred outcomes.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-soft">
            <Image
              src="/drnavinmain.jpg"
              alt="Dr. Navin Joshi"
              width={700}
              height={800}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>
      </Container>

      {/* 🌿 Journey Timeline Animation */}
      <Container>
        <SectionHeading title="Journey Through Ayurveda" />
        <JourneyTimeline />
      </Container>

      {/* 🌿 Achievements */}
      <Container>
        <SectionHeading title="Achievements & Honors" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Doctor of the Year – 2022",
            "Dhanvantari Award",
            "Ayurved Bhushan Award",
            "Uttarakhand Ratna Shri",
            "Humanitarian Excellence Award",
            "Honored by NASYA & NIMA",
          ].map((award, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="card p-6 text-center shadow-soft hover:shadow-lg transition"
            >
              <p className="font-medium text-herbal-700">{award}</p>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* 🌿 Closing Quote */}
      <Container>
        <blockquote className="text-center text-xl italic text-herbal-700 max-w-3xl mx-auto">
          “Ayurveda is not just a system of medicine, but a science of living in harmony with nature.”
        </blockquote>
        <p className="text-center text-gray-600 mt-2">— Dr. Navin Chandra Joshi</p>
      </Container>
    </section>
  );
}

/* ---------- Timeline Component ---------- */
function JourneyTimeline() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 20%"] });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const variants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,         // lighter staggering for better sync
      duration: 0.6,          // quicker to match scroll
      type: "spring",
      stiffness: 60,          // slightly snappier
      damping: 14,            // smooth end
      ease: "easeOut",
    },
  }),
};

  // merge callback ref from useInView with our own ref
  const setRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    (ref as unknown as (instance: Element | null) => void)(node);
  };

  const journey = [
    { year: "2002", title: "PG Diploma in Preventive Healthcare", text: "Apollo Hospital ERF — Hyderabad" },
    { year: "2006", title: "M.D. (Ayurveda – Kaya Chikitsa)", text: "Vikram University — Ujjain" },
    { year: "11.09.2000 – 09.03.2001", title: "House Officer", text: "State Ayurved College, Gurukul Kangri — Haridwar" },
    { year: "12.03.2001 – 14.05.2001", title: "Resident Medical Officer", text: "Sri Krishna Sewa Ashram — Rishikesh" },
    { year: "26.07.2005 – 14.08.2007", title: "Assistant Professor", text: "Uttaranchal Ayurveda College — Mussoorie Road, Dehradun" },
    { year: "16.08.2007 – 31.07.2013", title: "Medical Officer", text: "District Ayurveda & Unani Office — Pithoragarh" },
    { year: "24.08.2013 – 06.06.2016", title: "Medical Officer", text: "District Ayurveda & Unani Office — Dehradun" },
    { year: "07.06.2016 – 07.12.2016", title: "Assistant Professor", text: "Uttarakhand Ayurved University — Harrawala, Dehradun" },
    { year: "08.12.2016 – 13.04.2017", title: "Assistant Professor", text: "Uttarakhand Ayurved University — Gurukul Campus, Haridwar" },
    { year: "15.04.2017 – 13.06.2017", title: "Medical Officer", text: "District Ayurveda & Unani Office — Dehradun" },
    { year: "14.06.2017 – 15.02.2019", title: "Assistant Professor", text: "Uttarakhand Ayurved University — Main Campus, Harrawala, Dehradun" },
    { year: "16.02.2019 – Present", title: "Associate Professor", text: "Uttarakhand Ayurved University — Main Campus, Harrawala, Dehradun" },
  ];

  return (
    <div ref={setRefs} className="relative border-l-2 border-herbal-300 ml-4 pl-6 space-y-10">
      {/* animated line grow */}
      <motion.div
        style={{ originY: 0, scaleY: scrollYProgress }}
        className="absolute left-0 top-0 w-[2px] bg-herbal-500 h-full"
      />
      {journey.map((j, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="relative"
        >
          <span className="absolute -left-[14px] top-2 w-3 h-3 bg-herbal-500 rounded-full shadow-md"></span>
          <div className="bg-white/80 backdrop-blur-sm border border-herbal-100 rounded-xl p-5 shadow-soft hover:shadow-lg transition">
            <h4 className="font-semibold text-herbal-700">{j.year}</h4>
            <p className="text-gray-800">{j.title}</p>
            <p className="text-gray-600 text-sm">{j.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
