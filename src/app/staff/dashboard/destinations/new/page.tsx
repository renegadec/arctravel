import DestinationForm from "../DestinationForm";

export default function NewDestinationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#002a62]">Add a Destination</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the destination content — it becomes a live page at
          /destinations/slug after saving.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <DestinationForm />
      </div>
    </div>
  );
}
