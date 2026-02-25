import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/ui/TrustBar";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import PartnersTeaser from "@/components/home/PartnersTeaser";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LocationsSection from "@/components/home/LocationsSection";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSnapshot />
      <ServicesSection />
      <StatsSection />
      <PartnersTeaser />
      <TestimonialsSection />
      <LocationsSection />
      <CTABanner />
    </>
  );
}
