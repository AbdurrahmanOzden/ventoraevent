"use client";

import { CinematicHero } from "@/components/home/CinematicHero";
import { Counter } from "@/components/ui/Counter";
import { PrimaryButton } from "@/components/ui/Button";
import { HorizontalServiceJourney } from "@/components/services/HorizontalServiceJourney";
import { useSiteContent } from "@/hooks/use-site-content";
import Link from "next/link";

export function HomePage() {
  const { content } = useSiteContent();
  const { home, services } = content;

  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const featuredMarked = activeServices.filter((s) => s.featured);
  const featuredServices = featuredMarked.length > 0 ? featuredMarked : activeServices;

  return (
    <>
      <CinematicHero />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-label">02 / Yaklaşım</p>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
              {home.aboutPreviewTitle}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              {home.aboutPreviewDescription}
            </p>
            <Link
              href="/biz-kimiz"
              className="mt-8 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1 text-sm text-[var(--accent)]"
            >
              Biz Kimiz →
            </Link>
          </div>
        </div>
      </section>

      <HorizontalServiceJourney
        services={featuredServices}
        introTitle={home.servicesSectionTitle}
        introSubtitle="Seçili hizmetlerimizi kaydırarak keşfedin."
      />

      <section className="border-y border-[var(--line)] bg-[var(--background-soft)]/75 py-20 backdrop-blur-[2px]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 md:grid-cols-4 md:px-8">
          {home.statistics.map((stat) => (
            <Counter
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="relative overflow-hidden border border-[var(--line)] bg-[var(--surface)] p-8 md:p-14">
          <div className="absolute inset-0 line-grid opacity-20" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-label">Sonraki Adım</p>
              <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold md:text-5xl">
                {home.contactCtaTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--muted)]">
                {home.contactCtaDescription}
              </p>
            </div>
            <PrimaryButton href="/iletisim" size="lg">
              Teklif Al
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
