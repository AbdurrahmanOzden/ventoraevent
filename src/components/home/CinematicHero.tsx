"use client";

import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { useSiteContent } from "@/hooks/use-site-content";
import { motion } from "framer-motion";

export function CinematicHero() {
  const { content } = useSiteContent();
  const { home, settings } = content;

  const parts = home.heroHeadline.split(" ");
  const highlightIndex = Math.max(parts.length - 2, 1);

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(239,73,56,0.1),transparent_46%)]" />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[1600px] items-end px-5 md:px-8">
        <div className="max-w-4xl pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-0 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl"
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
