import { notFound } from "next/navigation";
import DestinationForm from "../DestinationForm";
import { adminGetDestinationWithListing } from "@/lib/stores/destinations";

export const dynamic = "force-dynamic";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const full = await adminGetDestinationWithListing(slug);
  if (!full) notFound();

  const { content: data, listing } = full;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#002a62]">Edit {data.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Changes go live on the destination page immediately.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <DestinationForm
          data={data}
          extra={{
            shortDescription: listing.shortDescription,
            country: listing.country,
            region: listing.region,
            image: listing.image,
            published: listing.published,
          }}
        />
      </div>
    </div>
  );
}
