"use client";

import { useEffect } from "react";
import { useSyncExternalStore } from "react";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

function subscribeFinePointer(onChange: () => void) {
  const media = window.matchMedia(FINE_POINTER_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
    () => false
  );
}

export function useLockedBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

export function useEscapeKey(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handler, enabled]);
}
