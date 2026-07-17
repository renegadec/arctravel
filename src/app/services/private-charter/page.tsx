import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Helicopter,
  Briefcase,
  HeartPulse,
  Mountain,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Private Charter Flights — ArcTravel",
  description:
    "Private air charters for executive travel, emergency evacuation, and accessing remote destinations on your schedule.",
};

const useCases = [
  {
    icon: Briefcase,
    title: "Executive & Corporate Travel",
    description:
      "Time-sensitive business trips, board meetings, and executive transfers — arrive ready, not rushed.",
  },
  {
    icon: HeartPulse,
    title: "Medical Evacuation",
    description:
      "Emergency medical airlifts coordinated with your insurance or healthcare provider.",
  },
  {
    icon: Mountain,
    title: "Remote Destination Access",
    description:
      "Reach safari camps, mining sites, conservation areas, and lodges not served by scheduled flights.",
  },
  {
    icon: Users,
    title: "Group & Event Charters",
    description:
      "Fly your whole group together — weddings, conferences, sporting teams, and film crews.",
  },
];

const perks = [
  "Fly on your schedule — no waiting for commercial flights",
  "Access to private terminals and faster boarding",
  "Direct routing to your destination",
  "Flexible aircraft options (light jet to turboprop)",
  "Dedicated flight coordinator for every charter",
  "Comprehensive safety records on all operators we book",
];

export default function PrivateCharterPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Helicopter className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Private Charter Flights
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Private air charters for executive travel, emergency evacuation,
              or accessing remote destinations — on your schedule.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Request a Charter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            When to Charter
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Private aviation makes sense in more situations than you might think
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <u.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{u.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {u.description}
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
              <h2 className="text-2xl font-bold">Why Charter Through Us?</h2>
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
            <Helicopter className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready to Fly Private?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your departure point, destination, and preferred date.
              We&apos;ll source options and get back to you within hours.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Enquire Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
