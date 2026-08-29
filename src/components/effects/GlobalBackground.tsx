"use client";

import { CustomCursor } from "@/components/effects/CustomCursor";
import { InteractiveBackground } from "@/components/effects/InteractiveBackground";
import { useReducedMotion } from "@/hooks/use-ui";
import { usePathname } from "next/navigation";

/**
 * Fixed fullscreen atmospheric background for the public site.
 * pointer-events: none — never blocks UI interaction.
 */
export function GlobalBackground() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isHome = pathname === "/";

  return (
    <>
      <InteractiveBackground intensity={isHome ? "cinematic" : "ambient"} />
      {isHome ? <CustomCursor enabled={!reducedMotion} /> : null}
    </>
  );
}
