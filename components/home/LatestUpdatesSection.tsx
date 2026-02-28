"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Clock, CalendarDays, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";

type UpdateItem = {
  title: string;
  description: string;
  date: string;
  source: string;
  link: string;
  category: string;
  image?: string;
};

type ApiResponse = {
  success: boolean;
  updatedAt: string;
  items: UpdateItem[];
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const ROTATE_INTERVAL_MS = 5500;
const CARDS_PER_PAGE = 3;
/** Fallback when an image fails to load – use first image from public/news. */
const FALLBACK_IMAGE = "/news/pexels-alesiakozik-6770610.jpg";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function clampStyle(lines: number) {
  return {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  };
}

function UpdateCard({ u }: { u: UpdateItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-[var(--gold)]/35">
      {/* Image (from feed or default placeholder) */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-gray-100">
        <img
          src={u.image ?? FALLBACK_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            if (el.src === FALLBACK_IMAGE) {
              el.style.display = "none";
              el.nextElementSibling?.classList.remove("hidden");
              return;
            }
            el.src = FALLBACK_IMAGE;
            el.onerror = null;
          }}
        />
        <div
          className="absolute inset-0 hidden flex items-center justify-center"
          style={{ backgroundColor: "var(--gray-100)" }}
          aria-hidden
        >
          <Newspaper className="h-12 w-12 opacity-40" style={{ color: "var(--navy)" }} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
            style={{ backgroundColor: "var(--gray-100)", color: "var(--navy)" }}
          >
            {u.category}
          </span>
          <span className="text-xs text-gray-500">{formatDate(u.date)}</span>
        </div>
        <h3
          className="mt-3 font-serif text-lg font-semibold leading-snug"
          style={{ color: "var(--navy)" }}
          title={u.title}
        >
          <span style={clampStyle(2)}>{u.title}</span>
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          <span style={clampStyle(2)}>
            {u.description || "Click through to read the full update."}
          </span>
        </p>
        <div className="mt-4 flex flex-1 items-end justify-between gap-3">
          <span className="text-xs text-gray-500">
            Source: <span className="font-medium text-gray-700">{u.source}</span>
          </span>
          <Link
            href={u.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--navy)", color: "white" }}
          >
            Read More
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function LatestUpdatesSection() {
  const [items, setItems] = useState<UpdateItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const load = useCallback(async () => {
    try {
      setFailed(false);
      const res = await fetch("/api/latest-updates", { cache: "no-store" });
      if (!res.ok) throw new Error("Bad response");
      const data = (await res.json()) as ApiResponse;
      if (!data.success) throw new Error("API failed");
      setItems(data.items);
      setUpdatedAt(data.updatedAt);
      setPage(0);
    } catch {
      setFailed(true);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
    const id = window.setInterval(load, ONE_HOUR_MS);
    return () => window.clearInterval(id);
  }, [load]);

  const list = useMemo(() => (items ?? []).slice(0, 12), [items]);
  const totalPages = Math.max(1, Math.ceil(list.length / CARDS_PER_PAGE));
  const currentPage = list.length === 0 ? 0 : page % totalPages;
  const visibleItems = useMemo(() => {
    const start = currentPage * CARDS_PER_PAGE;
    return list.slice(start, start + CARDS_PER_PAGE);
  }, [list, currentPage]);

  useEffect(() => {
    if (list.length <= CARDS_PER_PAGE) return;
    const t = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [list.length, totalPages]);

  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <AnimatedSection variant="mesh" bg="white" separated>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <AnimatedSectionHeader
              title="Latest Finance & Tax Updates"
              subtitle="Real-time updates across Income Tax, GST, RBI, MCA, SEBI, and Budget announcements."
              centered
            />
            <div className="mx-auto max-w-2xl text-center text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Auto-refreshes every 1 hour
              </span>
              {updatedAt && (
                <span className="ml-3 inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Updated {formatDate(updatedAt)}
                </span>
              )}
            </div>
          </div>

          {failed ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
              Latest updates currently unavailable.
            </div>
          ) : items === null ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="h-4 w-24 rounded bg-gray-100" />
                  <div className="mt-3 h-5 w-4/5 rounded bg-gray-100" />
                  <div className="mt-2 h-4 w-full rounded bg-gray-100" />
                  <div className="mt-4 h-9 w-28 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
              Latest updates currently unavailable.
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {visibleItems.map((u) => (
                      <UpdateCard key={u.link} u={u} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:border-[var(--gold)] hover:bg-gray-50 lg:flex"
                      aria-label="Previous updates"
                    >
                      <ChevronLeft className="h-5 w-5" style={{ color: "var(--navy)" }} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:border-[var(--gold)] hover:bg-gray-50 lg:flex"
                      aria-label="Next updates"
                    >
                      <ChevronRight className="h-5 w-5" style={{ color: "var(--navy)" }} />
                    </button>
                  </>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentPage ? "w-6" : "w-2"
                      }`}
                      style={{
                        backgroundColor: i === currentPage ? "var(--gold)" : "var(--gray-100)",
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

