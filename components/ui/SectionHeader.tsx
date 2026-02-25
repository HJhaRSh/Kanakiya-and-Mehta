interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : ""}>
      <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl" style={{ color: "var(--navy)" }}>
        {title}
      </h2>
      <div
        className={`mt-3 h-0.5 w-14 ${centered ? "mx-auto" : ""}`}
        style={{ backgroundColor: "var(--gold)" }}
      />
      {subtitle && (
        <p className="mt-3 sm:mt-4 max-w-2xl text-gray-700 text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
