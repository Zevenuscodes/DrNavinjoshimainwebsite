'use client';
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { BookingForm } from "@/components/BookingForm";

export default function Consultation() {
  return (
    <section className="section">
      <Container>
        <SectionHeading title="Consultation Booking" subtitle="Online or In-Clinic sessions" />
        <div className="card p-6 md:p-10">
          <BookingForm />
        </div>
      </Container>
    </section>
  );
}
