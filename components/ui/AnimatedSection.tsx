"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** 'dots' | 'gradient' | 'shine' | 'float' | 'gold-shimmer' | 'pulse' | 'rich' | 'mesh' | 'ledger' | 'none' */
  variant?: "dots" | "gradient" | "shine" | "float" | "gold-shimmer" | "pulse" | "rich" | "mesh" | "ledger" | "none";
  /** Background color class or style */
  bg?: "white" | "off-white";
  /** Add visible separator (border + gold accent) below section */
  separated?: boolean;
}

const bgClasses = {
  white: "bg-white",
  "off-white": "bg-[var(--off-white)]",
};

export default function AnimatedSection({
  children,
  className = "",
  variant = "none",
  bg = "white",
  separated = true,
}: AnimatedSectionProps) {
  const sectionClass = [
    "relative py-12 sm:py-16 md:py-20",
    bgClasses[bg],
    variant === "dots" && "section-bg-dots",
    variant === "gradient" && "section-bg-gradient",
    variant === "shine" && "section-bg-shine",
    variant === "float" && "section-bg-float",
    variant === "gold-shimmer" && "section-bg-gold-shimmer",
    variant === "pulse" && "section-bg-pulse",
    variant === "rich" && "section-bg-rich",
    variant === "mesh" && "section-bg-mesh",
    variant === "ledger" && "section-bg-ledger",
    separated && "section-separated",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.section
      className={`${sectionClass} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.section>
  );
}
