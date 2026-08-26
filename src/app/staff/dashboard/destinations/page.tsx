import Link from "next/link";
import { getDbStatus } from "@/lib/db";
import { adminListDestinations } from "@/lib/stores/destinations";
import DbSetupBanner from "@/components/staff/DbSetupBanner";
import { DeleteDestinationButton } from "@/components/staff/DeleteButtons";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DestinationsAdminPage() {
  const status = await getDbStatus();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#002a62]">Destinations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit destination pages — hero, highlights, gallery, tips and CTA.
          </p>
        </div>
        {status === "ok" && (
          <Link
            href="/staff/dashboard/destinations/new"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#ff8912] px-4 text-sm font-semibold text-white shadow-md shadow-[#ff8912]/25 transition-colors hover:bg-[#e67a00]"
          >
            <Plus className="h-4 w-4" />
            Add Destination
          </Link>
        )}
      </div>

      {status !== "ok" ? (
        <DbSetupBanner status={status} />
      ) : (
        <DestinationsTable />
      )}
    </div>
  );
}

async function DestinationsTable() {
  const destinations = await adminListDestinations();

  if (!destinations) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        Could not reach the database. Check that DATABASE_URL is correct.
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No destinations yet — add your first one.
        </p>
      </div>
    );
  }

  const regionLabels: Record<string, string> = {
    domestic: "Zimbabwe",
    regional: "Southern Africa",
    international: "International",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold">Destination</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Region</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {destinations.map((d) => (
            <tr key={d.slug} className="transition-colors hover:bg-slate-50/60">
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground">
                  /destinations/{d.slug}
                </p>
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                {regionLabels[d.region] ?? d.region}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    d.published
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {d.published ? "Published" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/staff/dashboard/destinations/${d.slug}`}
                    className="inline-flex h-8 items-center rounded-lg border border-border px-2.5 text-xs font-medium transition-colors hover:border-[#ff8912]/40 hover:text-[#e67a00]"
                  >
                    Edit
                  </Link>
                  <DeleteDestinationButton slug={d.slug} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
