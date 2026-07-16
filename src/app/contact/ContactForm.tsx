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
import { Send, CheckCircle, Sparkles, ArrowLeft } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const LABELS: Record<keyof FormData, string> = {
  name: "Full Name",
  email: "Email",
  phone: "Phone Number",
  service: "Service Needed",
  message: "Tell Us About Your Trip",
};

const PLACEHOLDERS: Record<keyof FormData, string> = {
  name: "Your name",
  email: "you@example.com",
  phone: "+263 XXX XXX XXX",
  service: "Select a service",
  message: "Destination, dates, number of travellers, budget, special requests...",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.service) errs.service = "Select a service";
    if (!form.message.trim()) errs.message = "Tell us about your trip";
    return errs;
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = { ...errors };
      if (!value.trim() && field !== "phone") {
        newErrors[field] = `${LABELS[field]} is required`;
      } else if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "Enter a valid email";
      } else {
        delete newErrors[field];
      }
      setErrors(newErrors);
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate();
    if (newErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  }

  function isFieldValid(field: keyof FormData) {
    if (!touched[field]) return null;
    if (field === "phone") return true;
    if (field === "email") return !!form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return !!form[field]?.trim();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, service: true, message: true });
    if (Object.keys(errs).length > 0) return;
    // TODO: Wire up to email / API endpoint
    setSubmitted(true);
  }

  function fieldClasses(field: keyof FormData) {
    const valid = isFieldValid(field);
    if (valid === null) return "";
    if (valid) return "border-green-500/50 focus-visible:ring-green-500/30";
    if (errors[field]) return "border-destructive/50 focus-visible:ring-destructive/30";
    return "";
  }

  if (submitted) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center rounded-2xl border border-green-500/20 bg-gradient-to-b from-green-500/5 to-transparent p-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold">Thank You, {form.name.split(" ")[0]}!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Your inquiry has been received. We&apos;ll review it and get back to you within 24 hours.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", phone: "", service: "", message: "" });
              setErrors({});
              setTouched({});
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Send Another
          </Button>
          <Button className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
            <Sparkles className="mr-2 h-4 w-4" />
            Explore Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            required
            placeholder={PLACEHOLDERS.name}
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={fieldClasses("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && touched.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder={PLACEHOLDERS.email}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={fieldClasses("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && touched.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number <span className="text-muted-foreground">(optional)</span>
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder={PLACEHOLDERS.phone}
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={fieldClasses("phone")}
        />
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <label htmlFor="service" className="text-sm font-medium">
          Service Needed <span className="text-destructive">*</span>
        </label>
        <Select
          required
          value={form.service}
          onValueChange={(v) => { if (v) handleChange("service", v); }}
          onOpenChange={(open) => { if (!open) handleBlur("service"); }}
        >
          <SelectTrigger
            id="service"
            className={fieldClasses("service")}
            aria-invalid={!!errors.service}
          >
            <SelectValue placeholder={PLACEHOLDERS.service} />
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
        {errors.service && touched.service && (
          <p className="text-xs text-destructive">{errors.service}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="text-sm font-medium">
            Tell Us About Your Trip <span className="text-destructive">*</span>
          </label>
          <span className={`text-xs ${form.message.length > 500 ? "text-destructive" : "text-muted-foreground"}`}>
            {form.message.length}/1000
          </span>
        </div>
        <Textarea
          id="message"
          required
          placeholder={PLACEHOLDERS.message}
          value={form.message}
          onChange={(e) => {
            if (e.target.value.length <= 1000) handleChange("message", e.target.value);
          }}
          onBlur={() => handleBlur("message")}
          className={`min-h-[120px] resize-y ${fieldClasses("message")}`}
          aria-invalid={!!errors.message}
        />
        {errors.message && touched.message && (
          <p className="text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer sm:w-auto"
      >
        <Send className="mr-2 h-4 w-4" />
        Send Inquiry
      </Button>
    </form>
  );
}
