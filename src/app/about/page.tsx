import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Plane,
  Compass,
  Heart,
  Award,
  Globe,
  Users,
  Headphones,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — ArcTravel",
  description:
    "ArcTravel is a full-service travel agency based in Zimbabwe, dedicated to making travel effortless for individuals, families, and businesses.",
};

// 🔁 SWAP with real photos when available.
const storyImage =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80";

const values = [
  {
    icon: Compass,
    title: "Local Expertise",
    text: "We know Zimbabwe and Southern Africa inside out. Our team has lived, worked, and travelled extensively across the region.",
  },
  {
    icon: Heart,
    title: "Client First",
    text: "Your trip is personal. We listen carefully, communicate clearly, and deliver exactly what you need — no surprises.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "From the first inquiry to post-trip follow-up, we hold ourselves to a high standard of service and reliability.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    text: "Through our network of partners, we can arrange travel to virtually any destination worldwide, not just Africa.",
  },
  {
    icon: Users,
    title: "Personal Service",
    text: "You deal with real people, not an automated system. Every inquiry gets a personal response from our team.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Travel doesn't stick to office hours. We're available throughout your trip for any issues or changes.",
  },
];

// 🔁 Adjust milestones to match ArcTravel's real story.
const timeline = [
  {
    date: "2021",
    title: "Founded in Harare",
    text: "ArcTravel started with one mission: make travel effortless for Zimbabweans — no browser-tab chaos, no stressful planning.",
  },
  {
    date: "2022",
    title: "Built a regional partner network",
    text: "We grew trusted relationships with airlines, lodges, and tour operators across Southern Africa and beyond.",
  },
  {
    date: "2023",
    title: "Corporate & group travel",
    text: "Businesses started relying on us for corporate travel, events, and group bookings — with dedicated support.",
  },
  {
    date: "2025",
    title: "Going digital",
    text: "Online booking, a searchable visa directory, and practical travel guides — making expert advice available to everyone.",
  },
];

const team = [
  {
    name: "Founder & Lead Consultant",
    role: "Every trip, from first call to final transfer",
    initials: "AT",
  },
  {
    name: "Travel Operations",
    role: "Flights, hotels, and logistics behind the scenes",
    initials: "TO",
  },
  {
    name: "Client Support",
    role: "24/7 help while you're on the road",
    initials: "CS",
  },
];

const stats = [
  { number: "500+", label: "Trips Planned" },
  { number: "30+", label: "Destinations" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "5+", label: "Years Experience" },
];

export default function AboutPage() {
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
              <Plane className="h-3.5 w-3.5" />
              Our story
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About ArcTravel
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              We exist to make travel effortless — whether you&apos;re flying
              across the continent or planning a weekend getaway.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-slate-100 bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[#ff8912]">
                  {stat.number}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-28 w-28 rounded-3xl bg-[#ff8912]/10" />
              <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-[#002a62]/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={storyImage}
                  alt="The ArcTravel team planning a journey"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                Our story
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
                Travel should be exciting,
                <br />
                <span className="text-[#ff8912]">not exhausting.</span>
              </h2>
              <p className="mt-5 leading-relaxed text-slate-600">
                ArcTravel was founded on a simple belief: travel should be
                exciting, not exhausting. Too often, people spend more time
                planning a trip than enjoying it — juggling flights,
                accommodations, transfers, visas, and a dozen browser tabs.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                We built ArcTravel to change that. As a full-service travel
                agency based in Zimbabwe, we handle every aspect of your
                journey — from the first flight booking to the final transfer
                home. Our team combines local knowledge with global reach,
                ensuring you get the best options without the headache.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#faf9f6] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              The journey so far
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
              How ArcTravel Grew
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.title} className="relative">
                <time className="flex items-center text-sm font-bold text-[#ff8912]">
                  <span className="mr-4 flex size-2 flex-none rounded-full bg-[#ff8912]" />
                  {item.date}
                  <span
                    aria-hidden="true"
                    className="absolute left-1 top-2 h-px w-screen -translate-x-full bg-slate-200 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  />
                </time>
                <p className="mt-6 text-lg font-bold tracking-tight text-[#002a62]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              What we stand for
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
              Six Principles That Guide Us
            </h2>
            <p className="mt-4 text-muted-foreground">
              The values behind every itinerary we build.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="group rounded-2xl border border-slate-100 bg-[#faf9f6] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8912]/30 hover:shadow-lg hover:shadow-[#002a62]/5"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#002a62] text-white shadow-md shadow-[#002a62]/20 transition-all duration-300 group-hover:bg-[#ff8912] group-hover:shadow-[#ff8912]/30">
                  <v.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-[#002a62]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#faf9f6] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              The people
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mt-4 text-muted-foreground">
              Real people, real experience — and always a personal response.
            </p>
          </div>

          {/* 🔁 Replace initials avatars with real team photos when available */}
          <ul
            role="list"
            className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3 lg:mx-0 lg:max-w-none"
          >
            {team.map((member) => (
              <li key={member.name} className="text-center">
                <div className="mx-auto flex size-32 items-center justify-center rounded-full bg-gradient-to-br from-[#002a62] to-[#0a2440] text-3xl font-bold text-[#ff8912] ring-8 ring-[#002a62]/5">
                  {member.initials}
                </div>
                <h3 className="mt-6 text-base font-bold tracking-tight text-[#002a62]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff8912]/10 via-[#ff8912]/5 to-transparent p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-[#002a62]">
              Ready to plan your next trip?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Get in touch and let&apos;s build your perfect itinerary. No
              obligation, just great advice.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="xl"
                  variant="accent"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="xl"
                  variant="outline"
                  className="cursor-pointer rounded-xl border-[#002a62]/20 text-[#002a62] transition-all hover:bg-[#002a62]/5 active:scale-[0.97]"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
