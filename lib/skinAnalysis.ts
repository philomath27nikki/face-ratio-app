/**
 * Skin Tone, Undertone, and Condition Analysis Module.
 * Extracts anthropometric skin patches from facial landmarks
 * and calculates colorimetric undertone, erythema (redness), T-zone shine, and skin tone level.
 */

import { Landmark } from "./landmarks";

export interface SkinPatchMetrics {
  r: number;
  g: number;
  b: number;
  luminance: number; // 0 - 255
}

export interface SkinAnalysisResult {
  skinTone: "Fair" | "Light" | "Medium" | "Tan" | "Deep";
  fitzpatrickScale: "Type I-II" | "Type III" | "Type IV" | "Type V" | "Type VI";
  undertone: "Cool" | "Warm" | "Neutral";
  undertoneConfidence: number; // 0 - 100
  hexColor: string;
  tZoneShineScore: number; // 0 - 100
  tZoneCondition: "Matte" | "Normal / Balanced" | "High Shine (Oily)";
  erythemaScore: number; // 0 - 100
  rednessCondition: "Minimal" | "Moderate" | "Noticeable (Sensitive / Rosacea)";
  hydrationEstimate: "Well-Hydrated" | "Balanced" | "Dehydrated / Dry";
  metrics: {
    forehead: SkinPatchMetrics;
    leftCheek: SkinPatchMetrics;
    rightCheek: SkinPatchMetrics;
    chin: SkinPatchMetrics;
  };
}

// Landmark point indices for skin sampling
const FOREHEAD_SAMPLE_INDEX = 151; // Forehead middle
const LEFT_CHEEK_SAMPLE_INDEX = 50;  // Left cheek prominence
const RIGHT_CHEEK_SAMPLE_INDEX = 280; // Right cheek prominence
const NOSE_SAMPLE_INDEX = 4;          // Nose bridge
const CHIN_SAMPLE_INDEX = 175;        // Chin center

/**
 * Samples a rectangular patch around normalized landmark coordinates and computes average RGB.
 */
function samplePatch(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  landmark: Landmark,
  patchRadius: number = 8
): SkinPatchMetrics {
  const cx = Math.max(patchRadius, Math.min(width - patchRadius - 1, Math.round(landmark.x * width)));
  const cy = Math.max(patchRadius, Math.min(height - patchRadius - 1, Math.round(landmark.y * height)));

  const size = patchRadius * 2;
  const imgData = ctx.getImageData(cx - patchRadius, cy - patchRadius, size, size);
  const data = imgData.data;

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Filter out extreme highlights/reflections or deep shadows/eyebrows
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum > 25 && lum < 250) {
      totalR += r;
      totalG += g;
      totalB += b;
      count++;
    }
  }

  if (count === 0) {
    return { r: 180, g: 140, b: 120, luminance: 150 };
  }

  const avgR = Math.round(totalR / count);
  const avgG = Math.round(totalG / count);
  const avgB = Math.round(totalB / count);
  const avgLum = Math.round(0.299 * avgR + 0.587 * avgG + 0.114 * avgB);

  return { r: avgR, g: avgG, b: avgB, luminance: avgLum };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Analyzes skin color, undertone, shine, and redness across anthropometric landmarks.
 */
export function analyzeSkinFromCanvas(
  canvas: HTMLCanvasElement,
  landmarks: Landmark[]
): SkinAnalysisResult | null {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx || !landmarks || landmarks.length < 468) return null;

  const w = canvas.width;
  const h = canvas.height;

  const forehead = samplePatch(ctx, w, h, landmarks[FOREHEAD_SAMPLE_INDEX]);
  const leftCheek = samplePatch(ctx, w, h, landmarks[LEFT_CHEEK_SAMPLE_INDEX]);
  const rightCheek = samplePatch(ctx, w, h, landmarks[RIGHT_CHEEK_SAMPLE_INDEX]);
  const chin = samplePatch(ctx, w, h, landmarks[CHIN_SAMPLE_INDEX]);
  const nose = samplePatch(ctx, w, h, landmarks[NOSE_SAMPLE_INDEX]);

  // Overall skin tone composite (weighting cheeks and chin higher than T-zone)
  const compositeR = Math.round((forehead.r * 0.2) + (leftCheek.r * 0.35) + (rightCheek.r * 0.35) + (chin.r * 0.1));
  const compositeG = Math.round((forehead.g * 0.2) + (leftCheek.g * 0.35) + (rightCheek.g * 0.35) + (chin.g * 0.1));
  const compositeB = Math.round((forehead.b * 0.2) + (leftCheek.b * 0.35) + (rightCheek.b * 0.35) + (chin.b * 0.1));
  const compositeLum = Math.round(0.299 * compositeR + 0.587 * compositeG + 0.114 * compositeB);

  // 1. Skin Tone & Fitzpatrick Scale Estimation
  let skinTone: SkinAnalysisResult["skinTone"] = "Medium";
  let fitzpatrickScale: SkinAnalysisResult["fitzpatrickScale"] = "Type III";

  if (compositeLum >= 195) {
    skinTone = "Fair";
    fitzpatrickScale = "Type I-II";
  } else if (compositeLum >= 165) {
    skinTone = "Light";
    fitzpatrickScale = "Type III";
  } else if (compositeLum >= 135) {
    skinTone = "Medium";
    fitzpatrickScale = "Type IV";
  } else if (compositeLum >= 95) {
    skinTone = "Tan";
    fitzpatrickScale = "Type V";
  } else {
    skinTone = "Deep";
    fitzpatrickScale = "Type VI";
  }

  // 2. Colorimetric Undertone Estimation
  // Warm undertones have higher (R - B) and yellowish/golden tone (G significantly higher than B)
  // Cool undertones have reddish-pink or blueish tones (B is closer to G)
  const redToBlueDelta = compositeR - compositeB;
  const greenToBlueDelta = compositeG - compositeB;

  let undertone: SkinAnalysisResult["undertone"] = "Neutral";
  let undertoneConfidence = 78;

  if (redToBlueDelta > 45 && greenToBlueDelta > 20) {
    undertone = "Warm";
    undertoneConfidence = Math.min(95, 75 + Math.round((redToBlueDelta - 45) / 2));
  } else if (redToBlueDelta < 28 || greenToBlueDelta < 12) {
    undertone = "Cool";
    undertoneConfidence = Math.min(95, 75 + Math.round((28 - redToBlueDelta) / 2));
  } else {
    undertone = "Neutral";
    undertoneConfidence = 85;
  }

  // 3. T-Zone Shine / Oiliness Score (Comparing forehead & nose luminance vs cheek baseline)
  const cheekAvgLum = (leftCheek.luminance + rightCheek.luminance) / 2;
  const tzoneAvgLum = (forehead.luminance + nose.luminance) / 2;
  const shineDiff = tzoneAvgLum - cheekAvgLum;

  const tZoneShineScore = Math.max(15, Math.min(95, Math.round(50 + (shineDiff * 2.2))));

  let tZoneCondition: SkinAnalysisResult["tZoneCondition"] = "Normal / Balanced";
  if (tZoneShineScore > 68) {
    tZoneCondition = "High Shine (Oily)";
  } else if (tZoneShineScore < 38) {
    tZoneCondition = "Matte";
  }

  // 4. Erythema / Redness Score (Normalized red intensity on cheeks vs forehead/chin)
  const cheekAvgR = (leftCheek.r + rightCheek.r) / 2;
  const cheekAvgG = (leftCheek.g + rightCheek.g) / 2;
  const rednessRatio = cheekAvgG > 0 ? (cheekAvgR / cheekAvgG) : 1.2;

  const erythemaScore = Math.max(10, Math.min(95, Math.round(((rednessRatio - 1.1) / 0.35) * 50 + 40)));

  let rednessCondition: SkinAnalysisResult["rednessCondition"] = "Minimal";
  if (erythemaScore > 65) {
    rednessCondition = "Noticeable (Sensitive / Rosacea)";
  } else if (erythemaScore > 45) {
    rednessCondition = "Moderate";
  }

  // 5. Hydration Estimate
  let hydrationEstimate: SkinAnalysisResult["hydrationEstimate"] = "Balanced";
  if (tZoneShineScore < 35 && compositeLum < 140) {
    hydrationEstimate = "Dehydrated / Dry";
  } else if (tZoneShineScore >= 35 && tZoneShineScore <= 68) {
    hydrationEstimate = "Well-Hydrated";
  }

  return {
    skinTone,
    fitzpatrickScale,
    undertone,
    undertoneConfidence,
    hexColor: rgbToHex(compositeR, compositeG, compositeB),
    tZoneShineScore,
    tZoneCondition,
    erythemaScore,
    rednessCondition,
    hydrationEstimate,
    metrics: {
      forehead,
      leftCheek,
      rightCheek,
      chin,
    },
  };
}
