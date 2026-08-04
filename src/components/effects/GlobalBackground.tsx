"use client";

import { BACKGROUND_FX } from "@/lib/background-fx-config";
import { useReducedMotion } from "@/hooks/use-ui";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

type ViewportTier = "mobile" | "tablet" | "desktop";

function subscribeViewport(onChange: () => void) {
  const mqMobile = window.matchMedia("(max-width: 767px)");
  const mqTablet = window.matchMedia("(max-width: 1023px)");
  const handler = () => onChange();
  mqMobile.addEventListener("change", handler);
  mqTablet.addEventListener("change", handler);
  return () => {
    mqMobile.removeEventListener("change", handler);
    mqTablet.removeEventListener("change", handler);
  };
}

function getViewportTier(): ViewportTier {
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

function getViewportServerSnapshot(): ViewportTier {
  return "desktop";
}

function useViewportTier() {
  return useSyncExternalStore(subscribeViewport, getViewportTier, getViewportServerSnapshot);
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  phase: number;
  pulse: number;
}

function createParticles(count: number, width: number, height: number, speed: number): Particle[] {
  const { min, max } = BACKGROUND_FX.particleSize;
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const magnitude = (0.15 + Math.random() * 0.55) * speed;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * magnitude,
      vy: Math.sin(angle) * magnitude,
      r: min + Math.random() * (max - min),
      baseAlpha: 0.18 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      pulse: 0.6 + Math.random() * 1.2,
    };
  });
}

/**
 * Fixed fullscreen atmospheric background for the public site.
 * pointer-events: none — never blocks UI interaction.
 */
export function GlobalBackground() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const tier = useViewportTier();
  const isHome = pathname === "/";

  const boost = isHome ? BACKGROUND_FX.heroBoostIntensity : 1;
  const particleCount = useMemo(() => {
    const base = BACKGROUND_FX.particleCount[tier];
    return Math.round(base * (isHome ? Math.min(boost, 1.25) : 0.85));
  }, [tier, isHome, boost]);

  const enableMouseGlow = !reducedMotion && tier === "desktop";
  const enableParticles = !reducedMotion;

  return (
    <div
      aria-hidden
      className="bg-fx pointer-events-none fixed inset-0 z-0 overflow-hidden"
      data-home={isHome ? "true" : "false"}
      style={
        {
          "--bg-fx-grid-opacity": BACKGROUND_FX.gridOpacity * (isHome ? 1.15 : 0.85),
          "--bg-fx-noise-opacity": BACKGROUND_FX.noiseOpacity * (isHome ? 1.1 : 0.9),
          "--bg-fx-ambient": BACKGROUND_FX.ambientGlowOpacity * boost,
          "--bg-fx-glow": BACKGROUND_FX.glowIntensity * boost,
        } as CSSProperties
      }
    >
      <div className="bg-fx__base absolute inset-0" />
      <div className="bg-fx__ambient absolute inset-0" />
      <div className="bg-fx__grid absolute inset-0" />
      <div className="bg-fx__noise absolute inset-0" />

      {enableParticles ? (
        <ParticleCanvas
          count={particleCount}
          speed={BACKGROUND_FX.particleSpeed * (isHome ? boost : 0.9)}
          linkOpacity={BACKGROUND_FX.linkOpacity * (isHome ? 1 : 0.7)}
          boost={boost}
          enablePointerInfluence={enableMouseGlow}
        />
      ) : null}

      {enableMouseGlow ? <MouseGlow intensity={BACKGROUND_FX.glowIntensity * boost} /> : null}

      <div className="bg-fx__vignette absolute inset-0" />
    </div>
  );
}

function MouseGlow({ intensity }: { intensity: number }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const lerp = BACKGROUND_FX.pointerLerp;
    const sizeFactor = BACKGROUND_FX.glowSizeFactor;

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const onLeave = () => {
      target.current.x = -9999;
      target.current.y = -9999;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;

      const el = glowRef.current;
      if (el) {
        const shortSide = Math.min(window.innerWidth, window.innerHeight);
        const size = shortSide * sizeFactor;
        const visible = target.current.x > -1000;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = visible ? String(Math.min(intensity, 0.35)) : "0";
        el.style.transform = `translate3d(${current.current.x - size / 2}px, ${current.current.y - size / 2}px, 0)`;
      }

      raf.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(raf.current);
    };
  }, [intensity]);

  return <div ref={glowRef} className="bg-fx__mouse-glow absolute top-0 left-0 will-change-transform" />;
}

function ParticleCanvas({
  count,
  speed,
  linkOpacity,
  boost,
  enablePointerInfluence,
}: {
  count: number;
  speed: number;
  linkOpacity: number;
  boost: number;
  enablePointerInfluence: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(count, width, height, speed);
    };

    const onPointer = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = performance.now();
        raf = window.requestAnimationFrame(frame);
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 16.67, 2.5);
      last = now;

      ctx.clearRect(0, 0, width, height);

      const accent = "239, 73, 56";
      const linkDist = BACKGROUND_FX.linkDistance * (boost > 1 ? 1.08 : 1);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;

        if (enablePointerInfluence) {
          const dx = pointer.current.x - p.x;
          const dy = pointer.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0.1) {
            const force = ((160 - dist) / 160) * 0.012 * boost;
            p.x -= dx * force;
            p.y -= dy * force;
          }
        }

        p.phase += 0.016 * p.pulse * dt;
        const twinkle = 0.55 + Math.sin(p.phase) * 0.45;
        const alpha = p.baseAlpha * twinkle * (0.75 + boost * 0.15);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${accent}, ${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (linkOpacity > 0.001) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.hypot(dx, dy);
            if (dist < linkDist) {
              const a = (1 - dist / linkDist) * linkOpacity;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${accent}, ${a})`;
              ctx.lineWidth = 0.6;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
      }

      raf = window.requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = window.requestAnimationFrame(frame);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, speed, linkOpacity, boost, enablePointerInfluence]);

  return <canvas ref={canvasRef} className="bg-fx__particles absolute inset-0 h-full w-full" />;
}
