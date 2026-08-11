import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Victoria Falls",
  description:
    "One of the Seven Natural Wonders of the World — discover Victoria Falls with Arc Travel & Tours. Tours, accommodation, activities, and more.",
};

export default function VictoriaFallsPage() {
  return <DestinationDetail data={destinationContent["victoria-falls"]} />;
}
