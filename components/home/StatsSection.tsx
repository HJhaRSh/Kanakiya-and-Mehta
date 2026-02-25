"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const stats = [
  { value: 35, suffix: "+", label: "Years of Practice" },
  { value: 200, suffix: "+", label: "Combined Partner Experience (years)" },
  { value: 50, suffix: "+", label: "Bank Audits Completed" },
  { value: 8, suffix: "", label: "Expert Partners" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
      style={{ color: "var(--gold)" }}
    >
      {inView ? `${value}${suffix}` : "0"}
    </motion.span>
  );
}

export default function StatsSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/10 py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, var(--gold), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <motion.h2
          className="text-center font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us
        </motion.h2>
        <motion.div
          className="mx-auto mt-4 h-1 w-14"
          style={{ backgroundColor: "var(--gold)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        <div className="mt-10 sm:mt-12 md:mt-16 grid gap-8 sm:gap-10 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              whileHover={{ scale: 1.03 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
