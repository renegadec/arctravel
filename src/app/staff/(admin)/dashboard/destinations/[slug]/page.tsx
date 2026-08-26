import { notFound } from "next/navigation";
import DestinationForm from "../DestinationForm";
import { adminGetDestination } from "@/lib/stores/destinations";
import { queryOne } from "@/lib/db";

export const dynamic = "force-dynamic";

interface ListingRow {
  slug: string;
  name: string;
  country: string | null;
  region: string;
  short_description: string | null;
  image: string | null;
  published: boolean | null;
}

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await adminGetDestination(slug);
  if (!data) notFound();

  // Listing-level fields live alongside the detail content in the same row.
  const row = await queryOne<ListingRow>(
    "SELECT slug, name, country, region, short_description, image, published FROM destinations WHERE slug = $1",
    [slug]
  );

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
            shortDescription: row?.short_description ?? "",
            country: row?.country ?? "",
            region: row?.region ?? "domestic",
            image: row?.image ?? "",
            published: row?.published !== false,
          }}
        />
      </div>
    </div>
  );
}
