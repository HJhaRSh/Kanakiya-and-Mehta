"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import StatCounter from "./StatCounter";

const stats = [
  { value: 35, suffix: "+", label: "Years" },
  { value: 8, suffix: "", label: "Partners" },
  { value: 100, suffix: "+", label: "Clients Served" },
];

const lineVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.08, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
          alt="Professional finance and accounting"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-90"
        style={{ backgroundColor: "var(--navy)" }}
      />
      <div className="grain-overlay" aria-hidden />
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 py-12 sm:py-16 md:py-20 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <motion.h1
            className="font-serif text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ color: "var(--gold)" }}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Kanakiya & Mehta Associates
          </motion.h1>
          <motion.p
            className="mt-3 sm:mt-4 text-sm font-medium uppercase tracking-widest text-white/90 sm:text-lg md:text-xl"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Chartered Accountants | Established 1989
          </motion.p>
          <motion.p
            className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base text-white/90 sm:text-xl md:text-2xl"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Three Decades of Trust. One Standard of Excellence.
          </motion.p>
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded px-6 py-3.5 min-h-[44px] w-full sm:w-auto text-base font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--navy)]"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--navy)",
                  boxShadow: "0 4px 14px rgba(201, 168, 76, 0.4)",
                }}
              >
                Our Services
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded border-2 border-white px-6 py-3.5 min-h-[44px] w-full sm:w-auto text-base font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--navy)]"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {stats.map((stat, i) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={0.9 + i * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
