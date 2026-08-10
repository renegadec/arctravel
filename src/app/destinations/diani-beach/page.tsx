import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Diani Beach — ArcTravel",
  description:
    "White-sand beaches, coral reefs, and easy-going Indian Ocean life on Kenya's south coast. Flights, stays, and day trips planned by ArcTravel.",
};

export default function DianiBeachPage() {
  return <DestinationDetail data={destinationContent["diani-beach"]} />;
}
