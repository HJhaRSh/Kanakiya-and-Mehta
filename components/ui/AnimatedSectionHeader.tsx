"use client";

import { motion } from "framer-motion";

interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function AnimatedSectionHeader({
  title,
  subtitle,
  centered = false,
}: AnimatedSectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : ""}>
      <motion.h2
        className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl"
        style={{ color: "var(--navy)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`mt-3 h-0.5 ${centered ? "mx-auto origin-center" : "origin-left"}`}
        style={{ backgroundColor: "var(--gold)", width: 56 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      />
      {subtitle && (
        <motion.p
          className="mt-3 sm:mt-4 max-w-2xl text-gray-700 text-base md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
