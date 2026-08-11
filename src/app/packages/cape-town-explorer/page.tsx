import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { packageContent } from "@/lib/package-content";
import PackageDetail from "@/components/packages/PackageDetail";

export const metadata: Metadata = {
  title: "Cape Town Explorer",
  description:
    "Discover the Mother City — Table Mountain, Cape Point, the Winelands, and stunning beaches. From US$1,250 per person.",
};

export default function CapeTownExplorerPage() {
  const pkg = packages.find((p) => p.href === "/packages/cape-town-explorer")!;
  return <PackageDetail pkg={pkg} content={packageContent["cape-town-explorer"]} />;
}
