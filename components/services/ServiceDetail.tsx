import { type LucideIcon, FileCheck, Landmark, Building2, Scale, Calculator, ShieldCheck, Briefcase } from "lucide-react";

interface Subsection {
  heading: string;
  items: string[];
}

interface ServiceDetailProps {
  title: string;
  intro: string;
  subsections: Subsection[];
  icon?: LucideIcon;
  variant?: "default" | "accent";
}

export default function ServiceDetail({ title, intro, subsections, icon: Icon = FileCheck, variant = "default" }: ServiceDetailProps) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-gray-200/90 p-0 shadow-md transition-shadow hover:shadow-lg"
      style={{
        backgroundColor: variant === "accent" ? "rgba(247, 245, 240, 0.6)" : "white",
        boxShadow: variant === "accent" ? "0 4px 24px rgba(13, 31, 60, 0.06)" : undefined,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
        style={{ backgroundColor: "var(--gold)" }}
      />
      <div className="pl-6 pr-5 py-5 sm:pl-8 sm:pr-6 sm:py-6 md:pl-10 md:pr-8 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}
          >
            <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-xl font-semibold sm:text-2xl md:text-3xl leading-tight" style={{ color: "var(--navy)" }}>
              {title}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">{intro}</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
          {subsections.map((sub) => (
            <div key={sub.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                {sub.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {sub.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
