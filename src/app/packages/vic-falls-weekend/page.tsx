import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { packageContent } from "@/lib/package-content";
import PackageDetail from "@/components/packages/PackageDetail";

export const metadata: Metadata = {
  title: "Victoria Falls Weekend",
  description:
    "A perfect long weekend at Victoria Falls — see the falls, enjoy a sunset cruise, and adventure activities. From US$450 per person.",
};

export default function VicFallsWeekendPage() {
  const pkg = packages.find((p) => p.href === "/packages/vic-falls-weekend")!;
  return <PackageDetail pkg={pkg} content={packageContent["vic-falls-weekend"]} />;
}
