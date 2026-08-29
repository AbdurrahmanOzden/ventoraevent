"use client";

import { PageIntro } from "@/components/layout/PageIntro";
import { BRAND_LOGOS } from "@/data/brand-logos";
import { cn } from "@/lib/utils";

const LARGE_LOGO_IDS = new Set(["b10", "b19", "b20", "b21", "b22", "b24", "b25", "b32", "b37"]);

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

export function ReferencesPage() {
  const topRow = BRAND_LOGOS.filter((_, index) => index % 2 === 0);
  const bottomRow = BRAND_LOGOS.filter((_, index) => index % 2 === 1);

  return (
    <>
      <PageIntro number="04" label="REFERANSLAR" title="Markalar." />

      <section className="px-0 pb-28">
        <div className="brand-marquee" aria-label="Referans markalar">
          <LogoRow logos={topRow} duration="48s" />
          <div className="h-px bg-black/10" />
          <LogoRow logos={bottomRow} duration="62s" />
        </div>
      </section>
    </>
  );
}
