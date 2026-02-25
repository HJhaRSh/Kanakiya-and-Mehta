import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface PageHeroProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHero({ title, breadcrumbs }: PageHeroProps) {
  return (
    <section
      className="flex min-h-[35vh] sm:min-h-[40vh] flex-col justify-center px-4 py-12 sm:py-14 md:py-16 md:px-6 lg:px-8"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-[var(--gold)]"
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-white/50" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-white/70 transition-colors hover:text-[var(--gold)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--gold)]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--gold)" }}>
          {title}
        </h1>
      </div>
    </section>
  );
}
