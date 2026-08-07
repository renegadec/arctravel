import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { packageContent } from "@/lib/package-content";
import PackageDetail from "@/components/packages/PackageDetail";

export const metadata: Metadata = {
  title: "Zanzibar Beach Holiday — ArcTravel",
  description:
    "White sands, crystal waters, and spice-scented air — unwind on Tanzania's paradise island. From US$980 per person.",
};

export default function ZanzibarBeachPage() {
  const pkg = packages.find((p) => p.href === "/packages/zanzibar-beach")!;
  return <PackageDetail pkg={pkg} content={packageContent["zanzibar-beach"]} />;
}
