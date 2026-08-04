"use client";

import { ServicePanel } from "@/components/services/ServicePanel";
import { ServiceProgressRail } from "@/components/services/ServiceProgressRail";
import { useReducedMotion } from "@/hooks/use-ui";
import type { ServiceItem } from "@/types/content";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

function subscribeDesktop(onChange: () => void) {
  const media = window.matchMedia("(min-width: 1024px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getDesktopServerSnapshot() {
  return false;
}

interface HorizontalServiceJourneyProps {
  services: ServiceItem[];
  introTitle?: string;
  introSubtitle?: string;
}

export function HorizontalServiceJourney({
  services,
  introTitle = "Neler Yapıyoruz",
  introSubtitle = "Bir etkinliği yalnızca planlamıyor, ona bir ritim ve karakter kazandırıyoruz.",
}: HorizontalServiceJourneyProps) {
  const reduced = useReducedMotion();
  const activeServices = useMemo(
    () => [...services].filter((s) => s.active).sort((a, b) => a.sortOrder - b.sortOrder),
    [services]
  );

  if (reduced || activeServices.length === 0) {
    return <ServiceMobileList services={activeServices} introTitle={introTitle} introSubtitle={introSubtitle} />;
  }

  return (
    <DesktopJourney
      services={activeServices}
      introTitle={introTitle}
      introSubtitle={introSubtitle}
    />
  );
}

function DesktopJourney({
  services,
  introTitle,
  introSubtitle,
}: {
  services: ServiceItem[];
  introTitle: string;
  introSubtitle: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollLength, setScrollLength] = useState(2400);
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const overflow = Math.max(track.scrollWidth - window.innerWidth + 64, 800);
      setScrollLength(overflow);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [services.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollLength]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.02) setStarted(true);
    const next = Math.min(
      services.length - 1,
      Math.max(0, Math.round(value * (services.length - 1)))
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const jumpTo = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const ratio = services.length <= 1 ? 0 : index / (services.length - 1);
      window.scrollTo({ top: absoluteTop + total * ratio, behavior: "smooth" });
    },
    [services.length]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.65;
      if (!inView) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        jumpTo(Math.min(activeIndex + 1, services.length - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        jumpTo(Math.max(activeIndex - 1, 0));
      }
      if (event.key === "Home") {
        event.preventDefault();
        jumpTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        jumpTo(services.length - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, jumpTo, services.length]);

  if (!isDesktop) {
    return (
      <ServiceMobileList
        services={services}
        introTitle={introTitle}
        introSubtitle={introSubtitle}
      />
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${scrollLength}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 line-grid opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(239,73,56,0.12),transparent_42%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-28 pb-8 md:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">04 / Hizmetler</p>
              <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold md:text-5xl">
                {introTitle}
              </h2>
              <p className="mt-3 max-w-xl text-[var(--muted)]">{introSubtitle}</p>
            </div>
            <p
              className={`text-xs tracking-[0.2em] text-[var(--muted)] uppercase transition-opacity duration-500 ${
                started ? "opacity-30" : "opacity-100"
              }`}
            >
              Keşfetmek için kaydır
            </p>
          </div>

          <div className="relative min-h-0 flex-1">
            <motion.div ref={trackRef} style={{ x }} className="service-track absolute top-0 left-0 h-[min(78vh,780px)] items-stretch">
              {services.map((service, index) => (
                <ServicePanel
                  key={service.id}
                  service={service}
                  index={index}
                  total={services.length}
                  active={index === activeIndex}
                />
              ))}
            </motion.div>

            <ServiceProgressRail
              services={services}
              activeIndex={activeIndex}
              progress={services.length <= 1 ? 1 : activeIndex / (services.length - 1)}
              onSelect={jumpTo}
            />
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
            <span className="tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(services.length).padStart(2, "0")}
            </span>
            <span>{services[activeIndex]?.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceMobileList({
  services,
  introTitle,
  introSubtitle,
}: {
  services: ServiceItem[];
  introTitle: string;
  introSubtitle: string;
}) {
  return (
    <section className="bg-[var(--background)] px-5 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="section-label">04 / Hizmetler</p>
        <h2 className="font-display mt-3 text-3xl font-semibold md:text-5xl">{introTitle}</h2>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{introSubtitle}</p>
        <p className="mt-6 text-xs tabular-nums tracking-[0.18em] text-[var(--muted)] uppercase">
          {String(services.length).padStart(2, "0")} hizmet
        </p>
        <div className="mt-10 space-y-6">
          {services.map((service, index) => (
            <div key={service.id} className="relative">
              <div className="mb-3 flex items-center justify-between text-xs text-[var(--muted)]">
                <span className="tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
                <span className="tracking-[0.16em] uppercase">{service.eyebrow || "VENTORA"}</span>
              </div>
              <ServicePanel
                service={service}
                index={index}
                total={services.length}
                active
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
