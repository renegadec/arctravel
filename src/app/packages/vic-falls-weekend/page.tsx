import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { packages } from "@/lib/constants";
import { Clock, MapPin, CheckCircle2, ArrowRight, Star, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "Victoria Falls Weekend — ArcTravel",
  description: "A perfect long weekend at Victoria Falls — see the falls, enjoy a sunset cruise, and adventure activities. From US$450 per person.",
};

const pkg = packages[0];
const bookUrl = "/book?service=Guided+Tours&destination=Victoria+Falls&budget=Mid-Range&travellers=2&notes=Victoria+Falls+Weekend+package";

export default function VicFallsWeekendPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3d2e] via-[#0f5a42] to-[#0d4a36] py-20 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {pkg.popular && (
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                <Star className="h-3 w-3 text-yellow-400" /> Popular Package
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{pkg.title}</h1>
            <p className="mt-4 text-lg text-white/75">{pkg.description}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{pkg.duration}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{pkg.location}</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-accent">{pkg.price} per person</span>
            </div>
            <Link href={bookUrl} className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Book This Package <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><h2 className="text-2xl font-bold">Trip Highlights</h2><div className="mt-6 grid gap-4">{pkg.highlights.map((h) => (<div key={h} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"><Droplets className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-sm">{h}</span></div>))}</div></div></div></section>
      <section className="bg-muted/50 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><h2 className="text-2xl font-bold">What&apos;s Included</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{pkg.included.map((item) => (<div key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-sm text-muted-foreground">{item}</span></div>))}</div></div></div></section>
      <section className="py-16"><div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"><h2 className="text-2xl font-bold">Ready to Book?</h2><p className="mx-auto mt-2 max-w-md text-muted-foreground">Fill in a quick booking request and we&apos;ll confirm within 24 hours.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href={bookUrl}><Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button></Link><Link href="/packages"><Button variant="outline">View All Packages</Button></Link></div></div></section>
    </>
  );
}
