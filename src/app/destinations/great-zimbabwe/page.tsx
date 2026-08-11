import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Great Zimbabwe",
  description:
    "Ancient stone ruins and UNESCO World Heritage site. Discover the history and culture of Great Zimbabwe with Arc Travel & Tours.",
};

export default function GreatZimbabwePage() {
  return <DestinationDetail data={destinationContent["great-zimbabwe"]} />;
}
