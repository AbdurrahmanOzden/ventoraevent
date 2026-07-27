"use client";

import { MarqueeText } from "@/components/animations/TextEffects";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { ReferenceCard } from "@/components/ui/Cards";
import { useSiteContent } from "@/hooks/use-site-content";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export function ReferencesPage() {
  const { content } = useSiteContent();
  const [category, setCategory] = useState<string>("Tümü");

  const references = useMemo(() => {
    const items = content.references
      .filter((r) => r.active)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    if (category === "Tümü") return items;
    return items.filter((r) => r.category === category);
  }, [content.references, category]);

  const testimonials = content.references.filter(
    (r) => r.active && r.testimonial
  );

  return (
    <>
      <PageHero
        title="Referanslar"
        subtitle="Markalar ve kurumlarla birlikte hayata geçirdiğimiz seçili projeler ve iş birlikleri."
      />

      <section className="overflow-hidden pb-10">
        <p className="mb-6 text-center text-sm tracking-[0.2em] text-[var(--muted)] uppercase">
          İş Ortaklarımız
        </p>
        <div className="marquee-track gap-6">
          {[...content.clientLogos, ...content.clientLogos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="mx-3 flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.logoUrl} alt={logo.name} className="max-h-10 max-w-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="mb-10 flex flex-wrap gap-2">
          {["Tümü", ...PROJECT_CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                category === item
                  ? "border-[var(--primary)] bg-[var(--primary)]/20 text-white"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {references.map((project) => (
            <ReferenceCard key={project.id} {...project} />
          ))}
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote
                key={`t-${item.id}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <p className="leading-relaxed text-white/85">&ldquo;{item.testimonial}&rdquo;</p>
                <footer className="mt-4 text-sm text-[var(--muted)]">
                  {item.testimonialAuthor}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : null}
      </section>

      <MarqueeText
        items={content.home.marqueeTexts.map((m) => m.text).slice(0, 4)}
      />

      <ContactCta
        title={content.home.contactCtaTitle}
        description={content.home.contactCtaDescription}
      />
    </>
  );
}
