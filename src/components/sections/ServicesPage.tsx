"use client";

import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { PrimaryButton } from "@/components/ui/Button";
import { useSiteContent } from "@/hooks/use-site-content";
import { fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

/** Match frame to natural image orientation — do not stretch portrait photos. */
function getServiceImageFrameClass(imageUrl: string): string {
  const portraitPaths = [
    "lansman-marka-deneyimleri",
    "ozel-davetler",
    "teknik-produksiyon",
    "festival-konser-yonetimi",
  ];
  if (portraitPaths.some((name) => imageUrl.includes(name))) {
    return "aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px] mx-auto";
  }
  if (imageUrl.includes("kurumsal-etkinlikler")) {
    return "aspect-square w-full max-w-md mx-auto";
  }
  if (imageUrl.includes("sahne-tasarimi")) {
    return "aspect-[16/9] w-full";
  }
  return "aspect-[4/3] w-full";
}

export function ServicesPage() {
  const { content } = useSiteContent();
  const services = content.services
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <PageHero
        title="Neler Yapıyoruz"
        subtitle="Kurumsal etkinliklerden teknik prodüksiyona kadar uçtan uca deneyim tasarımı ve uygulama."
      />

      <section className="mx-auto max-w-7xl space-y-20 px-5 pb-24 md:px-8">
        {services.map((service, index) => {
          const reverse = index % 2 === 1;
          const frameClass = getServiceImageFrameClass(service.imageUrl);
          const alignClass = reverse ? "lg:mr-auto" : "lg:ml-auto";
          return (
            <motion.article
              key={service.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] ${frameClass} ${alignClass}`}
              >
                <Image
                  src={service.imageUrl}
                  alt={`${service.title} hizmet görseli`}
                  fill
                  sizes="(max-width: 768px) 320px, 360px"
                  className="object-cover object-center"
                  priority={index < 2}
                  unoptimized={service.imageUrl.endsWith(".svg")}
                />
              </div>
              <div>
                <p className="text-sm tracking-[0.2em] text-[var(--primary)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-[var(--muted)]">{service.shortDescription}</p>
                <p className="mt-5 leading-relaxed text-white/80">
                  {service.detailedDescription}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <PrimaryButton href="/iletisim">{service.buttonText}</PrimaryButton>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      <ContactCta
        title={content.home.contactCtaTitle}
        description={content.home.contactCtaDescription}
      />
    </>
  );
}
