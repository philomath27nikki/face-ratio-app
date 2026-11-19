/**
 * Comprehensive Anthropometric Styling, Placement & Beauty Blueprint.
 * Maps 7 facial shapes and colorimetric undertones to actionable,
 * high-utility makeup placement techniques, hairstyle guides, and eyewear recommendations.
 */

import { FaceShape } from "./faceShape";

export interface PlacementZone {
  zoneName: string;
  category: "Contour" | "Blush" | "Highlighter" | "Brows" | "Eyes";
  targetRegion: string;
  brushTechnique: string;
  placementRule: string;
  proTip: string;
  avoidRule: string;
}

export interface StylingBlueprint {
  shape: FaceShape;
  opticalGoal: string;
  zones: PlacementZone[];
  hairstyles: {
    recommended: string[];
    avoid: string[];
    reason: string;
  };
  eyewear: {
    recommendedFrames: string[];
    avoidFrames: string[];
    balanceReason: string;
  };
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  colorHarmonization: {
    warm: { contour: string; blush: string; highlight: string; lips: string };
    cool: { contour: string; blush: string; highlight: string; lips: string };
    neutral: { contour: string; blush: string; highlight: string; lips: string };
  };
}

export const STYLING_BLUEPRINTS: Record<FaceShape, StylingBlueprint> = {
  Round: {
    shape: "Round",
    opticalGoal: "Create vertical facial elongation and chiseled shadow angles to narrow wide bizygomatic cheek width.",
    zones: [
      {
        zoneName: "Cheek Hollow Sculpting",
        category: "Contour",
        targetRegion: "From tragus (ear canal) angled downwards toward the corner of the mouth, stopping 2 finger-widths away.",
        brushTechnique: "Angular angled contour brush, sweeping downward-to-upward in short buffing strokes.",
        placementRule: "Keep shadow tight in the natural hollow beneath the zygomatic arch; never drag below jaw line.",
        proTip: "Use an ash-cool matte stick to simulate real biological bone shadow, not orange bronzer.",
        avoidRule: "Do not apply contour in circular motions or low around the chin.",
      },
      {
        zoneName: "Lateral Mandibular Angle",
        category: "Contour",
        targetRegion: "Along the bottom ridge of the jawline from the earlobe to the lateral chin.",
        brushTechnique: "Firm dense stippling brush, blending downward into the neck.",
        placementRule: "Carves out a sharper distinction between the lower face and neck, creating the illusion of an angular jaw.",
        proTip: "Dust translucent setting powder directly above the contour line to create a razor-sharp demarcation.",
        avoidRule: "Do not let shadow sit on top of the jaw bone where light naturally strikes.",
      },
      {
        zoneName: "High 45° Blush Drape",
        category: "Blush",
        targetRegion: "Upper perimeter of the cheekbone, blending upwards and outwards into the temples.",
        brushTechnique: "Fluffy tapered blush brush in strict upward 45-degree diagonal sweeps.",
        placementRule: "Keep blush on the upper diagonal plane to draw the viewer's gaze vertically upward.",
        proTip: "Pair with a liquid or matte formula that locks in place without creating round cheek bulb reflections.",
        avoidRule: "Strictly avoid placing blush on the round apples of the cheeks, which emphasizes circular width.",
      },
      {
        zoneName: "Vertical Centerline Strobing",
        category: "Highlighter",
        targetRegion: "Center of forehead, narrow strip down the bridge of the nose, Cupid’s bow, and center point of chin.",
        brushTechnique: "Small precision fan brush or fingertip tap.",
        placementRule: "Restricting illumination strictly to the vertical midline draws focal visual attention inward and upward.",
        proTip: "Keep nose highlight to a delicate pencil-thin line; do not widen the tip.",
        avoidRule: "Avoid highlighting the high outer cheekbones, which expands horizontal facial width.",
      },
      {
        zoneName: "High Structured Brow Arch",
        category: "Brows",
        targetRegion: "Peak of the eyebrow arch directly above the outer third of the iris.",
        brushTechnique: "Micro precision pencil defining a crisp, high apex.",
        placementRule: "A sharp, high arch breaks up the circular curves of the face and introduces immediate vertical architecture.",
        proTip: "Brush brow hairs vertically upward with clear wax or pomade.",
        avoidRule: "Avoid flat horizontal or rounded semi-circle brow shapes.",
      },
    ],
    hairstyles: {
      recommended: [
        "Long layered cuts falling below collarbone",
        "Deep side-swept bangs that create diagonal lines",
        "Textured lob (long bob) with volume at the crown",
        "High ponytails or messy buns with vertical height",
      ],
      avoid: [
        "Blunt chin-length bobs that hug the jawline",
        "Heavy straight-across micro-bangs",
      ],
      reason: "Vertical length and crown volume elongate the silhouette; side-swept angles cut across round symmetry.",
    },
    eyewear: {
      recommendedFrames: ["Rectangular & Square frames", "Angular Cat-eye frames", "Geometric hexagonal frames"],
      avoidFrames: ["Small circular frames", "Rimless round wire glasses"],
      balanceReason: "Sharp geometric angles introduce contrast against soft curved facial contours.",
    },
    dosAndDonts: {
      dos: [
        "Emphasize diagonal lines in blush, eyeliner, and hair parting.",
        "Add volume at the top/crown of your hair to visually lengthen the head.",
        "Use matte contour formulas that absorb light to carve natural hollows.",
      ],
      donts: [
        "Don't smile and place blush on the round apples of your cheeks.",
        "Don't use shimmery bronzers on cheek sides where you need shadows.",
        "Don't cut blunt straight bangs across your forehead.",
      ],
    },
    colorHarmonization: {
      warm: { contour: "Cool-Neutral Taupe Stick", blush: "Warm Spiced Terracotta", highlight: "Pale Champagne Gold", lips: "Warm Cinnamon Nude" },
      cool: { contour: "Ash Gray-Brown Sculpt Stick", blush: "Deep Berry Rose", highlight: "Icy Moonlit Pearl", lips: "Plum Rose Tint" },
      neutral: { contour: "Soft Mocha Powder", blush: "Soft Peachy Rose", highlight: "Candlelit Beige Sheen", lips: "Neutral Rosewood" },
    },
  },

  Square: {
    shape: "Square",
    opticalGoal: "Soften structured mandibular jaw corners and harmonize forehead-to-jaw width with gentle, rounded transitions.",
    zones: [
      {
        zoneName: "Mandibular Angle Shading",
        category: "Contour",
        targetRegion: "The lateral gonial angle of the jawbone, directly beneath the earlobe curving under the jaw.",
        brushTechnique: "Fluffy angled bronzer brush in gentle circular buffing motions.",
        placementRule: "Shade the outermost angular corners of the lower jaw to round off the sharp 90-degree corner illusion.",
        proTip: "Blend down onto the submental neck area to eliminate any harsh edge lines.",
        avoidRule: "Avoid sharp, thin contour lines which only accentuate the jaw boxiness.",
      },
      {
        zoneName: "Forehead Lateral Temples",
        category: "Contour",
        targetRegion: "Upper corners of the forehead along the hairline above the temples.",
        brushTechnique: "Soft sweeping motions rounding the perimeter.",
        placementRule: "Minimizes the horizontal width of the square hairline, rounding the upper third.",
        proTip: "Work remaining product from your brush into the root line of the hair.",
        avoidRule: "Don't shade the center forehead where natural light belongs.",
      },
      {
        zoneName: "Apples-of-Cheeks Softening",
        category: "Blush",
        targetRegion: "Directly on the rounded apples of the cheeks in soft circular sweeps.",
        brushTechnique: "Large round blush brush with diffused natural bristles.",
        placementRule: "Rounded blush circles soften the harsh linear angles of square bone structure and infuse youthfulness.",
        proTip: "Smile gently while dusting color to identify the central prominence.",
        avoidRule: "Don't apply blush in severe linear diagonal slashes.",
      },
      {
        zoneName: "C-Shape Cheek & Brow Glow",
        category: "Highlighter",
        targetRegion: "Curved C-shape from the brow bone around the orbital rim onto the top of cheekbones.",
        brushTechnique: "Diffused fan brush with featherlight pressure.",
        placementRule: "Curved light reflections counteract geometric facial lines.",
        proTip: "Use liquid or cream formulas for a luminous second-skin glow without chalky lines.",
        avoidRule: "Avoid highlighting sharp jaw points.",
      },
      {
        zoneName: "Soft Curved Eyebrows",
        category: "Brows",
        targetRegion: "Gentle arch with a softly rounded apex.",
        brushTechnique: "Tinted brow pomade or powder blended with a spoolie.",
        placementRule: "Soft curves above the eyes balance sharp angles along the jawline.",
        proTip: "Keep brows medium full and feathery rather than stencil-sharp.",
        avoidRule: "Avoid harsh, sharp 90-degree high-angle eyebrow peaks.",
      },
    ],
    hairstyles: {
      recommended: [
        "Soft curtain bangs that frame the jawline",
        "Wavy shoulder-length cuts with soft layers",
        "Side part with beachy, fluid waves",
        "Wispy face-framing tendrils when tying hair back",
      ],
      avoid: [
        "Blunt angular jaw-length bobs",
        "Severe slicked-back center-part ponytails with no tendrils",
      ],
      reason: "Fluid waves and wispy layers break up the rigid horizontal line of the jaw.",
    },
    eyewear: {
      recommendedFrames: ["Round and oval wire frames", "Curved cat-eye frames", "Butterly frames"],
      avoidFrames: ["Thick boxy square frames", "Harsh rectangular readers"],
      balanceReason: "Curvilinear frames contrast with square jawlines, drawing focus upward to the eyes.",
    },
    dosAndDonts: {
      dos: [
        "Use rounded, circular motions when blending blush and bronzer.",
        "Embrace waves, curls, and soft face-framing layers in hair styling.",
        "Highlight the center of the face with radiant, diffused textures.",
      ],
      donts: [
        "Don't sculpt sharp, dark geometric contour stripes on your cheeks.",
        "Don't wear square-rimmed sunglasses that sit wide on the jawline.",
        "Don't tweeze eyebrows into severe sharp geometric angles.",
      ],
    },
    colorHarmonization: {
      warm: { contour: "Golden Honey Bronzer", blush: "Luminous Peach Sorbet", highlight: "Warm Champagne Sheen", lips: "Coral Rose Satin" },
      cool: { contour: "Muted Sandalwood", blush: "Soft Mauve Rose", highlight: "Opal Glow", lips: "Dusty Plum" },
      neutral: { contour: "Natural Bisque Tan", blush: "Petal Pink", highlight: "Radiant Dewdrop", lips: "Velvet Nude" },
    },
  },

  Oval: {
    shape: "Oval",
    opticalGoal: "Preserve and highlight naturally harmonious 1.5:1 facial proportions with seamless, radiant dimensional enhancement.",
    zones: [
      {
        zoneName: "Subtle Zygomatic Accentuation",
        category: "Contour",
        targetRegion: "Light shading right beneath the middle of the cheekbones.",
        brushTechnique: "Soft sweeping motions along natural cheek hollow.",
        placementRule: "No structural correction needed; simply enhance natural bone architecture.",
        proTip: "A sheer bronzing tint is sufficient; avoid heavy full-coverage contour sticks.",
        avoidRule: "Do not over-contour the forehead or jaw.",
      },
      {
        zoneName: "Classic Uplift Blush",
        category: "Blush",
        targetRegion: "Start at the apples and blend gently upwards toward the temples.",
        brushTechnique: "Soft oval swirling motion with a medium blush brush.",
        placementRule: "Enhances the natural graceful cheek curve.",
        proTip: "Layer cream blush under a micro-powder blush for a 14-hour airbrushed flush.",
        avoidRule: "Avoid dragging blush too close to the nose.",
      },
      {
        zoneName: "High Point Candlelight Reflection",
        category: "Highlighter",
        targetRegion: "Tops of cheekbones, tip of the nose, and Cupid's bow.",
        brushTechnique: "Light tapping with ring finger or fluffy setting brush.",
        placementRule: "Catches ambient light on natural facial prominence.",
        proTip: "Use liquid highlighter mixed with moisturizer for effortless radiance.",
        avoidRule: "Avoid over-powdering the T-zone.",
      },
      {
        zoneName: "Natural Soft Arch",
        category: "Brows",
        targetRegion: "Follow natural orbital bone curve with a soft arch.",
        brushTechnique: "Light hair-like micro-strokes with a fine tip pencil.",
        placementRule: "Complements proportional eye and forehead spacing.",
        proTip: "Set with clear styling gel brushed in the natural direction of growth.",
        avoidRule: "Avoid over-extending the brow tail downwards.",
      },
    ],
    hairstyles: {
      recommended: [
        "Versatile — almost any haircut flatters an oval face",
        "Long sleek layers with center or side part",
        "Textured classic bob or lob",
        "Curtain bangs, wispy bangs, or slicked back styles",
      ],
      avoid: [
        "Extremely heavy bangs that completely hide the forehead balance",
      ],
      reason: "Proportional symmetry allows great flexibility across cuts, lengths, and textures.",
    },
    eyewear: {
      recommendedFrames: ["Wayfarers", "Aviators", "Classic Cat-Eye", "Geometric or round frames"],
      avoidFrames: ["Oversized frames that extend far beyond cheekbone width"],
      balanceReason: "Frames that match the width of the face preserve natural symmetry.",
    },
    dosAndDonts: {
      dos: [
        "Focus on skin-first radiance and dewy, healthy skin finishes.",
        "Experiment with versatile lip and eye color palettes.",
        "Follow your natural bone structure when shading and illuminating.",
      ],
      donts: [
        "Don't over-correct with heavy theatrical contouring.",
        "Don't drag brow tails downward past outer eye corners.",
      ],
    },
    colorHarmonization: {
      warm: { contour: "Warm Amber Bronzer", blush: "Sunlit Peach", highlight: "Champagne Glow", lips: "Warm Apricot Nude" },
      cool: { contour: "Cool Taupe Tint", blush: "Soft Carnation", highlight: "Moonstone Pearl", lips: "Rose Nude" },
      neutral: { contour: "Neutral Tan Balm", blush: "Ballet Slipper Pink", highlight: "Candlelit Sheen", lips: "Natural Rosy Brown" },
    },
  },

  Heart: {
    shape: "Heart",
    opticalGoal: "Balance broad forehead and prominent temples while adding visual softness and fullness to the tapered chin apex.",
    zones: [
      {
        zoneName: "Lateral Forehead & Temple Receding",
        category: "Contour",
        targetRegion: "Sides of forehead, temples, and upper hairline.",
        brushTechnique: "Curved sweeps along the temporal hairline.",
        placementRule: "Visually reduces the horizontal width of the upper third of the face.",
        proTip: "Blend seamlessly into the hairline to avoid any telltale demarcation lines.",
        avoidRule: "Never contour the narrow jawline or chin corners.",
      },
      {
        zoneName: "Mid-Cheek Horizontal Balancing",
        category: "Blush",
        targetRegion: "Slightly lower on the cheekbones, blending outward in a soft horizontal direction.",
        brushTechnique: "Soft horizontal sweeps across middle cheeks.",
        placementRule: "Horizontal blush adds visual fullness to the mid-face, balancing the tapered chin.",
        proTip: "Use satin-finish peach or coral shades to reflect gentle light.",
        avoidRule: "Avoid dragging blush down to the mouth.",
      },
      {
        zoneName: "Chin Apex Fullness",
        category: "Highlighter",
        targetRegion: "Center point of the chin and along the narrow jaw curve.",
        brushTechnique: "Targeted dot application blended outward.",
        placementRule: "Light creates optical volume, making a sharp pointed chin appear softer and fuller.",
        proTip: "Apply a tiny dot of cream highlighter to the center of the bottom lip.",
        avoidRule: "Avoid highlighting the temples or upper forehead.",
      },
      {
        zoneName: "Soft Rounded Brow Apex",
        category: "Brows",
        targetRegion: "Rounded, soft-curved brow with slightly softened tail.",
        brushTechnique: "Soft powder fill with spoolie blending.",
        placementRule: "Gentle curves soften the angularity of the sharp chin.",
        proTip: "Keep brows natural and slightly spaced at the center.",
        avoidRule: "Avoid severely sharp high arches that accentuate heart points.",
      },
    ],
    hairstyles: {
      recommended: [
        "Chin-length bobs that add volume around the narrow jaw",
        "Shoulder-length waves with layers kicking out at the chin",
        "Side-swept bangs that break up wide forehead width",
        "Pixie cut with soft side-swept fringe",
      ],
      avoid: [
        "Heavy top-volume buns with slicked back sides",
        "Severe short cuts with volume focused only at the temples",
      ],
      reason: "Volume around the jawline balances the width of the forehead.",
    },
    eyewear: {
      recommendedFrames: ["Bottom-heavy frames", "Light wire frames", "Oval & round glasses", "Subtle cat-eye"],
      avoidFrames: ["Top-heavy oversized embellished browline glasses"],
      balanceReason: "Frames with bottom detail create harmony with the narrow jawline.",
    },
    dosAndDonts: {
      dos: [
        "Shade the temples to visually slim the upper face.",
        "Add volume to hair around the chin and neck area.",
        "Highlight the center of the chin to soften its point.",
      ],
      donts: [
        "Don't contour your jawline — it's already slender.",
        "Don't wear hair pulled tightly straight back with zero framing.",
      ],
    },
    colorHarmonization: {
      warm: { contour: "Golden Sand Sculpt", blush: "Fresh Coral Melon", highlight: "Honeyed Pearl", lips: "Warm Guava Glaze" },
      cool: { contour: "Soft Ash Shading", blush: "Petal Rose", highlight: "Frosted Lilac", lips: "Cool Berry Pink" },
      neutral: { contour: "Neutral Almond", blush: "Soft Poppy", highlight: "Sunbeam Veil", lips: "Nude Blossom" },
    },
  },

  Diamond: {
    shape: "Diamond",
    opticalGoal: "Draw focal attention inward toward facial center, softening prominent wide cheekbones and harmonizing narrow forehead and chin.",
    zones: [
      {
        zoneName: "Outer Cheekbone Tapering",
        category: "Contour",
        targetRegion: "Outermost projection of the cheekbones near the hairline.",
        brushTechnique: "Short targeted buffing on the zygomatic apex only.",
        placementRule: "Reduces extreme horizontal cheekbone width without hollowing out the face.",
        proTip: "Keep contour strictly on the outer curve; do not bring it under the cheek towards mouth.",
        avoidRule: "Do not contour narrow forehead or narrow jawline.",
      },
      {
        zoneName: "Central Apple Flush",
        category: "Blush",
        targetRegion: "Center apples of the cheeks only, blending softly inward.",
        brushTechnique: "Gentle circular buffing on central cheeks.",
        placementRule: "Keeps color centered, drawing the eye away from wide outer cheek points.",
        proTip: "Use liquid cream blush for a natural, diffused flush.",
        avoidRule: "Avoid sweeping blush out to the hairline.",
      },
      {
        zoneName: "Forehead & Chin Apex Expansion",
        category: "Highlighter",
        targetRegion: "Center of forehead and center of chin.",
        brushTechnique: "Circular buffing with setting brush.",
        placementRule: "Draws visual width into the narrow upper and lower thirds.",
        proTip: "Use a soft-focus radiant powder rather than glitter strobing.",
        avoidRule: "Strictly avoid highlighting the high outer cheekbone points.",
      },
    ],
    hairstyles: {
      recommended: [
        "Medium-length waves with volume at the chin and neck",
        "Wispy side-swept fringe that widens the forehead",
        "Textured shoulder-length lob with soft curtain bangs",
      ],
      avoid: [
        "Slicked back hair with extreme cheekbone exposure and zero framing",
        "Short cuts with heavy volume only at the cheek level",
      ],
      reason: "Fullness at the chin and forehead balances wide zygomatic cheek architecture.",
    },
    eyewear: {
      recommendedFrames: ["Oval & round frames", "Cat-eye glasses with curved brow lines", "Rimless glasses"],
      avoidFrames: ["Pointy geometric frames that exceed cheek width"],
      balanceReason: "Curved frames soften high cheek angles.",
    },
    dosAndDonts: {
      dos: [
        "Keep blush focused centrally on the apples.",
        "Highlight forehead and chin center to expand narrow points.",
        "Use wispy fringe to frame narrow temples.",
      ],
      donts: [
        "Don't highlight the tips of your cheekbones.",
        "Don't contour your temples or jawline.",
      ],
    },
    colorHarmonization: {
      warm: { contour: "Warm Biscuit", blush: "Spiced Apricot", highlight: "Pale Gold Nectar", lips: "Warm Peach Satin" },
      cool: { contour: "Cool Stone Grey", blush: "Vintage Rose", highlight: "Chilled Pearl", lips: "Dusty Berry" },
      neutral: { contour: "Soft Mocha", blush: "Rosy Nude", highlight: "Cashmere Glow", lips: "Rose Petal" },
    },
  },

  Oblong: {
    shape: "Oblong",
    opticalGoal: "Visually shorten the vertical face axis and introduce horizontal width across cheeks and jawline.",
    zones: [
      {
        zoneName: "Upper Hairline Boundary",
        category: "Contour",
        targetRegion: "Straight across the top of the hairline and temples.",
        brushTechnique: "Broad horizontal sweeps across upper forehead.",
        placementRule: "Creates a visual ceiling that reduces perceived vertical forehead height.",
        proTip: "Blend into the hair roots thoroughly.",
        avoidRule: "Do not leave forehead center unshaded if forehead third is elongated.",
      },
      {
        zoneName: "Lower Chin Tip Compact",
        category: "Contour",
        targetRegion: "Directly under and across the very tip of the chin.",
        brushTechnique: "Horizontal sweep under the chin ridge.",
        placementRule: "Creates a bottom boundary that visually shortens the lower third.",
        proTip: "Use matte powder with cool ash undertone.",
        avoidRule: "Avoid highlighting chin tip.",
      },
      {
        zoneName: "Horizontal Cheek Drape",
        category: "Blush",
        targetRegion: "Directly horizontal from center cheek toward the earlobe.",
        brushTechnique: "Flat horizontal fan strokes across the cheeks.",
        placementRule: "Breaks up the long vertical plane by creating a horizontal cross-axis.",
        proTip: "A touch across the bridge of the nose creates a healthy, face-widening sun-kissed look.",
        avoidRule: "Avoid angular upward 45° blush sweeps which elongate the face further.",
      },
      {
        zoneName: "Straight Flat Brows",
        category: "Brows",
        targetRegion: "Horizontal, straight brows with minimal arch height.",
        brushTechnique: "Fill bottom line of brow horizontally; soften upper peak.",
        placementRule: "Horizontal brow lines cut across vertical facial height.",
        proTip: "Korean-style straight fluffy brows work wonders on oblong face geometry.",
        avoidRule: "Avoid steep high arches that draw the eye upward.",
      },
    ],
    hairstyles: {
      recommended: [
        "Full straight-across blunt bangs or curtain fringe",
        "Shoulder-length bobs with voluminous side waves",
        "Curled styles with horizontal width through the sides",
      ],
      avoid: [
        "Extremely long straight hair with no layers",
        "High top-knot buns or pompadours with vertical height",
      ],
      reason: "Bangs conceal vertical forehead length while side volume expands width.",
    },
    eyewear: {
      recommendedFrames: ["Tall oversized square or round frames", "Frames with decorative temples", "Aviators"],
      avoidFrames: ["Narrow, short rectangular wire frames"],
      balanceReason: "Taller lenses break up vertical length and occupy facial height.",
    },
    dosAndDonts: {
      dos: [
        "Embrace full or curtain bangs to immediately reduce face length.",
        "Apply blush horizontally across the cheeks and bridge of nose.",
        "Wear tall eyewear frames that take up vertical space.",
      ],
      donts: [
        "Don't wear sky-high hair volume on the top of your head.",
        "Don't highlight the bridge of your nose down to the chin tip.",
        "Don't sculpt vertical diagonal contour lines.",
      ],
    },
    colorHarmonization: {
      warm: { contour: "Rich Amber Toffee", blush: "Warm Terracotta Sun", highlight: "Honey Sheen", lips: "Canyon Rose" },
      cool: { contour: "Muted Cedar Ash", blush: "Berry Sorbet", highlight: "Frosted Quartz", lips: "Plum Dahlia" },
      neutral: { contour: "Soft Clay Tan", blush: "Warm Mauve", highlight: "Luminous Silk", lips: "Bare Rose" },
    },
  },

  Rectangle: {
    shape: "Rectangle",
    opticalGoal: "Moderate vertical elongation while softening strong square mandibular jaw angles and broad forehead corners.",
    zones: [
      {
        zoneName: "Hairline Corners & Chin Base",
        category: "Contour",
        targetRegion: "Top corners of the hairline and corners of the lower jawbone.",
        brushTechnique: "Soft diagonal buffing rounding both upper and lower rectangular corners.",
        placementRule: "Compacts vertical height while smoothing angular lateral edges.",
        proTip: "Use cream bronzer followed by a diffused velvet powder.",
        avoidRule: "Don't shade cheek hollows in sharp stripes.",
      },
      {
        zoneName: "Rounded Apple Flush",
        category: "Blush",
        targetRegion: "Rounded sweeps on the middle cheek, blending gently outwards.",
        brushTechnique: "Circular buffing motions.",
        placementRule: "Curves soften the linear architecture of the rectangular face.",
        proTip: "Choose luminous or satin finishes to impart plump, youthful dimension.",
        avoidRule: "Avoid sharp angular slashes.",
      },
      {
        zoneName: "Horizontal Soft Brow",
        category: "Brows",
        targetRegion: "Gently curved, medium-thick brows with soft rounded tails.",
        brushTechnique: "Feathered strokes with tinted brow fiber gel.",
        placementRule: "Soft curves counterbalance linear facial proportions.",
        proTip: "Keep brow color close to natural root hair color.",
        avoidRule: "Avoid sharp, severe high-angle peaks.",
      },
    ],
    hairstyles: {
      recommended: [
        "Soft layered shoulder-length styles with side parting",
        "Curtain fringe with rounded layers",
        "Voluminous beachy waves that soften jaw edges",
      ],
      avoid: [
        "Blunt angular jaw-length bobs",
        "Pin-straight long hair with center parting and zero layers",
      ],
      reason: "Waves and soft perimeter layers round off angular rectangular edges.",
    },
    eyewear: {
      recommendedFrames: ["Curved round and oval frames", "Cat-eye frames with soft edges", "Large round glasses"],
      avoidFrames: ["Narrow geometric square frames"],
      balanceReason: "Rounded curves provide contrast against rectangular bone structure.",
    },
    dosAndDonts: {
      dos: [
        "Shade upper hairline corners and lower jaw angles.",
        "Choose rounded glasses frames and soft curved eyebrow styling.",
        "Wear hair with soft layers and waves around the jawline.",
      ],
      donts: [
        "Don't wear severe angular glasses or blunt-cut bobs.",
        "Don't apply contour in harsh linear stripes.",
      ],
    },
    colorHarmonization: {
      warm: { contour: "Warm Sienna Sculpt", blush: "Sunlit Guava", highlight: "Golden Amber", lips: "Warm Terracotta" },
      cool: { contour: "Cool Ash Slate", blush: "Deep Rosewood", highlight: "Moonlit Crystal", lips: "Mulberry Wine" },
      neutral: { contour: "Natural Mocha", blush: "Dusty Blossom", highlight: "Radiant Veil", lips: "Spiced Rose" },
    },
  },
};

export function getStylingBlueprint(shape: FaceShape): StylingBlueprint {
  return STYLING_BLUEPRINTS[shape] || STYLING_BLUEPRINTS.Oval;
}
