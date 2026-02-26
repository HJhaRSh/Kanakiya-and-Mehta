"use client";

import { useId } from "react";

/**
 * Decorative abstract lines from the right with fading + draw animation.
 * - default: 6 lines (home page sections)
 * - dense: more lines for other pages (PageHero on About, Services, etc.)
 */
export default function NavySectionLines({ variant = "default" }: { variant?: "default" | "dense" }) {
  const id = useId().replace(/:/g, "");
  const goldId = `navy-lines-g-${id}`;
  const whiteId = `navy-lines-w-${id}`;

  const lineProps = (d: string, stroke: string, strokeWidth: number, delay: string) => ({
    d,
    pathLength: 1,
    strokeDasharray: 1,
    className: "navy-line-draw",
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    style: { animationDelay: delay },
  });

  const defaultLines = (
    <>
      <path {...lineProps("M 800 0 L -50 80", `url(#${whiteId})`, 1.5, "0s")} />
      <path {...lineProps("M 800 120 L 100 200", `url(#${goldId})`, 1.2, "0.4s")} />
      <path {...lineProps("M 800 240 L 200 340", `url(#${goldId})`, 1, "0.8s")} />
      <path {...lineProps("M 800 360 L 150 500", `url(#${whiteId})`, 1.2, "1.2s")} />
      <path {...lineProps("M 800 480 L 300 620", `url(#${goldId})`, 0.9, "1.6s")} />
      <path {...lineProps("M 800 600 L 400 700", `url(#${whiteId})`, 1, "2s")} />
    </>
  );

  const denseLines = (
    <>
      <path {...lineProps("M 800 0 L -80 60", `url(#${whiteId})`, 1.4, "0s")} />
      <path {...lineProps("M 800 40 L 50 140", `url(#${goldId})`, 1.1, "0.15s")} />
      <path {...lineProps("M 800 90 L -20 180", `url(#${whiteId})`, 1, "0.3s")} />
      <path {...lineProps("M 800 140 L 120 260", `url(#${goldId})`, 1.2, "0.45s")} />
      <path {...lineProps("M 800 200 L 80 320", `url(#${goldId})`, 0.9, "0.6s")} />
      <path {...lineProps("M 800 260 L 0 380", `url(#${whiteId})`, 1.1, "0.75s")} />
      <path {...lineProps("M 800 320 L 200 420", `url(#${goldId})`, 1, "0.9s")} />
      <path {...lineProps("M 800 380 L 100 500", `url(#${whiteId})`, 1.2, "1.05s")} />
      <path {...lineProps("M 800 440 L 250 540", `url(#${goldId})`, 0.9, "1.2s")} />
      <path {...lineProps("M 800 500 L 50 600", `url(#${goldId})`, 1, "1.35s")} />
      <path {...lineProps("M 800 560 L 300 680", `url(#${whiteId})`, 1.1, "1.5s")} />
      <path {...lineProps("M 800 620 L 150 720", `url(#${goldId})`, 0.85, "1.65s")} />
      <path {...lineProps("M 800 680 L 400 780", `url(#${whiteId})`, 1, "1.8s")} />
      <path {...lineProps("M 800 740 L 80 850", `url(#${goldId})`, 0.9, "1.95s")} />
      <path {...lineProps("M 800 800 L 350 900", `url(#${whiteId})`, 1.1, "2.1s")} />
    </>
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden navy-lines-fade"
      aria-hidden
    >
      <svg
        className="absolute right-0 top-0 h-full w-full min-w-[800px]"
        preserveAspectRatio="xMaxYMid slice"
        viewBox={variant === "dense" ? "0 0 800 900" : "0 0 800 600"}
        fill="none"
      >
        <defs>
          <linearGradient
            id={goldId}
            x1="1"
            x2="0"
            y1="0.5"
            y2="0.5"
            gradientUnits="objectBoundingBox"
          >
            <stop stopColor="rgba(201, 168, 76, 0.35)" />
            <stop offset="0.4" stopColor="rgba(201, 168, 76, 0.12)" />
            <stop offset="0.7" stopColor="rgba(201, 168, 76, 0.04)" />
            <stop offset="1" stopColor="rgba(201, 168, 76, 0)" />
          </linearGradient>
          <linearGradient
            id={whiteId}
            x1="1"
            x2="0"
            y1="0.5"
            y2="0.5"
            gradientUnits="objectBoundingBox"
          >
            <stop stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="0.5" stopColor="rgba(255, 255, 255, 0.06)" />
            <stop offset="1" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        {variant === "dense" ? denseLines : defaultLines}
      </svg>
    </div>
  );
}
