import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Star,
  Phone,
  MapPin,
  Compass,
  TreePine,
  Building,
  Palmtree,
  ArrowRight,
} from "lucide-react";

const destinationPrompts = [
  {
    name: "Victoria Falls",
    href: "/destinations/victoria-falls",
    icon: Compass,
    desc: "One of the 7 Natural Wonders",
  },
  {
    name: "Hwange",
    href: "/destinations/hwange-national-park",
    icon: TreePine,
    desc: "Zimbabwe's largest game reserve",
  },
  {
    name: "Cape Town",
    href: "/destinations/cape-town",
    icon: Building,
    desc: "Table Mountain & vibrant waterfront",
  },
  {
    name: "Dubai",
    href: "/destinations/dubai",
    icon: Palmtree,
    desc: "Desert safaris & world-class shopping",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#002a62] via-[#002a62]/95 to-[#1a3a5c]">
      {/* Animated gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 animate-gradient opacity-60"
        style={{
          background:
            "linear-gradient(-45deg, #002a62, #003d82, #0050a0, #002a62)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Decorative grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow accents */}
      <div className="pointer-events-none absolute right-[10%] top-[15%] hidden h-72 w-72 rounded-full bg-[#ff8912]/10 blur-3xl lg:block" />
      <div className="pointer-events-none absolute bottom-[10%] left-[8%] hidden h-48 w-48 rounded-full bg-white/5 blur-3xl lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Airplane image */}
          <div className="relative order-2 flex items-center justify-center lg:order-1 lg:justify-start">
            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl sm:h-[480px] lg:h-[600px]">
              <img
                src="/hero_image.png"
                alt="Airplane flying above clouds"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text + Destination Prompts */}
          <div className="order-1 mx-auto w-full max-w-xl text-center lg:order-2 lg:mx-0 lg:text-left">
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex w-fit animate-slide-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85 lg:mx-0">
              <span className="h-2 w-2 rounded-full bg-[#ff8912] animate-pulse-glow" />
              Zimbabwe&apos;s trusted travel partner
            </div>

            {/* Heading */}
            <h1
              className="animate-slide-up text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              Your Next Adventure
              <br />
              <span className="text-[#ff8912]">Starts Here.</span>
            </h1>

            {/* Subtext */}
            <p
              className="mt-4 animate-slide-up text-base leading-relaxed text-white/70 sm:text-lg"
              style={{ animationDelay: "0.15s" }}
            >
              Flights, hotels, visas, tours, car hire — tell us where
              you&apos;re going and we&apos;ll take care of the rest.
            </p>

            {/* Destination Prompts */}
            <div
              className="mt-8 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <p className="mb-3 text-left text-xs font-medium uppercase tracking-wider text-white/50">
                Where to next?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {destinationPrompts.map((dest) => (
                  <Link
                    key={dest.name}
                    href={dest.href}
                    className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-sm transition-all hover:border-[#ff8912]/50 hover:bg-white/[0.18] hover:shadow-lg hover:shadow-[#ff8912]/5 active:scale-[0.97]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff8912]/15 text-[#ff8912] transition-colors group-hover:bg-[#ff8912]/25">
                      <dest.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-white transition-colors group-hover:text-[#ff8912]">
                        {dest.name}
                      </p>
                      <p className="text-[11px] leading-tight text-white/50">
                        {dest.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#ff8912]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div
              className="mt-5 flex animate-slide-up flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
              style={{ animationDelay: "0.25s" }}
            >
              <Link href="/book" className="w-full sm:w-auto">
                <Button className="h-11 w-full rounded-xl bg-[#ff8912] px-6 text-sm font-semibold text-white shadow-lg shadow-[#ff8912]/30 hover:bg-[#e67a00] active:scale-[0.97] transition-all cursor-pointer sm:w-auto">
                  Plan Your Trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/destinations">
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-xl border-white/20 bg-white/5 px-6 text-sm font-medium text-white hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer sm:w-auto"
                >
                  Explore Destinations
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="mt-4 flex animate-slide-up items-center justify-center gap-2 text-sm text-white/60 lg:justify-start"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-[#ff8912] text-[#ff8912]"
                  />
                ))}
              </div>
              <span>Trusted by travellers across Zimbabwe</span>
            </div>

            {/* Quick contact */}
            <div
              className="mt-2 flex animate-slide-up items-center justify-center gap-1.5 text-sm text-white/50 lg:justify-start"
              style={{ animationDelay: "0.35s" }}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Or call us: </span>
              <a
                href="tel:+263786577594"
                className="font-medium text-white/70 hover:text-white transition-colors"
              >
                078 657 7594
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
