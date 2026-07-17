import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Bus,
  Train,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Users,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ground Transportation — ArcTravel",
  description:
    "Reliable intercity and regional ground transport — buses, shuttles, and private transfers across Zimbabwe and SADC.",
};

const options = [
  {
    icon: Bus,
    title: "Intercity Buses",
    description:
      "Comfortable coach services connecting Harare, Bulawayo, Mutare, Masvingo, Victoria Falls, and more.",
  },
  {
    icon: Users,
    title: "Private Shuttles",
    description:
      "Door-to-door shuttle service for groups — ideal for family reunions, wedding guests, and corporate teams.",
  },
  {
    icon: Train,
    title: "Rail Travel",
    description:
      "Scenic rail journeys within Zimbabwe and cross-border — including the iconic Beitbridge Bulawayo line.",
  },
  {
    icon: MapPin,
    title: "Cross-Border Transport",
    description:
      "Organised overland travel to Zambia, Botswana, South Africa, Mozambique, and other SADC destinations.",
  },
];

const features = [
  "Pre-booked seating — no queuing",
  "Well-maintained vehicles with AC",
  "Professional, licensed drivers",
  "Flexible pick-up and drop-off points",
  "Real-time tracking available on select routes",
  "24/7 support during your journey",
];

export default function GroundTransportationPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Bus className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ground Transportation
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Reliable and comfortable road transport for transfers, intercity
              travel, and group movements.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Book Transport
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">Getting Around</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Whatever your ground transport needs, we&apos;ve got you covered
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {options.map((o) => (
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

      {/* Features */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">
                Why Book Ground Transport With Us?
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
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">
            Need to Get Somewhere?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tell us your route and we&apos;ll arrange the smoothest ride.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
              Arrange Transport
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
