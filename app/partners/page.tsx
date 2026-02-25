"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { partners } from "@/data/partners";
import PartnerCard from "@/components/partners/PartnerCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function PartnersPage() {
  return (
    <>
      <PageHero title="Our Partners" breadcrumbs={[{ label: "Partners" }]} />
      <section
        className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
        style={{
          backgroundColor: "var(--off-white)",
          backgroundImage: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 168, 76, 0.06), transparent 60%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--gold)" }}
            >
              Expertise & Leadership
            </motion.p>
            <h2 className="mt-4 font-serif text-2xl font-semibold sm:text-3xl md:text-4xl" style={{ color: "var(--navy)" }}>
              Partners You Can Rely On
            </h2>
            <div
              className="mx-auto mt-4 h-0.5 w-16"
              style={{ backgroundColor: "var(--gold)" }}
            />
            <p className="mt-6 text-gray-600 leading-relaxed">
              Our eight partners bring decades of experience in statutory audit, tax advisory,
              cooperative bank audits, and corporate law. Each holds relevant qualifications
              including FCA, DISA, FAFD, and CS.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 sm:mt-16 md:mt-20 grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {partners.map((partner, i) => (
              <motion.div key={partner.id} variants={item}>
                <PartnerCard partner={partner} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
