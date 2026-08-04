"use client";

import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/content";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServicePanelProps {
  service: ServiceItem;
  index: number;
  active: boolean;
  total: number;
}

export function ServicePanel({ service, index, active, total }: ServicePanelProps) {
  const variant = service.layoutVariant || "split";
  const number = String(index + 1).padStart(2, "0");
  const capabilities = service.features.slice(0, 3);

  return (
    <article
      className={cn(
        "service-panel relative mx-3 overflow-hidden border border-[var(--line)] bg-[var(--surface)] transition-[opacity,filter] duration-700 md:mx-4",
        active ? "opacity-100" : "opacity-45 md:opacity-40"
      )}
      aria-current={active ? "true" : undefined}
    >
      <div className="absolute inset-0 line-grid opacity-40" />
      <div className="absolute inset-0 noise-overlay" />

      {variant === "full-image" ? (
        <FullImageLayout
          service={service}
          number={number}
          total={total}
          capabilities={capabilities}
          active={active}
        />
      ) : variant === "editorial" ? (
        <EditorialLayout
          service={service}
          number={number}
          total={total}
          capabilities={capabilities}
          active={active}
        />
      ) : variant === "collage" ? (
        <CollageLayout
          service={service}
          number={number}
          total={total}
          capabilities={capabilities}
          active={active}
        />
      ) : (
        <SplitLayout
          service={service}
          number={number}
          total={total}
          capabilities={capabilities}
          active={active}
        />
      )}
    </article>
  );
}

function SplitLayout({
  service,
  number,
  total,
  capabilities,
  active,
}: {
  service: ServiceItem;
  number: string;
  total: number;
  capabilities: ServiceItem["features"];
  active: boolean;
}) {
  return (
    <div className="relative z-[1] grid h-full lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex flex-col justify-between p-6 md:p-10">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <PanelCopy service={service} capabilities={capabilities} active={active} />
      </div>
      <PanelMedia service={service} active={active} className="min-h-[240px] lg:min-h-full" />
    </div>
  );
}

function FullImageLayout({
  service,
  number,
  total,
  capabilities,
  active,
}: {
  service: ServiceItem;
  number: string;
  total: number;
  capabilities: ServiceItem["features"];
  active: boolean;
}) {
  return (
    <div className="relative z-[1] h-full">
      <PanelMedia service={service} active={active} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
      <div className="relative z-[1] flex h-full flex-col justify-between p-6 md:p-10">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <PanelCopy service={service} capabilities={capabilities} active={active} light />
      </div>
    </div>
  );
}

function EditorialLayout({
  service,
  number,
  total,
  capabilities,
  active,
}: {
  service: ServiceItem;
  number: string;
  total: number;
  capabilities: ServiceItem["features"];
  active: boolean;
}) {
  return (
    <div className="relative z-[1] flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] p-6 md:p-8">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <p className="max-w-xs text-right text-xs leading-relaxed text-[var(--muted)]">
          {service.shortDescription}
        </p>
      </div>
      <div className="grid flex-1 lg:grid-cols-[1.1fr_0.9fr]">
        <PanelMedia service={service} active={active} className="min-h-[260px]" />
        <div className="flex flex-col justify-end p-6 md:p-8">
          <PanelCopy service={service} capabilities={capabilities} active={active} compact />
        </div>
      </div>
    </div>
  );
}

function CollageLayout({
  service,
  number,
  total,
  capabilities,
  active,
}: {
  service: ServiceItem;
  number: string;
  total: number;
  capabilities: ServiceItem["features"];
  active: boolean;
}) {
  return (
    <div className="relative z-[1] grid h-full gap-3 p-4 md:grid-cols-[0.8fr_1.2fr] md:p-5">
      <div className="flex flex-col justify-between border border-[var(--line)] bg-[var(--background)] p-5 md:p-7">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <PanelCopy service={service} capabilities={capabilities} active={active} compact />
      </div>
      <div className="grid gap-3">
        <PanelMedia service={service} active={active} className="min-h-[220px] flex-1" />
        <div className="border border-[var(--line)] bg-[var(--background-soft)] p-4 text-xs tracking-[0.18em] text-[var(--muted)] uppercase">
          {service.accentLabel || "Prodüksiyon · Operasyon · Deneyim"}
        </div>
      </div>
    </div>
  );
}

function PanelMeta({
  number,
  total,
  eyebrow,
}: {
  number: string;
  total: number;
  eyebrow?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-display text-4xl font-semibold tabular-nums text-white/15 md:text-5xl">
          {number}
        </p>
        <p className="mt-2 text-[0.68rem] tracking-[0.24em] text-[var(--accent)] uppercase">
          {eyebrow || "VENTORA"}
        </p>
      </div>
      <p className="text-xs tabular-nums text-[var(--muted)]">
        {number} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}

function PanelCopy({
  service,
  capabilities,
  active,
  light = false,
  compact = false,
}: {
  service: ServiceItem;
  capabilities: ServiceItem["features"];
  active: boolean;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <motion.h3
        animate={{ y: active ? 0 : 12, opacity: active ? 1 : 0.7 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "font-display font-semibold tracking-tight",
          compact ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl",
          light ? "text-white" : "text-[var(--foreground)]"
        )}
      >
        {service.title}
      </motion.h3>
      <p
        className={cn(
          "mt-4 max-w-md leading-relaxed",
          compact ? "text-sm" : "text-sm md:text-base",
          light ? "text-white/75" : "text-[var(--muted)]"
        )}
      >
        {service.detailedDescription || service.shortDescription}
      </p>
      {capabilities.length > 0 ? (
        <ul className="mt-5 space-y-2">
          {capabilities.map((feature) => (
            <li
              key={feature.id}
              className={cn(
                "flex items-center gap-2 text-sm",
                light ? "text-white/80" : "text-[var(--foreground)]/80"
              )}
            >
              <span className="h-px w-4 bg-[var(--accent)]" />
              {feature.text}
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href="/iletisim"
        className="mt-7 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1 text-sm text-[var(--accent)] transition hover:gap-3"
      >
        {service.buttonText || "Hizmeti İncele"}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function PanelMedia({
  service,
  active,
  className,
}: {
  service: ServiceItem;
  active: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[var(--background-soft)]", className)}>
      <motion.div
        animate={{
          scale: active ? 1 : 1.05,
          filter: active ? "grayscale(0.15) contrast(1.05)" : "grayscale(0.75) contrast(0.95)",
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={service.imageUrl}
          alt={`${service.title} hizmet görseli`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          unoptimized={service.imageUrl.endsWith(".svg")}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}
