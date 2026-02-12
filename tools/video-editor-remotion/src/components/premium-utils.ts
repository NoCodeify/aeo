import { interpolate, spring, SpringConfig, Easing } from "remotion";

// === Spring presets ===
export const SPRING_SNAPPY: SpringConfig = { damping: 14, stiffness: 200, mass: 0.8, overshootClamping: false };
export const SPRING_SMOOTH: SpringConfig = { damping: 20, stiffness: 170, mass: 1, overshootClamping: false };
export const SPRING_BOUNCY: SpringConfig = { damping: 10, stiffness: 180, mass: 0.8, overshootClamping: false };

// === Color helper ===
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// === Glow shadow generator ===
type GlowIntensity = "subtle" | "medium" | "strong";

export function glowShadow(hex: string, intensity: GlowIntensity): string {
  switch (intensity) {
    case "subtle":
      return `0 0 20px ${hexToRgba(hex, 0.15)}, 0 0 40px ${hexToRgba(hex, 0.08)}, 0 4px 12px rgba(0,0,0,0.8)`;
    case "medium":
      return `0 0 30px ${hexToRgba(hex, 0.25)}, 0 0 60px ${hexToRgba(hex, 0.12)}, 0 0 100px ${hexToRgba(hex, 0.06)}, 0 4px 12px rgba(0,0,0,0.8)`;
    case "strong":
      return `0 0 40px ${hexToRgba(hex, 0.35)}, 0 0 80px ${hexToRgba(hex, 0.2)}, 0 0 120px ${hexToRgba(hex, 0.1)}, 0 4px 16px rgba(0,0,0,0.9)`;
  }
}

// === Pop scale (TextOverlay-style 0.7 -> 1.1 -> 1.0) ===
export function popScale(frame: number, startFrame: number = 0, overshoot: number = 1.1): number {
  const f = frame - startFrame;
  if (f < 0) return 0;
  return interpolate(
    f,
    [0, 7, 12],
    [0.7, overshoot, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

// === Fade in + out ===
export function fadeInOut(frame: number, durationInFrames: number, fadeIn: number = 6, fadeOut: number = 8): number {
  return interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

// === Stagger delay ===
export function staggerDelay(index: number, gapFrames: number = 4): number {
  return index * gapFrames;
}

// === Glass morphism style helper ===
export function glassMorphism(blurPx: number = 16, bgAlpha: number = 0.65): React.CSSProperties {
  return {
    backdropFilter: `blur(${blurPx}px)`,
    WebkitBackdropFilter: `blur(${blurPx}px)`,
    backgroundColor: `rgba(10, 10, 20, ${bgAlpha})`,
    border: "1px solid rgba(255, 255, 255, 0.08)",
  };
}

// === Deterministic particle system (ConfettiBurst) ===
export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  color: string;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateParticles(
  seed: number,
  count: number,
  colors: string[],
  originX: number,
  originY: number,
  spread: number = 1,
): Particle[] {
  const rng = seededRandom(seed);
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = rng() * Math.PI * 2;
    const speed = (rng() * 12 + 4) * spread;
    particles.push({
      id: i,
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (rng() * 8 + 4),
      rotation: rng() * 360,
      rotationSpeed: (rng() - 0.5) * 20,
      scale: rng() * 0.6 + 0.5,
      color: colors[Math.floor(rng() * colors.length)],
    });
  }
  return particles;
}

export function updateParticle(
  p: Particle,
  frame: number,
  gravity: number = 0.4,
): { x: number; y: number; rotation: number } {
  return {
    x: p.x + p.vx * frame,
    y: p.y + p.vy * frame + 0.5 * gravity * frame * frame,
    rotation: p.rotation + p.rotationSpeed * frame,
  };
}

// === Screen shake helper ===
export function screenShake(
  frame: number,
  intensity: number,
  decay: number,
): { x: number; y: number } {
  const dampen = Math.exp(-frame * decay);
  const maxPx = intensity * 40;
  // Deterministic pseudo-random using sin
  const x = Math.sin(frame * 37.7 + 1.3) * maxPx * dampen;
  const y = Math.cos(frame * 43.1 + 2.7) * maxPx * dampen;
  return { x, y };
}

// === SVG path draw helper ===
export function drawProgress(
  frame: number,
  startFrame: number,
  durationFrames: number,
): number {
  return interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );
}
