/**
 * Skincare Routine Generation Engine.
 * Clinically informed dermatological regimens based on user skin profile,
 * detected undertones, sebum/erythema conditions, and target concerns.
 */

export type SkinType = "Oily" | "Dry" | "Combination" | "Normal" | "Sensitive";

export type SkinConcern =
  | "Acne & Blemishes"
  | "Dark Spots & Hyperpigmentation"
  | "Redness & Sensitivity"
  | "Dullness & Uneven Texture"
  | "Fine Lines & Anti-Aging"
  | "Dehydration & Flakiness";

export interface RoutineStep {
  stepNumber: number;
  phase: "AM" | "PM";
  stepName: string;
  category: string;
  purpose: string;
  keyIngredients: string[];
  usageTip: string;
  recommendedProductId?: string;
}

export interface PersonalizedSkincarePlan {
  skinType: SkinType;
  concerns: SkinConcern[];
  amRoutine: RoutineStep[];
  pmRoutine: RoutineStep[];
  heroIngredients: string[];
  weeklyTreatments: string[];
  safetyNotes: string[];
}

export function generateSkincareRoutine(
  skinType: SkinType,
  concerns: SkinConcern[] = []
): PersonalizedSkincarePlan {
  const isOilyOrComb = skinType === "Oily" || skinType === "Combination";
  const isDry = skinType === "Dry";
  const isSensitive = skinType === "Sensitive" || concerns.includes("Redness & Sensitivity");
  const hasAcne = concerns.includes("Acne & Blemishes");
  const hasPigmentation = concerns.includes("Dark Spots & Hyperpigmentation");
  const hasDullness = concerns.includes("Dullness & Uneven Texture");
  const hasAging = concerns.includes("Fine Lines & Anti-Aging");
  const hasDehydration = concerns.includes("Dehydration & Flakiness");

  // Hero ingredients compilation
  const heroIngredients: string[] = [];
  if (isOilyOrComb || hasAcne) heroIngredients.push("2% Salicylic Acid (BHA)", "10% Niacinamide + Zinc");
  if (isDry || hasDehydration) heroIngredients.push("Multi-Molecular Hyaluronic Acid", "Ceramides (1, 3, 6-II)");
  if (hasPigmentation || hasDullness) heroIngredients.push("15% L-Ascorbic Acid (Vitamin C)", "Alpha Arbutin");
  if (hasAging) heroIngredients.push("Encapsulated Retinol 0.3%", "Multi-Peptides");
  if (isSensitive) heroIngredients.push("Centella Asiatica (Cica)", "Colloidal Oatmeal");

  // ---------------- AM ROUTINE ----------------
  const amRoutine: RoutineStep[] = [
    {
      stepNumber: 1,
      phase: "AM",
      stepName: isOilyOrComb ? "Clarifying Foaming Cleanser" : "Gentle Hydrating Cleanser",
      category: "Cleanser",
      purpose: "Rinses overnight metabolic oils and debris without compromising the skin moisture barrier.",
      keyIngredients: isOilyOrComb ? ["Zinc PCA", "Mild Surfactants"] : ["Ceramides", "Glycerin"],
      usageTip: "Lather with lukewarm water for 45-60 seconds; avoid scrubbing delicate eye areas.",
      recommendedProductId: isOilyOrComb ? "prod-skin-01" : "prod-skin-04",
    },
    {
      stepNumber: 2,
      phase: "AM",
      stepName: hasDullness || hasPigmentation
        ? "Vitamin C 15% Antioxidant Serum"
        : hasAcne || isOilyOrComb
        ? "Niacinamide 10% + Zinc Sebum Regulating Serum"
        : "Hyaluronic Acid 2% + B5 Deep Hydration Serum",
      category: "Treatment Serum",
      purpose: hasDullness || hasPigmentation
        ? "Neutralizes UV-induced free radicals and diminishes dark melanin spots."
        : hasAcne || isOilyOrComb
        ? "Regulates T-zone sebaceous gland activity and soothes surface erythema."
        : "Draws atmospheric moisture into the stratum corneum to plump skin contours.",
      keyIngredients: hasDullness || hasPigmentation
        ? ["L-Ascorbic Acid", "Ferulic Acid"]
        : hasAcne || isOilyOrComb
        ? ["Niacinamide", "Zinc PCA"]
        : ["Hyaluronic Acid", "Pro-Vitamin B5"],
      usageTip: "Apply 3-4 drops to freshly cleansed, slightly damp skin and pat gently until absorbed.",
      recommendedProductId: hasDullness || hasPigmentation ? "prod-skin-06" : isOilyOrComb ? "prod-skin-02" : "prod-skin-03",
    },
    {
      stepNumber: 3,
      phase: "AM",
      stepName: isOilyOrComb ? "Oil-Free Lightweight Gel-Moisturizer" : "Ceramide Barrier Restorative Cream",
      category: "Moisturizer",
      purpose: "Locks in serum actives and forms an invisible cushion preventing transepidermal water loss (TEWL).",
      keyIngredients: isOilyOrComb ? ["Hyaluronic Acid", "Green Tea"] : ["Ceramides", "Lipids", "Cholesterol"],
      usageTip: "Smooth a pea-sized amount over face and neck with upward strokes.",
      recommendedProductId: "prod-skin-04",
    },
    {
      stepNumber: 4,
      phase: "AM",
      stepName: isOilyOrComb ? "Matte Dry-Touch Oil-Control SPF 50+" : "Hydrating Invisible Sunscreen SPF 50+",
      category: "Sunscreen",
      purpose: "Non-negotiable daily photoprotection against UVA/UVB aging rays and hyperpigmentation darkening.",
      keyIngredients: ["Broad Spectrum Chemical / Mineral Filters", "Silica / Perlite"],
      usageTip: "Apply two finger lengths 15 minutes before sun exposure; creates an ideal non-greasy makeup primer.",
      recommendedProductId: "prod-skin-05",
    },
  ];

  // ---------------- PM ROUTINE ----------------
  const pmRoutine: RoutineStep[] = [
    {
      stepNumber: 1,
      phase: "PM",
      stepName: "Melt Cleansing Balm or Micellar Water",
      category: "First Cleanse",
      purpose: "Breaks down waterproof cosmetic pigment, stubborn contour sticks, and mineral sunscreen filters.",
      keyIngredients: ["Squalane", "Emulsifying Jojoba Esters"],
      usageTip: "Massage onto dry skin for 60 seconds until makeup dissolves, then emulsify with warm water.",
    },
    {
      stepNumber: 2,
      phase: "PM",
      stepName: "Gentle Ph-Balanced Water Cleanser",
      category: "Second Cleanse",
      purpose: "Removes water-soluble micro-particles without stripping epidermal lipid layers.",
      keyIngredients: ["Amino Acid Surfactants", "Panthenol"],
      usageTip: "Gently wash residue away; pat dry with a clean microfiber towel.",
    },
    {
      stepNumber: 3,
      phase: "PM",
      stepName: hasAcne || isOilyOrComb
        ? "2% BHA Salicylic Acid Exfoliating Treatment"
        : hasAging
        ? "Encapsulated Retinol 0.3% Cellular Renewal Serum"
        : hasPigmentation
        ? "Alpha Arbutin + Tranexamic Acid Brightening Complex"
        : "Multi-Peptide + Ceramide Recovery Serum",
      category: "Active Treatment",
      purpose: hasAcne || isOilyOrComb
        ? "Lipophilic exfoliant dissolves oil plugs deep within pores to prevent comedones."
        : hasAging
        ? "Stimulates nocturnal collagen synthesis and accelerates keratinocyte cell turnover."
        : "Inhibits tyrosinase enzyme activity to fade persistent post-inflammatory marks.",
      keyIngredients: hasAcne || isOilyOrComb
        ? ["Salicylic Acid (BHA)", "Green Tea Extract"]
        : hasAging
        ? ["Retinol", "Bakuchiol", "Squalane"]
        : ["Tranexamic Acid", "Licorice Root Extract"],
      usageTip: "Use 2-3 nights per week initially to build epidermal tolerance; follow with rich moisturizer.",
      recommendedProductId: hasAcne || isOilyOrComb ? "prod-skin-01" : "prod-skin-02",
    },
    {
      stepNumber: 4,
      phase: "PM",
      stepName: "Ceramide Barrier Repair Overnight Cream",
      category: "Night Cream",
      purpose: "Replenishes skin barrier lipids during the nocturnal cellular restoration window.",
      keyIngredients: ["Ceramides 1, 3, 6-II", "Phytosphingosine", "Hyaluronic Acid"],
      usageTip: "Press gently into skin as the final sealing step before sleep.",
      recommendedProductId: "prod-skin-04",
    },
  ];

  // Weekly treatments
  const weeklyTreatments: string[] = [
    hasAcne || isOilyOrComb
      ? "Kaolin / Bentonite Clay Clarifying Mask (1x weekly for 10 minutes to absorb excess sebum)"
      : "Deep Hydrating Overnight Sheet / Gel Mask (2x weekly for intense moisture recharge)",
    hasAging
      ? "Peptide & Bakuchiol Firming Sleep Pack (2 nights weekly on non-retinol nights)"
      : "Gentle Enzyme / PHA Polishing Treatment (1x weekly to slough dead surface flakes)",
  ];

  // Dermatological safety notes
  const safetyNotes: string[] = [
    "Never combine pure Vitamin C (L-Ascorbic Acid) and strong Retinoids in the exact same application layer — use Vitamin C in AM and Retinol in PM.",
    "Always apply broad-spectrum SPF 50+ daily, especially when using chemical exfoliants (BHA/AHA) or Retinol which increase photosensitivity.",
    "Introduce new active treatments one at a time, spaced 14 days apart, to monitor dermal tolerance.",
  ];

  return {
    skinType,
    concerns,
    amRoutine,
    pmRoutine,
    heroIngredients,
    weeklyTreatments,
    safetyNotes,
  };
}
