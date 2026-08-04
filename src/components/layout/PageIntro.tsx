"use client";

import type { ReactNode } from "react";

interface PageIntroProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageIntro({
  number,
  label,
  title,
  description,
  children,
}: PageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(239,73,56,0.07),transparent_38%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <p className="section-label">
          {number} / {label}
        </p>
        <h1 className="font-display mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] md:text-xl">
            {description}
          </p>
        ) : null}
        <div className="mt-8 h-px w-full max-w-md overflow-hidden bg-[var(--line)]">
          <div className="h-full w-1/3 bg-[var(--accent)]" />
        </div>
        {children}
      </div>
    </section>
  );
}
