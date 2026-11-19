import { FaceShapeResult } from "./landmarks";

export interface TriggeredRule {
  rule_id: string;
  feature_region: string;
  trigger_condition: string;
  target_effect: string;
  keywords: string[];
  explanation: string;
}

export interface ExpandedQueryResult {
  original_keywords: string[];
  expanded_keywords: string[];
  dense_query_text: string;
  bm25_search_terms: string[];
  product_categories: string[];
  target_finishes: string[];
}

export interface RatioMappingResponse {
  status: string;
  primary_shape: string;
  confidence: number;
  secondary_shape?: string;
  triggered_rules_count: number;
  triggered_rules: TriggeredRule[];
  retrieval_query: ExpandedQueryResult;
  semantic_dense_query: string;
  audit_trail: Record<string, any>;
}

export function getApiBase(): string {
  if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    // When served together by the same backend in production, use same-origin relative URL
    if (window.location.port !== "3000") {
      return "";
    }
  }
  let base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  base = base.trim().replace(/\/+$/, "");
  if (base && !base.startsWith("http://") && !base.startsWith("https://")) {
    base = `https://${base}`;
  }
  return base;
}

export async function fetchSemanticMapping(
  faceShape: FaceShapeResult,
  goldenRatioScore: number | null
): Promise<RatioMappingResponse> {
  const payload = {
    face_shape: faceShape.primaryShape,
    confidence: faceShape.confidence,
    length_to_width: faceShape.ratios.lengthToWidth,
    forehead_to_cheek: faceShape.ratios.foreheadToCheek,
    jaw_to_cheek: faceShape.ratios.jawToCheek,
    forehead_to_jaw: faceShape.ratios.foreheadToJaw,
    chin_to_jaw: faceShape.ratios.chinToJaw,
    jaw_angle_deg: faceShape.ratios.jawAngleDeg,
    golden_ratio_score: goldenRatioScore,
    dimensions: faceShape.dimensions,
    secondary_shape: faceShape.secondaryShape,
  };

  const API_BASE = getApiBase();
  const response = await fetch(`${API_BASE}/api/map-ratio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`FastAPI server error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  sub_category?: string;
  price: number;
  rating: number;
  review_count: number;
  description: string;
  key_benefits: string[];
  target_face_shapes: string[];
  target_skin_types: string[];
  formulation: string;
  finish: string;
  image_url: string;
  tags: string[];
  similarity_score?: number;
  match_percentage?: number;
  shape_matched?: boolean;
  recommendation_reason?: string;
}

export interface ProductSearchResponse {
  status: string;
  query: string;
  total_results: number;
  face_shape_applied?: string;
  category_applied?: string;
  engine: string;
  products: ProductItem[];
}

export async function searchProducts(
  query: string,
  faceShape?: string,
  category?: string,
  skinType?: string,
  topK: number = 8
): Promise<ProductSearchResponse> {
  const API_BASE = getApiBase();
  const response = await fetch(`${API_BASE}/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      face_shape: faceShape,
      category,
      skin_type: skinType,
      top_k: topK,
    }),
  });

  if (!response.ok) {
    throw new Error(`Semantic search API failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function listCatalogProducts(
  category?: string,
  faceShape?: string
): Promise<{ status: string; total: number; products: ProductItem[] }> {
  const API_BASE = getApiBase();
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (faceShape) params.append("face_shape", faceShape);

  const url = `${API_BASE}/api/products${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to list products: ${response.status}`);
  }
  return response.json();
}
