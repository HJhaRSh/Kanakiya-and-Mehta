"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import type { AuditCategoryKey } from "@/data/auditExperience";

const industries: { label: string; tab: AuditCategoryKey }[] = [
  { label: "Nationalized Banks", tab: "nationalized" },
  { label: "Co-operative Banks", tab: "coop" },
  { label: "Government Departments", tab: "government" },
  { label: "Insurance Companies", tab: "company" },
  { label: "Private Companies", tab: "company" },
  { label: "Regional Rural Banks", tab: "rrb" },
];

export default function TestimonialsSection() {
  return (
    <AnimatedSection variant="dots" bg="white" separated>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Trusted Across Industries"
          subtitle="From nationalized and co-operative banks to government bodies, insurers, and corporates — our audit and advisory practice spans the full spectrum of regulated and private sector clients."
          centered
        />
        <motion.div
          className="mt-8 sm:mt-10 md:mt-14 flex flex-wrap justify-center gap-3 sm:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
          }}
        >
          {industries.map(({ label, tab }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 12 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
                },
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Link
                href={`/experience#${tab}`}
                className="block rounded-full border-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--navy)] hover:shadow-[0_0_18px_rgba(201,168,76,0.45)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2"
                style={{ borderColor: "rgba(201, 168, 76, 0.5)", color: "var(--navy)" }}
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
