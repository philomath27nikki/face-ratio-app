"use client";

import React from "react";

interface AirbnbHeaderProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  onUploadClick?: () => void;
}

export default function AirbnbHeader({
  activeTab,
  onTabChange,
  onUploadClick,
}: AirbnbHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-hairline/80 backdrop-blur-md bg-white/95 transition-all">
      {/* Main 80px Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange("shape")}>
          <div className="h-9 w-9 rounded-full bg-rausch flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533.992c1.786 3.398 3.528 7.377 5.176 11.83 1.967 5.319 2.54 9.176 1.705 11.47-.648 1.782-2.127 2.939-4.165 3.257-2.613.409-5.32-.733-7.999-3.415-2.678 2.682-5.385 3.824-7.999 3.415-2.037-.318-3.517-1.475-4.165-3.257-.835-2.294-.262-6.151 1.705-11.47 1.648-4.453 3.39-8.432 5.176-11.83l.533-.992C10.537 1.963 11.992 1 16 1zm0 2c-3.15 0-4.328 1.114-5.836 3.992l-.532.991c-1.611 3.064-3.327 6.985-4.949 11.371-1.854 5.011-2.288 8.441-1.602 10.327.425 1.17 1.397 1.928 2.872 2.158 2.05.321 4.382-.676 6.945-3.238l.652-.652.45.45c2.613 2.613 4.978 3.619 7.047 3.295 1.475-.23 2.447-.988 2.872-2.158.686-1.886.252-5.316-1.602-10.327-1.622-4.386-3.338-8.307-4.949-11.371l-.532-.991C20.328 4.114 19.15 3 16 3zm0 10.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-rausch hidden sm:inline-block">
            facebnb
          </span>
        </div>

        {/* Center: 3 Product Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-6">
          <button
            onClick={() => onTabChange("shape")}
            className={`relative py-2 px-3 text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "shape" || activeTab === "makeup" || activeTab === "goldenRatio"
                ? "text-ink border-b-2 border-ink pb-1 font-bold"
                : "text-muted hover:text-ink"
            }`}
          >
            <span>Geometry & Shape</span>
          </button>

          <button
            onClick={() => onTabChange("skin")}
            className={`relative py-2 px-3 text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "skin"
                ? "text-ink border-b-2 border-ink pb-1 font-bold"
                : "text-muted hover:text-ink"
            }`}
          >
            <span>Skin Health</span>
            <span className="rounded-full bg-rausch/10 text-rausch text-[9px] font-bold px-1.5 py-0.5 tracking-wider uppercase border border-rausch/20">
              NEW
            </span>
          </button>

          <button
            onClick={() => onTabChange("products")}
            className={`relative py-2 px-3 text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "products"
                ? "text-ink border-b-2 border-ink pb-1 font-bold"
                : "text-muted hover:text-ink"
            }`}
          >
            <span>Semantic Catalog</span>
            <span className="rounded-full bg-rausch/10 text-rausch text-[9px] font-bold px-1.5 py-0.5 tracking-wider uppercase border border-rausch/20">
              AI
            </span>
          </button>
        </nav>

        {/* Right: Actions & User Capsule */}
        <div className="flex items-center gap-3">
          <button
            onClick={onUploadClick}
            className="text-xs sm:text-sm font-medium text-ink px-3 py-2 rounded-full hover:bg-surfaceSoft transition hidden md:inline-block cursor-pointer"
          >
            Upload Portrait
          </button>

          {/* User Menu Capsule */}
          <div className="flex items-center gap-2 border border-hairline rounded-full py-1.5 px-3.5 hover:shadow-airbnb transition cursor-pointer bg-white">
            <svg
              className="w-4 h-4 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <div className="w-7 h-7 rounded-full bg-muted text-white flex items-center justify-center text-xs font-bold">
              👤
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
