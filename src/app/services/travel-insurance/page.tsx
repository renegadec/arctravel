import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  HeartPulse,
  Plane,
  Luggage,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Travel Insurance — ArcTravel",
  description:
    "Comprehensive travel insurance covering medical emergencies, trip cancellation, lost luggage, and more.",
};

const coverageAreas = [
  {
    icon: HeartPulse,
    title: "Medical & Emergency",
    description:
      "Emergency medical expenses, hospitalisation, evacuation, and repatriation — up to high coverage limits.",
  },
  {
    icon: Plane,
    title: "Trip Cancellation & Interruption",
    description:
      "Coverage for cancelled, delayed, or interrupted trips due to illness, weather, or unforeseen events.",
  },
  {
    icon: Luggage,
    title: "Lost & Delayed Baggage",
    description:
      "Compensation for lost, stolen, or delayed luggage and personal belongings during your journey.",
  },
  {
    icon: ShieldCheck,
    title: "Personal Liability & More",
    description:
      "Coverage for accidental damage to others, legal expenses, and additional services like concierge and translator access.",
  },
];

const benefits = [
  "24/7 global emergency assistance hotline",
  "Coverage for pre-existing medical conditions (on select plans)",
  "Adventure sports and activities covered",
  "No excess on medical claims",
  "Policy documents in English — clear, not fine-print heavy",
  "Claims assistance from our team — we help you file",
];

export default function TravelInsurancePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Travel Insurance
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Comprehensive travel insurance covering medical emergencies, trip
              cancellation, lost luggage, and more.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Get Covered
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            What We Cover
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Protection that lets you travel with peace of mind
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {coverageAreas.map((c) => (
              <div
                key={c.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">
                Why Insure With Us?
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-8 text-center sm:p-12">
            <ShieldCheck className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Don&apos;t Travel Unprotected
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your destination, trip length, and activities. We&apos;ll
              recommend the right plan for your journey.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
