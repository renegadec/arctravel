import { NextRequest, NextResponse } from "next/server";
import {
  sendTelegramNotification,
  sendWhatsAppNotification,
  formatBookingNotification,
} from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.name || !data.email || !data.service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const source = data.source || "Booking Form";
    const message = formatBookingNotification(data, source);

    // Send Telegram notification (if configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    let telegramSent = false;

    if (telegramToken && telegramChatId) {
      telegramSent = await sendTelegramNotification(
        telegramToken,
        telegramChatId,
        message
      );
    }

    // Send WhatsApp notification (if configured)
    const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const waToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const waTo = process.env.WHATSAPP_NOTIFY_TO;
    let whatsappSent = false;

    if (waPhoneId && waToken && waTo) {
      whatsappSent = await sendWhatsAppNotification(waPhoneId, waToken, waTo, message.replace(/<[^>]*>/g, ""));
    }

    return NextResponse.json({
      success: true,
      notifications: {
        telegram: telegramSent,
        whatsapp: whatsappSent,
      },
    });
  } catch (err) {
    console.error("Notification API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
