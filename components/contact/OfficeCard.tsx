import { MapPin, Phone, Mail, User } from "lucide-react";
import type { Office } from "@/data/offices";

interface OfficeCardProps {
  office: Office;
}

export default function OfficeCard({ office }: OfficeCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
        >
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold" style={{ color: "var(--navy)" }}>
            {office.name}
          </h3>
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--gold)" }}>
            {office.type === "HQ" ? "Head Office" : "Branch"}
          </span>
        </div>
      </div>
      {office.contactPerson && (
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
          {office.contactPerson}
        </p>
      )}
      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-gray-600 break-words">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--gold)] flex-shrink-0" />
        <span>
          {office.address}, {office.city} - {office.pin}
        </span>
      </p>
      <div className="mt-4 space-y-2">
        {office.phone && (
          <a href={`tel:${office.phone.replace(/-/g, "")}`} className="flex items-center gap-2 text-sm text-[var(--gold)] hover:underline">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {office.phone}
          </a>
        )}
        <a href={`tel:${office.mobile.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm text-[var(--gold)] hover:underline">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {office.mobile}
        </a>
        {office.email && (
          <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-sm text-[var(--gold)] hover:underline">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            {office.email}
          </a>
        )}
      </div>
    </div>
  );
}
