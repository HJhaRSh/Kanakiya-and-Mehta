"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { partners } from "@/data/partners";
import PartnerCard from "@/components/partners/PartnerCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

const CAROUSEL_INTERVAL_MS = 8000;
const CARDS_VISIBLE = 3;

function getVisiblePartners(offset: number) {
  const len = partners.length;
  return Array.from({ length: CARDS_VISIBLE }, (_, i) => partners[(offset + i) % len]);
}

export default function PartnersTeaser() {
  const [offset, setOffset] = useState(0);
  const visiblePartners = getVisiblePartners(offset);

  useEffect(() => {
    const id = setInterval(() => {
      setOffset((prev) => (prev + CARDS_VISIBLE) % partners.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

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
        <div className="mt-8 sm:mt-10 md:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-h-[220px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            {visiblePartners.map((partner, i) => (
              <motion.div
                key={`${partner.id}-${offset}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Link href="/partners" className="block h-full cursor-pointer">
                  <PartnerCard partner={partner} compact index={i} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-1.5">
          {partners.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show partner set ${i + 1}`}
              onClick={() => setOffset(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: offset === i ? 24 : 8,
                backgroundColor: offset === i ? "var(--gold)" : "var(--gray-400)",
                opacity: offset === i ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
