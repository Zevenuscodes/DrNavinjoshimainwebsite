import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import {StatCard} from "@/components/StatCard";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section">
        <Container>
          <SectionHeading
            title="Trusted Ayurvedic Care"
            subtitle="Evidence-informed, patient-centric healing"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard label="Years of Practice" value="20+" />
            <StatCard label="Patients Served" value="12,000+" />
            <StatCard label="Workshops Conducted" value="75+" />
          </div>
        </Container>
      </section>
    </>
  );
}
