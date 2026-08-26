"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Car, CarCategory } from "@/lib/car-data";
import { Button } from "@/components/ui/button";
import {
  CarFront,
  Gauge,
  Calendar,
  Users,
  Settings2,
} from "lucide-react";
import CarEnquiryModal from "./CarEnquiryModal";

const ALL = "All" as const;

export default function FleetExplorer({ cars }: { cars: Car[] }) {
  const [category, setCategory] = useState<CarCategory | typeof ALL>(ALL);
  const [selected, setSelected] = useState<Car | null>(null);

  // Only vehicles marked available appear in the public fleet.
  const availableCars = useMemo(
    () => cars.filter((c) => c.available !== false),
    [cars]
  );

  const categories = useMemo(() => {
    const list: { value: CarCategory | typeof ALL; count: number }[] = [
      { value: ALL, count: availableCars.length },
    ];
    const order: CarCategory[] = ["4x4 & SUV", "Sedan", "Hatchback", "Minibus"];
    for (const c of order) {
      const count = availableCars.filter((car) => car.category === c).length;
      if (count > 0) list.push({ value: c, count });
    }
    return list;
  }, [availableCars]);

  const visible = useMemo(
    () =>
      category === ALL
        ? availableCars
        : availableCars.filter((c) => c.category === category),
    [category, availableCars]
  );

  return (
    <section id="fleet" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
            <CarFront className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Our Hire Fleet</h2>
            <p className="text-sm text-muted-foreground">
              {visible.length} {visible.length === 1 ? "vehicle" : "vehicles"}{" "}
              available — prices are per day and include comprehensive
              insurance.
            </p>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by vehicle category">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === c.value
                  ? "border-[#002a62] bg-[#002a62] text-white"
                  : "border-border bg-card text-muted-foreground hover:border-[#ff8912]/40 hover:text-foreground"
              }`}
            >
              {c.value}
              <span
                className={`text-xs ${
                  category === c.value ? "text-white/70" : "text-muted-foreground/70"
                }`}
              >
                {c.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No vehicles match this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:gap-x-8">
            {visible.map((car) => (
              <div key={car.id} className="group relative flex flex-col">
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                  <Image
                    alt={`${car.brand} ${car.model}`}
                    src={car.image}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="bg-muted object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  {/* Category badge */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#002a62]/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <CarFront className="h-3 w-3" />
                    {car.category}
                  </span>
                  {/* Popular badge */}
                  {car.popular && (
                    <span className="absolute left-3 top-12 inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#002a62] shadow-md">
                      Popular
                    </span>
                  )}
                  {/* Price badge */}
                  <span className="absolute right-3 top-3 rounded-full bg-[#ff8912] px-3 py-1 text-xs font-bold text-white shadow-md">
                    US${car.pricePerDay}
                    <span className="font-normal">/day</span>
                  </span>
                  {/* Full-image click target + hover overlay */}
                  <button
                    type="button"
                    onClick={() => setSelected(car)}
                    aria-label={`Enquire about ${car.brand} ${car.model}`}
                    className="absolute inset-0 z-10 flex items-end rounded-2xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span className="w-full rounded-xl bg-[#002a62]/85 px-4 py-2.5 text-center text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      Enquire about this car
                    </span>
                  </button>
                </div>

                {/* Details */}
                <div className="mt-4 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-foreground">
                        <button
                          type="button"
                          onClick={() => setSelected(car)}
                          className="text-left transition-colors hover:text-accent"
                        >
                          {car.brand} {car.model}
                        </button>
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {car.fuel} · {car.transmission}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-accent">
                      US${car.pricePerDay}
                      <span className="text-xs font-normal text-muted-foreground">
                        /day
                      </span>
                    </p>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {car.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Gauge className="h-3.5 w-3.5 text-accent" />
                      {car.includedKmPerDay} km/day included
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {car.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-3 w-3 rounded-full border border-border"
                        style={{ backgroundColor: car.colorHex }}
                      />
                      {car.color}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-accent" />
                      {car.seats} seats
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Settings2 className="h-3.5 w-3.5 text-accent" />
                      {car.transmission}
                    </span>
                  </div>

                  {/* Explicit CTA: touch devices have no hover, so keep it
                      visible on mobile/tablet; on desktop the image hover
                      overlay + clickable title already carry the action. */}
                  <div className="mt-4 pt-1 lg:hidden">
                    <Button
                      onClick={() => setSelected(car)}
                      variant="accent"
                      className="w-full"
                    >
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <CarEnquiryModal
          key={selected.id}
          car={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
