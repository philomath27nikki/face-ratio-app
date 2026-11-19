"use client";

import React from "react";

interface AirbnbSearchPillProps {
  faceShape?: string;
  undertone?: string;
  productsCount?: number;
  onSegmentClick: (segment: "shape" | "skin" | "products") => void;
  onUploadClick: () => void;
}

export default function AirbnbSearchPill({
  faceShape,
  undertone,
  productsCount = 21,
  onSegmentClick,
  onUploadClick,
}: AirbnbSearchPillProps) {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="bg-white rounded-full border border-hairline shadow-airbnb hover:shadow-airbnbHover transition-all flex items-center p-2 text-left divide-x divide-hairline">
        {/* Segment 1: Face Shape (Where) */}
        <button
          onClick={() => onSegmentClick("shape")}
          className="flex-1 px-5 py-2.5 rounded-full hover:bg-surfaceSoft transition cursor-pointer text-left"
        >
          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink">
            Face Shape
          </span>
          <span className="block text-sm text-muted font-normal truncate mt-0.5">
            {faceShape ? `${faceShape} Profile Classified` : "Upload portrait to detect"}
          </span>
        </button>

        {/* Segment 2: Skin Tone & Undertone (When) */}
        <button
          onClick={() => onSegmentClick("skin")}
          className="flex-1 px-5 py-2.5 rounded-full hover:bg-surfaceSoft transition cursor-pointer text-left hidden sm:block"
        >
          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink">
            Skin Tone & Undertone
          </span>
          <span className="block text-sm text-muted font-normal truncate mt-0.5">
            {undertone ? `${undertone} Undertone Detected` : "Colorimetric analysis ready"}
          </span>
        </button>

        {/* Segment 3: Catalog & Routine (Who) */}
        <button
          onClick={() => onSegmentClick("products")}
          className="flex-1 px-5 py-2.5 rounded-full hover:bg-surfaceSoft transition cursor-pointer text-left hidden md:block"
        >
          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink">
            AI Semantic Routine
          </span>
          <span className="block text-sm text-muted font-normal truncate mt-0.5">
            {productsCount} Curated Products Indexed
          </span>
        </button>

        {/* Rausch Search Orb Button */}
        <div className="pl-2 pr-1">
          <button
            onClick={onUploadClick}
            className="w-12 h-12 rounded-full bg-rausch hover:bg-rausch-active active:scale-95 transition-all text-white flex items-center justify-center shadow-md cursor-pointer group"
            title="Scan Face & Retrieve Routine"
          >
            <svg
              className="w-5 h-5 stroke-current stroke-2 group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
