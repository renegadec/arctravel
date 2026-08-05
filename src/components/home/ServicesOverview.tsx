import Link from "next/link";
import { services } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Search, ClipboardCheck, Plane } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell us your plans",
    text: "Share your destination, dates, and preferences — we'll take it from there.",
    cardClass: "bg-slate-50 text-[#002a62]",
    numberClass: "text-[#002a62]/15",
    iconClass: "bg-[#002a62] text-white",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "We design your itinerary",
    text: "Our team curates the best flights, stays, and experiences for your trip.",
    cardClass: "bg-[#002a62] text-white",
    numberClass: "text-white/15",
    iconClass: "bg-white/15 text-[#ff8912]",
  },
  {
    number: "03",
    icon: Plane,
    title: "You travel with confidence",
    text: "We handle bookings, documents, and support so you can focus on the journey.",
    cardClass: "bg-[#ff8912] text-white",
    numberClass: "text-white/25",
    iconClass: "bg-white/20 text-white",
  },
];

export default function ServicesOverview() {
  const featured = services.slice(0, 6);

  return (
    <>
      {/* Services Grid */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                Our Services
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
                Everything You Need for
                <span className="text-[#ff8912]"> Seamless Travel</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                From booking flights to arranging visas — we cover every detail
                so you travel with confidence.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid max-w-xl grid-cols-1 gap-x-8 gap-y-14 lg:max-w-none lg:grid-cols-3">
            {featured.map((service, i) => (
              <Reveal key={service.href} delay={i * 80}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#002a62] shadow-md shadow-[#002a62]/20 transition-all duration-300 group-hover:bg-[#ff8912] group-hover:shadow-[#ff8912]/30">
                    <service.icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#002a62] transition-colors group-hover:text-[#ff8912]">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff8912]">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 text-center">
              <Link href="/services">
                <Button
                  size="xl"
                  variant="outline"
                  className="group cursor-pointer rounded-xl border-[#002a62]/20 text-[#002a62] transition-all hover:bg-[#002a62]/5 active:scale-[0.97]"
                >
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#faf9f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                Simple by design
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
                How It <span className="text-[#ff8912]">Works</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Three simple steps to your next trip.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-2xl gap-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 ${step.cardClass}`}
                >
                  <span
                    className={`pointer-events-none absolute -right-2 -top-6 text-[7rem] font-extrabold leading-none ${step.numberClass}`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl ${step.iconClass}`}
                    >
                      <step.icon className="size-6" />
                    </div>
                    <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        step.cardClass === "bg-slate-50 text-[#002a62]"
                          ? "text-slate-600"
                          : "text-white/80"
                      }`}
                    >
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
