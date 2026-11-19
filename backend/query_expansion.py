"""
Query Expansion Module (NLP)
Expands base ontology keywords with cosmetic synonyms, product formulations,
and e-commerce search descriptors to maximize dense & sparse retrieval coverage.
"""

from typing import List, Dict, Set
from pydantic import BaseModel


class ExpandedQueryResult(BaseModel):
    original_keywords: List[str]
    expanded_keywords: List[str]
    dense_query_text: str
    bm25_search_terms: List[str]
    product_categories: List[str]
    target_finishes: List[str]


class QueryExpander:
    """
    Cosmetic ontology query expander.
    Maps core aesthetic directives to rich retrieval vocabulary.
    """

    def __init__(self):
        # Synonym and formulation expansion maps
        self.synonym_map = {
            "contour": ["bronzer", "sculpting powder", "contour stick", "shading cream", "chisel stick"],
            "jawline contour": ["mandibular bronzer", "jawline sculpting stick", "matte contour kit"],
            "matte bronzer": ["matte sculpting powder", "warm contour powder", "pressed bronzing powder"],
            "soften jaw angles": ["diffused bronzing powder", "neutral cream contour", "angled blending brush"],
            "blush": ["cheek tint", "rouge", "satin blush powder", "liquid cheek flush"],
            "apple blush": ["rounded blush placement", "rosy cheek cream", "petal powder blush"],
            "diagonal blush": ["angled cheek lift", "contouring blush", "sculpted blush"],
            "horizontal blush": ["midface widening blush", "terracotta blush sweep", "wide fan blush"],
            "highlighter": ["illuminator", "strobe cream", "liquid glow", "champagne highlighter", "dewy balm"],
            "temple contour": ["hairline shading powder", "forehead bronzer", "diffused temple shadow"],
            "chin softening": ["chin shading balm", "matte chin powder", "diffused lower shadow"],
            "sculpting stick": ["dual-ended contour stick", "cream sculpting wand", "blendable contour crayon"],
            "natural cheekbone lift": ["luminous cheek tint", "soft satin blush", "light reflective highlighter"],
        }

        self.category_map = {
            "contour": "Contour & Sculpt",
            "bronzer": "Bronzer",
            "blush": "Blush",
            "highlight": "Highlighter",
            "shading": "Contour & Sculpt",
            "sculpt": "Contour & Sculpt",
            "powder": "Setting & Bronzing Powder",
            "cream": "Cream Makeup",
            "strobe": "Highlighter & Illuminator",
        }

        self.finish_map = {
            "matte": "Matte",
            "soften": "Soft-Focus / Diffused",
            "dewy": "Dewy / Luminous",
            "satin": "Satin",
            "strobe": "Radiant",
            "glow": "Luminous",
            "natural": "Natural / Skin-like",
        }

    def expand(self, base_keywords: List[str], face_shape: str) -> ExpandedQueryResult:
        expanded_set: Set[str] = set()
        categories: Set[str] = set()
        finishes: Set[str] = set()

        for kw in base_keywords:
            kw_clean = kw.lower().strip()
            expanded_set.add(kw_clean)

            # Check direct synonym matches
            for key, synonyms in self.synonym_map.items():
                if key in kw_clean:
                    for syn in synonyms:
                        expanded_set.add(syn)

            # Identify product category
            for cat_key, cat_name in self.category_map.items():
                if cat_key in kw_clean:
                    categories.add(cat_name)

            # Identify finish / texture
            for fin_key, fin_name in self.finish_map.items():
                if fin_key in kw_clean:
                    finishes.add(fin_name)

        # Default fallbacks
        if not categories:
            categories.update(["Contour & Sculpt", "Blush", "Highlighter"])
        if not finishes:
            finishes.update(["Natural / Skin-like", "Matte"])

        # Construct Dense Text for SBERT embedding
        expanded_list = sorted(list(expanded_set))
        top_terms = ", ".join(expanded_list[:12])
        dense_query_text = (
            f"Personalized makeup recommendations for {face_shape} face shape: {top_terms}. "
            f"Target categories: {', '.join(sorted(categories))}. "
            f"Desired finish: {', '.join(sorted(finishes))}."
        )

        # High-value unique tokens for BM25 keyword search
        bm25_terms = sorted(list(set(
            word for phrase in expanded_list for word in phrase.split() if len(word) > 2
        )))

        return ExpandedQueryResult(
            original_keywords=base_keywords,
            expanded_keywords=expanded_list,
            dense_query_text=dense_query_text,
            bm25_search_terms=bm25_terms,
            product_categories=sorted(list(categories)),
            target_finishes=sorted(list(finishes)),
        )
