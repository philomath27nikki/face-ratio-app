"""
FaceSemantic & Minor Project FastAPI Backend
Exposes Part 2: Ratio-to-Keyword Mapping & NLP Query Expansion API.
"""

import os
import sys
from typing import List, Dict, Any, Optional

# Ensure the backend directory is in sys.path regardless of execution method or working directory
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

try:
    from ontology import OntologyEngine, FacialInputProfile, TriggeredRule
    from query_expansion import QueryExpander, ExpandedQueryResult
    from catalog import get_all_products, get_products_by_category, get_products_by_face_shape
    from semantic_search import search_engine
except ImportError:
    from backend.ontology import OntologyEngine, FacialInputProfile, TriggeredRule
    from backend.query_expansion import QueryExpander, ExpandedQueryResult
    from backend.catalog import get_all_products, get_products_by_category, get_products_by_face_shape
    from backend.semantic_search import search_engine

app = FastAPI(
    title="FaceSemantic - Facial Geometry Driven Product Retrieval API",
    description="Maps facial proportions & face shapes into semantic queries for distributed product retrieval.",
    version="1.0.0",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines
ontology_engine = OntologyEngine()
query_expander = QueryExpander()


class RatioMappingRequest(BaseModel):
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
    dimensions: Optional[Dict[str, int]] = None
    secondary_shape: Optional[str] = None


class RatioMappingResponse(BaseModel):
    status: str
    primary_shape: str
    confidence: int
    secondary_shape: Optional[str] = None
    triggered_rules_count: int
    triggered_rules: List[TriggeredRule]
    retrieval_query: ExpandedQueryResult
    semantic_dense_query: str
    audit_trail: Dict[str, Any]


@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "FaceSemantic Ontology & Semantic Search Service",
        "version": "1.0.0",
        "registered_rules": len(ontology_engine.get_all_rules()),
        "total_catalog_products": len(get_all_products()),
        "search_engine_ready": search_engine.is_ready,
        "embedding_model": search_engine.model_name,
    }


@app.get("/api/ontology/rules")
def get_registered_rules():
    """
    Returns the complete transparent ontology knowledge graph rule registry.
    """
    return {
        "total_rules": len(ontology_engine.get_all_rules()),
        "rules": ontology_engine.get_all_rules(),
    }


@app.post("/api/map-ratio", response_model=RatioMappingResponse)
def map_facial_ratios_to_keywords(payload: RatioMappingRequest):
    """
    Part 2 Core Endpoint:
    Accepts measured facial proportions & shape, evaluates against the ontology,
    and applies NLP query expansion to produce search embeddings and tokens.
    """
    try:
        profile = FacialInputProfile(
            face_shape=payload.face_shape,
            confidence=payload.confidence,
            length_to_width=payload.length_to_width,
            forehead_to_cheek=payload.forehead_to_cheek,
            jaw_to_cheek=payload.jaw_to_cheek,
            forehead_to_jaw=payload.forehead_to_jaw,
            chin_to_jaw=payload.chin_to_jaw,
            jaw_angle_deg=payload.jaw_angle_deg,
            golden_ratio_score=payload.golden_ratio_score,
            upper_to_middle_third=payload.upper_to_middle_third,
            middle_to_lower_third=payload.middle_to_lower_third,
        )

        # 1. Evaluate against ontology
        triggered = ontology_engine.evaluate(profile)

        # 2. Extract unique base keywords
        base_keywords = []
        for r in triggered:
            for kw in r.keywords:
                if kw not in base_keywords:
                    base_keywords.append(kw)

        # 3. Apply NLP Query Expansion
        expanded = query_expander.expand(base_keywords, payload.face_shape)

        return RatioMappingResponse(
            status="success",
            primary_shape=payload.face_shape,
            confidence=payload.confidence,
            secondary_shape=payload.secondary_shape,
            triggered_rules_count=len(triggered),
            triggered_rules=triggered,
            retrieval_query=expanded,
            semantic_dense_query=expanded.dense_query_text,
            audit_trail={
                "measured_proportions": {
                    "length_to_width": payload.length_to_width,
                    "jaw_to_cheek": payload.jaw_to_cheek,
                    "forehead_to_jaw": payload.forehead_to_jaw,
                    "jaw_angle_deg": payload.jaw_angle_deg,
                },
                "total_ontology_rules_evaluated": len(ontology_engine.get_all_rules()),
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ontology mapping failed: {str(e)}")


class SearchRequest(BaseModel):
    query: str
    face_shape: Optional[str] = None
    category: Optional[str] = None
    skin_type: Optional[str] = None
    top_k: Optional[int] = 6


class SearchResponse(BaseModel):
    status: str
    query: str
    total_results: int
    face_shape_applied: Optional[str] = None
    category_applied: Optional[str] = None
    engine: str
    products: List[Dict[str, Any]]


@app.get("/api/products")
def list_products(category: Optional[str] = None, face_shape: Optional[str] = None):
    """
    Returns the catalog products, optionally filtered by category or target face shape.
    """
    if face_shape:
        items = get_products_by_face_shape(face_shape)
    elif category:
        items = get_products_by_category(category)
    else:
        items = get_all_products()

    return {
        "status": "success",
        "total": len(items),
        "products": items,
    }


@app.post("/api/search", response_model=SearchResponse)
def semantic_search_products(payload: SearchRequest):
    """
    Part 3 Core Endpoint:
    Executes Sentence-BERT dense vector embedding search with FAISS IndexFlatIP
    and anthropometric geometry re-ranking over beauty & skincare products.
    """
    try:
        results = search_engine.search(
            query=payload.query,
            face_shape=payload.face_shape,
            category=payload.category,
            skin_type=payload.skin_type,
            top_k=payload.top_k or 6,
        )

        return SearchResponse(
            status="success",
            query=payload.query,
            total_results=len(results),
            face_shape_applied=payload.face_shape,
            category_applied=payload.category,
            engine="Sentence-BERT all-MiniLM-L6-v2 + FAISS IndexFlatIP",
            products=results,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Semantic product search failed: {str(e)}")


# -------------------------------------------------------------
# Unified Deployment: Serve Next.js Frontend Static Files
# -------------------------------------------------------------
POSSIBLE_OUT_DIRS = [
    os.path.abspath(os.path.join(BACKEND_DIR, "..", "out")),
    os.path.abspath(os.path.join(BACKEND_DIR, "out")),
    "/app/out",
]
OUT_DIR = None
for d in POSSIBLE_OUT_DIRS:
    if os.path.exists(d) and os.path.exists(os.path.join(d, "index.html")):
        OUT_DIR = d
        break

if OUT_DIR:
    print(f"[FaceSemantic] Serving unified frontend from {OUT_DIR}")
    next_static_dir = os.path.join(OUT_DIR, "_next")
    if os.path.exists(next_static_dir):
        app.mount("/_next", StaticFiles(directory=next_static_dir), name="next-static")

    @app.get("/")
    async def serve_index():
        return FileResponse(os.path.join(OUT_DIR, "index.html"))

    @app.get("/{full_path:path}")
    async def serve_spa_routes(full_path: str):
        if full_path.startswith("api/") or full_path in ("health", "docs", "redoc", "openapi.json"):
            raise HTTPException(status_code=404, detail="Not found")
        target_file = os.path.join(OUT_DIR, full_path)
        if os.path.isfile(target_file):
            return FileResponse(target_file)
        index_file = os.path.join(OUT_DIR, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="Not found")
else:
    @app.get("/")
    def root_status():
        return {
            "status": "healthy",
            "service": "FaceSemantic API",
            "message": "Backend running. Visit /docs for API endpoints.",
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, app_dir=BACKEND_DIR)
