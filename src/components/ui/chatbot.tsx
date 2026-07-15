"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, ChevronRight, User, Mail, Phone, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickActions = [
  { label: "Book a flight", keywords: ["flight", "plane"] },
  { label: "Car rentals", keywords: ["car", "rental", "vehicle"] },
  { label: "Places to stay", keywords: ["hotel", "lodge", "bnb", "accommodation"] },
  { label: "Visa help", keywords: ["visa", "passport"] },
  { label: "Guided tours", keywords: ["tour", "safari", "excursion"] },
  { label: "Speak to a human", keywords: ["human", "agent", "person"] },
];

function LeadForm({ onSubmit }: { onSubmit: (data: { name: string; email: string; phone: string; service: string; message: string }) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, email, phone, service, message });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 p-1">
      <p className="text-xs font-medium text-gray-500">Fill this in and we&apos;ll get back to you:</p>
      <div className="relative">
        <User className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#ff8912]/40" />
      </div>
      <div className="relative">
        <Mail className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#ff8912]/40" />
      </div>
      <div className="relative">
        <Phone className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#ff8912]/40" />
      </div>
      <div className="relative">
        <Tag className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <select value={service} onChange={(e) => setService(e.target.value)} required className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#ff8912]/40">
          <option value="">What do you need?</option>
          <option>Flight booking</option>
          <option>Accommodation</option>
          <option>Car rental</option>
          <option>Guided tour</option>
          <option>Visa assistance</option>
          <option>Other</option>
        </select>
      </div>
      <textarea placeholder="Any details? (optional)" value={message} onChange={(e) => setMessage(e.target.value)} rows={2} className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-[#ff8912]/40 resize-none" />
      <button type="submit" className="w-full rounded-lg bg-[#ff8912] py-2 text-xs font-medium text-white hover:bg-[#e67a00] transition-colors">
        Send Inquiry
      </button>
    </form>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: `Hi! I&#39;m <strong>Astra</strong>, your ArcTravel assistant. What should I call you? ✈️`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setShowActions(false);
    setShowLeadForm(false);
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
          { role: "bot", text: `⚠️ ${data.error}` },
        ]);
        setShowActions(true);
        return;
      }

      const botReply = data.reply || "Let me connect you with our team.";

      // If this was the first exchange (name), store it and show actions
      if (!userName) {
        setUserName(text);
        setShowActions(true);
      } else {
        setShowActions(true);
      }

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Sorry, I'm having trouble connecting. Try again or visit our contact page." },
      ]);
      setShowActions(true);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickAction(label: string) {
    if (label === "Speak to a human") {
      setShowLeadForm(true);
      setShowActions(false);
      setMessages((prev) => [
        ...prev,
        { role: "user", text: "I'd like to speak to someone" },
        { role: "bot", text: "Sure! Fill in your details below and we'll get back to you within 24 hours. 👋" },
      ]);
      return;
    }
    sendMessage(label);
  }

  function handleLeadSubmit(data: { name: string; email: string; phone: string; service: string; message: string }) {
    const details = `Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}, Service: ${data.service}, Message: ${data.message}`;
    console.log("🔔 LEAD FORM:", details);
    setShowLeadForm(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: `Thanks ${data.name}! We've received your inquiry and will get back to you within 24 hours. <a href="/contact" class="text-[#ff8912] underline">Visit our contact page</a> for more options. 🎯`,
      },
    ]);
    setShowActions(true);
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
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-[#002a62] px-4 py-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff8912]/20">
              <Bot className="h-4 w-4 text-[#ff8912]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Astra</p>
              <p className="text-xs text-white/60">ArcTravel assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors" aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4" style={{ maxHeight: "380px" }}>
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
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

              {/* Lead form */}
              {showLeadForm && (
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2">
                  <LeadForm onSubmit={handleLeadSubmit} />
                </div>
              )}

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

              {/* Quick actions */}
              {showActions && !loading && !showLeadForm && (
                <div className="pt-2 space-y-1.5">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {userName ? `What can I help you with, ${userName}?` : "Quick options"}
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
                placeholder={userName ? `Ask me anything, ${userName}...` : "Type your name..."}
                disabled={loading || showLeadForm}
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
