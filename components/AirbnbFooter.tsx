"use client";

import React from "react";

export default function AirbnbFooter() {
  return (
    <footer className="mt-20 border-t border-hairline bg-surfaceSoft/60 text-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-hairline">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-ink">Facial Geometry Research</h4>
            <ul className="space-y-2 text-sm text-body">
              <li><a href="#" className="hover:underline text-muted hover:text-ink">MediaPipe 468 Landmark Mesh</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Golden Ratio (φ = 1.618) Symmetry</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Anthropometric Face Shape Index</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Facial Thirds Partitioning</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-ink">AI & Semantic Engine</h4>
            <ul className="space-y-2 text-sm text-body">
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Sentence-BERT all-MiniLM-L6-v2</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">FAISS IndexFlatIP Dense Retrieval</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">FastAPI High-Throughput REST API</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Rule-Based Ontology Knowledge Graph</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-ink">Skin & Clinical Health</h4>
            <ul className="space-y-2 text-sm text-body">
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Colorimetric Undertone Detection</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Fitzpatrick Phototype Scale</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">T-Zone Sebum & Erythema Mapping</a></li>
              <li><a href="#" className="hover:underline text-muted hover:text-ink">Dermatological AM/PM Regimens</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Language Band */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 FaceSemantic Studio, Inc.</span>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>•</span>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>

          <div className="flex items-center gap-4 font-semibold text-ink">
            <button className="flex items-center gap-1.5 hover:underline cursor-pointer">
              <span>🌐</span> English (US)
            </button>
            <button className="hover:underline cursor-pointer">
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
