import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "London",
  description:
    "Historic and vibrant — royal landmarks, world-class museums, theatre, and diverse neighbourhoods to explore.",
};

export default function LondonPage() {
  return <DestinationDetail data={destinationContent["london"]} />;
}
