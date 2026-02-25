"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCheck,
  Calculator,
  Landmark,
  Building2,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { homeServices } from "@/data/services";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";

const iconMap = {
  statutory: FileCheck,
  tax: Calculator,
  coop: Landmark,
  government: Building2,
  system: ShieldCheck,
  corporate: Scale,
};

export default function ServicesSection() {
  return (
    <AnimatedSection variant="rich" bg="white" separated>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Comprehensive CA Services Across Maharashtra"
          subtitle="Your financial affairs, handled with precision. From statutory audit to tax advisory and corporate compliance."
          centered
        />
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
        >
          {homeServices.map((service, i) => {
            const Icon = iconMap[service.id as keyof typeof iconMap] || FileCheck;
            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
                  },
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm p-4 sm:p-6 shadow-sm transition-all hover:border-[var(--gold)]/50 hover:shadow-xl"
                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor: "transparent",
                }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full w-1 origin-bottom scale-y-0 rounded-r bg-gradient-to-b from-[var(--gold)] to-[var(--gold-light)] transition-transform duration-300 group-hover:scale-y-100"
                />
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-md [background-color:var(--gray-100)] group-hover:[background-color:var(--gold)]"
                >
                  <Icon className="h-6 w-6 transition-colors [color:var(--gold)] group-hover:text-white" />
                </div>
                <h3 className="mt-3 sm:mt-4 font-serif text-lg font-semibold sm:text-xl" style={{ color: "var(--navy)" }}>
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.shortDesc}</p>
                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    href={`/services#${service.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
                    style={{ color: "var(--gold)" }}
                  >
                    Learn more
                    <span className="inline-block">→</span>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
