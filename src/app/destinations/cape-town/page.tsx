import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Mountain,
  Ship,
  Coffee,
  Camera,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sun,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cape Town — ArcTravel",
  description:
    "Stunning coastal city with Table Mountain, vibrant waterfront, wine country, and incredible beaches. Plan your Cape Town trip with ArcTravel.",
};

const highlights = [
  {
    icon: Mountain,
    title: "Table Mountain & the Peaks",
    description:
      "Ride the cableway or hike up Table Mountain, Lion's Head, or Signal Hill for panoramic views of the city and ocean.",
  },
  {
    icon: Ship,
    title: "Cape Point & the Peninsula",
    description:
      "Drive the scenic Chapman's Peak route to Cape Point, where the Atlantic and Indian Oceans meet. Penguins at Boulders Beach included.",
  },
  {
    icon: Coffee,
    title: "Winelands Tour",
    description:
      "Explore Stellenbosch, Franschhoek, and Paarl — world-class wine estates, cellar tours, and farm-to-table dining.",
  },
  {
    icon: Camera,
    title: "Waterfront & City Life",
    description:
      "The V&A Waterfront offers shopping, dining, museums, and harbour cruises. Don't miss the Zeitz MOCAA art museum.",
  },
];

const tips = [
  "Best time: November to March (summer — warm, sunny, perfect beach weather)",
  "Book Table Mountain cableway tickets online in advance to avoid queues",
  "Rent a car for the Cape Peninsula — it's the best way to explore at your own pace",
  "Try a Cape Malay cooking class in the Bo-Kaap neighbourhood",
  "South Africa requires a valid passport with at least 2 blank pages",
];

export default function CapeTownPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#2a5a7c] to-[#1a4a6c] py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <MapPin className="h-3 w-3" />
              South Africa — Western Cape
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Cape Town</h1>
            <p className="mt-4 text-lg text-white/75">Stunning coastal city with Table Mountain, vibrant waterfront, wine country, and incredible beaches.</p>
            <Link href="/book" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Plan Your Trip <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">What to Do in Cape Town</h2>
          <p className="mt-2 text-center text-muted-foreground">Mountains, coastlines, vineyards, and urban energy</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <h.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sun className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">Travel Tips</h2>
            </div>
            <ul className="space-y-3">
              {tips.map((t) => (<li key={t} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-sm text-muted-foreground">{t}</span></li>))}
            </ul>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-8 text-center sm:p-12">
            <Mountain className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">Ready for Cape Town?</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Tell us your dates and interests — we'll arrange flights, accommodation, tours, and transport.</p>
            <Link href="/book"><Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">Start Planning</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
