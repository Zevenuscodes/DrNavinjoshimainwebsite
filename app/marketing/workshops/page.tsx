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

        {/* Featured Programs Section */}
        <div className="mt-16">
          <SectionHeading title="Featured Programs" subtitle="Comprehensive learning experiences" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-herbal-800">🌿 In-Person Workshops</h3>
              <p className="text-gray-700">
                Join Dr. Navin Joshi for immersive, hands-on workshops conducted in various cities across India. 
                Experience traditional Ayurvedic practices in a modern, accessible format.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Interactive sessions with live demonstrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Small group sizes for personalized attention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Certificates of completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Networking opportunities with practitioners</span>
                </li>
              </ul>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi, I'm interested in learning about in-person workshops.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Get More Information
              </a>
            </div>

            <div className="card p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-herbal-800">💻 Online Learning</h3>
              <p className="text-gray-700">
                Access world-class Ayurvedic education from anywhere. Our online programs combine 
                recorded sessions, live Q&A, and comprehensive study materials.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Learn at your own pace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Access from any device, anywhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Lifetime access to course materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">✓</span>
                  <span>Regular updates and new content</span>
                </li>
              </ul>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent("Hi, I'm interested in online learning programs.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Explore Online Courses
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
