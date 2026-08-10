import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Send, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/constants";

// 🔁 Real ArcTravel photo (wide, 16:9-ish landscape crop).
const ctaImage = "/images/cta-background.jpg";

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background photo */}
      <Image
        src={ctaImage}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      {/* Navy gradient overlay for depth + readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#001b42]/95 via-[#002a62]/90 to-[#0a2440]/75" />
      {/* Warm glow from below */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#ff8912]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Plan Your Trip?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Tell us where you want to go, and we&apos;ll handle the rest. Get
              a free, no-obligation quote today.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="accent" className="w-full sm:w-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="glass" className="w-full sm:w-auto"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/70">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              {contactInfo.phone}
            </a>
            <span className="text-white/25">|</span>
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
