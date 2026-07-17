import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Ship,
  Waves,
  Anchor,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cruise Bookings — ArcTravel",
  description:
    "Luxury and expedition cruises across Africa, the Indian Ocean, Mediterranean, and worldwide destinations.",
};

const cruiseTypes = [
  {
    icon: Anchor,
    title: "African Coastal & River Cruises",
    description:
      "Explore the Mozambique channel, Zanzibar, the Skeleton Coast, or the Zambezi River — unique African water journeys.",
  },
  {
    icon: Waves,
    title: "Indian Ocean & Island Cruises",
    description:
      "Mauritius, Seychelles, Maldives, Réunion, and Madagascar — island-hopping at its finest.",
  },
  {
    icon: Globe,
    title: "Mediterranean & European Cruises",
    description:
      "Classic Mediterranean itineraries, Greek islands, Adriatic coast, and Northern European fjords.",
  },
  {
    icon: Ship,
    title: "Luxury & Expedition Cruises",
    description:
      "Premium lines, small-ship expeditions, and Antarctic voyages for discerning travellers.",
  },
];

const perks = [
  "Access to exclusive deals and early-bird pricing",
  "Cabin selection guidance — we know the best decks",
  "Pre- and post-cruise accommodation arranged",
  "Flight + cruise packages (seamless connections)",
  "Shore excursion recommendations and booking",
  "Travel insurance tailored for cruise itineraries",
];

export default function CruiseBookingsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Ship className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Cruise Bookings
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Luxury and expedition cruises across Africa, the Indian Ocean,
              Mediterranean, and worldwide destinations.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Book a Cruise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cruise types */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            Cruises We Offer
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            From river journeys to ocean crossings
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {cruiseTypes.map((c) => (
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

      {/* Perks */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">
                Why Book a Cruise With Us?
              </h2>
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
            <Ship className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready to Set Sail?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your preferred region, travel dates, and cabin
              preferences. We&apos;ll find the best cruise for you.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Explore Cruises
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
