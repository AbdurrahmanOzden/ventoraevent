"use client";

import { PageTitle } from "@/components/animations/TextEffects";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="glow-orb left-[-10%] top-10 h-72 w-72 bg-[var(--primary)]/25" />
      <div className="glow-orb right-[-5%] top-32 h-80 w-80 bg-[var(--secondary)]/20" />
      <div className="absolute inset-0 grid-texture opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <PageTitle title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}
