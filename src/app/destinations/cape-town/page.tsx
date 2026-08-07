import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Cape Town — ArcTravel",
  description:
    "Stunning coastal city with Table Mountain, vibrant waterfront, wine country, and incredible beaches. Plan your Cape Town trip with ArcTravel.",
};

export default function CapeTownPage() {
  return <DestinationDetail data={destinationContent["cape-town"]} />;
}
