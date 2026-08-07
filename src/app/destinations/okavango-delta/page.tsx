import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Okavango Delta — ArcTravel",
  description:
    "UNESCO World Heritage site and one of Africa's last great wilderness areas — explore by mokoro and game drive.",
};

export default function OkavangoDeltaPage() {
  return <DestinationDetail data={destinationContent["okavango-delta"]} />;
}
