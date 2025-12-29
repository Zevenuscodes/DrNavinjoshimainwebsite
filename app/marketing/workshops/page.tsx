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
          <div className="card p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="text-lg text-herbal-700">🌿 Ayush Darpan Foundation®️ & Himayu Care®️ Present 🌿</p>
              <h3 className="text-3xl font-bold text-herbal-900">🎓 12th Two-Day Residential Workshop</h3>
              <p className="text-gray-700 italic">🪔 A rare opportunity to learn under the guidance of Ayurveda masters</p>
            </div>

            <div className="border-t border-b border-herbal-200 py-4">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">📅 Dates</p>
                  <p className="font-semibold text-herbal-800">7–8 February 2026</p>
                  <p className="text-sm text-gray-600">(Saturday–Sunday)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">📍 Venue</p>
                  <p className="font-semibold text-herbal-800">Ayush Darpan Foundation Trust Office</p>
                  <p className="text-sm text-gray-600">Dehradun</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">👥 Participant Limit</p>
                  <p className="font-semibold text-herbal-800">50</p>
                </div>
              </div>
            </div>

            {/* Workshop Topics */}
            <div>
              <h4 className="text-xl font-semibold text-herbal-900 mb-3">📌 Workshop Topics</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">☘️</span>
                  <span>Nadi Vidya (Pulse Diagnosis)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">☘️</span>
                  <span>Marma Therapy</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">☘️</span>
                  <span>Clinical Ayurveda</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-herbal-600 mt-1">☘️</span>
                  <span>Para-surgical Procedures – Viddha Karma, Agni Karma, Raktamokshana, Jalaukavacharana</span>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h4 className="text-xl font-semibold text-herbal-900 mb-4">🗓️ Schedule</h4>
              <div className="space-y-4">
                <div className="bg-herbal-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-herbal-700">📍</span>
                    <h5 className="font-semibold text-herbal-900">7 February 2026 (Saturday)</h5>
                  </div>
                  <p className="text-gray-700 mb-2">🕘 <strong>9:00 AM – 5:00 PM</strong></p>
                  <p className="text-gray-700">➡️ Practical training in Marma Therapy, Clinical Ayurveda, and Para-surgical procedures – Viddha Karma, Agni Karma, Raktamokshana</p>
                </div>
                <div className="bg-herbal-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-herbal-700">📍</span>
                    <h5 className="font-semibold text-herbal-900">8 February 2026 (Sunday)</h5>
                  </div>
                  <p className="text-gray-700 mb-2">🕚 <strong>7:00 AM – 5:00 PM</strong></p>
                  <p className="text-gray-700 mb-1">➡️ Hands-on training in Nadi Pariksha (Pulse Diagnosis), Marma Therapy, Clinical Ayurveda & Para-surgical procedures</p>
                  <p className="text-gray-700">➡️ Special early-morning Nadi Pariksha practice session on an empty stomach</p>
                </div>
              </div>
            </div>

            {/* Registration Fees */}
            <div>
              <h4 className="text-xl font-semibold text-herbal-900 mb-3">💰 Registration Fees</h4>
              <div className="space-y-2 bg-white p-4 rounded-lg border border-herbal-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">🎯 Nadi + Marma Therapy (for those who have completed the online course):</span>
                  <span className="font-semibold text-herbal-800">₹2,999/-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">🎯 Only Nadi or Marma (for those who have completed the online course):</span>
                  <span className="font-semibold text-herbal-800">₹3,999/-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">🎯 Direct participation without any online course:</span>
                  <span className="font-semibold text-herbal-800">₹5,999/-</span>
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div>
              <h4 className="text-xl font-semibold text-herbal-900 mb-3">☕ Inclusions</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Morning tea & breakfast</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Lunch</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Evening tea</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Accommodation and travel are to be arranged by participants themselves</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">📜 Certificates will be provided after the workshop</p>
                <p className="text-gray-700">🚫 No unregistered persons will be allowed to attend</p>
              </div>
            </div>

            {/* Registration CTA */}
            <div className="bg-gradient-to-r from-herbal-600 to-herbal-700 text-white p-6 rounded-lg text-center space-y-4">
              <h4 className="text-2xl font-bold">📝 Register Now</h4>
              <p className="text-herbal-100">Fill out the Google Form to secure your spot</p>
              <a
                href="https://forms.gle/Tajq9UzfnP6KcTrm9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-herbal-700 px-8 py-3 rounded-lg font-semibold hover:bg-herbal-50 transition-colors shadow-lg"
              >
                👉 Register Here
              </a>
              <p className="text-herbal-100 text-sm">📞 Contact: <strong>09410379397</strong></p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
