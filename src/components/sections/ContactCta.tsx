"use client";

import { PrimaryButton } from "@/components/ui/Button";
import { TextReveal } from "@/components/animations/TextEffects";

interface ContactCtaProps {
  title: string;
  description: string;
}

export function ContactCta({ title, description }: ContactCtaProps) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 via-transparent to-[var(--secondary)]/20" />
      <div className="relative mx-auto max-w-5xl rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 px-6 py-16 text-center backdrop-blur md:px-12">
        <TextReveal>
          <h2 className="font-display text-3xl font-bold md:text-5xl">{title}</h2>
        </TextReveal>
        <p className="mx-auto mt-5 max-w-2xl text-[var(--muted)] md:text-lg">{description}</p>
        <div className="mt-8">
          <PrimaryButton href="/iletisim" size="lg">
            Bize Ulaşın
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
