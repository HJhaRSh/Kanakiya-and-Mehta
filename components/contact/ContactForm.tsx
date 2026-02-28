"use client";

import { useState, FormEvent } from "react";
import { User, Mail, Phone, MapPin, FileText, MessageSquare, Send } from "lucide-react";

const serviceOptions = [
  "Statutory Audit",
  "Tax Advisory",
  "Co-op Bank Audit",
  "Govt. Audit",
  "System Audit",
  "Corporate Law",
  "Other",
];

// Create a form at https://formspree.io and replace with your form endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="h-4 w-4 text-[var(--gold)]" />
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Mail className="h-4 w-4 text-[var(--gold)]" />
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Phone className="h-4 w-4 text-[var(--gold)]" />
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
          placeholder="+91 "
        />
      </div>
      <div>
        <label htmlFor="city" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4 text-[var(--gold)]" />
          City / Location
        </label>
        <input
          id="city"
          name="city"
          type="text"
          className="mt-1 w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
          placeholder="e.g. Ahmednagar, Pune"
        />
      </div>
      <div>
        <label htmlFor="service" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4 text-[var(--gold)]" />
          Service of Interest
        </label>
        <select
          id="service"
          name="service"
          className="mt-1 w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
        >
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MessageSquare className="h-4 w-4 text-[var(--gold)]" />
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
          placeholder="How can we help?"
        />
      </div>
      {status === "success" && (
        <p className="rounded-lg bg-green-50 p-4 text-sm font-medium text-green-800">
          Thank you. Your message has been sent. We will get back to you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-800">
          Something went wrong. Please try again or email us directly at cakm2007@gmail.com.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 min-h-[48px] font-semibold text-white transition-all hover:opacity-95 disabled:opacity-70"
        style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
      >
        <Send className="h-4 w-4" />
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
