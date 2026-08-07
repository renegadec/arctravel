import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Plane,
  ShieldCheck,
  Clock,
  CheckCircle,
  Headset,
  BadgeCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book Your Trip — ArcTravel",
  description:
    "Tell us what you need — flights, accommodation, tours, or a full package. We'll build a quote and get back to you within 24 hours.",
};

const perks = [
  "Free consultation & quote — no obligation",
  "Personal travel coordinator assigned to you",
  "Response within 24 hours",
  "Flexible payment options available",
];

const steps = [
  {
    step: "1",
    title: "We review your request",
    desc: "Your details go to a travel coordinator who reviews your needs.",
  },
  {
    step: "2",
    title: "We build options",
    desc: "We research the best flights, accommodation, and activities for your trip.",
  },
  {
    step: "3",
    title: "You get a quote",
    desc: "Within 24 hours, you receive a detailed quote with options to choose from.",
  },
  {
    step: "4",
    title: "You confirm & we book",
    desc: "Accept the quote and we handle all bookings and confirmations.",
  },
];

const trustStats = [
  { value: "24h", label: "Quote turnaround" },
  { value: "500+", label: "Trips arranged" },
  { value: "30+", label: "Destinations" },
  { value: "98%", label: "Happy clients" },
];

export default function BookPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
            alt="Traveller on a plane looking out the window"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001b42]/95 via-[#002a62]/85 to-[#002a62]/95" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
              <Plane className="h-3.5 w-3.5 text-[#ff8912]" />
              Start your travel journey here
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Book Your Trip
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Tell us what you need and we&apos;ll build a personalised quote
              within 24 hours. No obligation — just great travel advice.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#booking-form">
                <Button
                  size="xl"
                  variant="accent"
                >
                  Start Your Booking
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link
                href="https://wa.me/263786577594"
                target="_blank"
              >
                <Button
                  size="xl"
                  variant="glass"
                >
                  Chat on WhatsApp
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust stats strip */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {trustStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur"
              >
                <p className="text-2xl font-bold text-[#ffb25e] sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM + SIDEBAR ================= */}
      <section id="booking-form" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-[#002a62]/5 sm:p-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff8912]/10 text-[#e67a00]">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      Tell Us About Your Trip
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Four quick steps — we&apos;ll get back to you within 24
                      hours with options and a quote
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center py-10">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#ff8912]" />
                      </div>
                    }
                  >
                    <BookingForm />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-4">
              {/* What happens next */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
                <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Clock className="h-5 w-5 text-[#ff8912]" />
                  What happens next?
                </h3>
                <ol className="mt-5 space-y-5">
                  {steps.map((item) => (
                    <li key={item.step} className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#002a62] text-xs font-bold text-white">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Why book with ArcTravel */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
                <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                  <BadgeCheck className="h-5 w-5 text-[#ff8912]" />
                  Why book with ArcTravel?
                </h3>
                <ul className="mt-4 space-y-3">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8912]" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp card */}
              <div className="relative overflow-hidden rounded-3xl bg-[#002a62] p-6 sm:p-7">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ff8912]/15 blur-3xl" />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff8912]/15">
                    <Headset className="h-5 w-5 text-[#ffb25e]" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">
                    Prefer to chat?
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    Talk to a real travel coordinator right now — no forms, no
                    waiting.
                  </p>
                  <Link
                    href="https://wa.me/263786577594"
                    target="_blank"
                    className="mt-4 block"
                  >
                    <Button
                      variant="accent" size="xl" className="w-full"
                    >
                      WhatsApp Us
                    </Button>
                  </Link>
                  <p className="mt-3 text-center text-[11px] text-white/50">
                    Mon–Sat · 8:00–18:00 CAT
                  </p>
                </div>
              </div>

              {/* Trust strip */}
              <div className="flex items-center gap-3 rounded-3xl border border-[#ff8912]/20 bg-[#ff8912]/5 px-5 py-4">
                <ShieldCheck className="h-8 w-8 shrink-0 text-[#e67a00]" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Your details are kept private and only used to prepare your
                  quote. No spam, ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
