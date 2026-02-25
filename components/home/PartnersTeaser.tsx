"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { partners } from "@/data/partners";
import PartnerCard from "@/components/partners/PartnerCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

const teaserPartners = partners.slice(0, 3);

export default function PartnersTeaser() {
  return (
    <AnimatedSection variant="gold-shimmer" bg="off-white" separated>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl" style={{ color: "var(--navy)" }}>
              Partners You Can Rely On
            </h2>
            <div className="mt-3 h-0.5 w-14" style={{ backgroundColor: "var(--gold)" }} />
            <p className="mt-4 max-w-xl text-gray-700">
              Our eight partners bring decades of expertise in audit, tax, and corporate compliance.
            </p>
          </div>
          <Link
            href="/partners"
            className="font-semibold transition-colors hover:underline"
            style={{ color: "var(--gold)" }}
          >
            View All Partners →
          </Link>
        </div>
        <div className="mt-8 sm:mt-10 md:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {teaserPartners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
            >
              <PartnerCard partner={partner} compact />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
