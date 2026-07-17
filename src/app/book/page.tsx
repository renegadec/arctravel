import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Plane, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book Your Trip — ArcTravel",
  description:
    "Tell us what you need — flights, accommodation, tours, or a full package. We'll build a quote and get back to you within 24 hours.",
};

const perks = [
  "Free consultation & quote — no obligation",
  "Personal travel coordinator assigned to you",
  "Response within 24 hours",
  "Flexible payment options available",
];

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002a62] via-[#002a62]/95 to-[#1a3a5c] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85">
              <Plane className="h-3.5 w-3.5" />
              Start your travel journey here
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Book Your Trip
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Tell us what you need and we&apos;ll build a personalised quote
              within 24 hours. No obligation, just great travel advice.
            </p>
          </div>
        </div>
      </section>

      {/* Booking form section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-bold">Tell Us About Your Trip</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;ll get back to you within 24 hours with options and a
              quote
            </p>
            <div className="mt-8">
              <Suspense fallback={<div className="flex items-center justify-center py-10"><div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#ff8912]" /></div>}>
                <BookingForm />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted/30 p-6 sm:col-span-2">
              <h3 className="font-semibold">What happens next?</h3>
              <ol className="mt-4 space-y-4">
                {[
                  {
                    step: "1",
                    title: "We review your request",
                    desc: "Your details go to a travel coordinator who reviews your needs.",
                  },
                  {
                    step: "2",
                    title: "We build options",
                    desc: "We research the best flights, accommodation, and activities for your trip.",
                  },
                  {
                    step: "3",
                    title: "You get a quote",
                    desc: "Within 24 hours, you receive a detailed quote with options to choose from.",
                  },
                  {
                    step: "4",
                    title: "You confirm & we book",
                    desc: "Accept the quote and we handle all bookings and confirmations.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <p className="text-sm font-medium">Why book with ArcTravel?</p>
                </div>
                <ul className="mt-3 space-y-2">
                  {perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-5 text-center">
                <Clock className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-2 text-sm font-medium">Prefer to chat?</p>
                <p className="text-xs text-muted-foreground">
                  Reach us directly on WhatsApp
                </p>
                <Link href="https://wa.me/263786577594" target="_blank">
                  <Button
                    size="sm"
                    className="mt-3 w-full bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                  >
                    WhatsApp Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
