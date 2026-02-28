"use client";

import { motion } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "./ContactForm";
import OfficeCard from "./OfficeCard";
import { offices } from "@/data/offices";

export default function ContactPageContent() {
  return (
    <AnimatedSection variant="dots" bg="off-white" className="!py-8 sm:!py-10 md:!py-12">
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold" style={{ color: "var(--navy)" }}>
              <Phone className="h-6 w-6 text-[var(--gold)]" />
              Get In Touch
            </h2>
            <motion.div
              className="mt-2 h-0.5 w-14"
              style={{ backgroundColor: "var(--gold)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
            />
            <p className="mt-4 text-gray-700">
              Reach out to our head office in Mumbai or our branches in Ahmednagar and Pune. We are
              happy to discuss your audit, tax, or compliance requirements.
            </p>
            <motion.div
              className="mt-6 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
            >
              {offices.map((office, i) => (
                <motion.div
                  key={office.id}
                  className="h-full"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-md lg:self-start"
          >
            <h3 className="flex items-center gap-2 font-serif text-xl font-semibold" style={{ color: "var(--navy)" }}>
              <MessageSquare className="h-5 w-5 text-[var(--gold)]" />
              Send a message
            </h3>
            <p className="mt-1.5 text-sm text-gray-600">
              Fill in the form below and we will get back to you.
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
