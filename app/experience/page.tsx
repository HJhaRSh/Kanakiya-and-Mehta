"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AuditTable from "@/components/experience/AuditTable";
import {
  auditCategories,
  nationalizedBankAudits,
  regionalRuralBankAudits,
  districtCentralCoopAudits,
  cooperativeBankAudits,
  concurrentBankAudits,
  systemAudits,
  governmentAudits,
  companyAudits,
} from "@/data/auditExperience";
import type { AuditCategoryKey } from "@/data/auditExperience";

const tabs: { key: AuditCategoryKey; label: string }[] = [
  { key: "nationalized", label: "Nationalized Banks" },
  { key: "rrb", label: "Regional Rural Banks" },
  { key: "dccb", label: "District Central Co-op" },
  { key: "coop", label: "Co-operative Banks" },
  { key: "concurrent", label: "Concurrent Audits" },
  { key: "system", label: "System Audits" },
  { key: "government", label: "Government" },
  { key: "company", label: "Company Audits" },
];

const tableConfig: Record<
  Exclude<AuditCategoryKey, "company">,
  { key: keyof import("@/data/auditExperience").AuditRow; header: string }[]
> = {
  nationalized: [
    { key: "bankName", header: "Bank Name" },
    { key: "branch", header: "Branch" },
    { key: "year", header: "Year" },
  ],
  rrb: [
    { key: "bankName", header: "Bank" },
    { key: "place", header: "Place" },
    { key: "workingCapital", header: "Working Capital" },
    { key: "year", header: "Year" },
  ],
  dccb: [
    { key: "bankName", header: "Bank" },
    { key: "place", header: "Place" },
    { key: "workingCapital", header: "Working Capital" },
    { key: "year", header: "Year" },
  ],
  coop: [
    { key: "bankName", header: "Bank" },
    { key: "place", header: "Place" },
    { key: "year", header: "Year" },
  ],
  concurrent: [
    { key: "bankName", header: "Bank Name" },
    { key: "branch", header: "Branch" },
    { key: "year", header: "Year" },
  ],
  system: [
    { key: "nature", header: "Nature" },
    { key: "bankName", header: "Bank" },
    { key: "branch", header: "Branch" },
    { key: "year", header: "Year" },
  ],
  government: [
    { key: "departmentName", header: "Department" },
    { key: "year", header: "Year" },
  ],
};

const dataMap = {
  nationalized: nationalizedBankAudits,
  rrb: regionalRuralBankAudits,
  dccb: districtCentralCoopAudits,
  coop: cooperativeBankAudits,
  concurrent: concurrentBankAudits,
  system: systemAudits,
  government: governmentAudits,
};

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<AuditCategoryKey>("nationalized");

  return (
    <>
      <PageHero title="Track Record" breadcrumbs={[{ label: "Experience" }]} />
      <AnimatedSection variant="float" bg="off-white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <motion.p
            className="mx-auto max-w-2xl text-center text-gray-700"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our detailed audit experience across nationalized banks, cooperative banks, government
            departments, and corporates.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
            }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
                  },
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={
                  activeTab === tab.key
                    ? { backgroundColor: "var(--navy)" }
                    : {}
                }
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="mt-12"
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === "company" ? (
              <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="font-serif text-lg font-semibold" style={{ color: "var(--navy)" }}>
                  {auditCategories.company.title}
                </h3>
                <ul className="mt-6 list-inside list-disc space-y-2 text-gray-700">
                  {companyAudits.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <AuditTable
                title={auditCategories[activeTab].title}
                rows={dataMap[activeTab] as import("@/data/auditExperience").AuditRow[]}
                columns={tableConfig[activeTab]}
              />
            )}
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}
