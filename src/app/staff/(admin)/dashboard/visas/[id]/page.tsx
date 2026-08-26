import { notFound } from "next/navigation";
import VisaForm from "../VisaForm";
import { adminGetVisa } from "@/lib/stores/visas";

export const dynamic = "force-dynamic";

export default async function EditVisaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const visa = await adminGetVisa(id);
  if (!visa) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#002a62]">Edit {visa.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Changes go live on the visa directory immediately.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <VisaForm visa={visa} />
      </div>
    </div>
  );
}
