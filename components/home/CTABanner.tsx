"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NavySectionLines from "@/components/ui/NavySectionLines";

export default function CTABanner() {
  return (
    <motion.section
      className="relative overflow-hidden border-t border-[var(--gold)]/20 py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "var(--navy)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <NavySectionLines />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center md:px-6 lg:px-8">
        <motion.h2
          className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Ready to work with a trusted CA firm?
        </motion.h2>
        <motion.p
          className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Reach out today for a consultation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 sm:mt-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              href="/contact"
              className="inline-block rounded-lg px-8 py-3.5 min-h-[44px] sm:px-10 sm:py-4 text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--navy)]"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--navy)",
                boxShadow: "0 8px 24px rgba(201, 168, 76, 0.35)",
              }}
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
