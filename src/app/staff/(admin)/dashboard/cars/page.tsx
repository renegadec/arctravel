import Link from "next/link";
import Image from "next/image";
import { getDbStatus } from "@/lib/db";
import { adminListCars } from "@/lib/stores/cars";
import DbSetupBanner from "@/components/staff/DbSetupBanner";
import { DeleteCarButton } from "@/components/staff/DeleteButtons";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CarsAdminPage() {
  const status = await getDbStatus();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#002a62]">Cars</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the fleet shown on the car rentals page.
          </p>
        </div>
        {status === "ok" && (
          <Link
            href="/staff/dashboard/cars/new"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#ff8912] px-4 text-sm font-semibold text-white shadow-md shadow-[#ff8912]/25 transition-colors hover:bg-[#e67a00]"
          >
            <Plus className="h-4 w-4" />
            Add Car
          </Link>
        )}
      </div>

      {status !== "ok" ? (
        <DbSetupBanner status={status} />
      ) : (
        <FleetTable />
      )}
    </div>
  );
}

async function FleetTable() {
  const cars = await adminListCars();

  if (!cars) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        Could not reach the database. Check that DATABASE_URL is correct.
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No cars yet — add your first vehicle.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold">Vehicle</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Category</th>
            <th className="px-4 py-3 font-semibold">Price/day</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {cars.map((car) => (
            <tr key={car.id} className="transition-colors hover:bg-slate-50/60">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      unoptimized
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {car.year} · {car.transmission} · {car.seats} seats
                    </p>
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                {car.category}
              </td>
              <td className="px-4 py-3">
                <span className="font-semibold text-accent">US${car.pricePerDay}</span>
                <span className="text-xs text-muted-foreground">/day</span>
              </td>
              <td className="hidden px-4 py-3 sm:table-cell">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      car.available !== false
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {car.available !== false ? "Available" : "Unavailable"}
                  </span>
                  {car.popular && (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-semibold text-yellow-700">
                      Popular
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/staff/dashboard/cars/${car.id}`}
                    className="inline-flex h-8 items-center rounded-lg border border-border px-2.5 text-xs font-medium transition-colors hover:border-[#ff8912]/40 hover:text-[#e67a00]"
                  >
                    Edit
                  </Link>
                  <DeleteCarButton id={car.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
