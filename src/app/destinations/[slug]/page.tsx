import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { getDestination } from "@/lib/stores/destinations";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getDestination(slug);
  if (!data) return { title: "Destination" };
  return {
    title: data.name,
    description: `${data.tagline} — plan your trip to ${data.name} with Arc Travel & Tours.`,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getDestination(slug);
  if (!data) notFound();

  return <DestinationDetail data={data} />;
}
