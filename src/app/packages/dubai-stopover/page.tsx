import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { packageContent } from "@/lib/package-content";
import PackageDetail from "@/components/packages/PackageDetail";

export const metadata: Metadata = {
  title: "Dubai Stopover — ArcTravel",
  description:
    "Turn your layover into a mini-holiday — shopping, desert safaris, and iconic city sights. From US$1,100 per person.",
};

export default function DubaiStopoverPage() {
  const pkg = packages.find((p) => p.href === "/packages/dubai-stopover")!;
  return <PackageDetail pkg={pkg} content={packageContent["dubai-stopover"]} />;
}
