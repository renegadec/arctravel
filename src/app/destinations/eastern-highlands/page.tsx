import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Eastern Highlands",
  description:
    "Lush mountains, waterfalls, and tea estates in Zimbabwe's Eastern Highlands. Perfect for nature lovers and hikers.",
};

export default function EasternHighlandsPage() {
  return <DestinationDetail data={destinationContent["eastern-highlands"]} />;
}
