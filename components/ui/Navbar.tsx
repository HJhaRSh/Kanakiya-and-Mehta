"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, X, Home, Users, Briefcase, BarChart3, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Users },
  { href: "/partners", label: "Partners", icon: Users },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/experience", label: "Experience", icon: BarChart3 },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0" aria-label="Home">
          <div
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-semibold"
            style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
          >
            K&M
          </div>
          <div className="min-w-0">
            <span className="font-serif text-sm font-semibold text-white sm:text-base md:text-lg truncate block">
              Kanakiya & Mehta Associates
            </span>
            <span className="block text-[9px] sm:text-[10px] font-medium uppercase tracking-widest text-white/80">
              Chartered Accountants
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors hover:text-[var(--gold)] ${
                  pathname === link.href ? "text-[var(--gold)]" : "text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 w-full"
                    style={{ backgroundColor: "var(--gold)" }}
                  />
                )}
              </Link>
            );
          })}
          <a
            href="tel:09422220591"
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
            style={{ color: "var(--gold)" }}
            aria-label="Call us"
            title="09422220591"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 min-w-[44px] min-h-[44px] items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden touch-target"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
            style={{ backgroundColor: "var(--navy)" }}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                      pathname === link.href
                        ? "bg-white/10 text-[var(--gold)]"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
              <a
                href="tel:09422220591"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium"
                style={{ color: "var(--gold)" }}
                onClick={() => setMobileOpen(false)}
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
