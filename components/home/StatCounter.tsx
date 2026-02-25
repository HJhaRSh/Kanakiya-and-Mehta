"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

export default function StatCounter({ value, suffix, label, delay = 0 }: StatCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <span
        className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
        style={{ color: "var(--gold)" }}
      >
        {count}
        {suffix}
      </span>
      <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-white/80">
        {label}
      </p>
    </div>
  );
}
