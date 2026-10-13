// Emails the clinic when a booking form is submitted, with any uploaded reports attached.
// Sends over SMTP (Gmail by default). Silently skipped when not configured.
import nodemailer from "nodemailer";

const DEFAULT_NOTIFY_TO = "nchjoshi@gmail.com"; // clinic email (same as the contact page)

export type BookingEmail = {
  name: string;
  phone: string;
  email: string;
  mode: string;
  date: string;
  time: string;
  notes: string;
  attachments?: { filename: string; content: Buffer }[];
};

function escapeHtml(s: string) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function sendBookingEmail(booking: BookingEmail): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.warn("Booking email skipped: SMTP_USER / SMTP_PASS not set");
    return false;
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 8000,
    socketTimeout: 8000,
  });

  const rows: [string, string][] = [
    ["Name", booking.name],
    ["Phone", booking.phone],
    ["Email", booking.email],
    ["Mode", booking.mode],
    ["Date", booking.date],
    ["Time", booking.time],
    ["Notes", booking.notes],
  ];
  const clean = (v: string) => (v || "").trim() || "-";

  try {
    await transporter.sendMail({
      from: `"Dr. Navin Joshi Website" <${user}>`,
      to: process.env.BOOKING_NOTIFY_EMAIL || DEFAULT_NOTIFY_TO,
      replyTo: /^\S+@\S+\.\S+$/.test(booking.email) ? booking.email : undefined,
      subject: `New appointment booking: ${booking.name.replace(/\s+/g, " ").trim()} (${clean(booking.date)} ${clean(booking.time)})`,
      text: rows.map(([k, v]) => `${k}: ${clean(v)}`).join("\n"),
      html:
        `<h2>New appointment booking</h2><table cellpadding="6" style="border-collapse:collapse">` +
        rows
          .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td style="white-space:pre-wrap">${escapeHtml(clean(v))}</td></tr>`)
          .join("") +
        `</table>`,
      attachments: booking.attachments,
    });
    return true;
  } catch (e) {
    console.error("Booking email error", e);
    return false;
  }
}
