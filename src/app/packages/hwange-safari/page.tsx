import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { packages } from "@/lib/constants";
import { Clock, MapPin, CheckCircle2, ArrowRight, TreePalm } from "lucide-react";

export const metadata: Metadata = {
  title: "Hwange Safari Escape — ArcTravel",
  description: "Four days in Zimbabwe's largest national park — game drives, wildlife viewing, and starlit dinners. From US$780 per person.",
};

const pkg = packages[1];
const bookUrl = "/book?service=Guided+Tours&destination=Hwange+National+Park&budget=Premium&travellers=2&notes=Hwange+Safari+Escape+package";

export default function HwangeSafariPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4a3520] via-[#6b4f30] to-[#5a4328] py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
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
      <section className="py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><h2 className="text-2xl font-bold">Trip Highlights</h2><div className="mt-6 grid gap-4">{pkg.highlights.map((h) => (<div key={h} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"><TreePalm className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-sm">{h}</span></div>))}</div></div></div></section>
      <section className="bg-muted/50 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><h2 className="text-2xl font-bold">What&apos;s Included</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{pkg.included.map((item) => (<div key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-sm text-muted-foreground">{item}</span></div>))}</div></div></div></section>
      <section className="py-16"><div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"><h2 className="text-2xl font-bold">Ready to Book?</h2><p className="mx-auto mt-2 max-w-md text-muted-foreground">Fill in a quick booking request and we&apos;ll confirm within 24 hours.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href={bookUrl}><Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button></Link><Link href="/packages"><Button variant="outline">View All Packages</Button></Link></div></div></section>
    </>
  );
}
