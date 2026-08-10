import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import StatsBand from "@/components/home/StatsBand";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <StatsBand />
      <FeaturedDestinations />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
