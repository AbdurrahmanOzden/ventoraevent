/**
 * Ventora Interactive Background — tunable, keep values quiet and premium.
 */
export const BACKGROUND_FX = {
  particleCount: {
    desktop: 48,
    tablet: 28,
    mobile: 16,
  },
  particleSpeed: 0.11,
  glowIntensity: 0.22,
  gridOpacity: 0.1,
  noiseOpacity: 0.04,
  heroBoostIntensity: 1,
  ambientGlowOpacity: 0.62,
  particleSize: {
    min: 0.9,
    max: 2.4,
  },
  linkOpacity: 0.14,
  linkDistance: 140,
  glowSizeFactor: 0.42,
  pointerLerp: 0.12,
} as const;

export const SCENE_COLORS = {
  burgundy: "148, 42, 54",
  darkRed: "186, 62, 52",
  accent: "239, 73, 56",
  mutedPurple: "124, 92, 148",
  orange: "210, 110, 68",
  cyan: "110, 168, 186",
  graphite: "210, 206, 198",
  warmWhite: "244, 238, 228",
} as const;

export type BackgroundFxConfig = typeof BACKGROUND_FX;
export type SceneIntensity = "cinematic" | "ambient";
