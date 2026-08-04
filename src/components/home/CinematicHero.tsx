"use client";

import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { useSiteContent } from "@/hooks/use-site-content";
import { motion } from "framer-motion";
import Image from "next/image";

export function CinematicHero() {
  const { content } = useSiteContent();
  const { home, settings } = content;
  const featuredImage =
    content.services.find((s) => s.active)?.imageUrl ||
    "/images/services/sahne-tasarimi.png";

  const parts = home.heroHeadline.split(" ");
  const highlightIndex = Math.max(parts.length - 2, 1);

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(239,73,56,0.08),transparent_42%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] items-end gap-10 px-5 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="pb-8">
          <p className="section-label">01 / Ana Sayfa</p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl"
          >
            {parts.map((word, index) => (
              <span key={`${word}-${index}`}>
                <span className={index === highlightIndex ? "text-[var(--accent)]" : undefined}>
                  {word}
                </span>
                {index < parts.length - 1 ? " " : ""}
              </span>
            ))}
          </motion.h1>
          <p className="mt-7 max-w-xl text-lg text-[var(--muted)] md:text-xl">
            {home.heroDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PrimaryButton href={home.primaryButtonUrl} size="lg">
              {home.primaryButtonText}
            </PrimaryButton>
            <SecondaryButton href={home.secondaryButtonUrl} size="lg">
              {home.secondaryButtonText}
            </SecondaryButton>
          </div>
          <div className="mt-14 flex items-center gap-6 text-xs tracking-[0.18em] text-[var(--muted)] uppercase">
            <span>Prodüksiyon</span>
            <span className="h-px w-8 bg-[var(--line-strong)]" />
            <span>{settings.siteName}</span>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--surface)] lg:aspect-[3/4]">
          <Image
            src={featuredImage}
            alt="Ventora Event sahne ve prodüksiyon görseli"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover grayscale-[0.25] contrast-[1.05]"
            unoptimized={featuredImage.endsWith(".svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between">
            <p className="text-xs tracking-[0.2em] text-white/70 uppercase">
              Sahne · Işık · Deneyim
            </p>
            <p className="font-display text-5xl text-white/15">01</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 overflow-hidden border-y border-[var(--line)]">
        <div className="marquee-track py-4">
          {[...home.marqueeTexts, ...home.marqueeTexts].map((item, index) => (
            <span
              key={`${item.id}-${index}`}
              className="font-display px-6 text-xl tracking-[0.16em] text-white/55 md:text-3xl"
            >
              {item.text} ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
