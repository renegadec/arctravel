import { notFound } from "next/navigation";
import CarForm from "../CarForm";
import { adminGetCar } from "@/lib/stores/cars";

export const dynamic = "force-dynamic";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await adminGetCar(id);
  if (!car) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#002a62]">
          Edit {car.brand} {car.model}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Changes go live on the car rentals page immediately.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <CarForm car={car} />
      </div>
    </div>
  );
}
