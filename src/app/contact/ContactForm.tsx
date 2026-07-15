"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/lib/constants";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Wire up to email / API endpoint
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Send className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold">Thank You!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your inquiry has been received. We&apos;ll get back to you within 24
          hours.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </label>
          <Input id="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </label>
        <Input id="phone" type="tel" placeholder="+263 XXX XXX XXX" />
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="text-sm font-medium">
          Service Needed <span className="text-destructive">*</span>
        </label>
        <Select required>
          <SelectTrigger id="service">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.href} value={service.title}>
                {service.title}
              </SelectItem>
            ))}
            <SelectItem value="multiple">Multiple / Not Sure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Tell Us About Your Trip <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          required
          placeholder="Destination, dates, number of travellers, budget, special requests..."
          rows={5}
        />
      </div>

      <Button type="submit" size="lg" className="w-full bg-[#ff8912] text-white hover:bg-[#e67a00] cursor-pointer sm:w-auto">
        <Send className="mr-2 h-4 w-4" />
        Send Inquiry
      </Button>
    </form>
  );
}
