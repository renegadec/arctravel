import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Mountain,
  Ship,
  Compass,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sun,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Victoria Falls — ArcTravel",
  description:
    "One of the Seven Natural Wonders of the World — discover Victoria Falls with ArcTravel. Tours, accommodation, activities, and more.",
};

const highlights = [
  {
    icon: Droplets,
    title: "The Falls",
    description:
      "View the world's largest sheet of falling water from multiple vantage points — including the iconic Knife Edge Bridge.",
  },
  {
    icon: Ship,
    title: "Zambezi Sunset Cruise",
    description:
      "A classic Vic Falls experience. Cruise the Zambezi with drinks, snacks, and Africa's best sunset.",
  },
  {
    icon: Mountain,
    title: "Adventure Activities",
    description:
      "Bungee jumping, white-water rafting, zip-lining, helicopter flips, and gorge swings — for the thrill-seekers.",
  },
  {
    icon: Compass,
    title: "Wildlife & Safari",
    description:
      "Game drives in Zambezi National Park, walking safaris, and rhino tracking — all within reach of town.",
  },
];

const tips = [
  "Best time to visit: March to May (high water — dramatic falls) or June to August (clear views, moderate water)",
  "Visa required on arrival for most nationalities (US$50 single entry, US$75 multiple)",
  "Pack light clothing and a raincoat — the spray from the falls soaks everything",
  "Book activities in advance during peak season (July-October)",
  "Both Zimbabwe and Zambia sides offer different views — we can arrange both",
];

export default function VictoriaFallsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3d2e] via-[#0f5a42] to-[#0d4a36] py-20 sm:py-24">
        {/* Spray effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <MapPin className="h-3 w-3" />
              Zimbabwe — Matabeleland North
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Victoria Falls
            </h1>
            <p className="mt-4 text-lg text-white/75">
              One of the Seven Natural Wonders of the World — a must-visit for
              every traveller.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Plan Your Visit
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
            What to Do in Victoria Falls
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            More than just the waterfall
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

      {/* Travel tips */}
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
            <Droplets className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready to Experience the Falls?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your dates, group size, and interests. We&apos;ll build
              the perfect Victoria Falls itinerary.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Start Planning
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
