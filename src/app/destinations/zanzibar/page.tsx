import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Zanzibar",
  description:
    "Tropical paradise with white-sand beaches, turquoise waters, spice farms, and Stone Town's rich history.",
};

export default function ZanzibarPage() {
  return <DestinationDetail data={destinationContent["zanzibar"]} />;
}
