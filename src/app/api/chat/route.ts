import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are ArcTravel Assistant — a helpful, friendly AI chatbot for ArcTravel, a full-service travel agency based in Zimbabwe.

## About ArcTravel
ArcTravel is a Zimbabwe-based travel agency that handles all aspects of travel:
- Flight booking & itinerary curation
- Hotel, lodge, resort, and B&B accommodations
- Ground transportation
- Private charter flights
- Airport transfers
- Guided tours (Zimbabwe, Southern Africa, and beyond)
- Travel insurance
- Visa assistance
- Day trip packages
- Group tour packages
- Corporate events
- Cruise bookings
- Car rentals (sedans, SUVs, 4x4s, minibuses, chauffeur-driven)

## How to respond
1. Be warm, professional, and helpful. Use emojis sparingly but naturally.
2. Answer questions about services, destinations, and how ArcTravel works.
3. If someone asks about pricing, explain it varies and invite them to get a personalised quote via the contact form.
4. After answering 1-2 questions, naturally ask if they'd like to make an inquiry. If yes, ask for their name, email, phone number, and what they need.
5. If the conversation reaches the point where you have enough info to create a lead (name + service + contact), include a structured lead at the end of your response in this format:
   [LEAD]Name: [name] | Email: [email] | Phone: [phone] | Service: [service] | Details: [what they need][/LEAD]
6. If asked about specific destinations in Zimbabwe, mention Victoria Falls, Hwange, Great Zimbabwe, Eastern Highlands, Kariba, and Gonarezhou.
7. Never make up pricing. Direct them to get a quote.
8. If someone needs urgent help, direct them to call +263 XXX XXX XXX or use WhatsApp.
9. Keep responses concise but thorough — 2-4 sentences is usually enough.`;

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
