"use client";

import { motion } from "framer-motion";
import { Shield, Award, Target } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import OfficeCard from "@/components/contact/OfficeCard";
import { offices } from "@/data/offices";

const values = [
  {
    title: "Integrity",
    desc: "We uphold the highest ethical standards in every engagement. Our clients trust us with their most sensitive financial matters.",
    icon: Shield,
  },
  {
    title: "Expertise",
    desc: "Our partners bring 200+ years of combined experience in statutory audit, tax, and compliance across banks, government, and corporates.",
    icon: Award,
  },
  {
    title: "Commitment",
    desc: "We are committed to delivering timely, accurate, and value-added services. Your success is our priority.",
    icon: Target,
  },
];

const firmFacts = [
  { label: "Founded", value: "26th April 1989" },
  { label: "Constitution", value: "Partnership" },
  { label: "ICAI Reg. No.", value: "104702W" },
  { label: "PAN", value: "AAFFK0814R" },
  { label: "RBI Empanelment", value: "Category I" },
  { label: "Co-op Panel", value: "Category A, Reg. No. 16669" },
  { label: "CAG Empanelment", value: "WR 1683" },
  { label: "ISO", value: "9001:2008 Certified" },
];

export default function AboutContent() {
  return (
    <>
      <AnimatedSection variant="float" bg="off-white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="space-y-6"
            >
              <h2 className="font-serif text-xl font-semibold sm:text-2xl md:text-3xl" style={{ color: "var(--navy)" }}>
                A Legacy of Audit Excellence
              </h2>
              <motion.div
                className="h-0.5 w-14"
                style={{ backgroundColor: "var(--gold)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              <p className="leading-relaxed text-gray-700">
                Kanakiya & Mehta Associates was established on 26th April 1989 as a partnership firm of
                Chartered Accountants. From our headquarters in Ahmednagar and branches in Pune and Mumbai,
                we have built a reputation for precision, integrity, and deep expertise in statutory audit,
                tax advisory, and regulatory compliance.
              </p>
              <p className="leading-relaxed text-gray-700">
                We are ISO 9001:2008 certified and empanelled with the Comptroller and Auditor General of
                India (CAG), the Reserve Bank of India (RBI Category I), and the Co-operative Department
                (Category A). Our eight partners bring a combined experience of over 200 years, serving
                nationalized banks, cooperative banks, government departments, insurance companies, and
                corporates across Maharashtra and beyond.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-md"
            >
              <h3 className="font-serif text-lg sm:text-xl font-semibold" style={{ color: "var(--navy)" }}>
                Firm at a glance
              </h3>
              <div className="mt-6 space-y-4">
                {firmFacts.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    className="flex justify-between border-b border-gray-100 pb-3"
                  >
                    <span className="text-sm font-medium text-gray-600">{item.label}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--navy)" }}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="ledger" bg="white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <AnimatedSectionHeader title="Our Values" centered />
          <motion.div
            className="mt-10 sm:mt-12 md:mt-16 grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
            }}
          >
            {values.map((v) => {
              const ValueIcon = v.icon;
              return (
              <motion.div
                key={v.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
                  },
                }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-gray-200 bg-[var(--off-white)] p-5 sm:p-6 md:p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--gray-100)" }}
                >
                  <ValueIcon className="h-7 w-7 shrink-0" style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="mt-3 sm:mt-4 font-serif text-lg sm:text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  {v.title}
                </h3>
                <p className="mt-3 text-gray-600">{v.desc}</p>
              </motion.div>
            );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="float" bg="off-white">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <AnimatedSectionHeader title="Office Locations" centered />
          <motion.div
            className="mt-10 sm:mt-12 md:mt-16 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
          >
            {offices.map((office, i) => (
              <motion.div
                key={office.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
                  },
                }}
              >
                <OfficeCard office={office} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}
