import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Mountain,
  TreePalm,
  Camera,
  Coffee,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sun,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Eastern Highlands — ArcTravel",
  description:
    "Lush mountains, waterfalls, and tea estates in Zimbabwe's Eastern Highlands. Perfect for nature lovers and hikers.",
};

const highlights = [
  {
    icon: Mountain,
    title: "Nyanga National Park",
    description:
      "Zimbabwe's highest terrain — Mount Nyangani, trout-filled rivers, montane forest, and spectacular viewpoints.",
  },
  {
    icon: TreePalm,
    title: "Tea Estates & Botanical Gardens",
    description:
      "Visit rolling tea plantations, the historic Bvumba Botanical Gardens, and forest reserves.",
  },
  {
    icon: Camera,
    title: "Chimanimani Mountains",
    description:
      "Rugged peaks, crystal-clear rivers, and lush valleys — a paradise for serious hikers and photographers.",
  },
  {
    icon: Coffee,
    title: "Lodges & Retreats",
    description:
      "Cozy mountain lodges, forest cottages, and trout-fishing resorts — perfect for a weekend getaway.",
  },
];

const tips = [
  "Best time to visit: April to September (cool, dry, clear skies)",
  "Pack warm clothing — the highlands can get chilly, especially in winter (June-August)",
  "Hiking boots essential for Nyanga and Chimanimani trails",
  "Book accommodation in advance during school holidays and public holidays",
  "Perfect for a long weekend — 3 to 4 hours drive from Harare",
];

export default function EasternHighlandsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b4d2e] via-[#2d6b45] to-[#1f5a37] py-20 sm:py-24">
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)"
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <MapPin className="h-3 w-3" />
              Zimbabwe — Manicaland Province
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Eastern Highlands
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Lush mountains, waterfalls, and tea estates — perfect for nature
              lovers and hikers.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Explore the Highlands
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            What to See &amp; Do
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            From mountain peaks to tea fields
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <h.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sun className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">Travel Tips</h2>
            </div>
            <ul className="space-y-3">
              {tips.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-8 text-center sm:p-12">
            <Mountain className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready to Escape to the Mountains?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your dates and preferences — we&apos;ll arrange transport,
              accommodation, and trail guides.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Book Your Getaway
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
