"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Award, Landmark, Handshake, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const highlights = [
  { icon: Building2, title: "Established 1989", desc: "Over three decades of trusted practice" },
  { icon: Award, title: "ISO 9001:2008 Certified", desc: "Quality management systems" },
  { icon: Landmark, title: "RBI Category I Empanelled", desc: "Statutory bank audit panel" },
  { icon: Handshake, title: "CAG Empanelled (WR 1683)", desc: "Government audit assignments" },
];

export default function AboutSnapshot() {
  return (
    <AnimatedSection variant="gold-shimmer" bg="off-white" separated>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl" style={{ color: "var(--navy)" }}>
              Three Decades of Trusted Practice
            </h2>
            <div className="h-1 w-14" style={{ backgroundColor: "var(--gold)" }} />
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              Kanakiya & Mehta Associates was founded in 1989 as a partnership firm of Chartered
              Accountants. We are ISO 9001:2008 certified and our eight partners bring a combined
              experience of over 200 years in statutory audit, tax advisory, and compliance. From
              our headquarters in Mumbai and branches in Ahmednagar and Pune, we serve nationalized
              banks, cooperative banks, government departments, and corporates across Maharashtra and
              beyond.
            </p>
            <motion.div whileHover={{ x: 4 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold transition-colors"
                style={{ color: "var(--gold)" }}
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <motion.div
                  className="inline-flex rounded-lg p-2 transition-all duration-300 [background-color:var(--gray-100)] group-hover:[background-color:var(--gold)]"
                  whileHover={{ scale: 1.08 }}
                >
                  <item.icon className="h-8 w-8 transition-colors [color:var(--gold)] group-hover:text-white" />
                </motion.div>
                <h3 className="mt-4 font-semibold" style={{ color: "var(--navy)" }}>
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
