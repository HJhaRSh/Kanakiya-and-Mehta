import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kanakiya & Mehta Associates — Chartered Accountants since 1989. ISO 9001:2008 certified, CAG & RBI empanelled. Learn about our history and values.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" breadcrumbs={[{ label: "About Us" }]} />
      <AboutContent />
    </>
  );
}
