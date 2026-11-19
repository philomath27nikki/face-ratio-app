"""
Ontology / Knowledge Graph Module
Translates facial geometric proportions and anthropometric face shapes into
transparent, traceable styling and cosmetic search keywords.

Every generated keyword can be traced directly back to a specific anatomical ratio or rule.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class TriggerCondition(BaseModel):
    metric: str
    operator: str  # '>', '<', '>=', '<=', 'between', '=='
    threshold: Any
    actual_value: Optional[float] = None
    description: str


class TriggeredRule(BaseModel):
    rule_id: str
    feature_region: str  # Forehead, Cheekbones, Jawline, Chin, Facial Thirds, Overall
    trigger_condition: str
    target_effect: str
    keywords: List[str]
    explanation: str


class FacialInputProfile(BaseModel):
    face_shape: str
    confidence: int
    length_to_width: float
    forehead_to_cheek: float
    jaw_to_cheek: float
    forehead_to_jaw: float
    chin_to_jaw: float
    jaw_angle_deg: float
    golden_ratio_score: Optional[int] = None
    upper_to_middle_third: Optional[float] = 1.0
    middle_to_lower_third: Optional[float] = 1.0


class OntologyEngine:
    """
    Transparent rule-based ontology linking facial geometry to descriptive words.
    """

    def __init__(self):
        # Master dictionary of rule definitions
        self.rules_registry = [
            # 1. JAWLINE RULES
            {
                "rule_id": "ONT-JAW-WIDE",
                "region": "Jawline",
                "condition": "jaw_to_cheek >= 0.84",
                "target_effect": "Soften mandibular corners and minimize lateral jaw presence",
                "keywords": ["jawline contour", "matte bronzer", "soften jaw angles", "mandibular shading"],
                "explanation": "Prominent or wide bigonial jawline relative to cheekbones calls for perimeter shading.",
            },
            {
                "rule_id": "ONT-JAW-NARROW",
                "region": "Jawline",
                "condition": "jaw_to_cheek <= 0.70",
                "target_effect": "Provide subtle balance without sharp shadowing",
                "keywords": ["subtle jaw balm", "delicate jawline blend", "light contouring"],
                "explanation": "Tapered or narrow jawline requires gentle blending to avoid over-narrowing the lower third.",
            },
            {
                "rule_id": "ONT-JAW-ANGULAR",
                "region": "Jawline",
                "condition": "jaw_angle_deg >= 105",
                "target_effect": "Diffuse hard structural edges",
                "keywords": ["diffused contour", "soft blending bronzer", "curved shading"],
                "explanation": "Square jaw apex angle indicates sharp structural bone definition.",
            },

            # 2. FOREHEAD & TEMPLE RULES
            {
                "rule_id": "ONT-FOREHEAD-BROAD",
                "region": "Forehead",
                "condition": "forehead_to_jaw >= 1.22",
                "target_effect": "Balance upper third width relative to lower third",
                "keywords": ["temple contour", "hairline shading", "matte temple powder"],
                "explanation": "Broad forehead with tapered chin (heart/inverted triangle) benefits from lateral shading.",
            },
            {
                "rule_id": "ONT-FOREHEAD-NARROW",
                "region": "Forehead",
                "condition": "forehead_to_cheek <= 0.78",
                "target_effect": "Add visual openness to temples",
                "keywords": ["temple illuminator", "forehead center highlight", "luminous base"],
                "explanation": "Narrow forehead relative to cheekbones (diamond shape) is opened with highlighting.",
            },

            # 3. CHEEKBONE & FACIAL RATIO RULES
            {
                "rule_id": "ONT-ASPECT-SHORT",
                "region": "Overall",
                "condition": "length_to_width <= 1.24",
                "target_effect": "Create vertical elongation and dimensional depth",
                "keywords": ["elongating contour", "diagonal blush placement", "vertical highlight", "sculpting stick"],
                "explanation": "Compact or round face proportions benefit from vertical lines and diagonal blush lift.",
            },
            {
                "rule_id": "ONT-ASPECT-LONG",
                "region": "Overall",
                "condition": "length_to_width >= 1.48",
                "target_effect": "Visually shorten the vertical axis and add horizontal breadth",
                "keywords": ["horizontal blush", "hairline bronzer", "chin tip shading", "midface bronzer"],
                "explanation": "Elongated face proportion benefits from horizontal sweeps across cheeks to balance vertical length.",
            },
            {
                "rule_id": "ONT-CHEEK-PROMINENT",
                "region": "Cheekbones",
                "condition": "forehead_to_cheek <= 0.80 and jaw_to_cheek <= 0.72",
                "target_effect": "Soften high cheekbone apex and focus color on center apples",
                "keywords": ["apple blush placement", "diffused cheek color", "subtle contour balm"],
                "explanation": "Cheekbones distinctly wider than both forehead and jaw (diamond profile).",
            },

            # 4. CHIN APEX RULES
            {
                "rule_id": "ONT-CHIN-POINTED",
                "region": "Chin",
                "condition": "jaw_angle_deg < 85",
                "target_effect": "Soften pointy apex and add visual fullness to jaw curve",
                "keywords": ["chin apex softening", "strobe cream chin", "soft focus powder"],
                "explanation": "Acute mandibular angle produces a sharp, v-shaped chin point.",
            },
            {
                "rule_id": "ONT-CHIN-SQUARE",
                "region": "Chin",
                "condition": "chin_to_jaw >= 0.50",
                "target_effect": "Round the flat lower perimeter of the chin",
                "keywords": ["round contour shading", "center chin highlight", "curved bronze"],
                "explanation": "Broad chin plate calls for soft circular shading at the base.",
            },

            # 5. FACIAL THIRDS PROPORTIONS
            {
                "rule_id": "ONT-THIRDS-UPPER-LONG",
                "region": "Facial Thirds",
                "condition": "upper_to_middle_third > 1.15",
                "target_effect": "Visually lower the hairline",
                "keywords": ["hairline shading", "matte hairline bronzer"],
                "explanation": "Upper third (forehead) is significantly longer than middle third (brows to nose base).",
            },
            {
                "rule_id": "ONT-THIRDS-LOWER-LONG",
                "region": "Facial Thirds",
                "condition": "middle_to_lower_third < 0.85",
                "target_effect": "Visually soften chin projection",
                "keywords": ["chin tip contour", "lower lip shadow"],
                "explanation": "Lower third (nose base to chin) is noticeably elongated relative to midface.",
            },

            # 6. SHAPE-SPECIFIC HOLISTIC PROFILES
            {
                "rule_id": "ONT-SHAPE-OVAL",
                "region": "Overall",
                "condition": "face_shape == 'Oval'",
                "target_effect": "Enhance natural symmetry and soft definition",
                "keywords": ["natural cheekbone lift", "satin blush", "champagne liquid highlight", "subtle sculpting"],
                "explanation": "Balanced oval proportion allows classical enhancement without corrective shading.",
            },
            {
                "rule_id": "ONT-SHAPE-ROUND",
                "region": "Overall",
                "condition": "face_shape == 'Round'",
                "target_effect": "Sculpt perimeter and add diagonal dimension",
                "keywords": ["matte bronzing powder", "contour stick", "angled cheek lift", "dimension sculpting"],
                "explanation": "Round contours achieve structure through perimeter shadows and high-angled blush.",
            },
            {
                "rule_id": "ONT-SHAPE-SQUARE",
                "region": "Overall",
                "condition": "face_shape == 'Square'",
                "target_effect": "Soften sharp mandibular corners and bring warmth to the center",
                "keywords": ["soft blending contour", "apple blush", "dewy cream highlighter", "diffused bronzer"],
                "explanation": "Strong jaw angles are softened with circular blush placement and diffused jaw contour.",
            },
            {
                "rule_id": "ONT-SHAPE-HEART",
                "region": "Overall",
                "condition": "face_shape == 'Heart'",
                "target_effect": "Balance broad temple width and soften the narrow chin apex",
                "keywords": ["temple contour palette", "horizontal blush sweep", "chin softening", "strobe cream"],
                "explanation": "Heart face profile balances upper temple breadth with midface horizontal blush.",
            },
            {
                "rule_id": "ONT-SHAPE-DIAMOND",
                "region": "Overall",
                "condition": "face_shape == 'Diamond'",
                "target_effect": "Highlight center axis and soften lateral cheekbone width",
                "keywords": ["center forehead highlight", "apple blush", "subtle contour balm", "soft-focus powder"],
                "explanation": "Diamond face draws focus to the vertical center with forehead and chin highlights.",
            },
            {
                "rule_id": "ONT-SHAPE-OBLONG",
                "region": "Overall",
                "condition": "face_shape == 'Oblong'",
                "target_effect": "Visually compress vertical length and broaden midface",
                "keywords": ["hairline bronzer", "chin contour", "horizontal fan blush", "wide cheek color"],
                "explanation": "Elongated face requires upper and lower boundary shading to frame the face.",
            },
            {
                "rule_id": "ONT-SHAPE-RECTANGLE",
                "region": "Overall",
                "condition": "face_shape == 'Rectangle'",
                "target_effect": "Soften angular corners and reduce vertical elongation",
                "keywords": ["square jaw contour", "hairline shading", "rounded mauve blush", "diffused glow"],
                "explanation": "Combines vertical length reduction with softening of square jaw angles.",
            },
        ]

    def evaluate(self, profile: FacialInputProfile) -> List[TriggeredRule]:
        """
        Executes ontology rules against the user's geometric measurements.
        Returns the list of triggered rules with full audit trace.
        """
        triggered: List[TriggeredRule] = []

        # Local context for condition evaluation
        ctx = {
            "face_shape": profile.face_shape,
            "length_to_width": profile.length_to_width,
            "forehead_to_cheek": profile.forehead_to_cheek,
            "jaw_to_cheek": profile.jaw_to_cheek,
            "forehead_to_jaw": profile.forehead_to_jaw,
            "chin_to_jaw": profile.chin_to_jaw,
            "jaw_angle_deg": profile.jaw_angle_deg,
            "upper_to_middle_third": profile.upper_to_middle_third or 1.0,
            "middle_to_lower_third": profile.middle_to_lower_third or 1.0,
        }

        for rule in self.rules_registry:
            cond_str = rule["condition"]
            try:
                # Safe evaluation in restricted namespace
                matches = eval(cond_str, {"__builtins__": None}, ctx)
                if matches:
                    triggered.append(
                        TriggeredRule(
                            rule_id=rule["rule_id"],
                            feature_region=rule["region"],
                            trigger_condition=cond_str,
                            target_effect=rule["target_effect"],
                            keywords=rule["keywords"],
                            explanation=rule["explanation"],
                        )
                    )
            except Exception as e:
                print(f"Error evaluating rule {rule['rule_id']}: {e}")

        return triggered

    def get_all_rules(self) -> List[Dict[str, Any]]:
        return self.rules_registry
