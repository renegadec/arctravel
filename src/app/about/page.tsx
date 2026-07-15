import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Plane, Compass, Heart, Award } from "lucide-react";

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
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About ArcTravel
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We exist to make travel effortless — whether you&apos;re flying
              across the continent or planning a weekend getaway.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Story */}
            <div className="flex items-start gap-4">
              <div className="hidden shrink-0 sm:block">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Plane className="h-6 w-6" />
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
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center">
                What We Stand For
              </h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {values.map((v) => (
                  <div key={v.title} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <v.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-xl bg-primary/5 p-8 text-center">
              <h2 className="text-xl font-bold">
                Ready to plan your next trip?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get in touch and let&apos;s build your perfect itinerary.
              </p>
              <Link href="/contact">
                <Button className="mt-6">Get a Free Quote</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
