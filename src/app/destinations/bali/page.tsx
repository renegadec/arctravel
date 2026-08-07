import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Bali — ArcTravel",
  description:
    "Tropical island paradise with ancient temples, rice terraces, surf beaches, and rich spiritual culture.",
};

export default function BaliPage() {
  return <DestinationDetail data={destinationContent["bali"]} />;
}
