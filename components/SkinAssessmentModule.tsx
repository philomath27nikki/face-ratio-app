"use client";

import React, { useState, useMemo } from "react";
import { SkinAnalysisResult } from "@/lib/skinAnalysis";
import {
  SkinType,
  SkinConcern,
  generateSkincareRoutine,
} from "@/lib/skincareRoutine";

interface SkinAssessmentModuleProps {
  analysis: SkinAnalysisResult | null;
  faceShape?: string;
}

const ALL_CONCERNS: SkinConcern[] = [
  "Acne & Blemishes",
  "Dark Spots & Hyperpigmentation",
  "Redness & Sensitivity",
  "Dullness & Uneven Texture",
  "Fine Lines & Anti-Aging",
  "Dehydration & Flakiness",
];

const SKIN_TYPES: SkinType[] = ["Oily", "Combination", "Normal", "Dry", "Sensitive"];

export default function SkinAssessmentModule({
  analysis,
  faceShape,
}: SkinAssessmentModuleProps) {
  const initialSkinType: SkinType = useMemo(() => {
    if (!analysis) return "Combination";
    if (analysis.rednessCondition === "Noticeable (Sensitive / Rosacea)") return "Sensitive";
    if (analysis.tZoneCondition === "High Shine (Oily)") return "Oily";
    if (analysis.tZoneCondition === "Matte" && analysis.hydrationEstimate === "Dehydrated / Dry") return "Dry";
    if (analysis.tZoneShineScore > 58) return "Combination";
    return "Normal";
  }, [analysis]);

  const detectedConcerns = useMemo<SkinConcern[]>(() => {
    const list: SkinConcern[] = [];
    if (!analysis) return ["Dullness & Uneven Texture"];

    // 1. High Shine -> Acne & Blemishes
    if (analysis.tZoneShineScore > 62 || analysis.tZoneCondition === "High Shine (Oily)") {
      list.push("Acne & Blemishes");
    }

    // 2. Erythema / Redness -> Redness & Sensitivity
    if (analysis.erythemaScore > 42 || analysis.rednessCondition.includes("Noticeable") || analysis.rednessCondition.includes("Moderate")) {
      list.push("Redness & Sensitivity");
    }

    // 3. Dehydration / Low Moisture -> Dehydration & Flakiness
    if (analysis.hydrationEstimate === "Dehydrated / Dry" || analysis.tZoneShineScore < 36) {
      list.push("Dehydration & Flakiness");
    }

    // 4. Melanin & Tone Analysis -> Dark Spots & Hyperpigmentation
    const patchLuminanceDelta = Math.abs(analysis.metrics.forehead.luminance - analysis.metrics.leftCheek.luminance);
    if (patchLuminanceDelta > 16 || analysis.fitzpatrickScale === "Type IV" || analysis.fitzpatrickScale === "Type V") {
      list.push("Dark Spots & Hyperpigmentation");
    }

    // 5. Texture / Dullness
    if (list.length < 2 || analysis.metrics.chin.luminance < 125) {
      list.push("Dullness & Uneven Texture");
    }

    return list;
  }, [analysis]);

  // Both Skin Type and Skin Concerns are strictly auto-diagnosed by Vision AI (not user-toggleable)
  const selectedSkinType: SkinType = initialSkinType;
  const selectedConcerns: SkinConcern[] = detectedConcerns;
  const [activeTab, setActiveTab] = useState<"AM" | "PM" | "weekly">("AM");

  const routine = useMemo(() => {
    return generateSkincareRoutine(selectedSkinType, selectedConcerns);
  }, [selectedSkinType, selectedConcerns]);

  return (
    <div className="space-y-6">
      {/* 1. Computer Vision Diagnostic Metrics */}
      {analysis ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tone & Hex Card */}
          <div className="rounded-[14px] border border-hairline bg-white p-4 shadow-sm hover:shadow-airbnb transition space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Skin Tone & Melanin
              </span>
              <div
                className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                style={{ backgroundColor: analysis.hexColor }}
                title={`Sampled Hex: ${analysis.hexColor}`}
              />
            </div>
            <div>
              <p className="text-base font-bold text-ink">
                {analysis.skinTone} Tone
              </p>
              <p className="text-xs text-muted font-mono mt-0.5">
                Fitzpatrick {analysis.fitzpatrickScale} • {analysis.hexColor.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Undertone Card */}
          <div className="rounded-[14px] border border-hairline bg-white p-4 shadow-sm hover:shadow-airbnb transition space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
              Colorimetric Undertone
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-ink">
                  {analysis.undertone}
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rausch/10 text-rausch border border-rausch/20">
                  {analysis.undertoneConfidence}% conf
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">
                {analysis.undertone === "Warm"
                  ? "Golden/yellow dermal hue"
                  : analysis.undertone === "Cool"
                  ? "Rose/berry dermal hue"
                  : "Balanced dual pigments"}
              </p>
            </div>
          </div>

          {/* T-Zone Shine Index */}
          <div className="rounded-[14px] border border-hairline bg-white p-4 shadow-sm hover:shadow-airbnb transition space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                T-Zone Shine Index
              </span>
              <span className="text-xs font-bold text-ink">
                {analysis.tZoneShineScore}%
              </span>
            </div>
            <div>
              <div className="h-1.5 w-full bg-surfaceSoft rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full ${
                    analysis.tZoneShineScore > 68
                      ? "bg-amber-500"
                      : analysis.tZoneShineScore < 38
                      ? "bg-blue-400"
                      : "bg-rausch"
                  }`}
                  style={{ width: `${analysis.tZoneShineScore}%` }}
                />
              </div>
              <p className="text-xs font-medium text-ink">
                {analysis.tZoneCondition}
              </p>
            </div>
          </div>

          {/* Cheek Redness / Erythema */}
          <div className="rounded-[14px] border border-hairline bg-white p-4 shadow-sm hover:shadow-airbnb transition space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Cheek Erythema
              </span>
              <span className="text-xs font-bold text-ink">
                {analysis.erythemaScore}%
              </span>
            </div>
            <div>
              <div className="h-1.5 w-full bg-surfaceSoft rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full rounded-full bg-rausch"
                  style={{ width: `${analysis.erythemaScore}%` }}
                />
              </div>
              <p className="text-xs font-medium text-ink truncate">
                {analysis.rednessCondition}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-[14px] border border-hairline bg-surfaceSoft p-4 text-xs text-muted">
          Upload a portrait to calculate real-time computer vision skin tone, undertone, and T-zone shine.
        </div>
      )}

      {/* 2. Clinical Diagnostic Questionnaire */}
      <div className="rounded-[14px] border border-hairline bg-white p-5 space-y-5 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-ink">
            Clinical Diagnostic Questionnaire
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Refine your skin profile to generate active ingredient recommendations.
          </p>
        </div>

        {/* 1. Identified Skin Type (Locked / Auto-Diagnosed by Vision AI) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              1. Identified Skin Type
            </label>
            <span className="text-[11px] font-semibold text-rausch flex items-center gap-1 bg-rausch/10 px-2.5 py-0.5 rounded-full border border-rausch/20">
              <span>🔒</span> Auto-Diagnosed via Vision AI
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {SKIN_TYPES.map((type) => {
              const isDiagnosed = selectedSkinType === type;
              return (
                <div
                  key={type}
                  className={`text-xs px-4 py-2 rounded-full font-medium select-none flex items-center gap-1.5 transition-all ${
                    isDiagnosed
                      ? "bg-ink text-white font-bold shadow-sm ring-2 ring-rausch/30"
                      : "bg-surfaceSoft/70 text-mutedSoft border border-hairline/60 cursor-not-allowed opacity-60"
                  }`}
                  title={isDiagnosed ? `Auto-diagnosed as ${type} based on facial metrics` : `Not diagnosed (${type})`}
                >
                  {isDiagnosed && <span className="text-rausch">✓</span>}
                  <span>{type}</span>
                  {isDiagnosed && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rausch text-white font-bold">
                      Diagnosed
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-muted mt-2">
            Objectively classified from T-zone sebum reflectance ({analysis?.tZoneShineScore ?? 50}%) and cheek erythema ({analysis?.erythemaScore ?? 20}%). Manual override is disabled to maintain clinical diagnostic accuracy.
          </p>
        </div>

        {/* 2. Detected Skin Concerns (Locked / Auto-Diagnosed by Vision AI) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              2. Detected Skin Concerns
            </label>
            <span className="text-[11px] font-semibold text-rausch flex items-center gap-1 bg-rausch/10 px-2.5 py-0.5 rounded-full border border-rausch/20">
              <span>🔒</span> Auto-Diagnosed via Vision AI
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {ALL_CONCERNS.map((concern) => {
              const isDetected = selectedConcerns.includes(concern);
              return (
                <div
                  key={concern}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium select-none flex items-center gap-1.5 transition-all ${
                    isDetected
                      ? "bg-ink text-white font-bold shadow-sm ring-2 ring-rausch/30"
                      : "bg-surfaceSoft/70 text-mutedSoft border border-hairline/60 cursor-not-allowed opacity-60"
                  }`}
                  title={isDetected ? `Auto-detected concern: ${concern}` : `Not detected (${concern})`}
                >
                  <span className={isDetected ? "text-rausch" : ""}>{isDetected ? "✓" : "–"}</span>
                  <span>{concern}</span>
                  {isDetected && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rausch text-white font-bold">
                      Detected
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-muted mt-2">
            Diagnosed based on cheek erythema vascular flushing, T-zone sebum reflectance, and phototype melanin dispersion. Manual selection is disabled.
          </p>
        </div>
      </div>

      {/* 3. Hero Active Ingredients Callout */}
      <div className="rounded-[14px] border border-hairline bg-surfaceSoft p-4">
        <div className="flex items-start gap-3">
          <span className="text-rausch font-bold text-lg">✦</span>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-1">
              Active Dermatological Ingredients for Your Profile:
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {routine.heroIngredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-white border border-hairline text-ink shadow-2xs"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Morning & Evening Routine Steps */}
      <div className="rounded-[14px] border border-hairline bg-white p-5 space-y-4 shadow-sm">
        {/* Routine Tab Switcher */}
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("AM")}
              className={`text-xs px-4 py-2 rounded-full font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "AM"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-surfaceSoft text-muted hover:text-ink"
              }`}
            >
              <span>☀️</span> Morning Regimen (AM)
            </button>
            <button
              onClick={() => setActiveTab("PM")}
              className={`text-xs px-4 py-2 rounded-full font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "PM"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-surfaceSoft text-muted hover:text-ink"
              }`}
            >
              <span>🌙</span> Evening Regimen (PM)
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`text-xs px-4 py-2 rounded-full font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "weekly"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-surfaceSoft text-muted hover:text-ink"
              }`}
            >
              <span>✨</span> Weekly Treatments
            </button>
          </div>

          <span className="text-xs text-muted hidden sm:inline-block">
            {activeTab === "AM" ? "4 Protective Steps" : activeTab === "PM" ? "4 Restorative Steps" : "2 Booster Cycles"}
          </span>
        </div>

        {/* Steps List */}
        {activeTab !== "weekly" ? (
          <div className="space-y-3">
            {(activeTab === "AM" ? routine.amRoutine : routine.pmRoutine).map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-airbnbSm border border-hairline bg-surfaceSoft p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold text-rausch">
                      {step.category}
                    </span>
                    <span className="text-xs font-bold text-ink">
                      {step.stepName}
                    </span>
                  </div>
                  <p className="text-xs text-body pl-7">
                    {step.purpose}
                  </p>
                  <p className="text-[11px] text-muted pl-7">
                    <strong>Tip:</strong> {step.usageTip}
                  </p>
                </div>

                <div className="pl-7 sm:pl-0 flex flex-wrap gap-1">
                  {step.keyIngredients.map((k, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-hairline text-muted"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {routine.weeklyTreatments.map((treatment, i) => (
              <div
                key={i}
                className="rounded-airbnbSm border border-hairline bg-surfaceSoft p-4 flex items-start gap-3"
              >
                <span className="text-rausch font-bold">✦</span>
                <p className="text-xs text-body leading-relaxed font-medium">
                  {treatment}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Precautions */}
        <div className="pt-3 border-t border-hairline">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1.5">
            Dermatological Usage Precautions:
          </p>
          <ul className="space-y-1">
            {routine.safetyNotes.map((note, idx) => (
              <li key={idx} className="text-[11px] text-muted flex items-start gap-1.5">
                <span className="text-rausch">⚠</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
