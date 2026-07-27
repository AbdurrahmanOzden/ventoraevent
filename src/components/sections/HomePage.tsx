"use client";

import { SplitText, TextReveal, MarqueeText } from "@/components/animations/TextEffects";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { ReferenceCard, ServiceCard, ValueCard } from "@/components/ui/Cards";
import { ContactCta } from "@/components/sections/ContactCta";
import { SectionTitle } from "@/components/animations/TextEffects";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useSiteContent } from "@/hooks/use-site-content";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function HomePage() {
  const { content } = useSiteContent();
  const { home, services, references, values, clientLogos } = content;

  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 6);
  const featuredProjects = references
    .filter((r) => r.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);
  const activeValues = values
    .filter((v) => v.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);

  return (
    <>
      <HeroSection />
      <MarqueeText items={home.marqueeTexts.map((m) => m.text)} />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle title={home.aboutPreviewTitle} />
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              {home.aboutPreviewDescription}
            </p>
            <Link
              href="/biz-kimiz"
              className="mt-8 inline-flex text-[var(--primary)] hover:underline"
            >
              Biz Kimiz →
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/30 via-transparent to-[var(--secondary)]/30" />
            <div className="absolute inset-0 grid-texture" />
            <div className="absolute inset-0 flex items-end p-8">
              <p className="font-display text-3xl font-bold md:text-4xl">
                Strateji. Kreatif.
                <br />
                Prodüksiyon.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]/40 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionTitle title={home.servicesSectionTitle} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                number={String(index + 1).padStart(2, "0")}
                title={service.title}
                description={service.shortDescription}
                icon={["Building2", "Rocket", "Music", "Gem", "Cpu", "Palette"][index] ?? "Sparkles"}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionTitle title={home.projectsSectionTitle} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProjects.map((project) => (
            <ReferenceCard key={project.id} {...project} />
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <SecondaryButton href="/referanslar">Tüm Referanslar</SecondaryButton>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 md:grid-cols-4 md:px-8">
          {home.statistics.map((stat) => (
            <Counter
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionTitle title={home.valuesSectionTitle} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-5 md:grid-cols-3"
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
        <div className="mt-10">
          <SecondaryButton href="/degerlerimiz">Tüm Değerlerimiz</SecondaryButton>
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <p className="mb-8 text-center text-sm tracking-[0.2em] text-[var(--muted)] uppercase">
          Güvenilen Markalar
        </p>
        <div className="marquee-track gap-6 px-4">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="mx-3 flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4"
              aria-label={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.logoUrl} alt={logo.name} className="max-h-10 max-w-full opacity-80" />
            </div>
          ))}
        </div>
      </section>

      <ContactCta title={home.contactCtaTitle} description={home.contactCtaDescription} />
    </>
  );
}

function HeroSection() {
  const { content } = useSiteContent();
  const { home } = content;
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 50, damping: 20 });
  const springY = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 40);
      my.set(((event.clientY - rect.top) / rect.height - 0.5) * 40);
    };
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 grid-texture opacity-50" />
      <div className="glow-orb -left-20 top-20 h-96 w-96 bg-[var(--primary)]/30" />
      <div className="glow-orb right-0 bottom-10 h-[28rem] w-[28rem] bg-[var(--secondary)]/25" />
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--primary)]/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-sm tracking-[0.25em] text-[var(--primary)] uppercase"
        >
          Etkinlik • Prodüksiyon • Organizasyon
        </motion.p>
        <TextReveal>
          <h1 className="font-display max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            <SplitText text={home.heroHeadline} mode="words" as="span" />
          </h1>
        </TextReveal>
        <p className="mt-7 max-w-2xl text-lg text-[var(--muted)] md:text-xl">
          {home.heroDescription}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <PrimaryButton href={home.primaryButtonUrl} size="lg">
            {home.primaryButtonText}
          </PrimaryButton>
          <SecondaryButton href={home.secondaryButtonUrl} size="lg">
            {home.secondaryButtonText}
          </SecondaryButton>
        </div>
      </div>

      <a
        href="#content-start"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-widest text-[var(--muted)] uppercase"
        aria-label="Aşağı kaydır"
      >
        Kaydır
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
      <div id="content-start" className="sr-only" />
    </section>
  );
}
