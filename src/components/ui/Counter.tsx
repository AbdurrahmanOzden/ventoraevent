"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-ui";

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function Counter({ value, suffix = "", label, duration = 1600 }: CounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const animate = () => {
      if (started.current) return;
      started.current = true;
      if (reduced) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) animate();
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, reduced]);

  const formatted =
    value >= 1000
      ? display.toLocaleString("tr-TR")
      : String(display);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold text-white md:text-5xl">
        {formatted}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-[var(--muted)] md:text-base">{label}</p>
    </div>
  );
}
