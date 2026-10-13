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
      className={`float-note flex items-center gap-3 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 shadow-soft transition-colors hover:bg-red-100 ${className}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow">
        <FaWhatsapp className="text-2xl" />
      </span>
      <span>
        Please WhatsApp your payment screenshot to{" "}
        <strong className="whitespace-nowrap">+91 94103 79397</strong> to confirm your appointment.
      </span>
    </a>
  );
}
