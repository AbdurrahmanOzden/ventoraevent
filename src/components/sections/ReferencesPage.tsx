"use client";

import { MarqueeText } from "@/components/animations/TextEffects";
import { PageIntro } from "@/components/layout/PageIntro";
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
      <PageIntro
        number="05"
        label="REFERANSLAR"
        title="Markalar ve kurumlarla birlikte hayata geçirdiğimiz seçili projeler."
        description="Her iş birliği; strateji, kreatif ve prodüksiyonun aynı ritimde çalıştığı bir deneyim olarak kurgulanır."
      />

      <section className="overflow-hidden pb-10">
        <div className="marquee-track gap-4">
          {[...content.clientLogos, ...content.clientLogos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="mx-2 flex h-16 w-40 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--surface)] px-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.logoUrl} alt={logo.name} className="max-h-8 max-w-full" />
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
                "border px-4 py-2 text-sm transition",
                category === item
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-white"
                  : "border-[var(--line)] text-[var(--muted)] hover:text-white"
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
          className="grid gap-5 md:grid-cols-12"
        >
          {references.map((project, index) => (
            <div
              key={project.id}
              className={index % 5 === 0 ? "md:col-span-7" : "md:col-span-5"}
            >
              <ReferenceCard {...project} />
            </div>
          ))}
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote
                key={`t-${item.id}`}
                className="border border-[var(--line)] bg-[var(--surface)] p-6"
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

      <MarqueeText items={content.home.marqueeTexts.map((m) => m.text).slice(0, 4)} />
      <ContactCta
        title={content.home.contactCtaTitle}
        description={content.home.contactCtaDescription}
      />
    </>
  );
}
