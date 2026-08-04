"use client";

import { CinematicHero } from "@/components/home/CinematicHero";
import { Counter } from "@/components/ui/Counter";
import { ReferenceCard } from "@/components/ui/Cards";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { HorizontalServiceJourney } from "@/components/services/HorizontalServiceJourney";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useSiteContent } from "@/hooks/use-site-content";
import { motion } from "framer-motion";
import Link from "next/link";

export function HomePage() {
  const { content } = useSiteContent();
  const { home, services, references, values, clientLogos } = content;

  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const featuredMarked = activeServices.filter((s) => s.featured);
  const featuredServices = (featuredMarked.length > 0 ? featuredMarked : activeServices).slice(
    0,
    5
  );

  const featuredProjects = references
    .filter((r) => r.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 4);

  const activeValues = values
    .filter((v) => v.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 4);

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

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">03 / Projeler</p>
            <h2 className="font-display mt-3 text-3xl font-semibold md:text-5xl">
              {home.projectsSectionTitle}
            </h2>
          </div>
          <SecondaryButton href="/referanslar">Tüm Referanslar</SecondaryButton>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={
                index === 0
                  ? "md:col-span-7"
                  : index === 1
                    ? "md:col-span-5"
                    : "md:col-span-6"
              }
            >
              <ReferenceCard {...project} />
            </div>
          ))}
        </div>
      </section>

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

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="section-label">05 / Değerler</p>
        <h2 className="font-display mt-3 text-3xl font-semibold md:text-5xl">
          {home.valuesSectionTitle}
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {activeValues.map((value, index) => (
            <motion.article
              key={value.id}
              variants={fadeUp}
              className="border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold">{value.title}</h3>
                <span className="text-xs tabular-nums text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-[var(--muted)]">{value.description}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-8">
          <SecondaryButton href="/degerlerimiz">Tüm Değerlerimiz</SecondaryButton>
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <p className="mb-8 text-center text-xs tracking-[0.22em] text-[var(--muted)] uppercase">
          Güvenilen Markalar
        </p>
        <div className="marquee-track gap-4 px-4">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="mx-2 flex h-16 w-40 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--surface)] px-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.logoUrl} alt={logo.name} className="max-h-8 max-w-full opacity-70" />
            </div>
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
