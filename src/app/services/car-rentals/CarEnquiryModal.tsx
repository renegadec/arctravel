"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import type { Car } from "@/lib/car-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks } from "@/lib/constants";
import {
  X,
  CheckCircle,
  CarFront,
  Calendar,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

type Props = {
  car: Car;
  onClose: () => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  pickupDate: "",
  dropoffDate: "",
  pickupLocation: "",
  notes: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function CarEnquiryModal({ car, onClose }: Props) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  // Lock body scroll and close on Escape while open.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.pickupDate) errs.pickupDate = "Pick-up date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: "Car Rentals",
        destination: `${car.brand} ${car.model}`,
        departureDate: form.pickupDate,
        returnDate: form.dropoffDate,
        travellers: `${car.seats} seats`,
        budget: `US$${car.pricePerDay}/day`,
        notes: [
          form.pickupLocation ? `Pick-up: ${form.pickupLocation}` : "",
          `Category: ${car.category}`,
          form.notes,
        ]
          .filter(Boolean)
          .join(" · "),
        source: "Car Hire Enquiry",
      };
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (err) {
      console.error("Car enquiry failed:", err);
      setStatus("error");
    }
  }

  const fieldClasses = (field: keyof FormState) =>
    errors[field] ? "border-destructive/50 focus-visible:ring-destructive/30" : "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Enquire about ${car.brand} ${car.model}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#001b42]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-border">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <CarFront className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">
                Enquire About This Car
              </h2>
              <p className="text-xs text-muted-foreground">
                We&apos;ll confirm availability and send a quote within 24 hours.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {status === "success" ? (
          /* ============ SUCCESS ============ */
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">
              Thanks, {form.name.split(" ")[0]}!
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Your enquiry for the{" "}
              <span className="font-semibold text-foreground">
                {car.brand} {car.model}
              </span>{" "}
              has been received. We&apos;ll check availability and get back to
              you shortly.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="w-full" onClick={onClose}>
                Done
              </Button>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="whatsapp" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        ) : (
          /* ============ FORM ============ */
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Selected car summary */}
            <div className="flex items-center gap-4 border-b border-border bg-muted/40 px-6 py-4">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  alt={`${car.brand} ${car.model}`}
                  src={car.image}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {car.brand} {car.model}
                </p>
                <p className="text-xs text-muted-foreground">
                  {car.category} · {car.seats} seats · {car.transmission}
                </p>
                <p className="mt-0.5 text-sm font-bold text-accent">
                  US${car.pricePerDay}
                  <span className="text-xs font-normal text-muted-foreground">
                    /day
                  </span>
                </p>
              </div>
            </div>

            {/* Scrollable fields */}
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="car-name" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="car-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    className={fieldClasses("name")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="car-email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="car-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className={fieldClasses("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="car-phone" className="text-sm font-medium">
                  Phone Number{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  id="car-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+263 XXX XXX XXX"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="car-pickup" className="text-sm font-medium">
                    Pick-up Date <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="car-pickup"
                      type="date"
                      value={form.pickupDate}
                      onChange={(e) => update("pickupDate", e.target.value)}
                      className={`pl-10 ${fieldClasses("pickupDate")}`}
                      aria-invalid={!!errors.pickupDate}
                    />
                  </div>
                  {errors.pickupDate && (
                    <p className="text-xs text-destructive">
                      {errors.pickupDate}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="car-dropoff" className="text-sm font-medium">
                    Drop-off Date{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="car-dropoff"
                      type="date"
                      value={form.dropoffDate}
                      onChange={(e) => update("dropoffDate", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="car-location" className="text-sm font-medium">
                  Pick-up Location{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="car-location"
                    value={form.pickupLocation}
                    onChange={(e) => update("pickupLocation", e.target.value)}
                    placeholder="e.g. Harare Airport, city centre..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="car-notes" className="text-sm font-medium">
                  Additional Notes{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  id="car-notes"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Child seat, cross-border travel, chauffeur driver..."
                  className="min-h-[72px] resize-y"
                />
              </div>

              {status === "error" && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  Something went wrong sending your enquiry. Please try again,
                  or WhatsApp us directly.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-4">
              <Button
                type="submit"
                variant="accent"
                size="xl"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Enquiry
                  </>
                )}
              </Button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                No payment now — this just asks about availability.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
