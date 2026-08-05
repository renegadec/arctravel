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

      {/* Main: split with pattern */}
      <section className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-0 lg:py-24">
          {/* Left: info + pattern */}
          <div className="relative px-4 sm:px-6 lg:px-8">
            {/* Pattern panel */}
            <div className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 overflow-hidden bg-[#faf9f6] ring-1 ring-slate-900/5 lg:block">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="arctravel-contact-pattern"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect
                  fill="white"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-[#faf9f6]"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#arctravel-contact-pattern)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>

            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                Talk to a human
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
                Let&apos;s Plan Your Trip
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Flights, hotels, visas, tours, car hire — one message and
                we&apos;ll come back with a plan. No call centres, no
                automated menus.
              </p>

              {/* Contact methods */}
              <dl className="mt-10 space-y-6">
                {contactMethods.map((method) => (
                  <div key={method.label} className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-[#002a62] text-white shadow-md shadow-[#002a62]/15">
                        <method.icon className="size-5" />
                      </span>
                    </dt>
                    <dd className="pt-0.5">
                      <p className="text-sm font-semibold text-[#002a62]">
                        {method.label}
                      </p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="mt-0.5 block text-sm text-slate-600 transition-colors hover:text-[#ff8912]"
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
                    </dd>
                  </div>
                ))}
              </dl>

              {/* WhatsApp */}
              <div className="mt-10 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-[#002a62]">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-sm text-slate-500">
                      We respond fastest here — save our number and say hi.
                    </p>
                  </div>
                </div>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="xl"
                    className="mt-5 w-full cursor-pointer rounded-xl bg-green-500 text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600 active:scale-[0.97] sm:w-auto"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start WhatsApp Chat
                  </Button>
                </a>
              </div>

              {/* Perks */}
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-[#ff8912]" />
                  <p className="text-sm font-semibold text-[#002a62]">
                    Why contact ArcTravel?
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5">
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
          </div>

          {/* Right: form */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-[#002a62]/5 sm:p-8">
                <h2 className="text-xl font-bold text-[#002a62]">
                  Send Us a Message
                </h2>
                <p className="mt-1 text-sm text-slate-500">
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
