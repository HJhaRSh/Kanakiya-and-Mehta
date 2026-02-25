import { FileCheck } from "lucide-react";

interface Subsection {
  heading: string;
  items: string[];
}

interface ServiceDetailProps {
  title: string;
  intro: string;
  subsections: Subsection[];
}

export default function ServiceDetail({ title, intro, subsections }: ServiceDetailProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm">
      <h2 className="flex items-center gap-2 sm:gap-3 font-serif text-xl font-semibold sm:text-2xl md:text-3xl" style={{ color: "var(--navy)" }}>
        <FileCheck className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 text-[var(--gold)]" />
        {title}
      </h2>
      <div className="mt-2 h-0.5 w-14" style={{ backgroundColor: "var(--gold)" }} />
      <p className="mt-6 text-gray-700">{intro}</p>
      <div className="mt-8 space-y-6">
        {subsections.map((sub) => (
          <div key={sub.heading}>
            <h3 className="font-semibold" style={{ color: "var(--navy)" }}>
              {sub.heading}
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-gray-600">
              {sub.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
