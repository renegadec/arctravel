import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Landmark,
  Mountain,
  Camera,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sun,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Great Zimbabwe — ArcTravel",
  description:
    "Ancient stone ruins and UNESCO World Heritage site. Discover the history and culture of Great Zimbabwe with ArcTravel.",
};

const highlights = [
  {
    icon: Landmark,
    title: "The Great Enclosure",
    description:
      "The largest ancient stone structure in sub-Saharan Africa — a magnificent dry-stone wall complex dating to the 11th century.",
  },
  {
    icon: Mountain,
    title: "Hill Complex",
    description:
      "The oldest part of the ruins, perched on a granite hill with panoramic views and evidence of early Shona civilisation.",
  },
  {
    icon: Camera,
    title: "Museum & Interpretive Centre",
    description:
      "Learn about the history, artefacts, and significance of Great Zimbabwe through well-curated exhibits.",
  },
  {
    icon: Sun,
    title: "Guided Cultural Tours",
    description:
      "Walk the site with a local guide who brings the history to life — stories of kings, trade routes, and daily life.",
  },
];

const tips = [
  "Located near Masvingo city — approximately 4 hours' drive from Harare or Bulawayo",
  "Best visited between May and September (cool, dry weather)",
  "Wear comfortable walking shoes — the site covers a large area with uneven terrain",
  "Guided tours are strongly recommended to fully appreciate the history",
  "Combine with a trip to Lake Mutirikwi or Kyle Dam for a full weekend",
];

export default function GreatZimbabwePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5a3d1a] via-[#7a5533] to-[#6b4a28] py-20 sm:py-24">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px)"
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <MapPin className="h-3 w-3" />
              Zimbabwe — Masvingo Province
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Great Zimbabwe
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Ancient stone ruins and UNESCO World Heritage site, rich with
              history and culture.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Visit Great Zimbabwe
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
            Explore the Ruins
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Walk through a thousand years of history
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
            <Landmark className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Step Into History
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us when you&apos;d like to visit and whether you need
              transport and accommodation arranged.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Plan Your Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
