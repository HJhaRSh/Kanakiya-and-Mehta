"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown, Users } from "lucide-react";
import type { Partner } from "@/data/partners";

interface PartnerCardProps {
  partner: Partner;
  compact?: boolean;
  index?: number;
}

function getInitials(name: string) {
  return name
    .replace(/^CA\s+/i, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PartnerCard({ partner, compact = false, index = 0 }: PartnerCardProps) {
  const [flipped, setFlipped] = useState(false);
  const initials = getInitials(partner.name);

  if (compact) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-6 shadow-sm transition-shadow hover:border-[var(--gold)]/40 hover:shadow-xl"
      >
        <div
          className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] transition-transform duration-300 group-hover:scale-x-100"
        />
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-lg font-semibold ring-2 ring-[var(--gold)]/30 transition-all duration-300 group-hover:ring-4 group-hover:ring-[var(--gold)]/50"
          style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}
        >
          {initials}
        </div>
        <h3 className="mt-4 text-center font-serif text-lg font-semibold" style={{ color: "var(--navy)" }}>
          {partner.name}
        </h3>
        <p className="mt-1.5 text-center text-sm font-medium" style={{ color: "var(--gold)" }}>
          {partner.specialisation}
        </p>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="perspective-[1200px]"
      style={{ minHeight: "min(320px, 60vh)" }}
    >
      <motion.div
        className="relative h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setFlipped((f) => !f)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 md:p-8 shadow-md"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 4px 24px rgba(13, 31, 60, 0.08)",
          }}
          initial={false}
          animate={{
            rotateY: flipped ? -180 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <div
            className="absolute left-0 top-0 h-1 rounded-t-2xl"
            style={{ width: "64px", backgroundColor: "var(--gold)" }}
          />
          <div
            className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full text-2xl font-semibold ring-4 ring-[var(--gold)]/20"
            style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}
          >
            {initials}
          </div>
          <h3 className="mt-6 text-center font-serif text-xl font-semibold leading-tight" style={{ color: "var(--navy)" }}>
            {partner.name}
          </h3>
          <p className="mt-2 text-center text-sm font-medium" style={{ color: "var(--gold)" }}>
            {partner.specialisation}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {partner.qualifications.map((q) => (
              <span
                key={q}
                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ backgroundColor: "var(--gray-100)", color: "var(--navy)" }}
              >
                {q}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            Member No. {partner.icaiNo} · {partner.experience} years
          </p>
          <div className="mt-auto flex items-center justify-center gap-1.5 pt-6 text-sm font-medium" style={{ color: "var(--gold)" }}>
            <span>View profile</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${flipped ? "rotate-180" : ""}`} />
          </div>
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 md:p-8 shadow-md"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 4px 24px rgba(13, 31, 60, 0.08)",
            rotateY: 180,
          }}
          initial={false}
          animate={{
            rotateY: flipped ? 0 : 180,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <div
            className="absolute right-0 top-0 h-1 rounded-t-2xl"
            style={{ width: "64px", right: 0, left: "auto", backgroundColor: "var(--gold)" }}
          />
          <div className="mt-6 flex items-center gap-2" style={{ color: "var(--navy)" }}>
            <Users className="h-5 w-5 shrink-0" style={{ color: "var(--gold)" }} />
            <span className="text-xs font-semibold uppercase tracking-wider">Profile</span>
          </div>
          <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-600">
            {partner.bio}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {partner.qualifications.map((q) => (
              <span
                key={q}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium"
                style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}
              >
                <Award className="h-3 w-3" />
                {q}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="mt-6 text-center text-sm font-semibold transition-colors hover:underline"
            style={{ color: "var(--gold)" }}
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
          >
            Back to front
          </button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
