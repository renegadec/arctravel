import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Phone, ArrowRight } from "lucide-react";

// ============================================================
// HERO DESTINATION TILES
// 🔁 SWAP THESE IMAGES with your own destination photos.
// Best crops: 3:4 portrait. Drop files in /public/images/
// and use e.g. image: "/images/vic-falls.jpg"
// ============================================================
const heroTiles = [
  {
    name: "Victoria Falls",
    href: "/destinations/victoria-falls",
    image: "/images/hero/victoria-falls.jpg",
  },
  {
    name: "Hwange Safari",
    href: "/destinations/hwange-national-park",
    image: "/images/hero/hwange.jpg",
  },
  {
    name: "Diani Beach",
    href: "/destinations/zanzibar",
    image: "/images/hero/diani-beach.jpg",
  },
  {
    name: "Cape Town",
    href: "/destinations/cape-town",
    image: "/images/hero/cape-town.jpg",
  },
  {
    name: "Dubai",
    href: "/destinations/dubai",
    image: "/images/hero/dubai.jpg",
  },
  {
    name: "Eastern Highlands",
    href: "/destinations/eastern-highlands",
    image: "/images/hero/eastern-highlands.jpg",
  },
];

// Column layout: each column's tiles + vertical stagger offset
const columns = [
  { tiles: [0, 1], offset: "pt-0 lg:pt-6" },
  { tiles: [2, 3], offset: "pt-6 lg:pt-24" },
  { tiles: [4, 5], offset: "pt-0 lg:pt-12" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6]">
      {/* Soft decorative glows */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] hidden h-96 w-96 rounded-full bg-[#ff8912]/10 blur-3xl lg:block" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] hidden h-96 w-96 rounded-full bg-[#002a62]/5 blur-3xl lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: Text + CTAs */}
          <div className="mx-auto w-full max-w-xl text-center lg:col-span-5 lg:mx-0 lg:text-left">
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex w-fit animate-slide-up items-center gap-2 rounded-full border border-[#002a62]/10 bg-[#002a62]/5 px-4 py-1.5 text-sm font-medium text-[#002a62] lg:mx-0">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-[#ff8912]" />
              Zimbabwe&apos;s trusted travel partner
            </div>

            {/* Heading */}
            <h1
              className="animate-slide-up text-4xl font-bold tracking-tight text-[#002a62] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
              style={{ animationDelay: "0.1s" }}
            >
              Your Next Adventure
              <br />
              <span className="text-[#ff8912]">Starts Here.</span>
            </h1>

            {/* Subtext */}
            <p
              className="mt-5 animate-slide-up text-base leading-relaxed text-slate-600 sm:text-lg"
              style={{ animationDelay: "0.15s" }}
            >
              Flights, hotels, visas, tours, car hire — tell us where
              you&apos;re going and we&apos;ll take care of the rest.
            </p>

            {/* CTA row */}
            <div
              className="mt-8 flex animate-slide-up flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
              style={{ animationDelay: "0.2s" }}
            >
              <Link href="/book" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  variant="accent" className="w-full sm:w-auto"
                >
                  Plan Your Trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/destinations" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full cursor-pointer rounded-xl border-[#002a62]/20 bg-white px-7 text-[#002a62] transition-all hover:bg-[#002a62]/5 active:scale-[0.97] sm:w-auto"
                >
                  Explore Destinations
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="mt-6 flex animate-slide-up items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#ff8912] text-[#ff8912]"
                  />
                ))}
              </div>
              <span>Trusted by travellers across Zimbabwe</span>
            </div>

            {/* Quick contact */}
            <div
              className="mt-2 flex animate-slide-up items-center justify-center gap-1.5 text-sm text-slate-500 lg:justify-start"
              style={{ animationDelay: "0.3s" }}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Or call us: </span>
              <a
                href="tel:+263786577594"
                className="font-semibold text-[#002a62] transition-colors hover:text-[#ff8912]"
              >
                078 657 7594
              </a>
            </div>
          </div>

          {/* Right: Destination image tiles */}
          <div className="animate-slide-up lg:col-span-7" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-start justify-center gap-3 sm:gap-4 lg:gap-5">
              {columns.map((col, i) => (
                <div key={i} className={`flex w-1/3 flex-col gap-3 sm:gap-4 lg:gap-5 ${col.offset}`}>
                  {col.tiles.map((tileIndex) => {
                    const tile = heroTiles[tileIndex];
                    return (
                      <Link
                        key={tile.name}
                        href={tile.href}
                        className="group relative block overflow-hidden rounded-2xl shadow-lg shadow-[#002a62]/10 ring-1 ring-black/5 transition-shadow hover:shadow-2xl hover:shadow-[#002a62]/20"
                      >
                        <div className="relative aspect-[3/4] w-full">
                          <Image
                            src={tile.image}
                            alt={`${tile.name} — plan your trip with ArcTravel`}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        {/* Hover overlay label */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-3 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:p-4">
                          <p className="flex items-center justify-between gap-2 text-sm font-semibold text-white">
                            {tile.name}
                            <ArrowRight className="h-4 w-4 shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5" />
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
