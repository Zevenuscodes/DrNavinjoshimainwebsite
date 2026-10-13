// Sends a WhatsApp alert to the clinic's number when a booking form is submitted.
// Uses the Meta WhatsApp Cloud API with a pre-approved template (required for
// business-initiated messages). Silently skipped when not configured.

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v24.0";
const DEFAULT_NOTIFY_TO = "919411137993"; // clinic WhatsApp (same as the site chat button)

export type BookingAlert = {
  name: string;
  phone: string;
  email: string;
  mode: string;
  date: string;
  time: string;
  notes: string;
};

// Template variables may not be empty or contain newlines, tabs or long runs of spaces.
function param(value: string) {
  const text = (value || "").replace(/\s+/g, " ").trim().slice(0, 500);
  return { type: "text", text: text || "-" };
}

export async function sendBookingWhatsApp(booking: BookingAlert): Promise<boolean> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    console.warn("WhatsApp booking alert skipped: WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID not set");
    return false;
  }

  const template = process.env.WHATSAPP_TEMPLATE_NAME || "new_booking_alert";
  const language = process.env.WHATSAPP_TEMPLATE_LANG || "en";
  const recipients = (process.env.WHATSAPP_NOTIFY_TO || DEFAULT_NOTIFY_TO)
    .split(",")
    .map((n) => n.replace(/\D/g, ""))
    .filter(Boolean);

  const parameters = [
    param(booking.name),
    param(booking.phone),
    param(booking.email),
    param(booking.mode),
    param(booking.date),
    param(booking.time),
    param(booking.notes),
  ];

  const results = await Promise.all(
    recipients.map(async (to) => {
      try {
        const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            type: "template",
            template: {
              name: template,
              language: { code: language },
              components: [{ type: "body", parameters }],
            },
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) {
          console.error("WhatsApp booking alert failed", res.status, await res.text());
          return false;
        }
        return true;
      } catch (e) {
        console.error("WhatsApp booking alert error", e);
        return false;
      }
    })
  );

  return results.length > 0 && results.every(Boolean);
}
