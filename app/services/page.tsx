import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServicesPageContent from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Statutory audit, tax advisory, co-operative bank audits, government audits, system audit, and corporate law — comprehensive CA services from Kanakiya & Mehta Associates.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" breadcrumbs={[{ label: "Services" }]} />
      <ServicesPageContent />
    </>
  );
}
