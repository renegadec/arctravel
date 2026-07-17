import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Building,
  Presentation,
  Users,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Events — ArcTravel",
  description:
    "End-to-end corporate event travel management — conferences, retreats, incentive trips, and team building.",
};

const offerings = [
  {
    icon: Presentation,
    title: "Conferences & Seminars",
    description:
      "Venue sourcing, delegate travel, accommodation blocks, and on-site coordination for your events.",
  },
  {
    icon: Users,
    title: "Incentive & Reward Trips",
    description:
      "Curated reward experiences for top performers — from luxury lodges to international destinations.",
  },
  {
    icon: Building,
    title: "Corporate Retreats",
    description:
      "Strategy sessions, team-building, and leadership retreats at venues designed for focus and connection.",
  },
  {
    icon: MapPin,
    title: "Site Visits & Field Trips",
    description:
      "Logistics for project site visits, supplier meetings, and field operations for your teams.",
  },
];

const perks = [
  "Dedicated corporate travel coordinator",
  "Corporate credit terms available (subject to approval)",
  "Group booking rates on flights and accommodation",
  "Seamless billing — single invoice per event",
  "On-site support during the event",
  "Post-event reporting and expense reconciliation",
];

export default function CorporateEventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Building className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Corporate Events
            </h1>
            <p className="mt-4 text-lg text-white/75">
              End-to-end corporate event travel management — conferences,
              retreats, incentive trips, and team building.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Plan Your Event
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            What We Handle
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Corporate travel support at every level
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{o.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {o.description}
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
                Why Partner With Us?
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
            <Building className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Planning a Corporate Event?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us the type of event, expected attendance, and preferred
              dates. We&apos;ll handle the logistics.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
