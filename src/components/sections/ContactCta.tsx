"use client";

import { TextReveal } from "@/components/animations/TextEffects";
import { PrimaryButton } from "@/components/ui/Button";

interface ContactCtaProps {
  title: string;
  description: string;
}

export function ContactCta({ title, description }: ContactCtaProps) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(239,73,56,0.12),transparent_45%)]" />
      <div className="relative mx-auto max-w-5xl border border-[var(--line)] bg-[var(--surface)] px-6 py-14 text-center md:px-12">
        <TextReveal>
          <h2 className="font-display text-3xl font-semibold md:text-5xl">{title}</h2>
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
