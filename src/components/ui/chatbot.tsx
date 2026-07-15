"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickActions = [
  { label: "Book a flight", keywords: ["flight", "plane", "airline", "airport"] },
  { label: "Car rentals", keywords: ["car", "rental", "vehicle", "drive"] },
  { label: "Accommodation", keywords: ["hotel", "lodge", "bnb", "bed", "stay", "accommodation"] },
  { label: "Visa help", keywords: ["visa", "passport", "travel document"] },
  { label: "Guided tours", keywords: ["tour", "safari", "guide", "excursion"] },
  { label: "Talk to a human", keywords: ["agent", "human", "person", "call", "speak"] },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "👋 Hi! Welcome to ArcTravel. I can help you find info on flights, car hire, accommodation, visas, and more. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setShowActions(false);
    setLoading(true);

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const apiMessages = [
        ...messages.slice(1).map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text,
        })),
        { role: "user" as const, content: text },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `⚠️ ${data.error}`,
          },
        ]);
        setShowActions(true);
        return;
      }

      const botReply = data.reply || "I'm not sure how to respond to that. Try asking about our services or get in touch with us directly.";
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      setShowActions(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Sorry, I'm having trouble connecting. Please try again or visit our contact page to speak with a human.",
        },
      ]);
      setShowActions(true);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickAction(label: string) {
    sendMessage(label);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff8912] text-white shadow-lg shadow-[#ff8912]/30 transition-all hover:bg-[#e67a00] hover:scale-105 active:scale-95"
        aria-label="Chat with us"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-[#002a62] px-4 py-3.5 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff8912]/20">
              <Bot className="h-4 w-4 text-[#ff8912]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">ArcTravel Assistant</p>
              <p className="text-xs text-white/60">Online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4" style={{ maxHeight: "380px" }}>
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-[#002a62] text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    )}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />

              {/* Quick actions (after bot response, not during loading) */}
              {showActions && !loading && (
                <div className="pt-2 space-y-1.5">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Quick options
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleQuickAction(action.label)}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600 transition-colors hover:border-[#ff8912]/40 hover:bg-[#ff8912]/5 hover:text-[#002a62]"
                      >
                        <ChevronRight className="h-3 w-3 shrink-0 text-[#ff8912]" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#ff8912]/50 focus:bg-white disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff8912] text-white transition-colors hover:bg-[#e67a00] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
