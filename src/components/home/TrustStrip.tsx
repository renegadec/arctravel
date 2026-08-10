import { Plane, Building2, Compass, Car, ShieldCheck } from "lucide-react";

// Partner categories shown as wordmarks.
// 🔁 Replace with real partner logos when available (airlines, hotels, operators).
const partners = [
  { name: "Airlines", icon: Plane },
  { name: "Hotels & Lodges", icon: Building2 },
  { name: "Tour Operators", icon: Compass },
  { name: "Car Hire", icon: Car },
  { name: "Insurance", icon: ShieldCheck },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
          We work with the region&apos;s leading travel providers
        </p>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-500 shadow-sm transition-colors hover:border-[#ff8912]/30 hover:text-[#ff8912] sm:px-5"
            >
              <partner.icon className="h-4 w-4 shrink-0" />
              <span className="text-sm font-semibold tracking-wide">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
