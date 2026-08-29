"use client";

import { createInteractiveScene, type ViewportTier } from "@/components/effects/interactive-scene";
import type { SceneIntensity } from "@/lib/background-fx-config";
import { BACKGROUND_FX } from "@/lib/background-fx-config";
import { useReducedMotion } from "@/hooks/use-ui";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

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

function useViewportTier() {
  return useSyncExternalStore(subscribeViewport, getViewportTier, () => "desktop" as ViewportTier);
}

interface InteractiveBackgroundProps {
  intensity?: SceneIntensity;
}

export function InteractiveBackground({ intensity = "cinematic" }: InteractiveBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const tier = useViewportTier();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  const enablePointer = !reducedMotion && tier === "desktop";
  const cinematic = intensity === "cinematic";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = createInteractiveScene(canvas, {
      intensity,
      tier,
      reducedMotion,
      enablePointer,
    });
    scene.start();
    return () => scene.stop();
  }, [intensity, tier, reducedMotion, enablePointer]);

  useEffect(() => {
    if (!enablePointer) return;
    const lerp = BACKGROUND_FX.pointerLerp * 0.65;
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth;
      pointer.current.y = event.clientY / window.innerHeight;
    };

    const tick = () => {
      current.current.x += (pointer.current.x - current.current.x) * lerp;
      current.current.y += (pointer.current.y - current.current.y) * lerp;
      const el = layerRef.current;
      if (el) {
        const x = (current.current.x - 0.5) * 64;
        const y = (current.current.y - 0.5) * 44;
        el.style.setProperty("--scene-px", `${x.toFixed(2)}px`);
        el.style.setProperty("--scene-py", `${y.toFixed(2)}px`);
      }
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, [enablePointer]);

  return (
    <div
      aria-hidden
      className="bg-fx pointer-events-none fixed inset-0 z-0 overflow-hidden"
      data-intensity={intensity}
      style={
        {
          "--bg-fx-grid-opacity": BACKGROUND_FX.gridOpacity * (cinematic ? 1 : 0.7),
          "--bg-fx-noise-opacity": BACKGROUND_FX.noiseOpacity,
          "--bg-fx-ambient": BACKGROUND_FX.ambientGlowOpacity * (cinematic ? 1 : 0.75),
        } as CSSProperties
      }
    >
      <div className="bg-fx__base absolute inset-0" />
      <div
        ref={layerRef}
        className="bg-fx__depth absolute inset-0 will-change-transform"
      >
        <div className="bg-fx__blob bg-fx__blob--a absolute" />
        <div className="bg-fx__blob bg-fx__blob--b absolute" />
        <div className="bg-fx__blob bg-fx__blob--c absolute" />
        {cinematic ? <div className="bg-fx__blob bg-fx__blob--d absolute" /> : null}
        <svg
          className="bg-fx__geometry absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <g fill="none" className={reducedMotion ? undefined : "bg-fx__spin-slow"}>
            <circle cx="210" cy="160" r="210" stroke="rgba(230,224,214,0.42)" strokeWidth="1.35" />
            <circle cx="210" cy="160" r="132" stroke="rgba(239,73,56,0.45)" strokeWidth="1.2" strokeDasharray="5 11" />
            <circle cx="380" cy="420" r="170" stroke="rgba(210,206,198,0.22)" strokeWidth="1" />
          </g>
          <g fill="none" className={reducedMotion ? undefined : "bg-fx__spin-slower"}>
            <circle cx="1240" cy="720" r="260" stroke="rgba(150,112,176,0.38)" strokeWidth="1.25" />
            <path d="M980 120 C 1120 80, 1320 180, 1360 340" stroke="rgba(210,110,68,0.46)" strokeWidth="1.3" />
            <path d="M80 640 C 220 780, 480 820, 640 700" stroke="rgba(110,168,186,0.36)" strokeWidth="1.2" />
          </g>
          <g stroke="rgba(230,224,214,0.28)" strokeWidth="1.05">
            <path d="M1180 80 L 1320 80 L 1320 210" />
            <path d="M70 760 L 70 860 L 190 860" />
            <path d="M760 40 L 760 120 M720 80 L 800 80" />
          </g>
          <circle cx="1080" cy="240" r="9" fill="none" stroke="rgba(239,73,56,0.55)" strokeWidth="1.35" />
          <circle cx="360" cy="620" r="5" fill="rgba(244,238,228,0.62)" />
        </svg>
      </div>
      <div className="bg-fx__grid absolute inset-0" />
      <canvas ref={canvasRef} className="bg-fx__particles absolute inset-0 h-full w-full" />
      <div className="bg-fx__noise absolute inset-0" />
      <div className="bg-fx__vignette absolute inset-0" />
    </div>
  );
}
