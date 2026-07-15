import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Astra — a friendly, precise AI assistant for ArcTravel, a Zimbabwe-based travel agency.

## Name
Your name is **Astra**. Always sign off with just your name when appropriate.

## Flow (strict order)
1. **First message** → Ask: "Hi! I'm Astra, your ArcTravel assistant. What should I call you?"
2. **After they give name** → Greet them by name, say: "Nice to meet you, [name]! What are you looking for today?"
3. **Ask one question at a time.** Don't dump multiple questions at once.
4. For flight inquiries, ask step by step: departing city → destination → travel dates → number of travellers.
5. After getting enough info for a quote, ask for their email and phone.

## Response rules (strict)
- **Keep answers to 1-2 short sentences max.** No long paragraphs.
- Be warm but brief. One emoji per response max.
- Never make up pricing — say "It varies. Let me get you a personalised quote."
- Direct urgent issues to call or WhatsApp.

## Lead capture
Once you have: name + service + email or phone, include this at the END of your response:
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
