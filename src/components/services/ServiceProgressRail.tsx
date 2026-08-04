"use client";

import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/content";

interface ServiceProgressRailProps {
  services: ServiceItem[];
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
}

export function ServiceProgressRail({
  services,
  activeIndex,
  progress,
  onSelect,
}: ServiceProgressRailProps) {
  return (
    <nav
      aria-label="Hizmet ilerleme navigasyonu"
      className="pointer-events-auto absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 xl:right-8 lg:block"
    >
      <div className="relative flex flex-col gap-3 py-2 pl-4">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-[var(--line)]" />
        <div
          className="absolute top-0 left-0 w-px origin-top bg-[var(--accent)] transition-[height] duration-300"
          style={{ height: `${Math.max(progress * 100, 4)}%` }}
        />
        {services.map((service, index) => {
          const active = index === activeIndex;
          const done = index < activeIndex;
          const label = String(index + 1).padStart(2, "0");
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`${label} - ${service.title}`}
              aria-current={active ? "true" : undefined}
              className={cn(
                "group flex items-center gap-3 text-left transition-all duration-300",
                active ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-white"
              )}
            >
              <span
                className={cn(
                  "h-px transition-all duration-300",
                  active ? "w-6 bg-[var(--accent)]" : done ? "w-3 bg-white/40" : "w-2 bg-white/15"
                )}
              />
              <span className="font-display text-xs tabular-nums tracking-[0.16em]">
                {label}
              </span>
              <span
                className={cn(
                  "max-w-0 overflow-hidden text-[0.65rem] tracking-[0.14em] uppercase whitespace-nowrap opacity-0 transition-all duration-300",
                  active && "max-w-[9rem] opacity-100",
                  !active && "group-hover:max-w-[9rem] group-hover:opacity-70"
                )}
              >
                {shortLabel(service.title)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function shortLabel(title: string) {
  const first = title.split(" ")[0] || title;
  return first.length > 12 ? `${first.slice(0, 11)}…` : first;
}
