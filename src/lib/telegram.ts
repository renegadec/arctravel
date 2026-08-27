// Telegram Bot API helpers (message + PDF document delivery).

export function telegramBotToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN || null;
}

function apiUrl(method: string): string {
  return `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`;
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string
): Promise<boolean> {
  if (!telegramBotToken()) return false;
  try {
    const res = await fetch(apiUrl("sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: String(chatId), text, parse_mode: "HTML" }),
    });
    return res.ok;
  } catch (err) {
    console.error("[telegram] sendMessage failed:", err);
    return false;
  }
}

export async function sendTelegramDocument(
  chatId: string | number,
  input: { bytes: Buffer; filename: string; caption?: string; contentType?: string }
): Promise<boolean> {
  if (!telegramBotToken()) return false;
  try {
    const form = new FormData();
    form.append("chat_id", String(chatId));
    if (input.caption) form.append("caption", input.caption);
    form.append(
      "document",
      new Blob([input.bytes as unknown as BlobPart], {
        type: input.contentType ?? "application/pdf",
      }),
      input.filename
    );
    const res = await fetch(apiUrl("sendDocument"), { method: "POST", body: form });
    if (!res.ok) {
      const body = await res.text();
      console.error("[telegram] sendDocument failed:", res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[telegram] sendDocument failed:", err);
    return false;
  }
}
