import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

// 🔁 SWAP THESE IMAGES with your own destination photos (3:4 or 4:3 crops work).
// Drop files in /public/images/ and use e.g. image: "/images/vic-falls.jpg"
const tileImages: Record<string, string> = {
  "Victoria Falls": "/images/featured/victoria-falls.jpg",
  "Hwange National Park": "/images/featured/hwange.jpg",
  "Cape Town": "/images/featured/capetown.jpg",
  "Diani Beach": "/images/featured/diani-beach.jpg",
  Dubai: "/images/featured/dubai.jpg",
};

const tiles = [
  {
    name: "Victoria Falls",
    country: "Zimbabwe",
    href: "/destinations/victoria-falls",
    description:
      "One of the Seven Natural Wonders of the World — mist, rainbows, and the mighty Zambezi.",
    size: "lg:col-span-3",
    imageHeight: "h-64 sm:h-72",
  },
  {
    name: "Hwange National Park",
    country: "Zimbabwe",
    href: "/destinations/hwange-national-park",
    description:
      "Zimbabwe's largest game reserve — elephants, lions, and some of Africa's best wildlife viewing.",
    size: "lg:col-span-3",
    imageHeight: "h-64 sm:h-72",
  },
  {
    name: "Cape Town",
    country: "South Africa",
    href: "/destinations/cape-town",
    description:
      "Table Mountain, the waterfront, and endless ocean views.",
    size: "lg:col-span-2",
    imageHeight: "h-56 sm:h-64",
  },
  {
    name: "Diani Beach",
    country: "Kenya",
    href: "/destinations/diani-beach",
    description:
      "White-sand beaches, coral reefs, and easy-going Indian Ocean life.",
    size: "lg:col-span-2",
    imageHeight: "h-56 sm:h-64",
  },
  {
    name: "Dubai",
    country: "UAE",
    href: "/destinations/dubai",
    description:
      "Desert safaris, sky-high views, and world-class shopping.",
    size: "lg:col-span-2",
    imageHeight: "h-56 sm:h-64",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="bg-[#faf9f6] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              Explore
            </p>
            <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
              Featured Destinations
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Hand-picked escapes we know and love — from Zimbabwe&apos;s
              wonders to Africa&apos;s icons and global hotspots.
            </p>
          </div>
          <Link
            href="/destinations"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#ff8912] transition-colors hover:text-[#e67a00]"
          >
            View all destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-6 lg:grid-rows-2">
          {tiles.map((tile) => (
            <Link
              key={tile.name}
              href={tile.href}
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#002a62]/10 ${tile.size}`}
            >
              <div className={`relative overflow-hidden ${tile.imageHeight}`}>
                <Image
                  src={tileImages[tile.name]}
                  alt={`${tile.name} — plan your trip with Arc Travel & Tours`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Country badge */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <MapPin className="h-3 w-3 text-[#ff8912]" />
                  {tile.country}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#002a62] transition-colors group-hover:text-[#ff8912]">
                  {tile.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
                  {tile.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff8912]">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
