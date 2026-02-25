import Link from "next/link";
import { Home, Users, Briefcase, BarChart3, Mail, MapPin, Phone, FileCheck, Link2 } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Users },
  { href: "/partners", label: "Partners", icon: Users },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/experience", label: "Experience", icon: BarChart3 },
  { href: "/contact", label: "Contact", icon: Mail },
];

const services = [
  { href: "/services#statutory", label: "Statutory Audit", icon: FileCheck },
  { href: "/services#tax", label: "Tax Advisory", icon: Briefcase },
  { href: "/services#coop", label: "Co-operative Bank Audits", icon: FileCheck },
  { href: "/services#government", label: "Government Audits", icon: FileCheck },
  { href: "/services#system", label: "System & Concurrent Audit", icon: FileCheck },
  { href: "/services#corporate", label: "Corporate Law & Compliance", icon: Briefcase },
];

export default function Footer() {
  return (
    <footer
      className="border-t-2 pt-8 pb-6 sm:pt-10 md:pt-12"
      style={{ borderColor: "var(--gold)", backgroundColor: "var(--navy)" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
              >
                K&M
              </div>
              <span className="font-serif text-lg font-semibold text-white">
                Kanakiya & Mehta Associates
              </span>
            </div>
            <p className="mb-2 text-sm text-white/80">
              Three Decades of Trust. One Standard of Excellence.
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--gold)]">
              Est. 1989 · ISO 9001:2008 Certified
            </p>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/90">
              <Link2 className="h-3.5 w-3.5 text-[var(--gold)]" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-[var(--gold)]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/90">
              <FileCheck className="h-3.5 w-3.5 text-[var(--gold)]" />
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-[var(--gold)]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/90">
              <Phone className="h-3.5 w-3.5 text-[var(--gold)]" />
              Contact
            </h3>
            <p className="flex items-start gap-2 text-sm text-white/80 break-words">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--gold)] flex-shrink-0" />
              <span>
                35, Varad Estate, Near Swami Samarth Mandir,
                <br />
                Gaikwad Colony, Nagar Manmad Road,
                <br />
                Ahmednagar - 414003
              </span>
            </p>
            <a
              href="tel:02412340745"
              className="mt-2 flex items-center gap-2 text-sm text-[var(--gold)] hover:underline"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              0241-2340745 / 09422220591
            </a>
            <a
              href="mailto:cakm2007@gmail.com"
              className="mt-1 flex items-center gap-2 text-sm text-[var(--gold)] hover:underline"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              cakm2007@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 border-t border-white/10 pt-4 sm:pt-6 text-center text-xs text-white/70 px-2">
          © 2024 Kanakiya & Mehta Associates. All Rights Reserved. | ICAI Reg.
          No. 104702W
        </div>
      </div>
    </footer>
  );
}
