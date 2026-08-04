/**
 * Ventora Background FX — easily tunable atmosphere settings.
 * Keep values subtle; this is premium ambience, not a light show.
 */
export const BACKGROUND_FX = {
  /** Particle counts by viewport class */
  particleCount: {
    desktop: 46,
    tablet: 28,
    mobile: 16,
  },

  /** Base drift speed multiplier (higher = faster) */
  particleSpeed: 0.22,

  /** Cursor aura strength 0–1 */
  glowIntensity: 0.2,

  /** Technical grid visibility 0–1 */
  gridOpacity: 0.035,

  /** Film grain overlay 0–1 */
  noiseOpacity: 0.03,

  /** Home route multiplier for particles + glow + ambient */
  heroBoostIntensity: 1.32,

  /** Soft corner / ambient red wash */
  ambientGlowOpacity: 0.14,

  /** Max particle radius in CSS pixels */
  particleSize: {
    min: 0.6,
    max: 1.8,
  },

  /** Soft connection lines between nearby particles (0 = off) */
  linkOpacity: 0.035,
  linkDistance: 110,

  /** Glow blob size as fraction of the shorter viewport side */
  glowSizeFactor: 0.42,

  /** Pointer smoothing (0–1, lower = smoother/slower) */
  pointerLerp: 0.08,
} as const;

export type BackgroundFxConfig = typeof BACKGROUND_FX;
