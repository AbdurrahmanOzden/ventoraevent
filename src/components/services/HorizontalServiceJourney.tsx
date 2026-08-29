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
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollLength, setScrollLength] = useState(2400);
  const [holdLength, setHoldLength] = useState(500);
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
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const visible = viewport.clientWidth;
      const overflow = Math.max(track.scrollWidth - visible, 0);
      setScrollLength(overflow);
      setHoldLength(window.innerHeight * 0.55);
    };

    measure();
    const raf = window.requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [services.length]);

  const travelLength = holdLength + scrollLength;
  const holdStart = travelLength > 0 ? holdLength / travelLength : 0.35;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [holdStart, 1], [0, -scrollLength]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const mapped =
      value <= holdStart ? 0 : Math.min(1, (value - holdStart) / Math.max(1 - holdStart, 0.0001));
    if (mapped > 0.02) setStarted(true);
    const next = Math.min(
      services.length - 1,
      Math.max(0, Math.round(mapped * (services.length - 1)))
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
      const cardRatio = services.length <= 1 ? 0 : index / (services.length - 1);
      const ratio = holdStart + (1 - holdStart) * cardRatio;
      window.scrollTo({ top: absoluteTop + total * ratio, behavior: "smooth" });
    },
    [holdStart, services.length]
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
      style={{ height: `calc(100vh + ${travelLength}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 line-grid opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(239,73,56,0.12),transparent_42%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-24 pb-5 md:px-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-label">03 / Hizmetler</p>
              <h2 className="font-display mt-2 max-w-3xl text-2xl font-semibold md:text-4xl">
                {introTitle}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)] md:text-base">{introSubtitle}</p>
            </div>
            <p
              className={`text-xs tracking-[0.2em] text-[var(--muted)] uppercase transition-opacity duration-500 ${
                started ? "opacity-30" : "opacity-100"
              }`}
            >
              Keşfetmek için kaydır
            </p>
          </div>

          <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
            <motion.div ref={trackRef} style={{ x }} className="service-track absolute inset-y-0 left-0 h-full items-stretch">
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

          <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs text-[var(--muted)]">
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
    <section className="bg-[var(--background)] px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="section-label">03 / Hizmetler</p>
        <h2 className="font-display mt-3 text-3xl font-semibold md:text-5xl">{introTitle}</h2>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{introSubtitle}</p>
        <p className="mt-6 text-xs tabular-nums tracking-[0.18em] text-[var(--muted)] uppercase">
          {String(services.length).padStart(2, "0")} hizmet
        </p>
        <div className="mt-8 space-y-4 md:mt-10 md:space-y-6">
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
