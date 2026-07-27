"use client";

import { MarqueeText } from "@/components/animations/TextEffects";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { Counter } from "@/components/ui/Counter";
import { useSiteContent } from "@/hooks/use-site-content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

export function AboutPage() {
  const { content } = useSiteContent();
  const { about } = content;

  return (
    <>
      <PageHero title={about.pageTitle} subtitle={about.pageSubtitle} />
      <MarqueeText items={about.marqueeTexts.map((m) => m.text)} />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Hikâyemiz</h2>
            <p className="mt-6 leading-relaxed text-[var(--muted)] md:text-lg">
              {about.companyStory}
            </p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/25 to-[var(--secondary)]/20" />
            <div className="absolute inset-0 grid-texture" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]/50 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-2 md:px-8">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8">
            <h3 className="font-display text-2xl font-semibold">Vizyon</h3>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{about.vision}</p>
          </article>
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8">
            <h3 className="font-display text-2xl font-semibold">Misyon</h3>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{about.mission}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Yaklaşımımız</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          {about.companyApproach}
        </p>
      </section>

      <section className="border-y border-[var(--border)] py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-bold md:text-4xl">{about.workCultureTitle}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
            {about.workCultureDescription}
          </p>
          <p className="mt-8 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--muted)]">
            {about.teamPhilosophy}
          </p>
        </div>
      </section>

      <section className="py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 md:grid-cols-4 md:px-8"
        >
          {about.statistics.map((stat) => (
            <motion.div key={stat.id} variants={fadeUp}>
              <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <ContactCta title={about.ctaTitle} description={about.ctaDescription} />
    </>
  );
}
