"use client";

import  Container from "@/components/Container";
import  SectionHeading  from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section className="section">
      <Container>
        <SectionHeading title="Contact & Clinic" subtitle="Reach out or visit the clinic" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card p-6 md:p-10 space-y-4">
            <h3 className="text-lg font-semibold">Clinic Address</h3>
            <p>Lane 4, C Block, Saraswati Vihar, Ajabpur Khurd, Dehradun</p>
            <p><span className="font-medium">Phone:</span> +91-9410379397</p>
            <p><span className="font-medium">Email:</span> ayushdarpan@gmail.com</p>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                title="Clinic Location"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  "Lane 4 C Block Saraswati Vihar Ajabpur Khurd Dehradun"
                )}&output=embed`}
              />
            </div>
          </div>
          <form
            className="card p-6 md:p-10 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const message = (e.currentTarget.querySelector('textarea') as HTMLTextAreaElement)?.value || "";
              const text = encodeURIComponent(`Hello, I'd like to get in touch.\nMessage: ${message}`);
              const phone = "919410379397";
              window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
            }}
          >
            <textarea className="input h-40" placeholder="Type your message..." required />
            <button className="btn-primary w-full" type="submit">Send Message</button>
          </form>
        </div>
      </Container>
    </section>
  );
}
