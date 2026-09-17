"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { POINTS, RatioResult, scoreRatios } from "@/lib/landmarks";

type Status = "loading" | "ready" | "error";

export default function FaceRatioAnalyzer() {
  const [status, setStatus] = useState<Status>("loading");
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [results, setResults] = useState<RatioResult[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [noFace, setNoFace] = useState(false);

  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "IMAGE",
          numFaces: 1
        });
        if (!cancelled) {
          landmarkerRef.current = landmarker;
          setStatus("ready");
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      landmarkerRef.current?.close();
    };
  }, []);

  const runDetection = useCallback((img: HTMLImageElement) => {
    const landmarker = landmarkerRef.current;
    const canvas = canvasRef.current;
    if (!landmarker || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const result = landmarker.detect(img);
    if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
      setNoFace(true);
      setResults(null);
      setScore(null);
      return;
    }
    setNoFace(false);

    const landmarks = result.faceLandmarks[0];

    // Faint full mesh
    ctx.fillStyle = "rgba(156,122,61,0.25)";
    const r = Math.max(1, canvas.width / 500);
    for (const p of landmarks) {
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Highlighted points actually used in the ratios
    ctx.fillStyle = "#26425E";
    const rBig = Math.max(2.5, canvas.width / 150);
    const used = Array.from(new Set(Object.values(POINTS)));
    for (const idx of used) {
      const p = landmarks[idx];
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, rBig, 0, Math.PI * 2);
      ctx.fill();
    }

    const { rows, overallScore } = scoreRatios(landmarks, canvas.width, canvas.height);
    setResults(rows);
    setScore(overallScore);
  }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImgSrc(url);

    const img = new Image();
    img.onload = () => runDetection(img);
    img.src = url;
  }

  return (
    <div className="grid md:grid-cols-[61.8%_38.2%] gap-8 items-start">
      <div className="relative bg-panel border border-line rounded-sm overflow-hidden">
        {imgSrc ? (
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc} alt="Uploaded face" className="w-full block" />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] flex items-center justify-center text-ink/40 text-sm">
            No photo yet
          </div>
        )}
      </div>

      <div className="bg-panel border border-line rounded-sm p-6">
        <div className="mb-5">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-medium bg-ink text-paper px-4 py-2 rounded-sm">
              Choose photo
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={status !== "ready"}
              className="hidden"
            />
          </label>
          <p className="text-xs text-ink/50 mt-2">
            {status === "loading" && "Loading model…"}
            {status === "ready" && "Model ready"}
            {status === "error" &&
              "Model failed to load — check your connection"}
          </p>
        </div>

        {noFace && (
          <p className="text-sm text-ink/70">
            No face detected. Try a clearer, front-facing photo.
          </p>
        )}

        {results && score !== null && (
          <div>
            <div className="flex items-baseline justify-between border-b border-line pb-4 mb-4">
              <span className="font-serif text-4xl text-brass">{score}</span>
              <span className="text-xs text-ink/50 max-w-[140px] text-right">
                out of 100 — average closeness to phi across all measurements
              </span>
            </div>
            <div className="space-y-3">
              {results.map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between text-sm border-b border-line/60 pb-3"
                >
                  <span className="text-ink/70">{r.label}</span>
                  <span
                    className={`font-medium tabular-nums ${
                      r.isClose ? "text-brass" : "text-ink"
                    }`}
                  >
                    {r.value.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
