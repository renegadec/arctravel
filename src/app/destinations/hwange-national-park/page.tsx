import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Hwange National Park — ArcTravel",
  description:
    "Zimbabwe's largest game reserve, home to over 100 mammal species and 400 bird species. Plan your safari with ArcTravel.",
};

export default function HwangeNationalParkPage() {
  return <DestinationDetail data={destinationContent["hwange-national-park"]} />;
}
