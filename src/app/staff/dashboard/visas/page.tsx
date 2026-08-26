import Link from "next/link";
import { getDbStatus } from "@/lib/db";
import { adminListVisas } from "@/lib/stores/visas";
import { getVisaTypeLabel } from "@/lib/visa-data";
import DbSetupBanner from "@/components/staff/DbSetupBanner";
import { DeleteVisaButton } from "@/components/staff/DeleteButtons";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VisasAdminPage() {
  const status = await getDbStatus();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#002a62]">Visas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the visa directory — requirements, fees and processing times.
          </p>
        </div>
        {status === "ok" && (
          <Link
            href="/staff/dashboard/visas/new"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#ff8912] px-4 text-sm font-semibold text-white shadow-md shadow-[#ff8912]/25 transition-colors hover:bg-[#e67a00]"
          >
            <Plus className="h-4 w-4" />
            Add Country
          </Link>
        )}
      </div>

      {status !== "ok" ? (
        <DbSetupBanner status={status} />
      ) : (
        <VisasTable />
      )}
    </div>
  );
}

async function VisasTable() {
  const visas = await adminListVisas();

  if (!visas) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        Could not reach the database. Check that DATABASE_URL is correct.
      </div>
    );
  }

  if (visas.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No visa countries yet — add your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold">Country</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Type</th>
            <th className="hidden px-4 py-3 font-semibold lg:table-cell">Region</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Processing</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {visas.map((v) => (
            <tr key={v.slug} className="transition-colors hover:bg-slate-50/60">
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.visaCategory}</p>
              </td>
              <td className="hidden px-4 py-3 md:table-cell">
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                  {getVisaTypeLabel(v.type)}
                </span>
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                {v.region}
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                {v.processingTime || "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/staff/dashboard/visas/${v.slug}`}
                    className="inline-flex h-8 items-center rounded-lg border border-border px-2.5 text-xs font-medium transition-colors hover:border-[#ff8912]/40 hover:text-[#e67a00]"
                  >
                    Edit
                  </Link>
                  <DeleteVisaButton id={v.slug} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
