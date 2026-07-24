import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  Phone,
} from "lucide-react";
import GlobeWrapper from "./GlobeWrapper";

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

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text + Search */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
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
              Flights, hotels, visas, tours, car hire, B&amp;Bs — tell us where
              you&apos;re going and we&apos;ll take care of the rest.
            </p>

            {/* Search Panel — GearBox-inspired */}
            <div
              className="mt-8 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  {/* Destination */}
                  <div className="flex-1">
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/60">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-3 text-sm text-white placeholder:text-white/40 backdrop-blur-sm outline-none transition-all focus:border-[#ff8912]/60 focus:bg-white/[0.15] focus:ring-1 focus:ring-[#ff8912]/30"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex-1">
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/60">
                      Travel Dates
                    </label>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        type="text"
                        placeholder="Select dates"
                        className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-3 text-sm text-white placeholder:text-white/40 backdrop-blur-sm outline-none transition-all focus:border-[#ff8912]/60 focus:bg-white/[0.15] focus:ring-1 focus:ring-[#ff8912]/30"
                      />
                    </div>
                  </div>

                  {/* Travelers */}
                  <div className="w-full sm:w-32">
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/60">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        type="text"
                        placeholder="2 Adults"
                        className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-3 text-sm text-white placeholder:text-white/40 backdrop-blur-sm outline-none transition-all focus:border-[#ff8912]/60 focus:bg-white/[0.15] focus:ring-1 focus:ring-[#ff8912]/30"
                      />
                    </div>
                  </div>

                  {/* Search CTA */}
                  <Link href="/book?source=hero" className="w-full sm:w-auto">
                    <Button className="h-11 w-full rounded-xl bg-[#ff8912] px-6 text-sm font-semibold text-white shadow-lg shadow-[#ff8912]/30 hover:bg-[#e67a00] active:scale-[0.97] transition-all cursor-pointer">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div
              className="mt-5 flex animate-slide-up items-center justify-center gap-2 text-sm text-white/60 lg:justify-start"
              style={{ animationDelay: "0.25s" }}
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
              className="mt-3 flex animate-slide-up items-center justify-center gap-1.5 text-sm text-white/50 lg:justify-start"
              style={{ animationDelay: "0.3s" }}
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

          {/* Right: Globe */}
          <div className="max-lg:hidden flex items-center justify-center lg:justify-end">
            <div className="h-[480px] w-[480px] sm:h-[560px] sm:w-[560px]">
              <GlobeWrapper />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
