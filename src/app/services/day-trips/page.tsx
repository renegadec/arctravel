import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Mountain,
  Droplets,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Day Trips — ArcTravel",
  description:
    "Curated one-day experiences in Zimbabwe — Victoria Falls, Great Zimbabwe, Eastern Highlands, game drives, and more.",
};

const trips = [
  {
    icon: Droplets,
    title: "Victoria Falls Day Trip",
    description:
      "Fly or drive to Vic Falls for the day. See the falls, take a sunset cruise, and be back by evening.",
  },
  {
    icon: Landmark,
    title: "Great Zimbabwe Ruins",
    description:
      "Guided tour of the ancient stone city — a UNESCO World Heritage site just a few hours from Harare.",
  },
  {
    icon: Mountain,
    title: "Eastern Highlands Hike",
    description:
      "Day hikes through Nyanga, Chimanimani, or Bvumba — waterfalls, forests, and mountain views.",
  },
  {
    icon: Sun,
    title: "Game Drive Day Trip",
    description:
      "Full-day game drive in Hwange, Lake Kariba, or Matobo Hills — including lunch and park fees.",
  },
];

const perks = [
  "All transport and park fees included",
  "Expert guides accompany every trip",
  "Packed lunch and refreshments provided",
  "Flexible departure times",
  "Suitable for solo travellers, couples, and small groups",
  "Book with as little as 48 hours notice",
];

export default function DayTripsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Sun className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Day Trip Packages
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Curated one-day experiences — Victoria Falls, Great Zimbabwe,
              Eastern Highlands, and more.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Book a Day Trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trips */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">Popular Day Trips</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Big experiences packed into a single day
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {trips.map((t) => (
              <div
                key={t.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t.description}
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
              <h2 className="text-2xl font-bold">What&apos;s Included</h2>
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
            <Sun className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Got a Free Day?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us where you&apos;re based and what you&apos;re in the mood
              for. We&apos;ll suggest the perfect day trip.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Plan a Day Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
