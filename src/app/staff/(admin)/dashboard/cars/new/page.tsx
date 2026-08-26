import CarForm from "../CarForm";

export default function NewCarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#002a62]">Add a Car</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a vehicle to the fleet. It appears on the public car rentals page
          immediately after saving.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <CarForm />
      </div>
    </div>
  );
}
