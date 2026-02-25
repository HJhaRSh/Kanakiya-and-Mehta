"use client";

import { useState, useMemo } from "react";
import type { AuditRow } from "@/data/auditExperience";

interface AuditTableProps {
  title: string;
  rows: AuditRow[];
  columns: { key: keyof AuditRow; header: string }[];
}

export default function AuditTable({ title, rows, columns }: AuditTableProps) {
  const [sortKey, setSortKey] = useState<keyof AuditRow | null>("year");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState("");

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

  const toggleSort = (key: keyof AuditRow) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <h3 className="px-4 sm:px-6 py-3 sm:py-4 font-serif text-base sm:text-lg font-semibold" style={{ color: "var(--navy)" }}>
        {title}
      </h3>
      <div className="border-t border-gray-100 px-3 sm:px-4 py-3">
        <input
          type="search"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-xs min-h-[44px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
          aria-label="Filter table"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="cursor-pointer px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.header}
                  {sortKey === col.key && (sortDir === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 transition-colors hover:border-l-4 hover:border-l-[var(--gold)]"
                style={{
                  backgroundColor: i % 2 === 0 ? "var(--off-white)" : "white",
                }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 text-xs sm:text-sm">
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
