"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, TrendingUp, Search } from "lucide-react";
import type { AuditRow } from "@/data/auditExperience";

interface ExperienceBlockProps {
  title: string;
  rows: AuditRow[];
  columns: { key: keyof AuditRow; header: string }[];
  /** Short summary line shown above the cards */
  summary?: string;
}

function getPrimaryLabel(row: AuditRow): string {
  return (
    row.bankName ??
    row.departmentName ??
    row.nature ??
    (row.companyName ?? "—")
  );
}

function getSecondaryLabel(row: AuditRow): string | null {
  if (row.branch) return row.branch;
  if (row.place) return row.place;
  return null;
}

export default function ExperienceBlock({
  title,
  rows,
  columns,
  summary,
}: ExperienceBlockProps) {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof AuditRow | null>("year");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedRows = useMemo(() => {
    let list = [...rows];
    if (filter) {
      const f = filter.toLowerCase();
      list = list.filter((row) =>
        columns.some((col) => {
          const val = row[col.key];
          return typeof val === "string" && val.toLowerCase().includes(f);
        })
      );
    }
    if (sortKey) {
      list.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === "number" && typeof bv === "number") {
          return sortDir === "asc" ? av - bv : bv - av;
        }
        const as = String(av ?? "");
        const bs = String(bv ?? "");
        return sortDir === "asc"
          ? as.localeCompare(bs)
          : bs.localeCompare(as);
      });
    }
    return list;
  }, [rows, columns, sortKey, sortDir, filter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-semibold sm:text-2xl" style={{ color: "var(--navy)" }}>
          {title}
        </h2>
        {summary && (
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">{summary}</p>
        )}
      </div>

      {rows.length > 4 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search clients or locations..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full min-h-[44px] pl-9 pr-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
              aria-label="Filter experience"
            />
          </div>
          <p className="text-xs text-gray-500">
            {sortedRows.length} of {rows.length} engagements
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {sortedRows.map((row, i) => {
            const primary = getPrimaryLabel(row);
            const secondary = getSecondaryLabel(row);
            const year = row.year;
            const workingCapital = row.workingCapital;

            return (
              <motion.article
                key={primary + (secondary ?? "") + (year ?? "") + i}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[var(--navy)] truncate" title={primary}>
                        {primary}
                      </p>
                      {secondary && (
                        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
                          <span>{secondary}</span>
                        </p>
                      )}
                    </div>
                    {year != null && (
                      <span
                        className="shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: "var(--gray-100)", color: "var(--navy)" }}
                      >
                        <Calendar className="h-3 w-3" />
                        {year}
                      </span>
                    )}
                  </div>
                  {workingCapital && (
                    <div
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                      style={{ backgroundColor: "rgba(201, 168, 76, 0.12)", color: "var(--navy)" }}
                    >
                      <TrendingUp className="h-4 w-4 shrink-0" style={{ color: "var(--gold)" }} />
                      <span>{workingCapital} working capital</span>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {sortedRows.length === 0 && (
        <p className="rounded-xl border border-gray-200 bg-gray-50/50 py-8 text-center text-sm text-gray-500">
          No matches for &quot;{filter}&quot;. Try a different search.
        </p>
      )}
    </div>
  );
}
