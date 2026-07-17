import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Mountain,
  Camera,
  TreePalm,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guided Tours — ArcTravel",
  description:
    "Expert-led tours across Zimbabwe, Southern Africa, and beyond — from wildlife safaris to cultural experiences.",
};

const tourTypes = [
  {
    icon: Mountain,
    title: "Wildlife Safaris",
    description:
      "Game drives, walking safaris, and photographic tours in Hwange, Mana Pools, Gonarezhou, and more.",
  },
  {
    icon: TreePalm,
    title: "Cultural & Heritage Tours",
    description:
      "Explore Great Zimbabwe, Matobo Hills, traditional villages, and living museums with knowledgeable guides.",
  },
  {
    icon: Camera,
    title: "Photography Tours",
    description:
      "Specialist-led photography expeditions timed for the best light and wildlife activity.",
  },
  {
    icon: Compass,
    title: "Adventure & Hiking",
    description:
      "Guided hikes through the Eastern Highlands, Chimanimani, Nyanga, and Victoria Falls gorges.",
  },
];

const perks = [
  "Knowledgeable local guides — not scripted, they live this",
  "Small groups for a more personal experience",
  "Safety-focused — all guides are first-aid trained",
  "Custom itineraries built around your interests",
  "Transport included from your accommodation",
  "Sustainability-minded — we respect communities and wildlife",
];

export default function GuidedToursPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Compass className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Guided Tours
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Expert-led tours across Zimbabwe, Southern Africa, and beyond —
              from wildlife safaris to cultural experiences.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Book a Tour
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tour types */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">Tours We Offer</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Experiences led by people who know the terrain
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {tourTypes.map((t) => (
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
              <h2 className="text-2xl font-bold">Why Tour With Us?</h2>
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
            <Compass className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready for an Adventure?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us what kind of experience you&apos;re looking for, and
              we&apos;ll match you with the perfect tour.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Find a Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
