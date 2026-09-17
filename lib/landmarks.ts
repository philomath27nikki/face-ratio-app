// Landmark indices and ratio config, ported from the standalone prototype
// (index.html). Verify any of these visually if you swap in a different
// model or run into odd results on new photos.

export const PHI = 1.618;

export const POINTS = {
  foreheadTop: 10,
  glabella: 168, // between the eyebrows — used as the "brow line" for thirds
  noseBase: 2,   // subnasale
  chin: 152,
  cheekLeft: 234,
  cheekRight: 454,
  eyeLeftOuter: 33,
  eyeLeftInner: 133,
  eyeRightInner: 362,
  eyeRightOuter: 263,
  mouthLeft: 61,
  mouthRight: 291,
  noseAlarLeft: 98,
  noseAlarRight: 327
} as const;

export interface RatioConfig {
  label: string;
  a: [number, number];
  b: [number, number];
  target: number;
}

export const RATIOS: RatioConfig[] = [
  {
    label: "Face length \u00f7 face width",
    a: [POINTS.foreheadTop, POINTS.chin],
    b: [POINTS.cheekLeft, POINTS.cheekRight],
    target: PHI
  },
  {
    label: "Mouth width \u00f7 nose width",
    a: [POINTS.mouthLeft, POINTS.mouthRight],
    b: [POINTS.noseAlarLeft, POINTS.noseAlarRight],
    target: PHI
  },
  {
    label: "Eye spacing \u00f7 nose width",
    a: [POINTS.eyeLeftInner, POINTS.eyeRightInner],
    b: [POINTS.noseAlarLeft, POINTS.noseAlarRight],
    target: 1.0
  },
  {
    label: "Upper third \u00f7 middle third",
    a: [POINTS.foreheadTop, POINTS.glabella],
    b: [POINTS.glabella, POINTS.noseBase],
    target: 1.0
  },
  {
    label: "Middle third \u00f7 lower third",
    a: [POINTS.glabella, POINTS.noseBase],
    b: [POINTS.noseBase, POINTS.chin],
    target: 1.0
  }
];

export interface Landmark {
  x: number;
  y: number;
  z?: number;
}

export function distance(
  landmarks: Landmark[],
  w: number,
  h: number,
  i: number,
  j: number
) {
  const a = landmarks[i];
  const b = landmarks[j];
  const dx = (a.x - b.x) * w;
  const dy = (a.y - b.y) * h;
  return Math.sqrt(dx * dx + dy * dy);
}

export interface RatioResult {
  label: string;
  value: number;
  target: number;
  isClose: boolean;
}

export function scoreRatios(landmarks: Landmark[], w: number, h: number) {
  let closenessSum = 0;

  const rows: RatioResult[] = RATIOS.map((r) => {
    const distA = distance(landmarks, w, h, r.a[0], r.a[1]);
    const distB = distance(landmarks, w, h, r.b[0], r.b[1]);
    const value = distA / distB;
    const deviation = Math.abs(value - r.target) / r.target;
    const closeness = Math.max(0, 1 - deviation);
    closenessSum += closeness;
    return { label: r.label, value, target: r.target, isClose: deviation < 0.1 };
  });

  const overallScore = Math.round((closenessSum / RATIOS.length) * 100);
  return { rows, overallScore };
}
