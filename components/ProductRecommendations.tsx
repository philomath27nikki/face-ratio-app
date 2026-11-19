"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ProductItem, searchProducts, listCatalogProducts } from "@/lib/api";

interface ProductRecommendationsProps {
  faceShape: string;
  denseQueryText?: string;
  categories?: string[];
}

const CATEGORIES = [
  "All",
  "Contour & Sculpt",
  "Blush",
  "Highlighter",
  "Brow & Eye",
  "Skincare",
];

export default function ProductRecommendations({
  faceShape,
  denseQueryText = "",
  categories = [],
}: ProductRecommendationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [engineInfo, setEngineInfo] = useState<string>("Sentence-BERT + FAISS");
  const [savedRoutines, setSavedRoutines] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const activeQuery = useMemo(() => {
    if (denseQueryText && denseQueryText.trim().length > 0) {
      return denseQueryText;
    }
    return `${faceShape} face shape contouring sculpting blush highlighter cosmetic products`;
  }, [denseQueryText, faceShape]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchRecommendations() {
      setLoading(true);
      setError(null);
      try {
        const catFilter = selectedCategory === "All" ? undefined : selectedCategory;
        const res = await searchProducts(activeQuery, faceShape, catFilter, undefined, 8);
        if (!isCancelled) {
          setProducts(res.products || []);
          if (res.engine) setEngineInfo(res.engine);
          setLoading(false);
        }
      } catch (err: any) {
        console.warn("FastAPI semantic search error, falling back to static catalog:", err);
        try {
          const catFilter = selectedCategory === "All" ? undefined : selectedCategory;
          const fallback = await listCatalogProducts(catFilter, faceShape);
          if (!isCancelled) {
            setProducts(fallback.products || []);
            setEngineInfo("Local Catalog Fallback");
            setLoading(false);
          }
        } catch (catErr: any) {
          if (!isCancelled) {
            setError("Could not connect to FastAPI recommendation server (http://localhost:8000).");
            setLoading(false);
          }
        }
      }
    }

    fetchRecommendations();

    return () => {
      isCancelled = true;
    };
  }, [faceShape, activeQuery, selectedCategory]);

  const toggleSaveRoutine = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedRoutines((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-hairline">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-ink text-white font-semibold shadow-sm"
                  : "bg-surfaceSoft text-body hover:bg-hairlineSoft border border-transparent"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Engine Status Banner */}
      <div className="flex items-center justify-between text-xs text-muted px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rausch inline-block animate-pulse" />
          <span>Semantic Vector Search: <strong className="text-ink font-semibold">{engineInfo}</strong></span>
          <span>•</span>
          <span>Ranked for <strong className="text-ink font-semibold capitalize">{faceShape}</strong> Face</span>
        </div>
        <div>
          Saved: <strong className="text-rausch font-bold">{savedRoutines.size}</strong> items
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-airbnbSm border border-hairline bg-surfaceSoft p-4 text-xs text-body flex items-start gap-3">
          <span className="text-rausch font-bold">⚠️</span>
          <div>
            <p className="font-semibold text-ink">Backend Server Offline</p>
            <p className="text-muted mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="aspect-square bg-surfaceSoft rounded-[14px]"></div>
              <div className="h-4 bg-surfaceSoft rounded w-3/4"></div>
              <div className="h-3 bg-surfaceSoft rounded w-1/2"></div>
              <div className="h-4 bg-surfaceSoft rounded w-1/4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Airbnb Property Cards Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const isSaved = savedRoutines.has(p.id);
            const matchPct = p.match_percentage || 85;

            return (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="group flex flex-col justify-between rounded-[14px] bg-white transition-all cursor-pointer"
              >
                <div>
                  {/* Photo Plate with floating Guest Favorite badge and Heart Save */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-[14px] bg-surfaceSoft mb-3">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Floating "Guest favorite" / "Match %" badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-ink shadow-airbnb border border-black/5">
                        <span className="text-rausch font-bold">✦</span> {matchPct}% Match
                      </span>
                    </div>

                    {/* Circular Heart Wishlist Save Button */}
                    <button
                      onClick={(e) => toggleSaveRoutine(p.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-airbnb transition cursor-pointer"
                      title={isSaved ? "Saved to Routine" : "Save to Routine"}
                    >
                      <svg
                        className={`w-4 h-4 transition-colors ${
                          isSaved ? "fill-rausch text-rausch" : "text-ink/70 fill-none stroke-current stroke-2"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Meta Stack */}
                  <div className="space-y-1">
                    {/* Row 1: Brand & Star Rating */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-ink truncate">
                        {p.brand}
                      </span>
                      <div className="flex items-center gap-1 text-ink font-semibold text-sm">
                        <span>★</span>
                        <span>{p.rating.toFixed(2)}</span>
                        <span className="text-muted text-xs font-normal">({p.review_count.toLocaleString()})</span>
                      </div>
                    </div>

                    {/* Row 2: Product Name */}
                    <h4 className="text-sm text-body font-normal line-clamp-1">
                      {p.name}
                    </h4>

                    {/* Row 3: Category & Finish */}
                    <p className="text-xs text-muted">
                      {p.category} • {p.formulation} ({p.finish})
                    </p>

                    {/* Row 4: Facial Fit Explanation Box */}
                    {p.recommendation_reason && (
                      <div className="mt-2 rounded-airbnbSm bg-surfaceSoft p-2 text-[11px] text-body leading-relaxed border border-hairlineSoft">
                        <span className="font-semibold text-ink">Facial Fit: </span>
                        {p.recommendation_reason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 5: Price & Action */}
                <div className="mt-3 pt-2 border-t border-hairlineSoft flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">
                    ${p.price.toFixed(2)}{" "}
                    <span className="text-xs font-normal text-muted">each</span>
                  </p>

                  <button
                    onClick={(e) => toggleSaveRoutine(p.id, e)}
                    className={`text-xs px-3.5 py-1.5 rounded-airbnbSm font-medium transition cursor-pointer ${
                      isSaved
                        ? "bg-ink text-white"
                        : "bg-rausch hover:bg-rausch-active text-white"
                    }`}
                  >
                    {isSaved ? "Saved ✓" : "Add to Routine"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && !error && (
        <div className="text-center py-12 rounded-[14px] bg-surfaceSoft p-6 border border-hairline">
          <p className="text-sm font-semibold text-ink">No items match this category filter.</p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-3 text-xs px-4 py-2 rounded-airbnbSm bg-rausch text-white font-medium hover:bg-rausch-active transition cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative max-w-lg w-full rounded-airbnbLg bg-white p-6 shadow-airbnbHover space-y-4 border border-hairline">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-muted hover:text-ink text-lg p-1 w-8 h-8 rounded-full hover:bg-surfaceSoft flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="flex gap-4">
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="h-28 w-28 rounded-airbnbMd object-cover bg-surfaceSoft"
              />
              <div>
                <span className="text-xs uppercase text-rausch font-bold">{selectedProduct.brand}</span>
                <h3 className="text-base font-bold text-ink">{selectedProduct.name}</h3>
                <p className="text-sm font-semibold text-ink mt-1">${selectedProduct.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                  <span className="text-ink font-semibold">★ {selectedProduct.rating}</span>
                  <span>•</span>
                  <span>{selectedProduct.category}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-body leading-relaxed">
              {selectedProduct.description}
            </p>

            <div>
              <p className="text-xs font-semibold text-ink mb-1.5">Key Anthropometric Benefits:</p>
              <ul className="space-y-1">
                {selectedProduct.key_benefits.map((b, idx) => (
                  <li key={idx} className="text-xs text-body flex items-start gap-1.5">
                    <span className="text-rausch">✦</span> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-hairline">
              <span className="text-xs text-muted">
                Formula: <strong className="text-ink">{selectedProduct.formulation}</strong> | Finish: <strong className="text-ink">{selectedProduct.finish}</strong>
              </span>
              <button
                onClick={() => {
                  toggleSaveRoutine(selectedProduct.id);
                  setSelectedProduct(null);
                }}
                className="text-xs px-5 py-2.5 rounded-airbnbSm bg-rausch hover:bg-rausch-active text-white font-medium transition cursor-pointer"
              >
                {savedRoutines.has(selectedProduct.id) ? "Remove from Routine" : "Save to Routine"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
