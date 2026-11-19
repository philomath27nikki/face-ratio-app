export interface Landmark {
  x: number;
  y: number;
  z?: number;
}

export type FaceShape =
  | "Oval"
  | "Round"
  | "Square"
  | "Heart"
  | "Diamond"
  | "Oblong"
  | "Rectangle";

export interface FaceShapeLandmarkPoints {
  foreheadTop: number;
  chin: number;
  foreheadLeft: number;
  foreheadRight: number;
  templeLeft: number;
  templeRight: number;
  cheekLeft: number;
  cheekRight: number;
  jawLeft: number;
  jawRight: number;
  chinLeft: number;
  chinRight: number;
}

export const FACE_SHAPE_POINTS: FaceShapeLandmarkPoints = {
  foreheadTop: 10,
  chin: 152,
  foreheadLeft: 103,
  foreheadRight: 332,
  templeLeft: 54,
  templeRight: 284,
  cheekLeft: 234,
  cheekRight: 454,
  jawLeft: 172,
  jawRight: 397,
  chinLeft: 148,
  chinRight: 377,
};

// Perimeter wireframe points in sequential order for canvas contour drawing
export const FACE_SHAPE_CONTOUR_INDICES = [
  10,  // Forehead top
  338, 297, 332, 284, // Right forehead & temple
  454, // Right cheekbone
  365, 397, 377, // Right jaw & chin
  152, // Chin center
  148, 172, 136, // Left chin & jaw
  234, // Left cheekbone
  54, 103, 67, 109, // Left temple & forehead
];

export interface FaceDimensions {
  faceLength: number;
  cheekboneWidth: number;
  foreheadWidth: number;
  jawWidth: number;
  chinWidth: number;
}

export interface FaceShapeRatios {
  lengthToWidth: number;      // faceLength / cheekboneWidth (golden ratio ~1.618)
  foreheadToCheek: number;    // foreheadWidth / cheekboneWidth
  jawToCheek: number;         // jawWidth / cheekboneWidth
  foreheadToJaw: number;      // foreheadWidth / jawWidth
  chinToJaw: number;          // chinWidth / jawWidth
  jawAngleDeg: number;        // Angle formed by jawLeft - chin - jawRight
}

export interface FaceShapeRecommendation {
  summary: string;
  contouring: string;
  blush: string;
  highlighter: string;
  suitableProducts: string[];
}

export interface FaceShapeResult {
  primaryShape: FaceShape;
  confidence: number;
  secondaryShape?: FaceShape;
  dimensions: FaceDimensions;
  ratios: FaceShapeRatios;
  description: string;
  characteristics: string[];
  recommendation: FaceShapeRecommendation;
  semanticKeywords: string[];
  shapeScores: Record<FaceShape, number>;
}

function dist(p1: Landmark, p2: Landmark, w: number, h: number): number {
  const dx = (p1.x - p2.x) * w;
  const dy = (p1.y - p2.y) * h;
  return Math.sqrt(dx * dx + dy * dy);
}

function calculateAngleDeg(p1: Landmark, vertex: Landmark, p2: Landmark, w: number, h: number): number {
  const v1x = (p1.x - vertex.x) * w;
  const v1y = (p1.y - vertex.y) * h;
  const v2x = (p2.x - vertex.x) * w;
  const v2y = (p2.y - vertex.y) * h;

  const dot = v1x * v2x + v1y * v2y;
  const mag1 = Math.sqrt(v1x * v1x + v1y * v1y);
  const mag2 = Math.sqrt(v2x * v2x + v2y * v2y);

  if (mag1 === 0 || mag2 === 0) return 90;
  const cos = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return (Math.acos(cos) * 180) / Math.PI;
}

export function classifyFaceShape(
  landmarks: Landmark[],
  w: number,
  h: number
): FaceShapeResult {
  const p = FACE_SHAPE_POINTS;

  const faceLength = dist(landmarks[p.foreheadTop], landmarks[p.chin], w, h);
  const cheekboneWidth = dist(landmarks[p.cheekLeft], landmarks[p.cheekRight], w, h);
  const foreheadWidth = dist(landmarks[p.foreheadLeft], landmarks[p.foreheadRight], w, h);
  const jawWidth = dist(landmarks[p.jawLeft], landmarks[p.jawRight], w, h);
  const chinWidth = dist(landmarks[p.chinLeft], landmarks[p.chinRight], w, h);

  const lengthToWidth = faceLength / (cheekboneWidth || 1);
  const foreheadToCheek = foreheadWidth / (cheekboneWidth || 1);
  const jawToCheek = jawWidth / (cheekboneWidth || 1);
  const foreheadToJaw = foreheadWidth / (jawWidth || 1);
  const chinToJaw = chinWidth / (jawWidth || 1);
  const jawAngleDeg = calculateAngleDeg(
    landmarks[p.jawLeft],
    landmarks[p.chin],
    landmarks[p.jawRight],
    w,
    h
  );

  const dimensions: FaceDimensions = {
    faceLength: Math.round(faceLength),
    cheekboneWidth: Math.round(cheekboneWidth),
    foreheadWidth: Math.round(foreheadWidth),
    jawWidth: Math.round(jawWidth),
    chinWidth: Math.round(chinWidth),
  };

  const ratios: FaceShapeRatios = {
    lengthToWidth: Number(lengthToWidth.toFixed(3)),
    foreheadToCheek: Number(foreheadToCheek.toFixed(3)),
    jawToCheek: Number(jawToCheek.toFixed(3)),
    foreheadToJaw: Number(foreheadToJaw.toFixed(3)),
    chinToJaw: Number(chinToJaw.toFixed(3)),
    jawAngleDeg: Math.round(jawAngleDeg),
  };

  // Score candidate shapes based on anthropometric norms (lower penalty = better fit)
  const penalty: Record<FaceShape, number> = {
    Oval: 0,
    Round: 0,
    Square: 0,
    Heart: 0,
    Diamond: 0,
    Oblong: 0,
    Rectangle: 0,
  };

  // 1. Oval: Balanced proportions, length ~1.35-1.50x width, forehead slightly wider than jaw, soft chin
  penalty.Oval += Math.abs(lengthToWidth - 1.40) * 3.5;
  penalty.Oval += Math.abs(foreheadToCheek - 0.85) * 2.0;
  penalty.Oval += Math.abs(jawToCheek - 0.72) * 2.5;
  if (jawToCheek > 0.82) penalty.Oval += 1.5;

  // 2. Round: Length to width close to 1:1 (<1.25), cheekbones widest, soft curved jaw
  penalty.Round += Math.abs(lengthToWidth - 1.12) * 4.0;
  penalty.Round += Math.max(0, lengthToWidth - 1.25) * 5.0;
  penalty.Round += Math.abs(foreheadToCheek - 0.82) * 2.0;
  penalty.Round += Math.abs(jawToCheek - 0.76) * 2.0;
  if (jawAngleDeg < 80) penalty.Round += 2.0;

  // 3. Square: Length to width close to 1:1, forehead, cheekbones & jaw nearly equal width, angular jaw
  penalty.Square += Math.abs(lengthToWidth - 1.15) * 3.5;
  penalty.Square += Math.max(0, lengthToWidth - 1.28) * 4.5;
  penalty.Square += Math.abs(jawToCheek - 0.90) * 4.0;
  penalty.Square += Math.abs(foreheadToCheek - 0.88) * 2.5;
  if (jawToCheek < 0.80) penalty.Square += 3.0;

  // 4. Heart: Broad forehead, tapering down to a pointed/narrow chin (forehead > jaw significantly)
  penalty.Heart += Math.max(0, 1.20 - foreheadToJaw) * 4.5;
  penalty.Heart += Math.abs(foreheadToCheek - 0.92) * 2.0;
  penalty.Heart += Math.max(0, jawToCheek - 0.73) * 3.5;
  penalty.Heart += Math.abs(lengthToWidth - 1.35) * 2.0;
  if (foreheadToJaw < 1.10) penalty.Heart += 2.5;

  // 5. Diamond: Cheekbones widest part, forehead and jaw both narrow, pointed chin
  penalty.Diamond += Math.max(0, foreheadToCheek - 0.78) * 4.0;
  penalty.Diamond += Math.max(0, jawToCheek - 0.70) * 4.0;
  penalty.Diamond += Math.abs(lengthToWidth - 1.38) * 2.5;
  penalty.Diamond += Math.abs(foreheadToJaw - 1.05) * 2.0;
  if (foreheadToCheek > 0.84 || jawToCheek > 0.76) penalty.Diamond += 2.5;

  // 6. Oblong: Long face (lengthToWidth > 1.48), soft curved jawline
  penalty.Oblong += Math.max(0, 1.50 - lengthToWidth) * 4.5;
  penalty.Oblong += Math.abs(lengthToWidth - 1.62) * 2.5;
  penalty.Oblong += Math.abs(jawToCheek - 0.74) * 2.5;
  if (jawToCheek > 0.84) penalty.Oblong += 1.5;

  // 7. Rectangle: Long face (lengthToWidth > 1.48), broad angular jawline
  penalty.Rectangle += Math.max(0, 1.50 - lengthToWidth) * 4.5;
  penalty.Rectangle += Math.abs(lengthToWidth - 1.60) * 2.5;
  penalty.Rectangle += Math.abs(jawToCheek - 0.88) * 3.5;
  penalty.Rectangle += Math.abs(foreheadToCheek - 0.88) * 2.0;
  if (jawToCheek < 0.78) penalty.Rectangle += 3.0;

  // Convert penalties to softmax-style normalized scores (0 - 100)
  const expScores: Record<FaceShape, number> = {} as Record<FaceShape, number>;
  let sumExp = 0;
  for (const shape of Object.keys(penalty) as FaceShape[]) {
    const v = Math.exp(-penalty[shape]);
    expScores[shape] = v;
    sumExp += v;
  }

  const shapeScores: Record<FaceShape, number> = {} as Record<FaceShape, number>;
  for (const shape of Object.keys(expScores) as FaceShape[]) {
    shapeScores[shape] = Math.round((expScores[shape] / (sumExp || 1)) * 100);
  }

  // Find top shape and secondary runner-up
  const sortedShapes = (Object.keys(shapeScores) as FaceShape[]).sort(
    (a, b) => shapeScores[b] - shapeScores[a]
  );
  const primaryShape = sortedShapes[0];
  const confidence = shapeScores[primaryShape];
  const secondaryShape =
    shapeScores[sortedShapes[1]] >= 20 ? sortedShapes[1] : undefined;

  const characteristics: string[] = [];
  if (lengthToWidth > 1.45) {
    characteristics.push("Noticeably elongated facial structure (length > 1.45x width)");
  } else if (lengthToWidth < 1.25) {
    characteristics.push("Balanced, compact face ratio with proportional width and length");
  } else {
    characteristics.push("Harmonious length-to-width ratio closely matching the golden proportion");
  }

  if (foreheadToJaw > 1.20) {
    characteristics.push("Broad forehead tapering toward a delicate jawline");
  } else if (jawToCheek > 0.84) {
    characteristics.push("Well-defined, structured jawline with strong mandibular presence");
  } else if (foreheadToCheek < 0.80 && jawToCheek < 0.72) {
    characteristics.push("High, prominent cheekbones wider than both forehead and jaw");
  } else {
    characteristics.push("Gentle, softly tapered jawline maintaining smooth facial contours");
  }

  if (jawAngleDeg > 105) {
    characteristics.push("Wide, square chin base with defined lateral angle");
  } else if (jawAngleDeg < 85) {
    characteristics.push("Distinctly tapered, v-shaped chin apex");
  } else {
    characteristics.push("Naturally rounded, oval chin curve");
  }

  const { description, recommendation, semanticKeywords } =
    getShapeDetails(primaryShape);

  return {
    primaryShape,
    confidence,
    secondaryShape,
    dimensions,
    ratios,
    description,
    characteristics,
    recommendation,
    semanticKeywords,
    shapeScores,
  };
}

function getShapeDetails(shape: FaceShape): {
  description: string;
  recommendation: FaceShapeRecommendation;
  semanticKeywords: string[];
} {
  switch (shape) {
    case "Oval":
      return {
        description:
          "The Oval face is characterized by balanced proportions where the length is roughly 1.5 times the width, with gently curving jawlines and cheekbones as the widest feature.",
        recommendation: {
          summary: "Maintain natural facial harmony with soft definition.",
          contouring:
            "Light contour under the cheekbones to emphasize natural bone structure. No heavy jaw contouring needed.",
          blush:
            "Sweep blush upwards from the apples of the cheeks toward the temples for a lifted effect.",
          highlighter:
            "Highlight the bridge of the nose, Cupid’s bow, and high points of cheekbones.",
          suitableProducts: [
            "Cream contour stick (neutral undertone)",
            "Luminous satin blush",
            "Champagne liquid highlighter",
          ],
        },
        semanticKeywords: [
          "natural contour",
          "satin blush",
          "cheekbone lift",
          "liquid highlighter",
          "balanced sculpting",
        ],
      };

    case "Round":
      return {
        description:
          "The Round face features equal length and width with soft, curved cheekbones and jawline, lacking sharp angles.",
        recommendation: {
          summary: "Create elongation and structured angles.",
          contouring:
            "Contour along the temples, under the cheekbones, and along the jawline to create shadow and dimension.",
          blush:
            "Apply blush in an angular diagonal motion from cheekbones toward temples to draw the eye vertically.",
          highlighter:
            "Focus highlighter on the center of the forehead, nose bridge, and chin center to vertically lengthen the face.",
          suitableProducts: [
            "Matte bronzing powder",
            "Sculpting contour stick",
            "Angled blush brush",
            "Finely-milled powder highlighter",
          ],
        },
        semanticKeywords: [
          "matte bronzer",
          "jawline contour",
          "elongating blush",
          "sculpting powder",
          "dimension bronzer",
        ],
      };

    case "Square":
      return {
        description:
          "The Square face is characterized by a strong, angular jawline with forehead, cheekbones, and jaw having nearly identical widths.",
        recommendation: {
          summary: "Soften strong jaw angles and add warmth to the center.",
          contouring:
            "Shade the corners of the jaw and sides of the forehead to visually soften angular edges.",
          blush:
            "Apply blush in soft circular motions directly onto the apples of the cheeks to soften structured bone lines.",
          highlighter:
            "Apply in a soft C-shape around the outer eye and top of cheekbones.",
          suitableProducts: [
            "Soft blending contour cream",
            "Rosy peach powder blush",
            "Dewy cream highlighter",
          ],
        },
        semanticKeywords: [
          "soften jawline",
          "cream contour",
          "apple blush",
          "diffused bronzer",
          "dewy highlighter",
        ],
      };

    case "Heart":
      return {
        description:
          "The Heart face features a wider forehead and prominent cheekbones that sharply taper into a slender, pointed chin.",
        recommendation: {
          summary: "Balance the upper forehead width and soften the narrow chin apex.",
          contouring:
            "Contour the temples and sides of the forehead to visually reduce width, with a touch under the tip of the chin.",
          blush:
            "Apply blush slightly lower on the cheekbones and blend horizontally outwards to widen the midface.",
          highlighter:
            "Highlight the center of the chin and jawline curve to add visual fullness to the lower third.",
          suitableProducts: [
            "Matte contour palette",
            "Terracotta blush",
            "Hydrating strobe cream",
          ],
        },
        semanticKeywords: [
          "temple contour",
          "horizontal blush",
          "chin softening",
          "matte sculpting",
          "strobe cream",
        ],
      };

    case "Diamond":
      return {
        description:
          "The Diamond face features dramatically prominent, wide cheekbones accompanied by a narrow forehead and slender, tapered jawline.",
        recommendation: {
          summary: "Draw attention inward and soften sharp cheekbone projection.",
          contouring:
            "Contour only the outermost tips of the cheekbones; avoid contouring temples or jawline.",
          blush:
            "Keep blush on the apples of the cheeks rather than dragging it to the temples.",
          highlighter:
            "Highlight the center of the forehead and the center of the chin to create balance.",
          suitableProducts: [
            "Subtle contour balm",
            "Warm berry blush",
            "Soft-focus illuminator",
          ],
        },
        semanticKeywords: [
          "cheekbone softening",
          "apple blush placement",
          "forehead highlight",
          "subtle contour balm",
        ],
      };

    case "Oblong":
      return {
        description:
          "The Oblong face has noticeable vertical length with straight sides and gentle curvature around the chin and hairline.",
        recommendation: {
          summary: "Visually shorten the vertical face axis and add horizontal width.",
          contouring:
            "Dust bronzer across the top of the hairline and across the very bottom of the chin to create vertical boundaries.",
          blush:
            "Sweep blush horizontally across the apples toward the ears to widen the visual plane.",
          highlighter:
            "Apply highlighter along cheekbones horizontally; avoid highlighting forehead center or chin tip.",
          suitableProducts: [
            "Sun-kissed bronzer",
            "Wide fan blush",
            "Pressed pearl highlighter",
          ],
        },
        semanticKeywords: [
          "hairline bronzer",
          "chin contour",
          "horizontal blush",
          "widening contour",
          "warm bronzer",
        ],
      };

    case "Rectangle":
      return {
        description:
          "The Rectangle face combines vertical elongation with a distinct, angular jawline and broad forehead.",
        recommendation: {
          summary: "Soften strong jaw angles while moderating facial length.",
          contouring:
            "Contour along the hairline, jawline corners, and chin tip to soften square edges and visually compact length.",
          blush:
            "Apply blush in rounded sweeps across the middle cheek area.",
          highlighter:
            "Highlight upper cheekbones with soft, diffused finishes.",
          suitableProducts: [
            "Dual-shade contour powder",
            "Muted mauve blush",
            "Subtle glow highlighter",
          ],
        },
        semanticKeywords: [
          "square jaw contour",
          "hairline shading",
          "mauve blush",
          "sculpting powder",
          "diffused glow",
        ],
      };
  }
}
