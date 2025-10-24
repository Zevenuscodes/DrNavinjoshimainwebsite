"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phone = "919411137993";
  const text = encodeURIComponent(
    "Hello Dr. Navin Joshi, I’d like to book a consultation."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full
                 bg-green-600 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-green-700"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
