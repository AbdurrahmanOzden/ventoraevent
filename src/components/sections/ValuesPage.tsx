"use client";

import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { ValueCard } from "@/components/ui/Cards";
import { useSiteContent } from "@/hooks/use-site-content";
import { staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

export function ValuesPage() {
  const { content } = useSiteContent();
  const activeValues = content.values
    .filter((v) => v.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <PageHero
        title="Değerlerimiz"
        subtitle="Her projede yolumuzu belirleyen ilkeler; yaratıcılıktan güvene, yenilikçilikten insan odaklılığa."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeValues.map((value, index) => (
            <ValueCard
              key={value.id}
              title={value.title}
              description={value.description}
              icon={value.icon}
              index={index}
            />
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
