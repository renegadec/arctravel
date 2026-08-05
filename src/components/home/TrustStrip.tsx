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
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
          We work with the region&apos;s leading travel providers
        </p>
        <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-8 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center gap-2 text-slate-300 transition-colors hover:text-[#ff8912]"
            >
              <partner.icon className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wide">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
