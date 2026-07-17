import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Plane,
  Globe,
  Clock,
  Luggage,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Flight Booking — ArcTravel",
  description:
    "Domestic and international flights with expertly curated itineraries. Best routes, best times, best value.",
};

const services = [
  {
    icon: Globe,
    title: "Domestic Flights",
    description:
      "Fly between Zimbabwe's cities and towns — Harare, Bulawayo, Victoria Falls, and more.",
  },
  {
    icon: Plane,
    title: "International Flights",
    description:
      "Global connections to Africa, Europe, Asia, the Americas, and the Middle East.",
  },
  {
    icon: Clock,
    title: "Itinerary Curation",
    description:
      "We don't just book flights — we build smart itineraries that save time and reduce layovers.",
  },
  {
    icon: Search,
    title: "Multi-City & Complex Routes",
    description:
      "Planning a multi-stop trip? We find the best routing and pricing across multiple destinations.",
  },
];

const perks = [
  "Best available fares — we search across multiple GDS platforms",
  "Seat selection and meal preferences handled for you",
  "Flight change and cancellation support",
  "Group booking discounts",
  "Loyalty programme guidance (maximise your miles)",
  "24/7 support for flight disruptions",
];

export default function FlightBookingPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Plane className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Flight Booking &amp; Itinerary Curation
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Domestic and international flights with expertly curated
              itineraries that maximise your time and experience.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Book a Flight
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flight services */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">How We Help You Fly</h2>
          <p className="mt-2 text-center text-muted-foreground">
            From a simple one-way ticket to a complex multi-city itinerary
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

      {/* Why book through us */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">Why Book Flights With Us?</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {perks.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-muted-foreground">{p}</span>
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
            <Luggage className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Planning a Trip?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us where you&apos;re going, when, and your preferred airlines.
              We&apos;ll find the best options and present them to you.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Start Planning
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
