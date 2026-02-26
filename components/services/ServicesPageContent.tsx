"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  FileCheck,
  Landmark,
  Building2,
  Scale,
  Calculator,
  ShieldCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ServiceDetail from "./ServiceDetail";
import { servicesDetail } from "@/data/services";

const serviceIds = [
  "statutory",
  "coop",
  "concurrent",
  "government",
  "corporate",
  "tax",
  "system",
  "corporatelaw",
] as const;

const serviceMeta: Record<(typeof serviceIds)[number], { label: string; icon: LucideIcon }> = {
  statutory: { label: "Statutory Audits", icon: FileCheck },
  coop: { label: "Co-op Bank Audits", icon: Landmark },
  concurrent: { label: "Concurrent & System", icon: ShieldCheck },
  government: { label: "Government Audits", icon: Building2 },
  corporate: { label: "Corporate Audits", icon: Scale },
  tax: { label: "Tax Advisory", icon: Calculator },
  system: { label: "System Audit", icon: ShieldCheck },
  corporatelaw: { label: "Corporate Law", icon: Briefcase },
};

export default function ServicesPageContent() {
  return (
    <>
      {/* Intro strip */}
      <AnimatedSection variant="gold-shimmer" bg="off-white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--gold)" }}>
              What We Offer
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl" style={{ color: "var(--navy)" }}>
              End-to-end CA services — audit, tax, and compliance
            </h2>
            <p className="mt-4 text-gray-600">
              From statutory bank audits and co-operative bank audits to government assignments, tax advisory, and corporate law — we bring decades of experience across Maharashtra and beyond.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Quick-jump nav */}
      <AnimatedSection variant="mesh" bg="white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <div
            className="rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-5 md:p-6 shadow-sm"
            style={{ boxShadow: "0 2px 12px rgba(13, 31, 60, 0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-1 rounded-full" style={{ backgroundColor: "var(--gold)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Jump to service
              </span>
            </div>
            <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {serviceIds.map((id) => {
                const meta = serviceMeta[id];
                const detail = servicesDetail[id];
                if (!detail || !meta) return null;
                const Icon = meta.icon;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200/80 bg-gray-50/80 px-3 py-3 sm:px-4 sm:py-3.5 transition-all duration-200 hover:border-[var(--gold)]/50 hover:shadow-md hover:bg-white"
                    style={{ color: "var(--navy)" }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200/80 bg-white transition-all duration-200 group-hover:border-transparent group-hover:bg-[var(--navy)] group-hover:shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                    >
                      <Icon className="h-4 w-4 text-[var(--navy)] transition-colors duration-200 group-hover:text-[var(--gold)]" />
                    </div>
                    <span className="text-sm font-medium truncate group-hover:font-semibold">
                      {meta.label}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </AnimatedSection>

      {/* Service details */}
      <AnimatedSection variant="float" bg="off-white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <motion.div
            className="space-y-10 sm:space-y-12 md:space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
          >
            {serviceIds.map((id, i) => {
              const detail = servicesDetail[id];
              const meta = serviceMeta[id];
              if (!detail) return null;
              return (
                <motion.div
                  key={id}
                  id={id}
                  className="scroll-mt-24"
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
                    },
                  }}
                >
                  <ServiceDetail
                    title={detail.title}
                    intro={detail.intro}
                    subsections={detail.subsections}
                    icon={meta?.icon}
                    variant={i % 2 === 1 ? "accent" : "default"}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA strip */}
      <AnimatedSection variant="rich" bg="white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <motion.div
            className="rounded-2xl p-8 sm:p-10 md:p-12 text-center"
            style={{ backgroundColor: "var(--navy)", color: "white" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-xl font-semibold sm:text-2xl">Need a specific service?</h3>
            <p className="mt-2 text-white/85 text-sm sm:text-base max-w-lg mx-auto">
              Discuss your audit, tax, or compliance requirements with our team.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}
