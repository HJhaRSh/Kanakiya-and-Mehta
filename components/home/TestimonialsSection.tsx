"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";

const industries = [
  "Nationalized Banks",
  "Co-operative Banks",
  "Government Departments",
  "Insurance Companies",
  "Private Companies",
  "Regional Rural Banks",
];

export default function TestimonialsSection() {
  return (
    <AnimatedSection variant="dots" bg="white" separated>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Trusted Across Industries"
          subtitle="We serve a diverse clientele including banks, government bodies, insurers, and corporates."
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
          {industries.map((industry, i) => (
            <motion.span
              key={industry}
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
              className="rounded-full border-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors hover:border-[var(--gold)] hover:shadow-md"
              style={{ borderColor: "rgba(201, 168, 76, 0.5)", color: "var(--navy)" }}
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
