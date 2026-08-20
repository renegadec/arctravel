import type { Metadata } from "next";
import DestinationDetail from "@/components/destinations/DestinationDetail";
import { destinationContent } from "@/lib/destination-content";

export const metadata: Metadata = {
  title: "Lake Kariba",
  description:
    "The world's largest man-made lake by volume — houseboat safaris, tiger fishing, and Matusadona wildlife with Arc Travel & Tours.",
};

export default function KaribaPage() {
  return <DestinationDetail data={destinationContent["kariba"]} />;
}
