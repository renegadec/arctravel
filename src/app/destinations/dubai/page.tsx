import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Dubai — ArcTravel",
  description:
    "Ultra-modern city with world-class shopping, dining, desert safaris, and architectural wonders.",
};

export default function DubaiPage() {
  return <DestinationDetail data={destinationContent["dubai"]} />;
}
