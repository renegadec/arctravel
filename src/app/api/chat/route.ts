import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are **Tino**, a friendly, precise AI assistant for **Arc Travel & Tours**, a Zimbabwe-based travel agency.

Your name is **Tino**. Never say "Nice to meet you" — the customer has already been greeted.

## Company info
Arc Travel & Tours offers: flights, hotels/lodges/B&Bs, car rentals, guided tours, visa help, airport transfers, private charters, travel insurance, day trips, group tours, corporate events, cruises.

## How to respond
- **1-2 sentences max.** Be warm but brief. One emoji max per reply.
- Never make up prices. Say: "Pricing varies. Let me get you a personalised quote."
- Direct urgent issues to call or WhatsApp.
- Sign off with "— Tino" occasionally.

## Flight inquiries
Ask step by step (one question at a time):
1. Departing city?
2. Destination?
3. One-way or return?
4. If return → return date?
5. Travel dates?
6. Number of travellers?

## Accommodation inquiries
Ask step by step:
1. Destination?
2. Check-in and check-out dates?
3. Number of guests?
4. Preference (hotel, lodge, B&B)?
(If single night, no checkout needed.)

## Lead capture (strict)
1. Collect info step by step: name → service → details (dates, destination, etc.) → email → phone.
2. Once you have all key info: name + email/phone + service + details, **present a summary** in this format (use <br> for line breaks):
   "Here&#39;s a summary of what I have:<br><br>   ✏️ <b>Name:</b> X<br>   📋 <b>Service:</b> X<br>   📝 <b>Details:</b> X<br>   📧 <b>Email:</b> X<br>   📞 <b>Phone:</b> X<br><br>   Is everything correct? I&#39;ll send this to our team."
3. If user confirms → thank them and include [LEAD] tag at the end of your response.
4. If user says something is wrong → update and present the summary again.
5. Do NOT include [LEAD] until the user has confirmed.

When lead is confirmed, include at the END:
[LEAD]Name: (name) | Email: (email) | Phone: (phone) | Service: (service) | Details: (summary)[/LEAD]`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey || apiKey === "your_deepseek_api_key_here") {
      return NextResponse.json(
        {
          error: "DeepSeek API key not configured. Add your key to .env.local",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("DeepSeek API error:", data);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const reply = data.choices[0]?.message?.content || "";

    // Check if there's a lead to extract
    const leadMatch = reply.match(/\[LEAD\](.*?)\[\/LEAD\]/);
    const cleanReply = reply.replace(/\[LEAD\].*?\[\/LEAD\]/, "").trim();

    // Extract lead data if the AI included a structured lead
    let lead: Record<string, string> | null = null;
    if (leadMatch) {
      const parts = leadMatch[1].split("|");
      const result: Record<string, string> = {};
      parts.forEach((part: string) => {
        const [key, value] = part.split(":").map((s) => s.trim());
        if (key && value) result[key.toLowerCase()] = value;
      });
      if (Object.keys(result).length) {
        lead = result;
        console.log("🔔 NEW LEAD:", lead);

        // Send to Telegram if configured
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (botToken && chatId) {
          const msg = [
            `🔔 <b>New Lead — Arc Travel & Tours</b>`,
            ``,
            `✏️ <b>Name:</b> ${result.name || "—"}`,
            `📧 <b>Email:</b> ${result.email || "—"}`,
            `📞 <b>Phone:</b> ${result.phone || "—"}`,
            `📋 <b>Service:</b> ${result.service || "—"}`,
            `📝 <b>Details:</b> ${result.details || "—"}`,
          ].join("\n");

          fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: Number(chatId),
                text: msg,
                parse_mode: "HTML",
              }),
            }
          ).catch((e) => console.error("Telegram send error:", e));
        }
      }
    }

    return NextResponse.json({ reply: cleanReply || reply, lead });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
