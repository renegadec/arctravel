"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronRight, User, Mail, Phone, Tag, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickActions = [
  { label: "Book a flight", keywords: ["flight", "plane"] },
  { label: "Car rentals", keywords: ["car", "rental", "vehicle"] },
  { label: "Places to stay", keywords: ["hotel", "lodge", "bnb"] },
  { label: "Visa help", keywords: ["visa", "passport"] },
  { label: "Guided tours", keywords: ["tour", "safari"] },
  { label: "Speak to a human", keywords: ["human", "agent"] },
];

function NameInput({
  onSubmit,
  onBlur,
}: {
  onSubmit: (name: string) => void;
  onBlur?: () => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function validate(val: string): boolean {
    const trimmed = val.trim();
    if (trimmed.length < 2) {
      setError("Please enter your name");
      return false;
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
      setError("Please use letters only");
      return false;
    }
    setError("");
    return true;
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (validate(value)) {
      onSubmit(value.trim());
    }
  }

  function handleChange(val: string) {
    setValue(val);
    if (error) validate(val);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <User className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={onBlur}
            placeholder="Enter your name..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-3 text-xs outline-none transition-colors focus:border-[#ff8912]/50"
          />
        </div>
        <button
          type="submit"
          disabled={!value.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff8912] text-white transition-colors hover:bg-[#e67a00] disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </form>
  );
}

function LeadForm({ onSubmit }: { onSubmit: (data: { name: string; email: string; phone: string; service: string; message: string }) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!service) e.service = "Select a service";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name: name.trim(), email: email.trim(), phone, service, message });
    }
  }

  function inputClass(field: string) {
    return errors[field]
      ? "border-red-300 focus:border-red-400"
      : "border-gray-200 focus:border-[#ff8912]/40";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 p-1">
      <p className="text-xs font-medium text-gray-500">We&apos;ll get back to you within 24 hours:</p>
      <div className="relative">
        <User className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={`w-full rounded-lg border bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none ${inputClass("name")}`} />
      </div>
      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      <div className="relative">
        <Mail className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full rounded-lg border bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none ${inputClass("email")}`} />
      </div>
      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      <div className="relative">
        <Phone className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#ff8912]/40" />
      </div>
      <div className="relative">
        <Tag className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <select value={service} onChange={(e) => setService(e.target.value)} className={`w-full appearance-none rounded-lg border bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none ${inputClass("service")}`}>
          <option value="">What do you need?</option>
          <option>Flight booking</option>
          <option>Accommodation</option>
          <option>Car rental</option>
          <option>Guided tour</option>
          <option>Visa assistance</option>
          <option>Other</option>
        </select>
      </div>
      {errors.service && <p className="text-xs text-red-500">{errors.service}</p>}
      <textarea placeholder="Any details? (optional)" value={message} onChange={(e) => setMessage(e.target.value)} rows={2} className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-[#ff8912]/40 resize-none" />
      <button type="submit" className="w-full rounded-lg bg-[#ff8912] py-2 text-xs font-medium text-white hover:bg-[#e67a00] transition-colors">
        Send Inquiry
      </button>
    </form>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [conversationDone, setConversationDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm, showNameInput]);

  // Auto-focus input after sending
  useEffect(() => {
    if (!loading && !showLeadForm && !showNameInput && open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [loading, showLeadForm, showNameInput, messages, open]);

  // Initial greeting
  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setTimeout(() => {
        setMessages([
          {
            role: "bot",
            text: "Hi! I&#39;m <strong>Tino</strong>, your assistant from Arc Travel &amp; Tours. What should I call you? 🇿🇼",
          },
        ]);
        setShowNameInput(true);
      }, 300);
    }
  }, [open, started]);

  function handleNameSubmit(name: string) {
    setUserName(name);
    setShowNameInput(false);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: name },
      {
        role: "bot",
        text: `Nice to meet you, <strong>${name}</strong>! What can I help you with today? 🎯`,
      },
    ]);
    setShowActions(true);
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setShowActions(false);
    setShowLeadForm(false);
    setConversationDone(false);
    setLoading(true);

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const historyMessages = messages
        .filter((m) => m.text !== "Hi! I&#39;m <strong>Tino</strong>, your assistant from Arc Travel &amp; Tours. What should I call you? 🇿🇼")
        .filter((m) => !m.text.startsWith("Nice to meet you"))
        .slice(1)
        .map((m) => ({
          role: m.role === "bot" ? ("assistant" as const) : ("user" as const),
          content: m.text.replace(/<[^>]*>/g, ""),
        }));

      const apiMessages: { role: "user" | "assistant"; content: string }[] = [
        { role: "user", content: `The customer's name is ${userName}.` },
        ...historyMessages,
        { role: "user", content: text },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [...prev, { role: "bot", text: `⚠️ ${data.error}` }]);
        return;
      }

      const botReply = data.reply || "Let me connect you with our team.";
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Sorry, I'm having trouble. Try again or visit our contact page." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickAction(label: string) {
    if (label === "Speak to a human") {
      setShowLeadForm(true);
      setMessages((prev) => [
        ...prev,
        { role: "user", text: "I'd like to speak to someone" },
        { role: "bot", text: "Sure! Fill in your details below and we'll get back to you within 24 hours. 👋" },
      ]);
      return;
    }
    sendMessage(label);
  }

  async function handleLeadSubmit(data: { name: string; email: string; phone: string; service: string; message: string }) {
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Chatbot",
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service || "Chat inquiry",
          destination: data.message?.split(",")[0]?.trim() || "—",
          departureDate: "—",
          returnDate: "",
          travellers: "—",
          budget: "—",
          notes: data.message || "—",
        }),
      });
    } catch (err) {
      console.error("Failed to send chat lead:", err);
    }

    setShowLeadForm(false);
    setConversationDone(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: `Thanks ${data.name}! We&#39;ve received your inquiry and will get back to you within 24 hours. 🎯`,
      },
    ]);
  }

  function startOver() {
    setUserName(null);
    setShowActions(false);
    setShowLeadForm(false);
    setShowNameInput(true);
    setConversationDone(false);
    setInput("");
    setMessages([
      {
        role: "bot",
        text: "Hi! I&#39;m <strong>Tino</strong>, your assistant from Arc Travel &amp; Tours. What should I call you? 🇿🇼",
      },
    ]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading) {
        sendMessage(input);
      }
    }
  }

  function handleSendClick() {
    if (input.trim() && !loading) {
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
              <User className="h-4 w-4 text-[#ff8912]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Tino</p>
              <p className="text-xs text-white/60">Arc Travel &amp; Tours</p>
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

              {/* Name input — shown after first greeting */}
              {showNameInput && (
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2">
                  <NameInput onSubmit={handleNameSubmit} />
                </div>
              )}

              {/* Lead form */}
              {showLeadForm && (
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2">
                  <LeadForm onSubmit={handleLeadSubmit} />
                </div>
              )}

              {/* Conversation done — show restart / options */}
              {conversationDone && (
                <div className="pt-2 space-y-1.5">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Need help with something else?
                  </p>
                  <button
                    onClick={startOver}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#ff8912]/30 bg-[#ff8912]/5 px-4 py-2.5 text-xs font-medium text-[#002a62] transition-colors hover:bg-[#ff8912]/10"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Start a new request
                  </button>
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

              {/* Quick actions — shown after name, hidden after first selection */}
              {showActions && !loading && !showLeadForm && !showNameInput && !conversationDone && userName && messages.filter((m) => m.role === "user").length === 1 && (
                <div className="pt-2 space-y-1.5">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    What can I help you with, {userName}?
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

          {/* Input — hidden during name capture, lead form, and conversation done */}
          {!showNameInput && !showLeadForm && !conversationDone && (
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask me anything, ${userName || "Tino"}...`}
                  disabled={loading}
                  className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#ff8912]/50 focus:bg-white disabled:opacity-50"
                />
                <button
                  onClick={handleSendClick}
                  disabled={!input.trim() || loading}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff8912] text-white transition-colors hover:bg-[#e67a00] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
