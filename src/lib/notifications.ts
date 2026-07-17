// Notification utility for Telegram & WhatsApp
// Telegram: simple HTTP POST to their API
// WhatsApp Cloud API: Meta's official API (free tier available)

export async function sendTelegramNotification(
  botToken: string,
  chatId: string,
  message: string
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );
    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram send failed:", body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Telegram notification error:", err);
    return false;
  }
}

export async function sendWhatsAppNotification(
  phoneNumberId: string,
  accessToken: string,
  to: string,
  body: string
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body },
        }),
      }
    );
    if (!res.ok) {
      const responseBody = await res.text();
      console.error("WhatsApp send failed:", responseBody);
      return false;
    }
    return true;
  } catch (err) {
    console.error("WhatsApp notification error:", err);
    return false;
  }
}

export function formatBookingNotification(
  data: Record<string, string>,
  source: string = "Booking Form"
): string {
  const header = source === "Chatbot" ? "💬 <b>NEW CHAT LEAD</b>" : "🛎 <b>NEW BOOKING REQUEST</b>";
  const lines = [
    "━━━━━━━━━━━━━━━━",
    header,
    `📡 <b>Source:</b> ${source}`,
    "━━━━━━━━━━━━━━━━",
    `👤 <b>Name:</b> ${data.name || "—"}`,
    `📧 <b>Email:</b> ${data.email || "—"}`,
    `📞 <b>Phone:</b> ${data.phone || "—"}`,
    "",
    `📋 <b>Service:</b> ${data.service || "—"}`,
    `📍 <b>Destination:</b> ${data.destination || "—"}`,
    `📅 <b>Date:</b> ${data.departureDate || "—"}`,
    data.returnDate ? `↩️ <b>Return:</b> ${data.returnDate}` : "",
    `👥 <b>Travellers:</b> ${data.travellers || "—"}`,
    `💰 <b>Budget:</b> ${data.budget || "—"}`,
    data.notes ? `\n📝 <b>Notes:</b> ${data.notes}` : "",
    "━━━━━━━━━━━━━━━━",
  ]
    .filter(Boolean)
    .join("\n");

  return lines;
}
