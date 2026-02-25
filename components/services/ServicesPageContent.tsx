"use client";

import { motion } from "framer-motion";
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

export default function ServicesPageContent() {
  return (
    <AnimatedSection variant="float" bg="off-white">
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <motion.div
          className="space-y-10 sm:space-y-12 md:space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
        >
          {serviceIds.map((id, i) => {
            const detail = servicesDetail[id];
            if (!detail) return null;
            return (
              <motion.div
                key={id}
                id={id}
                variants={{
                  hidden: { opacity: 0, y: 32 },
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
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
