import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { packageContent } from "@/lib/package-content";
import PackageDetail from "@/components/packages/PackageDetail";

export const metadata: Metadata = {
  title: "Eastern Highlands Getaway — ArcTravel",
  description:
    "Escape to the cool mountains of Nyanga and Chimanimani for hiking, waterfalls, and forest retreats. From US$350 per person.",
};

export default function EasternHighlandsGetawayPage() {
  const pkg = packages.find((p) => p.href === "/packages/eastern-highlands-getaway")!;
  return <PackageDetail pkg={pkg} content={packageContent["eastern-highlands-getaway"]} />;
}
