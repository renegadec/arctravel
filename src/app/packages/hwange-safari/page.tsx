import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { packageContent } from "@/lib/package-content";
import PackageDetail from "@/components/packages/PackageDetail";

export const metadata: Metadata = {
  title: "Hwange Safari Escape — ArcTravel",
  description:
    "Four days in Zimbabwe's largest national park — game drives, wildlife viewing, and starlit dinners. From US$780 per person.",
};

export default function HwangeSafariPage() {
  const pkg = packages.find((p) => p.href === "/packages/hwange-safari")!;
  return <PackageDetail pkg={pkg} content={packageContent["hwange-safari"]} />;
}
