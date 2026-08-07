import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Nairobi & Maasai Mara — ArcTravel",
  description:
    "East Africa's safari capital — the Great Migration, Maasai culture, and vibrant urban energy.",
};

export default function NairobiMaasaiMaraPage() {
  return <DestinationDetail data={destinationContent["nairobi-maasai-mara"]} />;
}
