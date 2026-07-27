import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { destinations } from "@/lib/constants";

// Pick the 4 most popular/marketable destinations
const featured = destinations.filter((d) =>
  [
    "Victoria Falls",
    "Hwange National Park",
    "Cape Town",
    "Dubai",
  ].includes(d.name)
);

const gradientBg: Record<string, string> = {
  "Victoria Falls":
    "from-emerald-800/80 via-emerald-600/30 to-cyan-900/80",
  "Hwange National Park": "from-amber-900/80 via-amber-700/30 to-yellow-900/80",
  "Cape Town": "from-sky-900/80 via-blue-600/30 to-indigo-900/80",
  Dubai: "from-orange-900/80 via-amber-600/30 to-yellow-800/80",
};

const gradientFg: Record<string, string> = {
  "Victoria Falls":
    "from-emerald-500/20 via-emerald-400/5 to-cyan-500/20",
  "Hwange National Park":
    "from-amber-500/20 via-amber-400/5 to-yellow-500/20",
  "Cape Town": "from-sky-500/20 via-blue-400/5 to-indigo-500/20",
  Dubai: "from-orange-500/20 via-amber-400/5 to-yellow-500/20",
};

export default function FeaturedDestinations() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ff8912]">
              Explore
            </span>
            <h2 className="mt-1.5 text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Destinations
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Hand-picked escapes we know and love — from Zimbabwe&apos;s
              wonders to Africa&apos;s icons and global hotspots.
            </p>
          </div>
          <Link
            href="/destinations"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-[#ff8912] transition-colors hover:text-[#e67a00]"
          >
            View all destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((dest) => (
            <Link
              key={dest.name}
              href={dest.href}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image area with gradient */}
              <div
                className={`relative flex h-52 items-end justify-start bg-gradient-to-br ${gradientBg[dest.name]} p-5`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradientFg[dest.name]}`}
                />
                {/* Decorative map pin */}
                <MapPin className="absolute right-4 top-4 h-5 w-5 text-white/30" />

                {/* Region badge */}
                <span className="relative z-10 rounded-full bg-black/30 px-2.5 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                  {dest.country}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold transition-colors group-hover:text-[#ff8912]">
                  {dest.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {dest.description}
                </p>

                {/* Bottom row */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#ff8912] text-[#ff8912]" />
                    <Star className="h-3.5 w-3.5 fill-[#ff8912] text-[#ff8912]" />
                    <Star className="h-3.5 w-3.5 fill-[#ff8912] text-[#ff8912]" />
                    <Star className="h-3.5 w-3.5 fill-[#ff8912] text-[#ff8912]" />
                    <Star className="h-3.5 w-3.5 fill-[#ff8912]/60 text-[#ff8912]/60" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#ff8912] opacity-0 transition-all group-hover:opacity-100">
                    Explore{" "}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
