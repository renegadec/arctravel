import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Johannesburg & Kruger — ArcTravel",
  description:
    "Africa's economic hub paired with Kruger National Park — one of the best safari destinations on the continent.",
};

export default function JohannesburgKrugerPage() {
  return <DestinationDetail data={destinationContent["johannesburg-kruger"]} />;
}
