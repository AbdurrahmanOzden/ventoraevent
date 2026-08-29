"use client";

import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/content";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

interface ServicePanelProps {
  service: ServiceItem;
  index: number;
  active: boolean;
  total: number;
}

export function ServicePanel({ service, index, active, total }: ServicePanelProps) {
  const variant = service.layoutVariant || "split";
  const number = String(index + 1).padStart(2, "0");
  const capabilities = service.features.slice(0, 2);

  return (
    <article
      className={cn(
        "service-panel group relative mx-0 overflow-hidden border border-[var(--line)] bg-[var(--surface)] transition-[opacity,filter] duration-700 lg:mx-4",
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
    <div className="relative z-[1] grid h-full min-h-0 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex min-h-0 flex-col justify-between overflow-y-auto p-5 md:p-7">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <PanelCopy service={service} capabilities={capabilities} active={active} compact />
      </div>
      <PanelMedia service={service} active={active} className="min-h-[220px] lg:min-h-0" />
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
    <div className="relative z-[1] min-h-[280px] h-full">
      <PanelMedia service={service} active={active} className="absolute inset-0 min-h-[280px] lg:min-h-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
      <div className="relative z-[1] flex h-full flex-col justify-between overflow-y-auto p-5 md:p-7">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <PanelCopy service={service} capabilities={capabilities} active={active} light compact />
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
    <div className="relative z-[1] flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4 md:px-6 md:py-5">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <p className="hidden max-w-xs text-right text-xs leading-relaxed text-[var(--muted)] lg:block">
          {service.shortDescription}
        </p>
      </div>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[1.1fr_0.9fr]">
        <PanelMedia service={service} active={active} className="min-h-[200px] lg:min-h-0" />
        <div className="flex min-h-0 flex-col justify-start overflow-y-auto p-5 md:p-6">
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
    <div className="relative z-[1] grid h-full min-h-0 gap-3 p-3 md:grid-cols-[0.8fr_1.2fr] md:p-4">
      <div className="flex min-h-0 flex-col justify-between overflow-y-auto border border-[var(--line)] bg-[var(--background)] p-4 md:p-5">
        <PanelMeta number={number} total={total} eyebrow={service.eyebrow} />
        <PanelCopy service={service} capabilities={capabilities} active={active} compact />
      </div>
      <div className="grid min-h-0">
        <PanelMedia service={service} active={active} className="h-full min-h-[200px] lg:min-h-0" />
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
        <p className="font-display text-3xl font-semibold tabular-nums text-white/15 md:text-4xl">
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
          compact ? "text-xl leading-tight md:text-2xl" : "text-2xl leading-tight md:text-4xl",
          light ? "text-white" : "text-[var(--foreground)]"
        )}
      >
        {service.title}
      </motion.h3>
      <p
        className={cn(
          "mt-3 max-w-md leading-relaxed",
          compact ? "text-xs md:text-sm" : "text-sm",
          light ? "text-white/75" : "text-[var(--muted)]"
        )}
      >
        {compact
          ? service.shortDescription
          : service.detailedDescription || service.shortDescription}
      </p>
      {capabilities.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {capabilities.map((feature) => (
            <li
              key={feature.id}
              className={cn(
                "flex items-center gap-2 text-xs md:text-sm",
                light ? "text-white/80" : "text-[var(--foreground)]/80"
              )}
            >
              <span className="h-px w-4 shrink-0 bg-[var(--accent)]" />
              {feature.text}
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href="/iletisim"
        className="mt-4 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1 text-sm text-[var(--accent)] transition hover:gap-3"
      >
        {service.buttonText || "Hizmeti İncele"}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function MediaFill({
  url,
  alt,
  className,
  fit = "cover",
}: {
  url: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  if (isVideoUrl(url)) {
    return (
      <video
        src={url}
        className={cn("absolute inset-0 h-full w-full", fitClass, className)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className={cn(fitClass, className)}
      unoptimized={
        url.endsWith(".svg") || /\.(jpe?g|png|webp)(\?.*)?$/i.test(url)
      }
    />
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
  const urls = useMemo(() => {
    const list = [service.imageUrl, ...(service.galleryUrls || [])].filter(Boolean);
    return [...new Set(list)];
  }, [service.galleryUrls, service.imageUrl]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [stripOpen, setStripOpen] = useState(false);
  const mainUrl = hovered || urls[0];
  const hasGallery = urls.length > 1;
  const fit = service.imageFit === "contain" ? "contain" : "cover";

  return (
    <div
      className={cn("relative flex min-h-[200px] flex-col overflow-hidden bg-[var(--background-soft)] lg:min-h-0", className)}
      onMouseEnter={() => setStripOpen(true)}
      onMouseLeave={() => {
        setStripOpen(false);
        setHovered(null);
      }}
    >
      <div className="relative min-h-[200px] flex-1 overflow-hidden lg:min-h-0">
        <motion.div
          animate={{
            scale: fit === "contain" ? 1 : active ? 1 : 1.05,
            filter: active ? "grayscale(0.15) contrast(1.05)" : "grayscale(0.75) contrast(0.95)",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {mainUrl ? (
            <MediaFill url={mainUrl} alt={`${service.title} hizmet görseli`} fit={fit} />
          ) : null}
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        {hovered ? (
          <div className="pointer-events-none absolute inset-4 z-20 overflow-hidden border border-white/30 bg-black/50 shadow-2xl md:inset-8">
            <MediaFill url={hovered} alt="" fit={fit} />
          </div>
        ) : null}
      </div>

      {hasGallery ? (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center gap-2 overflow-hidden bg-black/55 px-3 transition-all duration-300",
            stripOpen ? "h-16 opacity-100" : "h-0 py-0 opacity-0"
          )}
        >
          {urls.map((url) => (
            <button
              key={url}
              type="button"
              onMouseEnter={() => setHovered(url)}
              onFocus={() => setHovered(url)}
              aria-label={`${service.title} görseli`}
              className={cn(
                "relative h-10 w-10 shrink-0 overflow-hidden border transition md:h-11 md:w-11",
                hovered === url ? "border-[var(--accent)]" : "border-white/25 hover:border-white/60"
              )}
            >
              {isVideoUrl(url) ? (
                <video src={url} className="h-full w-full object-cover" muted playsInline preload="metadata" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
