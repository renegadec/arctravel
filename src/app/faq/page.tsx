import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "./FAQAccordion";
import { contactInfo, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ — ArcTravel",
  description:
    "Answers to the questions our clients ask most: quotes, booking timelines, visas, payments, flight changes, and more.",
};

export default function FAQPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#002a62] py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff8912]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffb25e]">
              Good to know
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              The answers our clients ask for most. Anything else — just ask.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ACCORDION ================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* ================= STILL HAVE QUESTIONS? ================= */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#002a62] px-8 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff8912]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#ff8912]/10 blur-3xl" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Still have questions?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                Every trip is different. Tell us where you&apos;re headed and
                we&apos;ll answer the rest — quotes are free, no obligation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    variant="accent"
                    className="w-full sm:w-auto"
                  >
                    Ask Us a Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
