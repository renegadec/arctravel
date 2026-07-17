import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Users,
  Heart,
  PartyPopper,
  Church,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Group Tour Packages — ArcTravel",
  description:
    "Tailored group travel for families, friends, corporates, and organisations. We handle everything from transport to accommodation to activities.",
};

const groupTypes = [
  {
    icon: Users,
    title: "Family & Friends Groups",
    description:
      "Multi-generational family holidays, reunion trips, and friend getaways — custom itineraries for your group size.",
  },
  {
    icon: Heart,
    title: "Honeymoon & Couples Groups",
    description:
      "Romantic group travel with like-minded couples. Shared experiences and activities with private downtime built in.",
  },
  {
    icon: PartyPopper,
    title: "Special Occasion Groups",
    description:
      "Birthday trips, milestone celebrations, bachelor/bachelorette weekends — we plan the party and the travel.",
  },
  {
    icon: Church,
    title: "Church & Community Groups",
    description:
      "Faith-based tours, choir trips, mission travel, and community group getaways with purpose-built itineraries.",
  },
];

const perks = [
  "Dedicated group coordinator from booking to return",
  "Custom itineraries — no cookie-cutter packages",
  "Group discounts on transport, accommodation, and activities",
  "Flexible payment plans for group members",
  "Private transport for the whole group",
  "Trip insurance options for every participant",
];

export default function GroupToursPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Group Tour Packages
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Tailored group travel for families, friends, corporates, and
              organisations — we handle everything.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Plan a Group Tour
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Group types */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            Tours for Every Group
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            No group is too big or too specific
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {groupTypes.map((g) => (
              <div
                key={g.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {g.description}
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
              <h2 className="text-2xl font-bold">Why Travel as a Group?</h2>
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
            <Users className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Planning a Group Trip?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us the size of your group, preferred destination, and rough
              dates. We&apos;ll build a proposal around your group.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Get a Group Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
