import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Phone } from "lucide-react";
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

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex animate-slide-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85">
              <span className="h-2 w-2 rounded-full bg-[#ff8912] animate-pulse-glow" />
              Zimbabwe&apos;s trusted travel partner
            </div>

            {/* Heading */}
            <h1
              className="animate-slide-up text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              You Plan The Trip.
              <br />
              <span className="text-[#ff8912]">We Handle Everything Else.</span>
            </h1>

            {/* Subtext */}
            <p
              className="mt-5 animate-slide-up text-lg leading-relaxed text-white/70"
              style={{ animationDelay: "0.2s" }}
            >
              Flights, hotels, visas, tours, car hire, B&amp;Bs — tell us where
              you&apos;re going and we&apos;ll take care of the rest.
            </p>

            {/* Social proof */}
            <div
              className="mt-6 flex animate-slide-up items-center gap-2 text-sm text-white/60"
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

            {/* Buttons */}
            <div
              className="mt-8 flex animate-slide-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-[#ff8912] text-white text-sm sm:text-base shadow-lg shadow-[#ff8912]/25 hover:bg-[#e67a00] active:scale-[0.97] transition-all cursor-pointer"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 backdrop-blur-sm active:scale-[0.97] transition-all cursor-pointer"
                >
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Quick contact line */}
            <div
              className="mt-6 flex animate-slide-up items-center gap-1.5 text-sm text-white/50"
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
