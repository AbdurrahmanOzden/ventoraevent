"use client";

import { PageIntro } from "@/components/layout/PageIntro";
import { ContactCta } from "@/components/sections/ContactCta";
import { useSiteContent } from "@/hooks/use-site-content";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

export function ValuesPage() {
  const { content } = useSiteContent();
  const activeValues = content.values
    .filter((v) => v.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <PageIntro
        number="03"
        label="DEĞERLERİMİZ"
        title="Her projede yolumuzu belirleyen ilkeler."
        description="Yaratıcılıktan güvene, yenilikçilikten insan odaklılığa kadar Ventora’nın üretim ritmini oluşturan değerler."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="space-y-4"
        >
          {activeValues.map((value, index) => (
            <motion.article
              key={value.id}
              variants={fadeUp}
              className="grid gap-6 border border-[var(--line)] bg-[var(--surface)] p-6 md:grid-cols-[120px_1fr] md:p-8"
            >
              <p className="font-display text-4xl font-semibold tabular-nums text-white/15">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-display text-2xl font-semibold md:text-3xl">
                  {value.title}
                </h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted)]">
                  {value.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <ContactCta
        title={content.home.contactCtaTitle}
        description={content.home.contactCtaDescription}
      />
    </>
  );
}
