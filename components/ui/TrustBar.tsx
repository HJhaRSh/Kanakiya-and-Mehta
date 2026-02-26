"use client";

import { motion } from "framer-motion";
import NavySectionLines from "./NavySectionLines";

const items = [
  "ISO 9001:2008 Certified",
  "CAG Empanelled",
  "Category I — RBI Audit Panel",
  "Category A — Co-op Panel",
  "ICAI Registered Firm No. 104702W",
  "Offices in Ahmednagar | Pune | Mumbai",
];

export default function TrustBar() {
  const repeated = [...items, ...items];

  return (
    <section
      className="relative overflow-hidden border-b border-[var(--gold)]/20 py-3 sm:py-4"
      style={{ backgroundColor: "var(--navy)" }}
      aria-label="Credentials and certifications"
    >
      <NavySectionLines />
      <motion.div
        className="relative z-10 flex gap-6 sm:gap-12 whitespace-nowrap"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: { repeat: Infinity, duration: 35, ease: "linear" },
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[var(--gold)]"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
