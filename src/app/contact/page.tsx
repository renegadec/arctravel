import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactInfo, socialLinks } from "@/lib/constants";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — ArcTravel",
  description:
    "Get in touch with ArcTravel for flight bookings, tours, visa assistance, and all your travel needs. We're here to help.",
};

const contactMethods = [
  {
    icon: Phone,
    label: "Call Us",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
    desc: "Available during business hours",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    desc: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: contactInfo.address,
    href: null,
    desc: "Office hours: Mon-Fri 8AM-5PM",
  },
];

const perks = [
  "Free consultation & quote",
  "Response within 24 hours",
  "WhatsApp support available",
  "No obligation to book",
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001b42] via-[#002a62] to-[#0a2440] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff8912]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85">
              <span className="h-2 w-2 rounded-full bg-[#ff8912]" />
              We&apos;re here to help
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Tell us about your travel plans and we&apos;ll get back to you
              within 24 hours — no obligation, just friendly advice.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="bg-[#faf9f6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Left: contact info */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                  Talk to a human
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#002a62] sm:text-3xl">
                  We&apos;re Ready When You Are
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Flights, hotels, visas, tours — one message and we&apos;ll
                  come back with a plan. No call centres, no automated menus.
                </p>
              </div>

              {/* Contact methods */}
              <div className="space-y-3">
                {contactMethods.map((method) => (
                  <div
                    key={method.label}
                    className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-[#ff8912]/30 hover:shadow-md"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#002a62] text-white shadow-md shadow-[#002a62]/15">
                      <method.icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#002a62]">
                        {method.label}
                      </p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="mt-0.5 block truncate text-sm text-slate-600 transition-colors hover:text-[#ff8912]"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-slate-600">
                          {method.value}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs text-slate-400">
                        {method.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl border border-green-500/20 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white shadow-md shadow-green-500/25">
                    <MessageCircle className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#002a62]">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-xs text-slate-500">
                      We respond fastest here.
                    </p>
                  </div>
                </div>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block"
                >
                  <Button
                    size="xl"
                    variant="accent" className="w-full"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start WhatsApp Chat
                  </Button>
                </a>
              </div>

              {/* Perks */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-[#ff8912]" />
                  <p className="text-sm font-semibold text-[#002a62]">
                    Why contact ArcTravel?
                  </p>
                </div>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="size-4 shrink-0 text-[#ff8912]" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-[#002a62]/5 sm:p-10">
                <h2 className="text-xl font-bold text-[#002a62]">
                  Send Us a Message
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fill in the form and we&apos;ll get back to you within 24
                  hours.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
