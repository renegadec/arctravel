// Telegram webhook for the invoice bot.
// Set the bot webhook to  https://<site>/api/telegram/webhook  (see INVOICE_BOT.md)
// Recommended: configure TELEGRAM_WEBHOOK_SECRET and pass it to setWebhook.

import {
  executeDraft,
  extractInvoiceDraft,
  formatDraftSummary,
  storeDraft,
  takeDraft,
} from "@/lib/invoice-agent";
import {
  sendTelegramDocument,
  sendTelegramMessage,
  telegramBotToken,
} from "@/lib/telegram";

function isAllowedChat(chatId: number): boolean {
  const explicit = process.env.INVOICE_ALLOWED_CHAT_IDS;
  const fallback = process.env.TELEGRAM_CHAT_ID;
  const allowed = (explicit || fallback || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return allowed.includes(String(chatId));
}

function helpText(): string {
  return [
    "🧾 <b>Arc Travel &amp; Tours — Invoice Bot</b>",
    "",
    "Send me an instruction like:",
    "  “Invoice Tendai US$150 for the Victoria Falls weekend deposit”",
    "  “Invoice Rachel K — $45/day car hire, 3 days”",
    "",
    "I'll draft the invoice, you reply <b>YES</b> to create it in Zoho, and I'll send the PDF here.",
  ].join("\n");
}

export async function POST(request: Request) {
  // Optional secret-token protection (recommended when the webhook is public).
  const secret = request.headers.get("x-telegram-bot-api-secret-token");
  if (
    process.env.TELEGRAM_WEBHOOK_SECRET &&
    secret !== process.env.TELEGRAM_WEBHOOK_SECRET
  ) {
    return new Response("unauthorized", { status: 401 });
  }

  const update = (await request.json().catch(() => ({}))) as {
    message?: { chat?: { id?: number }; text?: string };
  };
  const message = update.message;
  const chatId = message?.chat?.id;
  const text = message?.text?.trim();

  if (!chatId || !text) {
    return new Response("ok"); // non-text updates ignored
  }

  if (!telegramBotToken()) {
    return new Response("ok");
  }

  if (!isAllowedChat(chatId)) {
    await sendTelegramMessage(chatId, "Sorry — this bot is for Arc Travel &amp; Tours staff only.");
    return new Response("ok");
  }

  const lower = text.toLowerCase();

  // ── Confirmation step ─────────────────────────────────
  const pending = takeDraft(String(chatId));
  if (pending) {
    if (["yes", "y", "confirm", "create"].includes(lower)) {
      await sendTelegramMessage(chatId, "Creating the invoice in Zoho…");
      try {
        const result = await executeDraft(pending);
        const ok = await sendTelegramDocument(chatId, {
          bytes: result.bytes,
          filename: result.filename,
          caption: `🧾 Invoice ${result.invoiceNumber} — ${pending.customerName} — ${pending.currency ?? "USD"}${result.total.toFixed(2)}`,
          contentType: result.contentType,
        });
        if (!ok) {
          await sendTelegramMessage(
            chatId,
            "Invoice created, but I couldn't send the PDF. Check the invoice in your Zoho portal."
          );
        }
      } catch (err) {
        console.error("[invoice] create failed:", err);
        await sendTelegramMessage(
          chatId,
          `Failed to create the invoice: ${err instanceof Error ? err.message : "unknown error"}`
        );
      }
    } else if (["no", "n", "cancel", "stop"].includes(lower)) {
      await sendTelegramMessage(chatId, "Cancelled — no invoice was created.");
    } else {
      // Keep waiting for an explicit YES/NO.
      storeDraft(String(chatId), pending);
      await sendTelegramMessage(
        chatId,
        "Reply <b>YES</b> to create the invoice, or <b>NO</b> to cancel."
      );
    }
    return new Response("ok");
  }

  // ── New instruction ────────────────────────────────────
  if (["/start", "start", "/help", "help", "hi", "hello"].includes(lower)) {
    await sendTelegramMessage(chatId, helpText());
    return new Response("ok");
  }

  try {
    const draft = await extractInvoiceDraft(text);
    storeDraft(String(chatId), draft);
    await sendTelegramMessage(
      chatId,
      `${formatDraftSummary(draft)}\n\nReply <b>YES</b> to create this invoice in Zoho, or <b>NO</b> to cancel.`
    );
  } catch (err) {
    console.error("[invoice] extract failed:", err);
    await sendTelegramMessage(
      chatId,
      `I couldn't parse that as an invoice. Try something like: “Invoice Tendai US$150 for the Victoria Falls weekend”.\n\nSend “help” for examples.`
    );
  }

  return new Response("ok");
}

export async function GET() {
  return Response.json({ ok: true, service: "arctravel-invoice-bot" });
}
