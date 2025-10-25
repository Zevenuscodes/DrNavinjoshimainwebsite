import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ImageSlideshow from "@/components/ImageSlideshow";
import { EventCard } from "@/components/EventCard";

export default function Workshops() {
  const phone = "919410379397"; // WhatsApp target
  const buildWa = (course: string) => `https://wa.me/${phone}?text=${encodeURIComponent(`Hi, I wanted to enquire about the ${course} course.`)}`;

  return (
    <section className="section">
      <Container>
        <SectionHeading title="Workshops & Conferences" subtitle="Learning journeys led by Dr. Joshi" />
        <div className="grid gap-6 md:grid-cols-3">
          <EventCard
            title="Viddhagni Karma"
            date="Upcoming"
            location="Dehradun / Online"
            ctaHref={buildWa("Viddhagni Karma")}
            ctaText="Enroll Now"
          />
          <EventCard
            title="7-Day Ayurveda"
            date="Upcoming"
            location="Dehradun / Online"
            ctaHref={buildWa("7-Day Ayurveda")}
            ctaText="Enroll Now"
          />
          <EventCard
            title="Clinical Panchakarma"
            date="Upcoming"
            location="Dehradun / Online"
            ctaHref={buildWa("Clinical Panchakarma")}
            ctaText="Enroll Now"
          />
          <EventCard
            title="Marma and Nadi Pariksha"
            date="Upcoming"
            location="Dehradun / Online"
            ctaHref={buildWa("Marma and Nadi Pariksha")}
            ctaText="Enroll Now"
          />
        </div>

        {/* Offline Workshops Section */}
        <div className="mt-16">
          <SectionHeading title="Offline Workshops" subtitle="In-person learning and hands-on practice" />
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Slideshow of brochure images */}
            <div className="card overflow-hidden p-4">
              <ImageSlideshow
                images={[
                  { src: "/BLR1.jpg", alt: "Bengaluru Workshop - Image 1" },
                  { src: "/BLR 2.jpg", alt: "Bengaluru Workshop - Image 2" },
                  { src: "/BLR 3.jpg", alt: "Bengaluru Workshop - Image 3" },
                ]}
                width={4}
                height={5}
                roundedClassName="rounded-xl"
              />
              <div className="mt-4">
                <a
                  href="https://forms.gle/k5QCrEDCuRR2RAyp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Enroll Now
                </a>
              </div>
            </div>

            {/* Interactive Message */}
            <div className="card p-6 space-y-4">
              <h3 className="text-xl font-semibold">🌿✨ International Conference on Ayurveda – Bengaluru 2025! ✨🌿</h3>

              <ul className="space-y-2 text-gray-800">
                <li>📅 <strong>8th & 9th November 2025</strong></li>
                <li>📍 Green Path Organic Restaurant, Rajeev Gandhi Circle, Malleshwara, Bengaluru</li>
              </ul>

              {/* Bullet list + floating QR side-by-side */}
              <div className="md:flex md:items-start md:gap-6">
                <ul className="flex-1 space-y-2 text-gray-800">
                  <li className="pt-2">💫 Join <strong>Renowned Ayurvedacharya, researcher and academician</strong> with vast clinical experience — in an exclusive, hands-on & knowledge-rich conference on:</li>
                  <li className="pl-4">🔸 Marma Therapy</li>
                  <li className="pl-4">🔸 Viddha–Agnikarma</li>
                  <li className="pl-4">🔸 Nadi Pariksha</li>
                  <li className="pl-4">🔸 Clinical Ayurveda</li>
                </ul>
                <a
                  href="https://forms.gle/k5QCrEDCuRR2RAyp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:mt-0 shrink-0 bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg border inline-block md:sticky md:top-4"
                  aria-label="Scan to Register"
                >
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent('https://forms.gle/k5QCrEDCuRR2RAyp9')}`}
                    alt="Register QR Code"
                    width={140}
                    height={140}
                    className="rounded"
                  />
                </a>
              </div>

              <ul className="space-y-2 text-gray-800">
                <li className="pt-2">🎯 Learn • Experience • Elevate your Ayurvedic Practice!</li>
                <li>⚡ <strong>Limited Seats! Registration closing soon!</strong></li>
                <li>📞 Call / WhatsApp: <strong>+91 9410379397</strong></li>
                <li>🔗 Register Now: <a className="text-herbal-700 underline" href="https://forms.gle/k5QCrEDCuRR2RAyp9" target="_blank" rel="noopener noreferrer">forms.gle/k5QCrEDCuRR2RAyp9</a></li>
                <li>📲 Or simply <strong>SCAN the QR CODE</strong> to register instantly!</li>
                <li>🌸 Organized by Ayush Darpan Foundation & Himayu Care</li>
                <li>🌿 Spreading Health Awareness Across the Globe 🌿</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
