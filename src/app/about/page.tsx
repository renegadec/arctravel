import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Plane,
  Compass,
  Heart,
  Award,
  Globe,
  Users,
  Headphones,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — ArcTravel",
  description:
    "ArcTravel is a full-service travel agency based in Zimbabwe, dedicated to making travel effortless for individuals, families, and businesses.",
};

const values = [
  {
    icon: Compass,
    title: "Local Expertise",
    text: "We know Zimbabwe and Southern Africa inside out. Our team has lived, worked, and travelled extensively across the region.",
  },
  {
    icon: Heart,
    title: "Client First",
    text: "Your trip is personal. We listen carefully, communicate clearly, and deliver exactly what you need — no surprises.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "From the first inquiry to post-trip follow-up, we hold ourselves to a high standard of service and reliability.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    text: "Through our network of partners, we can arrange travel to virtually any destination worldwide, not just Africa.",
  },
  {
    icon: Users,
    title: "Personal Service",
    text: "You deal with real people, not an automated system. Every inquiry gets a personal response from our team.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Travel doesn't stick to office hours. We're available throughout your trip for any issues or changes.",
  },
];

const stats = [
  { number: "500+", label: "Trips Planned" },
  { number: "30+", label: "Destinations" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "5+", label: "Years Experience" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002a62] via-[#002a62]/95 to-[#1a3a5c] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85">
              <Plane className="h-3.5 w-3.5" />
              Our story
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About ArcTravel
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              We exist to make travel effortless — whether you&apos;re flying
              across the continent or planning a weekend getaway.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-accent">
                  {stat.number}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-6">
              <div className="hidden shrink-0 sm:block">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Plane className="h-7 w-7" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  ArcTravel was founded on a simple belief: travel should be
                  exciting, not exhausting. Too often, people spend more time
                  planning a trip than enjoying it — juggling flights,
                  accommodations, transfers, visas, and a dozen browser tabs.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  We built ArcTravel to change that. As a full-service travel
                  agency based in Zimbabwe, we handle every aspect of your
                  journey — from the first flight booking to the final transfer
                  home. Our team combines local knowledge with global reach,
                  ensuring you get the best options without the headache.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="mt-20">
              <div className="text-center">
                <h2 className="text-2xl font-bold">What We Stand For</h2>
                <p className="mt-2 text-muted-foreground">
                  Six principles that guide everything we do.
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-sm"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-8 sm:p-10">
              <div className="mx-auto max-w-lg text-center">
                <h2 className="text-xl font-bold">
                  Ready to plan your next trip?
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Get in touch and let&apos;s build your perfect itinerary. No
                  obligation, just great advice.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link href="/contact">
                    <Button className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                      Get a Free Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" className="active:scale-[0.97] transition-all cursor-pointer">
                      Explore Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
