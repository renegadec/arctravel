import { NextRequest, NextResponse } from "next/server";
import {
  sendTelegramNotification,
  sendWhatsAppNotification,
} from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const email: string = data.email;
    const message = `📰 <b>New newsletter subscriber</b>\n\nEmail: ${email}\nSource: ${data.source || "Blog"}`;

    // Send Telegram notification (if configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    let sent = false;

    if (telegramToken && telegramChatId) {
      sent =
        (await sendTelegramNotification(telegramToken, telegramChatId, message)) ||
        sent;
    }

    // Send WhatsApp notification (if configured)
    const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const waToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const waTo = process.env.WHATSAPP_NOTIFY_TO;
    if (waPhoneId && waToken && waTo) {
      sent =
        (await sendWhatsAppNotification(
          waPhoneId,
          waToken,
          waTo,
          message.replace(/<[^>]+>/g, "")
        )) || sent;
    }

    if (!sent) {
      // No channels configured — still respond OK so the UI works,
      // but log so it's noticeable in dev.
      console.warn("Newsletter signup received but no notification channels configured:", email);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Failed to save signup" }, { status: 500 });
  }
}
