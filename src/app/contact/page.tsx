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
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left: Contact info sidebar */}
            <div className="space-y-8 lg:col-span-2">
              {/* Contact methods */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactMethods.map((method) => (
                  <div
                    key={method.label}
                    className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-sm"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <method.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">{method.label}</p>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="mt-0.5 block text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {method.value}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {method.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="rounded-xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent p-6">
                <MessageCircle className="h-8 w-8 text-green-500" />
                <h3 className="mt-3 font-semibold">Chat on WhatsApp</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We respond faster on WhatsApp. Save our number and send a
                  message anytime.
                </p>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4 bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/25 active:scale-[0.97] transition-all cursor-pointer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start WhatsApp Chat
                  </Button>
                </a>
              </div>

              {/* Perks */}
              <div className="rounded-xl border border-border bg-muted/30 p-5">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <p className="text-sm font-medium">
                    Why contact ArcTravel?
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-accent" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="text-xl font-bold">Send Us a Message</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in the form and we&apos;ll get back to you within 24
                  hours.
                </p>
                <div className="mt-6">
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
