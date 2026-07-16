import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Send, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#ff8912] via-[#ff8912]/90 to-[#ff8912]/80">
      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #002a62 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Plan Your Trip?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Tell us where you want to go, and we&apos;ll handle the rest. Get
              a free, no-obligation quote today.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-[#002a62] text-white hover:bg-[#003d82] shadow-lg shadow-[#002a62]/25 active:scale-[0.97] transition-all group cursor-pointer"
              >
                <Send className="mr-2 h-4 w-4" />
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 backdrop-blur-sm active:scale-[0.97] transition-all cursor-pointer"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </Reveal>

        {/* Quick contact options */}
        <Reveal delay={250}>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/60">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              {contactInfo.phone}
            </a>
            <span className="text-white/20">|</span>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
