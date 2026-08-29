import { BACKGROUND_FX, SCENE_COLORS } from "@/lib/background-fx-config";
import type { SceneIntensity } from "@/lib/background-fx-config";

export type ViewportTier = "mobile" | "tablet" | "desktop";

interface SceneOptions {
  intensity: SceneIntensity;
  tier: ViewportTier;
  reducedMotion: boolean;
  enablePointer: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
  phase: number;
  pulse: number;
  parallax: number;
}

interface Circle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  stroke: number;
  color: string;
  alpha: number;
  fillAlpha: number;
  filled: boolean;
  rot: number;
  rotSpeed: number;
  dash: number[];
  parallax: number;
  magnet: number;
}

interface ArcShape {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  start: number;
  sweep: number;
  stroke: number;
  color: string;
  alpha: number;
  rot: number;
  rotSpeed: number;
  parallax: number;
  magnet: number;
}

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  alpha: number;
  parallax: number;
  phase: number;
  magnet: number;
}

interface Orbit {
  homeX: number;
  homeY: number;
  cx: number;
  cy: number;
  radius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  alpha: number;
  parallax: number;
  magnet: number;
}

interface Flow {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  cx: number;
  cy: number;
  color: string;
  alpha: number;
  phase: number;
  speed: number;
  parallax: number;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, items: T[]): T {
  return items[Math.floor(rand() * items.length)]!;
}

function closestPointOnSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy || 1;
  let t = ((px - x1) * dx + (py - y1) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return { x: x1 + dx * t, y: y1 + dy * t, t };
}

function wrap(value: number, span: number, pad: number) {
  if (value < -pad) return span + pad;
  if (value > span + pad) return -pad;
  return value;
}

function magnetOffset(
  homeX: number,
  homeY: number,
  pointerX: number,
  pointerY: number,
  reach: number,
  magnet: number,
  pull: number
) {
  const dx = pointerX - homeX;
  const dy = pointerY - homeY;
  const dist = Math.hypot(dx, dy) || 1;
  if (dist > reach) return { x: homeX, y: homeY };
  const k = ((reach - dist) / reach) ** 1.05 * pull * magnet;
  return { x: homeX + dx * k, y: homeY + dy * k };
}

export function createInteractiveScene(
  canvas: HTMLCanvasElement,
  options: SceneOptions
) {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) {
    return { start() {}, stop() {}, resize() {} };
  }
  const ctx = context;

  const pointerTarget = { x: -9999, y: -9999 };
  const pointer = { x: -9999, y: -9999 };
  const pointerVel = { x: 0, y: 0 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let running = false;
  let last = 0;
  let time = 0;
  let particles: Particle[] = [];
  let circles: Circle[] = [];
  let arcs: ArcShape[] = [];
  let segments: Segment[] = [];
  let orbits: Orbit[] = [];
  let flows: Flow[] = [];

  const cinematic = options.intensity === "cinematic";
  const density = cinematic ? 1 : 0.62;
  const pointerEnabled = options.enablePointer && !options.reducedMotion;
  const follow = 0.09;

  const onPointer = (event: PointerEvent) => {
    pointerTarget.x = event.clientX;
    pointerTarget.y = event.clientY;
  };

  const onLeave = () => {
    pointerTarget.x = -9999;
    pointerTarget.y = -9999;
  };

  function build() {
    const seed =
      Math.round(width * 7.13) + Math.round(height * 3.17) + (cinematic ? 11 : 3);
    const rand = mulberry32(seed);
    const count = Math.round(BACKGROUND_FX.particleCount[options.tier] * density);
    particles = Array.from({ length: count }, () => {
      const x = rand() * width;
      const y = rand() * height;
      const angle = rand() * Math.PI * 2;
      const mag = (0.12 + rand() * 0.32) * BACKGROUND_FX.particleSpeed;
      const rare = rand();
      const color =
        rare > 0.88
          ? SCENE_COLORS.cyan
          : rare > 0.7
            ? pick(rand, [SCENE_COLORS.burgundy, SCENE_COLORS.mutedPurple, SCENE_COLORS.orange])
            : pick(rand, [SCENE_COLORS.graphite, SCENE_COLORS.warmWhite]);
      return {
        x,
        y,
        vx: Math.cos(angle) * mag,
        vy: Math.sin(angle) * mag,
        r: BACKGROUND_FX.particleSize.min + rand() * (BACKGROUND_FX.particleSize.max - BACKGROUND_FX.particleSize.min),
        alpha: 0.4 + rand() * 0.4,
        color,
        phase: rand() * Math.PI * 2,
        pulse: 0.35 + rand() * 0.55,
        parallax: 0.45 + rand() * 0.8,
      };
    });

    const circleCount = options.tier === "mobile" ? 5 : cinematic ? 9 : 6;
    circles = Array.from({ length: circleCount }, (_, i) => {
      const large = i < 3;
      const filled = rand() > 0.42;
      const homeX = width * (0.08 + rand() * 0.84);
      const homeY = height * (0.1 + rand() * 0.8);
      const driftAngle = rand() * Math.PI * 2;
      const drift = 0.08 + rand() * 0.18;
      return {
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        vx: Math.cos(driftAngle) * drift,
        vy: Math.sin(driftAngle) * drift,
        r: large ? height * (0.16 + rand() * 0.22) : 36 + rand() * 88,
        stroke: large ? 1.35 : 1.55,
        color: pick(rand, [
          SCENE_COLORS.graphite,
          SCENE_COLORS.burgundy,
          SCENE_COLORS.mutedPurple,
          SCENE_COLORS.orange,
          SCENE_COLORS.accent,
        ]),
        alpha: large ? 0.32 + rand() * 0.14 : 0.4 + rand() * 0.16,
        fillAlpha: filled ? 0.07 + rand() * 0.08 : 0,
        filled,
        rot: rand() * Math.PI * 2,
        rotSpeed: (rand() - 0.5) * 0.00028,
        dash: !filled && rand() > 0.6 ? [3, 10] : [],
        parallax: large ? 0.28 : 0.62,
        magnet: (rand() > 0.45 ? 1 : -1) * (0.55 + rand() * 0.45),
      };
    });

    const arcCount = options.tier === "mobile" ? 3 : cinematic ? 7 : 4;
    arcs = Array.from({ length: arcCount }, () => {
      const homeX = width * (0.12 + rand() * 0.76);
      const homeY = height * (0.12 + rand() * 0.76);
      const driftAngle = rand() * Math.PI * 2;
      return {
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        vx: Math.cos(driftAngle) * (0.06 + rand() * 0.14),
        vy: Math.sin(driftAngle) * (0.06 + rand() * 0.14),
        r: 48 + rand() * (options.tier === "mobile" ? 100 : 170),
        start: rand() * Math.PI * 2,
        sweep: 0.8 + rand() * 1.9,
        stroke: 1.45,
        color: pick(rand, [SCENE_COLORS.graphite, SCENE_COLORS.darkRed, SCENE_COLORS.cyan, SCENE_COLORS.orange]),
        alpha: 0.3 + rand() * 0.16,
        rot: 0,
        rotSpeed: (rand() - 0.5) * 0.0004,
        parallax: 0.4 + rand() * 0.3,
        magnet: (rand() > 0.5 ? 1 : -1) * (0.5 + rand() * 0.5),
      };
    });

    const segCount = options.tier === "mobile" ? 8 : cinematic ? 16 : 10;
    segments = Array.from({ length: segCount }, () => {
      const x1 = rand() * width;
      const y1 = rand() * height;
      const len = 50 + rand() * (cinematic ? 240 : 150);
      const ang = rand() * Math.PI * 2;
      return {
        x1,
        y1,
        x2: x1 + Math.cos(ang) * len,
        y2: y1 + Math.sin(ang) * len,
        color: pick(rand, [SCENE_COLORS.graphite, SCENE_COLORS.burgundy, SCENE_COLORS.mutedPurple]),
        alpha: 0.22 + rand() * 0.12,
        parallax: 0.3 + rand() * 0.45,
        phase: rand() * Math.PI * 2,
        magnet: (rand() > 0.5 ? 1 : -1) * 0.7,
      };
    });

    const orbitCount = options.tier === "mobile" ? 2 : cinematic ? 6 : 3;
    orbits = Array.from({ length: orbitCount }, () => {
      const homeX = width * (0.18 + rand() * 0.64);
      const homeY = height * (0.18 + rand() * 0.64);
      return {
        homeX,
        homeY,
        cx: homeX,
        cy: homeY,
        radius: 28 + rand() * 78,
        angle: rand() * Math.PI * 2,
        speed: (0.00016 + rand() * 0.00028) * (rand() > 0.5 ? 1 : -1),
        size: 2.2 + rand() * 2.6,
        color: pick(rand, [SCENE_COLORS.warmWhite, SCENE_COLORS.orange, SCENE_COLORS.cyan, SCENE_COLORS.accent]),
        alpha: 0.48 + rand() * 0.3,
        parallax: 0.45,
        magnet: (rand() > 0.4 ? 1 : -1) * 0.8,
      };
    });

    const flowCount = options.tier === "mobile" ? 2 : cinematic ? 4 : 3;
    flows = Array.from({ length: flowCount }, () => ({
      ax: rand() * width,
      ay: rand() * height,
      bx: rand() * width,
      by: rand() * height,
      cx: rand() * width,
      cy: rand() * height,
      color: pick(rand, [SCENE_COLORS.graphite, SCENE_COLORS.mutedPurple, SCENE_COLORS.burgundy]),
      alpha: 0.22 + rand() * 0.12,
      phase: rand() * Math.PI * 2,
      speed: 0.00018 + rand() * 0.00014,
      parallax: 0.22,
    }));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, options.tier === "desktop" ? 1.5 : 1.15);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    if (options.reducedMotion) draw(0, true);
  }

  function draw(dt: number, frozen: boolean) {
    ctx.clearRect(0, 0, width, height);

    const hasPointer = pointer.x > -500;
    const nx = hasPointer ? (pointer.x / width - 0.5) * 2 : 0;
    const ny = hasPointer ? (pointer.y / height - 0.5) * 2 : 0;
    const fieldR = cinematic ? 320 : 210;
    const pull = cinematic ? 0.42 : 0.28;

    const parallax = (depth: number) => ({
      x: nx * 42 * depth,
      y: ny * 30 * depth,
    });

    if (!frozen) time += dt;

    for (const flow of flows) {
      const p = parallax(flow.parallax);
      const wobble = frozen ? 0 : Math.sin(time * flow.speed + flow.phase) * 28;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${flow.color}, ${flow.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.moveTo(flow.ax + p.x, flow.ay + p.y);
      ctx.quadraticCurveTo(
        flow.cx + p.x + wobble,
        flow.cy + p.y - wobble * 0.4,
        flow.bx + p.x,
        flow.by + p.y
      );
      ctx.stroke();
    }

    for (const circle of circles) {
      if (!frozen) {
        circle.homeX = wrap(circle.homeX + circle.vx * dt, width, circle.r);
        circle.homeY = wrap(circle.homeY + circle.vy * dt, height, circle.r);
        circle.rot += circle.rotSpeed * dt * 16.67;
        const target = hasPointer && pointerEnabled
          ? magnetOffset(circle.homeX, circle.homeY, pointer.x, pointer.y, fieldR * 1.7, circle.magnet, pull)
          : { x: circle.homeX, y: circle.homeY };
        circle.x += (target.x - circle.x) * follow;
        circle.y += (target.y - circle.y) * follow;
      }
      const p = parallax(circle.parallax);
      const near = hasPointer
        ? Math.hypot(pointer.x - (circle.x + p.x), pointer.y - (circle.y + p.y))
        : 9999;
      const breathe = frozen ? 0 : Math.sin(time * 0.00045 + circle.r) * 5;
      const expand = near < fieldR * 1.5 ? ((fieldR * 1.5 - near) / (fieldR * 1.5)) * 18 : 0;
      const radius = Math.max(8, circle.r + breathe + expand);
      ctx.save();
      ctx.translate(circle.x + p.x, circle.y + p.y);
      ctx.rotate(circle.rot + pointerVel.x * 0.004 * circle.parallax);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      if (circle.filled) {
        ctx.fillStyle = `rgba(${circle.color}, ${circle.fillAlpha})`;
        ctx.fill();
      }
      ctx.strokeStyle = `rgba(${circle.color}, ${circle.alpha})`;
      ctx.lineWidth = circle.stroke;
      if (circle.dash.length) ctx.setLineDash(circle.dash);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    for (const arc of arcs) {
      if (!frozen) {
        arc.homeX = wrap(arc.homeX + arc.vx * dt, width, arc.r);
        arc.homeY = wrap(arc.homeY + arc.vy * dt, height, arc.r);
        arc.rot += arc.rotSpeed * dt * 16.67;
        const target = hasPointer && pointerEnabled
          ? magnetOffset(arc.homeX, arc.homeY, pointer.x, pointer.y, fieldR * 1.6, arc.magnet, pull)
          : { x: arc.homeX, y: arc.homeY };
        arc.x += (target.x - arc.x) * follow;
        arc.y += (target.y - arc.y) * follow;
      }
      const p = parallax(arc.parallax);
      ctx.save();
      ctx.translate(arc.x + p.x, arc.y + p.y);
      ctx.rotate(arc.rot + pointerVel.y * 0.003);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${arc.color}, ${arc.alpha})`;
      ctx.lineWidth = arc.stroke;
      ctx.arc(0, 0, arc.r, arc.start, arc.start + arc.sweep);
      ctx.stroke();
      ctx.restore();
    }

    for (const seg of segments) {
      const p = parallax(seg.parallax);
      const drift = frozen ? 0 : Math.sin(time * 0.0004 + seg.phase) * 8;
      const x1 = seg.x1 + p.x + drift;
      const y1 = seg.y1 + p.y;
      const x2 = seg.x2 + p.x;
      const y2 = seg.y2 + p.y + drift * 0.4;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${seg.color}, ${seg.alpha})`;
      ctx.lineWidth = 1.15;

      if (hasPointer && pointerEnabled) {
        const closest = closestPointOnSegment(pointer.x, pointer.y, x1, y1, x2, y2);
        const dist = Math.hypot(pointer.x - closest.x, pointer.y - closest.y);
        if (dist < fieldR && dist > 0.5) {
          const force = ((fieldR - dist) / fieldR) * 36 * seg.magnet;
          const nxn = (closest.x - pointer.x) / dist;
          const nyn = (closest.y - pointer.y) / dist;
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(closest.x + nxn * force, closest.y + nyn * force, x2, y2);
          ctx.stroke();
          continue;
        }
      }

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    const linkDist = BACKGROUND_FX.linkDistance * (cinematic ? 1.12 : 0.86);
    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i]!;
      if (!frozen) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.phase += 0.012 * particle.pulse * dt;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        if (pointerEnabled && hasPointer) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < fieldR && dist > 0.4) {
            const force = ((fieldR - dist) / fieldR) ** 1.1 * 7.5;
            particle.x += (dx / dist) * force * dt;
            particle.y += (dy / dist) * force * dt;
          }
        }
      }

      const p = parallax(particle.parallax * 0.45);
      const px = particle.x + p.x;
      const py = particle.y + p.y;
      const twinkle = frozen ? 0.75 : 0.62 + Math.sin(particle.phase) * 0.38;

      if (BACKGROUND_FX.linkOpacity > 0.001) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]!;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const a = (1 - dist / linkDist) * BACKGROUND_FX.linkOpacity * (cinematic ? 1 : 0.7);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${SCENE_COLORS.graphite}, ${a})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(px, py);
            ctx.lineTo(other.x + p.x * 0.4, other.y + p.y * 0.4);
            ctx.stroke();
          }
        }
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha * twinkle})`;
      ctx.arc(px, py, particle.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const orbit of orbits) {
      if (!frozen) {
        orbit.angle += orbit.speed * dt * 16.67;
        const target = hasPointer && pointerEnabled
          ? magnetOffset(orbit.homeX, orbit.homeY, pointer.x, pointer.y, fieldR * 1.5, orbit.magnet, pull)
          : { x: orbit.homeX, y: orbit.homeY };
        orbit.cx += (target.x - orbit.cx) * follow;
        orbit.cy += (target.y - orbit.cy) * follow;
      }
      const p = parallax(orbit.parallax);
      const ox = orbit.cx + p.x + Math.cos(orbit.angle) * orbit.radius;
      const oy = orbit.cy + p.y + Math.sin(orbit.angle) * orbit.radius;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${orbit.color}, ${orbit.alpha * 0.4})`;
      ctx.lineWidth = 0.9;
      ctx.arc(orbit.cx + p.x, orbit.cy + p.y, orbit.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = `rgba(${orbit.color}, ${orbit.alpha})`;
      ctx.arc(ox, oy, orbit.size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (pointerEnabled && hasPointer) {
      const pulse = 1 + Math.sin(time * 0.0022) * 0.06;
      const rings = [28, 72, 128];
      rings.forEach((radius, index) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${index === 2 ? SCENE_COLORS.mutedPurple : SCENE_COLORS.accent}, ${0.32 - index * 0.06})`;
        ctx.lineWidth = index === 0 ? 1.4 : 1;
        ctx.arc(pointer.x, pointer.y, radius * pulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      const grd = ctx.createRadialGradient(pointer.x, pointer.y, 10, pointer.x, pointer.y, fieldR);
      grd.addColorStop(0, `rgba(${SCENE_COLORS.accent}, 0.16)`);
      grd.addColorStop(0.4, `rgba(${SCENE_COLORS.burgundy}, 0.08)`);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, fieldR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame(now: number) {
    if (!running) return;
    const dt = Math.min((now - last) / 16.67, 2.4);
    last = now;

    const prevX = pointer.x;
    const prevY = pointer.y;
    const lerp = BACKGROUND_FX.pointerLerp;
    pointer.x += (pointerTarget.x - pointer.x) * lerp;
    pointer.y += (pointerTarget.y - pointer.y) * lerp;
    pointerVel.x = pointer.x - prevX;
    pointerVel.y = pointer.y - prevY;

    draw(dt, false);
    raf = window.requestAnimationFrame(frame);
  }

  function onVisibility() {
    if (document.visibilityState === "hidden") {
      running = false;
      window.cancelAnimationFrame(raf);
      return;
    }
    if (!options.reducedMotion) start();
  }

  function start() {
    if (options.reducedMotion) {
      draw(0, true);
      return;
    }
    if (running) return;
    running = true;
    last = performance.now();
    raf = window.requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("visibilitychange", onVisibility);
  }

  window.addEventListener("resize", resize);
  if (pointerEnabled) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
  }
  document.addEventListener("visibilitychange", onVisibility);
  resize();

  return { start, stop, resize };
}
