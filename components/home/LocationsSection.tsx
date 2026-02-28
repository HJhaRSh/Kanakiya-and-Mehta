"use client";

import { motion } from "framer-motion";
import { offices } from "@/data/offices";
import OfficeCard from "@/components/contact/OfficeCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";

export default function LocationsSection() {
  return (
    <AnimatedSection variant="float" bg="off-white" separated>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Office Presence"
          subtitle="Headquartered in Mumbai with branches in Ahmednagar and Pune."
          centered
        />
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
        >
          {offices.map((office, i) => (
            <motion.div
              key={office.id}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
                },
              }}
            >
              <OfficeCard office={office} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
