import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  TreePalm,
  Eye,
  Camera,
  Compass,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sun,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hwange National Park — ArcTravel",
  description:
    "Zimbabwe's largest game reserve, home to over 100 mammal species and 400 bird species. Plan your safari with ArcTravel.",
};

const highlights = [
  {
    icon: Eye,
    title: "Elephant & Wildlife Viewing",
    description:
      "Hwange has one of Africa's largest elephant populations — plus lion, leopard, buffalo, wild dog, and over 400 bird species.",
  },
  {
    icon: TreePalm,
    title: "Game Drives & Walking Safaris",
    description:
      "Morning, afternoon, and full-day game drives in open vehicles, plus guided walking safaris with experienced rangers.",
  },
  {
    icon: Camera,
    title: "Photographic Safaris",
    description:
      "Scheduled around the best light — sunrise and sunset drives offer incredible photography opportunities.",
  },
  {
    icon: Compass,
    title: "Lodges & Camping",
    description:
      "From luxury safari lodges to bush camps and self-catering chalets — options for every budget and style.",
  },
];

const tips = [
  "Best time to visit: July to October (dry season — animals concentrate around waterholes)",
  "Green season (November-March) offers lush scenery, migrant birds, and fewer crowds",
  "Pack neutral-coloured clothing, a good hat, sunscreen, and insect repellent",
  "Book accommodation well in advance for peak season (August-October)",
  "Malaria prophylaxis recommended — consult your doctor before travelling",
];

export default function HwangePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4a3520] via-[#6b4f30] to-[#5a4328] py-20 sm:py-24">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 80% 30%, rgba(255,200,100,0.4) 0%, transparent 50%)"
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <MapPin className="h-3 w-3" />
              Zimbabwe — Matabeleland North
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Hwange National Park
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Zimbabwe&apos;s largest game reserve, home to over 100 mammal
              species and 400 bird species.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Plan Your Safari
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
            Safari Experiences
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Get up close with Africa&apos;s incredible wildlife
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
            <TreePalm className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready for a Safari?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your dates, group size, and preferred accommodation style.
              We&apos;ll arrange everything.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Book a Safari
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
