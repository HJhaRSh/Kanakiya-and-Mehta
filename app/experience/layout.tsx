import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Record & Experience",
  description:
    "Our audit experience: nationalized banks, RRBs, co-operative banks, concurrent audits, system audits, government departments, and company audits.",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
