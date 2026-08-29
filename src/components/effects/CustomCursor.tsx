"use client";

import { useFinePointer } from "@/hooks/use-ui";
import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, label, summary";

interface CustomCursorProps {
  enabled?: boolean;
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const canUsePointer = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const active = enabled && canUsePointer;

  useEffect(() => {
    if (!active) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    const halo = { x: target.x, y: target.y };
    let hovering = false;
    let visible = false;
    let raf = 0;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      visible = true;
      const node = event.target;
      hovering =
        node instanceof Element && Boolean(node.closest(INTERACTIVE_SELECTOR));
    };

    const onLeave = () => {
      visible = false;
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.14;
      ring.y += (target.y - ring.y) * 0.14;
      halo.x += (target.x - halo.x) * 0.07;
      halo.y += (target.y - halo.y) * 0.07;

      const opacity = visible ? "1" : "0";
      const scale = hovering ? 1.55 : 1;

      if (dotRef.current) {
        dotRef.current.style.opacity = opacity;
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = opacity;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (haloRef.current) {
        haloRef.current.style.opacity = visible ? (hovering ? "0.55" : "0.35") : "0";
        haloRef.current.style.transform = `translate3d(${halo.x}px, ${halo.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.25 : 1})`;
      }

      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = window.requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] hidden lg:block">
      <div ref={haloRef} className="custom-cursor__halo" />
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
