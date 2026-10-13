import { FaWhatsapp } from "react-icons/fa";

export default function PaymentNote({ className = "" }: { className?: string }) {
  const phone = "919410379397";
  const text = encodeURIComponent(
    "Hello, I have paid for my consultation. Sharing the payment screenshot to confirm my appointment."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`float-note flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-herbal-900 shadow-soft transition-colors hover:bg-green-100 ${className}`}
    >
      <FaWhatsapp className="mt-0.5 shrink-0 text-2xl text-green-600" />
      <span>
        After payment, please WhatsApp your screenshot to{" "}
        <strong className="whitespace-nowrap">+91 94103 79397</strong> to confirm your appointment.
      </span>
    </a>
  );
}
