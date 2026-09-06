"use client";

import { PageIntro } from "@/components/layout/PageIntro";
import { BRAND_LOGOS } from "@/data/brand-logos";
import { cn } from "@/lib/utils";

const LARGE_LOGO_IDS = new Set(["b10", "b19", "b20", "b21", "b22", "b24", "b25", "b32", "b37", "b40"]);
const ROW_DURATIONS = ["42s", "54s", "48s", "62s"];

function rowsByMod(count: number) {
  return Array.from({ length: count }, (_, row) =>
    BRAND_LOGOS.filter((_, index) => index % count === row)
  );
}

function LogoRow({
  logos,
  duration,
}: {
  logos: typeof BRAND_LOGOS;
  duration: string;
}) {
  const loop = [...logos, ...logos];

  return (
    <div className="brand-marquee__mask">
      <div className="brand-marquee__row" style={{ animationDuration: duration }}>
        {loop.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className={cn("brand-marquee__cell", LARGE_LOGO_IDS.has(logo.id) && "brand-marquee__cell--lg")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Marquee({
  rowCount,
  className,
}: {
  rowCount: number;
  className?: string;
}) {
  const rows = rowsByMod(rowCount);

  return (
    <div className={cn("brand-marquee", className)} aria-label="Referans markalar">
      {rows.map((logos, index) => (
        <div key={index}>
          {index > 0 ? <div className="h-px bg-black/10" /> : null}
          <LogoRow logos={logos} duration={ROW_DURATIONS[index] || "48s"} />
        </div>
      ))}
    </div>
  );
}

export function ReferencesPage() {
  return (
    <>
      <PageIntro number="04" label="REFERANSLAR" title="Markalar." />

      <section className="px-0 pb-16 md:pb-28">
        <Marquee rowCount={2} className="brand-marquee--desktop" />
        <Marquee rowCount={4} className="brand-marquee--mobile" />
      </section>
    </>
  );
}
