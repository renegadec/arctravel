import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Car,
  Clock,
  Luggage,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Airport Transfers — ArcTravel",
  description:
    "Hassle-free meet-and-greet airport transfers with professional drivers. Flight tracking included — we're always on time.",
};

const services = [
  {
    icon: Car,
    title: "Meet & Greet",
    description:
      "Your driver meets you at arrivals with a name board, helps with luggage, and escorts you to the vehicle.",
  },
  {
    icon: Clock,
    title: "Flight Tracking",
    description:
      "We monitor your flight in real time. If it's delayed, we adjust — you're never left waiting or charged extra.",
  },
  {
    icon: MapPin,
    title: "Door-to-Door",
    description:
      "Direct transfer from the airport to your hotel, lodge, or residence anywhere in the city.",
  },
  {
    icon: Luggage,
    title: "Vehicle Options",
    description:
      "Sedans for solo travellers, SUVs for families, and minibuses for groups — all with luggage space.",
  },
];

const features = [
  "Professional, uniformed drivers",
  "Clean, air-conditioned vehicles",
  "Complimentary 30-minute waiting time",
  "Child seats provided on request",
  "24/7 availability — including late-night arrivals",
  "Competitive fixed rates — no surge pricing",
];

export default function AirportTransfersPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Car className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Airport Transfers
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Hassle-free meet-and-greet airport transfers with professional
              drivers. We track your flight so we&apos;re always on time.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Book a Transfer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            How Our Transfers Work
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Simple, reliable, stress-free
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">
                What You Get
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-muted-foreground">{f}</span>
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
            <Car className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Arriving Soon?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Share your flight details and destination. We&apos;ll have a
              driver waiting.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Book Your Transfer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
