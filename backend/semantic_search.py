"""
Semantic Product Retrieval Engine using Sentence-BERT & FAISS.
Encodes cosmetics/skincare product metadata into dense vector representations
and retrieves ranked recommendations using Cosine Similarity via FAISS IndexFlatIP.
"""

from typing import List, Dict, Any, Optional
import os
import numpy as np

try:
    from sentence_transformers import SentenceTransformer
    import faiss
    SBERT_AVAILABLE = True
except Exception as e:
    SBERT_AVAILABLE = False
    print(f"[SemanticSearch] Notice: SentenceTransformers/FAISS not fully loaded ({e}), using dense TF-IDF fallback.")

from catalog import PRODUCTS


class SemanticSearchEngine:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model_name = model_name
        self.products = PRODUCTS
        self.model = None
        self.index = None
        self.dimension = 384
        self.product_vectors = None
        self.is_ready = False

        self._initialize()

    def _initialize(self):
        """Initializes Sentence-BERT model and builds the FAISS index."""
        if SBERT_AVAILABLE:
            try:
                # Load SentenceTransformer model
                print(f"[SemanticSearch] Loading SentenceTransformer: {self.model_name}...")
                self.model = SentenceTransformer(self.model_name)
                
                # Create rich textual representation for each product
                corpus = [self._product_to_text(p) for p in self.products]
                embeddings = self.model.encode(corpus, convert_to_numpy=True, show_progress_bar=False)
                
                # Normalize embeddings for Cosine Similarity with Inner Product
                faiss.normalize_L2(embeddings)
                self.dimension = embeddings.shape[1]
                
                # Build FAISS IndexFlatIP
                self.index = faiss.IndexFlatIP(self.dimension)
                self.index.add(embeddings)
                self.product_vectors = embeddings
                self.is_ready = True
                print(f"[SemanticSearch] FAISS index built with {self.index.ntotal} products (dimension {self.dimension}).")
            except Exception as ex:
                print(f"[SemanticSearch] Warning during SBERT initialization: {ex}. Falling back to keyword-similarity.")
                self.is_ready = False
        else:
            self.is_ready = False

    def _product_to_text(self, product: Dict[str, Any]) -> str:
        """Constructs an information-dense semantic document string for indexing."""
        tags = " ".join(product.get("tags", []))
        benefits = " ".join(product.get("key_benefits", []))
        shapes = " ".join(product.get("target_face_shapes", []))
        skin = " ".join(product.get("target_skin_types", []))
        
        return (
            f"{product['name']} by {product['brand']}. "
            f"Category: {product['category']}, {product.get('sub_category', '')}. "
            f"Finish: {product.get('finish', '')}. Formulation: {product.get('formulation', '')}. "
            f"Description: {product['description']} "
            f"Benefits: {benefits}. Suitable for face shapes: {shapes}. "
            f"Skin types: {skin}. Tags: {tags}"
        )

    def search(
        self,
        query: str,
        face_shape: Optional[str] = None,
        category: Optional[str] = None,
        skin_type: Optional[str] = None,
        top_k: int = 6
    ) -> List[Dict[str, Any]]:
        """
        Executes semantic search over the catalog with optional face-shape & category boosting.
        """
        results = []
        
        if self.is_ready and self.model and self.index:
            try:
                # 1. Encode query
                q_vec = self.model.encode([query], convert_to_numpy=True)
                faiss.normalize_L2(q_vec)
                
                # 2. Query FAISS index for all candidates (to allow re-ranking)
                k_search = min(len(self.products), max(top_k * 2, 10))
                similarities, indices = self.index.search(q_vec, k_search)
                
                raw_matches = []
                for sim, idx in zip(similarities[0], indices[0]):
                    if idx >= 0 and idx < len(self.products):
                        raw_matches.append((self.products[idx], float(sim)))
            except Exception as e:
                print(f"[SemanticSearch] FAISS search error: {e}. Falling back to lexical search.")
                raw_matches = self._lexical_search(query)
        else:
            raw_matches = self._lexical_search(query)

        # 3. Apply Re-ranking and Domain-Specific Weighting
        for prod, base_sim in raw_matches:
            # Filter by category if explicitly requested
            if category and category.lower() not in ["all", ""]:
                if prod.get("category", "").lower() != category.lower():
                    continue

            adjusted_sim = base_sim

            # Face Shape boost
            shape_match = False
            if face_shape:
                fs_lower = face_shape.lower()
                target_shapes = [s.lower() for s in prod.get("target_face_shapes", [])]
                if fs_lower in target_shapes:
                    adjusted_sim += 0.08
                    shape_match = True
                elif "all" in target_shapes:
                    adjusted_sim += 0.03

            # Skin Type boost
            if skin_type:
                st_lower = skin_type.lower()
                target_skins = [s.lower() for s in prod.get("target_skin_types", [])]
                if st_lower in target_skins or "all" in target_skins:
                    adjusted_sim += 0.04

            # Category keyword boost if in query
            if prod.get("category", "").lower() in query.lower():
                adjusted_sim += 0.05

            # Calculate user-friendly match percentage (70% - 98%)
            # Cosine similarity for all-MiniLM typically falls between 0.40 and 0.85
            normalized_score = (adjusted_sim - 0.20) / 0.70
            match_pct = int(min(98, max(72, normalized_score * 100)))

            # Generate personalized reasoning explanation
            explanation = self._generate_explanation(prod, face_shape, shape_match)

            results.append({
                **prod,
                "similarity_score": round(float(adjusted_sim), 4),
                "match_percentage": match_pct,
                "shape_matched": shape_match,
                "recommendation_reason": explanation
            })

        # Sort descending by adjusted score
        results.sort(key=lambda x: x["similarity_score"], reverse=True)
        return results[:top_k]

    def _lexical_search(self, query: str) -> List[tuple]:
        """Fallback lexical similarity search when SBERT is offline or downloading."""
        q_tokens = set(query.lower().replace(",", " ").replace(".", " ").split())
        scored = []
        for prod in self.products:
            doc_text = self._product_to_text(prod).lower()
            tokens = set(doc_text.replace(",", " ").replace(".", " ").split())
            intersection = q_tokens.intersection(tokens)
            score = len(intersection) / max(len(q_tokens), 1)
            # Normalize around typical similarity scores
            sim = 0.40 + (score * 0.50)
            scored.append((prod, sim))
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored

    def _generate_explanation(self, prod: Dict[str, Any], face_shape: Optional[str], shape_match: bool) -> str:
        """Generates dynamic, anthropometrically grounded explanation for the recommendation."""
        cat = prod.get("category", "")
        finish = prod.get("finish", "")
        name = prod.get("name", "")
        
        if face_shape and shape_match:
            if cat == "Contour & Sculpt":
                return f"Curated for {face_shape} shape: Chixels natural shadows with a {finish} finish to balance facial width and jawline contours."
            elif cat == "Blush":
                return f"Ideal for {face_shape} geometry: Placed strategically to draw the focal point and lift or soften cheek prominence."
            elif cat == "Highlighter":
                return f"Tailored for {face_shape} proportions: Reflects light at high points to enhance vertical balance and bone structure."
            elif cat == "Brow & Eye":
                return f"Frames {face_shape} face: Sculpts eyebrow and eye angles to harmonize forehead-to-jaw symmetry."
            else:
                return f"Formulated with active ingredients to clarify and prep skin for a smooth, high-definition cosmetic canvas."
        elif shape_match:
            return f"Versatile formula with {finish} texture designed to flatter natural facial contours."
        else:
            return f"High-performance {cat.lower()} formula featuring {finish} finish to enhance facial definition."


# Global singleton instance for high-throughput reuse
search_engine = SemanticSearchEngine()
