"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup({ source = "Blog" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong — please try again");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 px-5 py-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
        <p className="text-sm font-medium text-foreground">
          You&apos;re on the list! We&apos;ll send travel tips worth reading —
          no spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8912] focus-visible:ring-offset-2"
          />
        </div>
        <Button
          type="submit"
          variant="accent"
          size="xl"
          disabled={status === "loading"}
          className="shrink-0"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">{error}</p>
      )}
    </form>
  );
}
