import VisaForm from "../VisaForm";

export default function NewVisaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#002a62]">Add a Visa Country</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a country to the visa directory shown on the visa assistance page.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <VisaForm />
      </div>
    </div>
  );
}
