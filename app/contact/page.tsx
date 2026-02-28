import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kanakiya & Mehta Associates — Head Office Mumbai, branches in Ahmednagar and Pune. Phone, email, and contact form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" breadcrumbs={[{ label: "Contact" }]} />
      <ContactPageContent />
    </>
  );
}
