"use client";

import { useReducedMotion } from "@/hooks/use-ui";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  twinkle: number;
  glow: boolean;
}

function subscribeMobile(onChange: () => void) {
  const media = window.matchMedia("(max-width: 768px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getMobileServerSnapshot() {
  return false;
}

/**
 * Visible cinematic Event Pulse hero background.
 * Stronger stage glows, beams, particle network — still readable on the left.
 */
export function EventPulseBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  const mx = useMotionValue(68);
  const my = useMotionValue(42);
  const sx = useSpring(mx, { stiffness: 45, damping: 26, mass: 0.55 });
  const sy = useSpring(my, { stiffness: 45, damping: 26, mass: 0.55 });
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${sx}% ${sy}%, rgba(96,165,250,0.28), rgba(139,92,246,0.12) 28%, transparent 58%)`;

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (event: PointerEvent) => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }
      mx.set(((event.clientX - rect.left) / rect.width) * 100);
      my.set(((event.clientY - rect.top) / rect.height) * 100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = containerRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isMobile ? 36 : width < 1200 ? 55 : 72;
      particles = Array.from({ length: count }, (_, i) =>
        createParticle(width, height, isMobile, i % 5 === 0)
      );
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);
      t += 0.01;

      // Soft haze wash on the right
      const haze = ctx.createRadialGradient(
        width * 0.78,
        height * 0.42,
        40,
        width * 0.78,
        height * 0.42,
        width * 0.55
      );
      haze.addColorStop(0, "rgba(99, 102, 241, 0.18)");
      haze.addColorStop(0.45, "rgba(59, 130, 246, 0.08)");
      haze.addColorStop(1, "transparent");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      const maxDist = isMobile ? 110 : 150;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;
          const alpha = (1 - dist / maxDist) * 0.38;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle =
            i % 2 === 0
              ? `rgba(96, 165, 250, ${alpha})`
              : `rgba(167, 139, 250, ${alpha * 0.9})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const pulse = animate ? 0.65 + Math.sin(t * 2.2 + p.twinkle) * 0.35 : 0.85;
        const alpha = p.a * pulse;

        if (p.glow) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 10);
          g.addColorStop(0, `rgba(147, 197, 253, ${alpha * 0.55})`);
          g.addColorStop(0.45, `rgba(99, 102, 241, ${alpha * 0.18})`);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 10, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${Math.min(alpha + 0.2, 0.95)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha * 0.28})`;
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw(true);
      raf = window.requestAnimationFrame(loop);
    };

    resize();
    if (reducedMotion) {
      draw(false);
    } else {
      raf = window.requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onVisibility = () => {
      if (document.hidden || reducedMotion) {
        running = false;
        window.cancelAnimationFrame(raf);
        draw(false);
        return;
      }
      if (!running) {
        running = true;
        raf = window.requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion, isMobile]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_30%,#101a33_0%,#070b16_48%,#05070d_100%)]" />

      <div
        className={`event-pulse-glow event-pulse-glow-a ${reducedMotion ? "" : "is-animated"}`}
      />
      <div
        className={`event-pulse-glow event-pulse-glow-b ${reducedMotion ? "" : "is-animated"}`}
      />
      <div
        className={`event-pulse-glow event-pulse-glow-c ${reducedMotion ? "" : "is-animated"}`}
      />
      <div
        className={`event-pulse-glow event-pulse-glow-d ${reducedMotion ? "" : "is-animated"}`}
      />

      <div
        className={`event-pulse-beam event-pulse-beam-a ${reducedMotion ? "" : "is-animated"}`}
      />
      <div
        className={`event-pulse-beam event-pulse-beam-b ${reducedMotion ? "" : "is-animated"}`}
      />
      {!isMobile ? (
        <div
          className={`event-pulse-beam event-pulse-beam-c ${reducedMotion ? "" : "is-animated"}`}
        />
      ) : null}

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {!reducedMotion ? (
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{ background: spotlight }}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(96,165,250,0.22),transparent_55%)]" />
      )}

      <div
        className={`event-pulse-grid absolute inset-0 ${reducedMotion ? "" : "is-animated"}`}
      />

      <div className="event-pulse-noise absolute inset-0 opacity-[0.05]" />

      {/* Keep left readable without killing the right-side atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/72 via-[var(--background)]/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/25 via-transparent to-[var(--background)]/55" />
    </div>
  );
}

function createParticle(
  width: number,
  height: number,
  mobile: boolean,
  glow: boolean
): Particle {
  const speed = mobile ? 0.16 : 0.28;
  return {
    // Bias particles toward the right / center-right for stage feel
    x: width * (0.28 + Math.random() * 0.72),
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.4) * speed * 0.75,
    r: glow ? Math.random() * 2.2 + 1.4 : Math.random() * 1.5 + 0.7,
    a: glow ? Math.random() * 0.35 + 0.45 : Math.random() * 0.35 + 0.35,
    twinkle: Math.random() * Math.PI * 2,
    glow,
  };
}
