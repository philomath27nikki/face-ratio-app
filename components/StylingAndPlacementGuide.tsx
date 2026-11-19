"use client";

import React, { useState } from "react";
import { FaceShape } from "@/lib/faceShape";
import { getStylingBlueprint, PlacementZone } from "@/lib/stylingGuide";

interface StylingAndPlacementGuideProps {
  faceShape: FaceShape;
  detectedUndertone?: "Cool" | "Warm" | "Neutral";
}

type GuideSection = "zones" | "hair" | "eyewear" | "dosDonts" | "colors";

export default function StylingAndPlacementGuide({
  faceShape,
  detectedUndertone = "Neutral",
}: StylingAndPlacementGuideProps) {
  const [activeSection, setActiveSection] = useState<GuideSection>("zones");
  const [selectedZone, setSelectedZone] = useState<number>(0);

  const blueprint = getStylingBlueprint(faceShape);
  const currentUndertoneKey = (detectedUndertone.toLowerCase() as "warm" | "cool" | "neutral") || "neutral";
  const colors = blueprint.colorHarmonization[currentUndertoneKey] || blueprint.colorHarmonization.neutral;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Optical Goal */}
      <div className="rounded-[14px] border border-hairline bg-surfaceSoft p-5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Anthropometric Optical Blueprint
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-rausch/10 text-rausch font-bold border border-rausch/20">
            {blueprint.shape} Face Architecture
          </span>
        </div>
        <h3 className="text-base font-bold text-ink">
          Strategic Objective:
        </h3>
        <p className="text-xs text-body leading-relaxed">
          {blueprint.opticalGoal}
        </p>
      </div>

      {/* 2. Airbnb Sub-Navigation Tabs */}
      <div className="flex border-b border-hairline gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "zones" as GuideSection, label: "Makeup Placement Zones", icon: "💄" },
          { id: "hair" as GuideSection, label: "Hairstyles & Cuts", icon: "✂️" },
          { id: "eyewear" as GuideSection, label: "Eyewear & Glasses", icon: "👓" },
          { id: "dosDonts" as GuideSection, label: "Do's & Don'ts", icon: "📋" },
          { id: "colors" as GuideSection, label: `Colors (${detectedUndertone} Tone)`, icon: "🎨" },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`text-xs px-3.5 py-2 rounded-full font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? "bg-ink text-white shadow-sm"
                  : "bg-surfaceSoft text-body hover:bg-hairlineSoft border border-transparent"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: MAKEUP PLACEMENT ZONES */}
      {activeSection === "zones" && (
        <div className="space-y-4">
          {/* Zone Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {blueprint.zones.map((zone, idx) => {
              const isSelected = selectedZone === idx;
              return (
                <button
                  key={zone.zoneName}
                  onClick={() => setSelectedZone(idx)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-rausch text-white font-bold shadow-sm"
                      : "bg-white border border-hairline text-ink hover:bg-surfaceSoft"
                  }`}
                >
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 font-bold">
                    {zone.category}
                  </span>
                  <span>{zone.zoneName}</span>
                </button>
              );
            })}
          </div>

          {/* Active Zone Detail Card */}
          {blueprint.zones[selectedZone] && (
            <div className="rounded-[14px] border border-hairline bg-white p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rausch/10 text-rausch font-bold uppercase tracking-wider">
                    {blueprint.zones[selectedZone].category}
                  </span>
                  <h4 className="text-base font-bold text-ink">
                    {blueprint.zones[selectedZone].zoneName}
                  </h4>
                </div>
                <span className="text-xs font-mono text-muted">
                  Zone {selectedZone + 1} of {blueprint.zones.length}
                </span>
              </div>

              {/* Target Region & Placement Rule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-airbnbSm bg-surfaceSoft border border-hairline space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                    📍 Target Anatomical Region
                  </span>
                  <p className="text-xs text-body leading-relaxed">
                    {blueprint.zones[selectedZone].targetRegion}
                  </p>
                </div>

                <div className="p-3.5 rounded-airbnbSm bg-surfaceSoft border border-hairline space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                    📐 Precision Placement Rule
                  </span>
                  <p className="text-xs text-body leading-relaxed">
                    {blueprint.zones[selectedZone].placementRule}
                  </p>
                </div>
              </div>

              {/* Brush Technique & Pro Tip */}
              <div className="p-4 rounded-airbnbSm bg-emerald-50/60 border border-emerald-200/60 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold text-sm">🖌️</span>
                  <div>
                    <span className="font-bold text-emerald-900 block">Brush & Application Technique:</span>
                    <p className="text-emerald-800 leading-relaxed mt-0.5">
                      {blueprint.zones[selectedZone].brushTechnique}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-emerald-200/40">
                  <span className="text-emerald-600 font-bold text-sm">💡</span>
                  <div>
                    <span className="font-bold text-emerald-900 block">Artist Pro-Tip:</span>
                    <p className="text-emerald-800 leading-relaxed mt-0.5">
                      {blueprint.zones[selectedZone].proTip}
                    </p>
                  </div>
                </div>
              </div>

              {/* What to Avoid */}
              <div className="p-3.5 rounded-airbnbSm bg-rose-50/60 border border-rose-200/60 flex items-start gap-2 text-xs text-rose-900">
                <span className="text-rose-600 font-bold text-sm">⚠️</span>
                <div>
                  <span className="font-bold block">What to Avoid for {blueprint.shape} Shape:</span>
                  <p className="text-rose-800 mt-0.5">
                    {blueprint.zones[selectedZone].avoidRule}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: HAIRSTYLES & CUTS */}
      {activeSection === "hair" && (
        <div className="rounded-[14px] border border-hairline bg-white p-5 space-y-5 shadow-sm">
          <div>
            <h4 className="text-base font-bold text-ink">
              Hairstyles & Haircuts for {blueprint.shape} Face
            </h4>
            <p className="text-xs text-muted mt-0.5">
              {blueprint.hairstyles.reason}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recommended Cuts */}
            <div className="rounded-airbnbSm border border-emerald-200/80 bg-emerald-50/30 p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <span>✓</span> Flattering Haircuts
              </span>
              <ul className="space-y-2">
                {blueprint.hairstyles.recommended.map((cut, idx) => (
                  <li key={idx} className="text-xs text-body flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span className="font-medium text-ink">{cut}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuts to Avoid */}
            <div className="rounded-airbnbSm border border-rose-200/80 bg-rose-50/30 p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                <span>✕</span> Haircuts to Avoid
              </span>
              <ul className="space-y-2">
                {blueprint.hairstyles.avoid.map((cut, idx) => (
                  <li key={idx} className="text-xs text-body flex items-start gap-2">
                    <span className="text-rose-600 font-bold mt-0.5">•</span>
                    <span className="text-ink">{cut}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: EYEWEAR & GLASSES */}
      {activeSection === "eyewear" && (
        <div className="rounded-[14px] border border-hairline bg-white p-5 space-y-5 shadow-sm">
          <div>
            <h4 className="text-base font-bold text-ink">
              Eyewear & Glasses Frame Architecture
            </h4>
            <p className="text-xs text-muted mt-0.5">
              {blueprint.eyewear.balanceReason}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-airbnbSm border border-hairline bg-surfaceSoft p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rausch flex items-center gap-1.5">
                <span>👓</span> Ideal Frame Shapes
              </span>
              <ul className="space-y-2">
                {blueprint.eyewear.recommendedFrames.map((frame, idx) => (
                  <li key={idx} className="text-xs text-ink font-medium flex items-center gap-2">
                    <span className="text-rausch font-bold">✓</span> {frame}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-airbnbSm border border-hairline bg-surfaceSoft p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <span>🚫</span> Frames to Avoid
              </span>
              <ul className="space-y-2">
                {blueprint.eyewear.avoidFrames.map((frame, idx) => (
                  <li key={idx} className="text-xs text-muted flex items-center gap-2">
                    <span>✕</span> {frame}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: DO'S & DON'TS MATRIX */}
      {activeSection === "dosDonts" && (
        <div className="rounded-[14px] border border-hairline bg-white p-5 space-y-5 shadow-sm">
          <div>
            <h4 className="text-base font-bold text-ink">
              Styling Rules of Thumb for {blueprint.shape}
            </h4>
            <p className="text-xs text-muted mt-0.5">
              Key habits to accentuate bone structure and avoid common application mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-airbnbSm border border-hairline bg-surfaceSoft p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <span>✓</span> Always Do
              </span>
              <ul className="space-y-2.5">
                {blueprint.dosAndDonts.dos.map((item, idx) => (
                  <li key={idx} className="text-xs text-body flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✦</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-airbnbSm border border-hairline bg-surfaceSoft p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <span>✕</span> Never Do
              </span>
              <ul className="space-y-2.5">
                {blueprint.dosAndDonts.donts.map((item, idx) => (
                  <li key={idx} className="text-xs text-body flex items-start gap-2">
                    <span className="text-rose-600 font-bold mt-0.5">✕</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: COLOR HARMONIZER TIED TO UNDERTONE */}
      {activeSection === "colors" && (
        <div className="rounded-[14px] border border-hairline bg-white p-5 space-y-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-ink">
                Pigment Harmonization for {detectedUndertone} Undertone
              </h4>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rausch/10 text-rausch font-bold">
                Auto-Matched to Vision Scan
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Curated cosmetic pigment shades formulated to flatter both your {blueprint.shape} geometry and biological {detectedUndertone.toLowerCase()} undertone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-airbnbSm bg-surfaceSoft border border-hairline space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Contour & Bronzer
              </span>
              <p className="text-sm font-bold text-ink">
                {colors.contour}
              </p>
              <span className="text-[10px] text-muted block">Simulates biological bone shadow</span>
            </div>

            <div className="p-3.5 rounded-airbnbSm bg-surfaceSoft border border-hairline space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Blush Pigment
              </span>
              <p className="text-sm font-bold text-ink">
                {colors.blush}
              </p>
              <span className="text-[10px] text-muted block">Enlivens natural dermal flush</span>
            </div>

            <div className="p-3.5 rounded-airbnbSm bg-surfaceSoft border border-hairline space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Strobing Highlighter
              </span>
              <p className="text-sm font-bold text-ink">
                {colors.highlight}
              </p>
              <span className="text-[10px] text-muted block">Radiant reflective finish</span>
            </div>

            <div className="p-3.5 rounded-airbnbSm bg-surfaceSoft border border-hairline space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Harmonious Lip Tone
              </span>
              <p className="text-sm font-bold text-ink">
                {colors.lips}
              </p>
              <span className="text-[10px] text-muted block">Balances lower third symmetry</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
