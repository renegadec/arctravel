import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MapPin, Sun, TreePalm } from "lucide-react";

export const metadata: Metadata = { title: "Okavango Delta — ArcTravel", description: "UNESCO World Heritage site and one of Africa's last great wilderness areas — explore by mokoro and game drive." };

const highlights = [
  { icon: TreePalm, title: "Mokoro Safaris", desc: "Glide through papyrus-lined channels in a traditional dugout canoe — the quintessential Okavango experience." },
  { icon: MapPin, title: "Game Drives", desc: "Open-vehicle game drives across the delta's islands and floodplains. Elephant, lion, leopard, wild dog, and buffalo." },
  { icon: TreePalm, title: "Walking Safaris", desc: "Explore on foot with an armed ranger — track animals, learn bushcraft, and connect with the wilderness." },
  { icon: Sun, title: "Luxury & Camping", desc: "From tented camps under the stars to exclusive fly-camp lodges — stay right in the heart of the delta." },
];
const tips = ["Best time: June to October (dry season, peak wildlife viewing)", "Access is by light aircraft from Maun (flights arranged in your package)", "Malaria prophylaxis is recommended — consult your doctor", "Pack light, neutral clothing, a sun hat, and good binoculars", "Botswana visas are visa-free for most African passport holders for up to 90 days"];

export default function OkavangoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2d5a3a] via-[#3d7a4a] to-[#2d6a3a] py-20 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"><MapPin className="h-3 w-3" />Botswana — Ngamiland</div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Okavango Delta</h1>
            <p className="mt-4 text-lg text-white/75">UNESCO World Heritage site and one of Africa's last great wilderness areas.</p>
            <Link href="/book" className="mt-8 inline-block"><Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">Safari to the Delta <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>
      <section className="py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-center">Delta Experiences</h2><p className="mt-2 text-center text-muted-foreground">Explore one of Africa's most unique ecosystems</p><div className="mt-10 grid gap-6 sm:grid-cols-2">{highlights.map((h) => (<div key={h.title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white"><h.icon className="h-5 w-5" /></div><h3 className="mt-4 font-semibold">{h.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{h.desc}</p></div>))}</div></div></section>
      <section className="bg-muted/50 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><div className="flex items-center gap-3 mb-6"><Sun className="h-5 w-5 text-accent" /><h2 className="text-2xl font-bold">Travel Tips</h2></div><ul className="space-y-3">{tips.map((t) => (<li key={t} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span className="text-sm text-muted-foreground">{t}</span></li>))}</ul></div></div></section>
      <section className="py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-8 text-center sm:p-12"><TreePalm className="mx-auto h-10 w-10 text-accent" /><h2 className="mt-4 text-2xl font-bold">Ready for the Delta?</h2><p className="mx-auto mt-3 max-w-lg text-muted-foreground">Tell us your preferred dates and group size — we'll tailor a safari that fits.</p><Link href="/book"><Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">Plan Your Safari</Button></Link></div></div></section>
    </>
  );
}
