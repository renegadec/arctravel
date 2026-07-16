import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Home,
  Hotel,
  TreePalm,
  Wifi,
  Coffee,
  Bath,
  Car,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Accommodation — ArcTravel",
  description:
    "Hotels, lodges, resorts, and B&Bs across Zimbabwe and beyond. Curated stays for every budget and style.",
};

const categories = [
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    description:
      "From city hotels to beach resorts — we find the best rates and locations for your stay.",
  },
  {
    icon: Home,
    title: "B&Bs & Guesthouses",
    description:
      "Charming, affordable, and personal. Perfect for travellers who want a home-away-from-home experience.",
  },
  {
    icon: Building2,
    title: "Lodges",
    description:
      "Boutique safari lodges, bush camps, and eco-lodges for an immersive wilderness experience.",
  },
  {
    icon: TreePalm,
    title: "Self-Catering & Villas",
    description:
      "Full apartments, cottages, and villas with kitchen facilities — ideal for families and longer stays.",
  },
];

const perks = [
  "Best rate guarantee",
  "Honest reviews from our team's first-hand visits",
  "Flexible cancellation on most properties",
  "Special rates for corporate and group bookings",
  "Airport transfer add-on available",
  "Late checkout requests handled for you",
];

export default function AccommodationPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Building2 className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Places to Stay
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Hotels, lodges, B&amp;Bs, and self-catering — we&apos;ll find the
              perfect place for your budget and style.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Find Accommodation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            Types of Accommodation
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Whatever your travel style, we&apos;ve got somewhere for you
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{cat.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured options visual note */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">Why Book Through Us?</h2>
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

      {/* B&B Highlight */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-8 text-center sm:p-12">
            <Home className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Looking for a B&amp;B?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              We work with handpicked B&amp;Bs and guesthouses across Zimbabwe
              — affordable, welcoming, and full of local character.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Browse B&amp;Bs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
