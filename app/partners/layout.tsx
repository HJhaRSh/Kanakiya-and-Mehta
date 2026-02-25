import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners",
  description:
    "Meet the eight partners of Kanakiya & Mehta Associates — FCA, DISA, and specialists in audit, tax, and corporate compliance.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
