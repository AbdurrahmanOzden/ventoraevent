"use client";

import { PageIntro } from "@/components/layout/PageIntro";
import { ContactCta } from "@/components/sections/ContactCta";
import { Counter } from "@/components/ui/Counter";
import { MarqueeText } from "@/components/animations/TextEffects";
import { useSiteContent } from "@/hooks/use-site-content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

export function AboutPage() {
  const { content } = useSiteContent();
  const { about } = content;

  return (
    <>
      <PageIntro
        number="02"
        label="BİZ KİMİZ"
        title={about.pageTitle}
        description={about.pageSubtitle}
      />

      <MarqueeText items={about.marqueeTexts.map((m) => m.text)} />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Hikâyemiz</h2>
          <p className="text-lg leading-relaxed text-[var(--muted)]">{about.companyStory}</p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--background-soft)] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 md:px-8">
          <article className="border border-[var(--line)] bg-[var(--surface)] p-8">
            <p className="text-xs tracking-[0.2em] text-[var(--accent)] uppercase">Vizyon</p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{about.vision}</p>
          </article>
          <article className="border border-[var(--line)] bg-[var(--surface)] p-8">
            <p className="text-xs tracking-[0.2em] text-[var(--accent)] uppercase">Misyon</p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{about.mission}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Yaklaşımımız</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          {about.companyApproach}
        </p>
        <div className="mt-12 border border-[var(--line)] bg-[var(--surface)] p-8">
          <h3 className="font-display text-2xl font-semibold">{about.workCultureTitle}</h3>
          <p className="mt-4 text-[var(--muted)]">{about.workCultureDescription}</p>
          <p className="mt-6 text-[var(--foreground)]/85">{about.teamPhilosophy}</p>
        </div>
      </section>

      <section className="py-16">
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
