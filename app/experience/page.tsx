"use client";

import { useState, useEffect } from "react";
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

const VALID_TAB_KEYS: AuditCategoryKey[] = [
  "nationalized", "rrb", "dccb", "coop", "concurrent", "system", "government", "company",
];

function getTabFromHash(): AuditCategoryKey {
  if (typeof window === "undefined") return "nationalized";
  const hash = window.location.hash.slice(1).toLowerCase();
  return VALID_TAB_KEYS.includes(hash as AuditCategoryKey) ? (hash as AuditCategoryKey) : "nationalized";
}

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<AuditCategoryKey>(() =>
    typeof window !== "undefined" ? getTabFromHash() : "nationalized"
  );

  useEffect(() => {
    setActiveTab(getTabFromHash());
    const onHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleTabChange = (key: AuditCategoryKey) => {
    setActiveTab(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  return (
    <>
      <PageHero title="Track Record" breadcrumbs={[{ label: "Experience" }]} />
      <AnimatedSection variant="float" bg="off-white">
        <div id="experience-tabs" className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 h-0.5 w-12 mx-auto rounded-full" style={{ backgroundColor: "var(--gold)" }} />
            <motion.p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--gray-700)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our detailed audit experience across nationalized banks, cooperative banks, government
              departments, and corporates.
            </motion.p>
          </div>
          <motion.div
            className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
                    },
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full border-2 px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 ${
                    isActive
                      ? "border-[var(--navy)] text-white shadow-md"
                      : "border-[var(--gold)]/50 bg-white hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--navy)] hover:shadow-[0_0_18px_rgba(201,168,76,0.4)]"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "var(--navy)", color: "white" }
                      : { color: "var(--navy)" }
                  }
                >
                  {tab.label}
                </motion.button>
              );
            })}
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
