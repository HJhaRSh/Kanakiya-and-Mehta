import { MapPin, Phone, Mail, User } from "lucide-react";
import type { Office } from "@/data/offices";

interface OfficeCardProps {
  office: Office;
}

export default function OfficeCard({ office }: OfficeCardProps) {
  const isHQ = office.type === "HQ";

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--navy)]/10 bg-white shadow-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgba(13,31,60,0.12)] hover:border-[var(--gold)]/40"
      style={{ borderLeftWidth: isHQ ? "4px" : "4px", borderLeftColor: isHQ ? "var(--gold)" : "rgba(13, 31, 60, 0.25)" }}
    >
      {/* Header strip — navy for HQ, subtle for Branch */}
      <div
        className="shrink-0 px-4 py-3 sm:px-5 sm:py-3.5"
        style={{ backgroundColor: isHQ ? "var(--navy)" : "var(--gray-100)" }}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold sm:text-xl" style={{ color: isHQ ? "var(--gold)" : "var(--navy)" }}>
            {office.name}
          </h3>
          <span
            className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: isHQ ? "var(--gold)" : "var(--navy)",
              color: isHQ ? "var(--navy)" : "white",
            }}
          >
            {isHQ ? "Head Office" : "Branch"}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        {office.contactPerson && (
          <p className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--navy)" }}>
            <User className="h-4 w-4 shrink-0 opacity-70" style={{ color: "var(--gold)" }} />
            {office.contactPerson}
          </p>
        )}

        <div
          className="mt-4 rounded-xl px-3 py-3 text-sm leading-relaxed"
          style={{ backgroundColor: "var(--off-white)", color: "var(--gray-700)" }}
        >
          <p className="flex items-start gap-2 break-words">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold)" }} />
            <span>
              {office.address}, {office.city} - {office.pin}
            </span>
          </p>
        </div>

        <div className="mt-auto pt-4 space-y-2.5">
          {office.phone && (
            <a
              href={`tel:${office.phone.replace(/-/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--navy)" }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--gray-100)", color: "var(--gold)" }}>
                <Phone className="h-3.5 w-3.5" />
              </span>
              {office.phone}
            </a>
          )}
          <a
            href={`tel:${office.mobile.replace(/\D/g, "")}`}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--navy)" }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--gray-100)", color: "var(--gold)" }}>
              <Phone className="h-3.5 w-3.5" />
            </span>
            {office.mobile}
          </a>
          {office.email && (
            <a
              href={`mailto:${office.email}`}
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--navy)" }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--gray-100)", color: "var(--gold)" }}>
                <Mail className="h-3.5 w-3.5" />
              </span>
              {office.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
