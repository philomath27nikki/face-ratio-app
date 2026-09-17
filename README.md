# Golden Ratio Face Analysis

Next.js port of the browser prototype. Detects 468 facial landmarks with
MediaPipe FaceLandmarker (runs entirely client-side — no server, no photo
upload to any backend) and compares five classic proportions against phi.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Structure

- `lib/landmarks.ts` — landmark indices, ratio definitions, scoring math
  (this is the part to edit if you add/change which ratios are measured)
- `components/FaceRatioAnalyzer.tsx` — upload flow, detection, canvas
  overlay, results panel
- `app/page.tsx` — page copy and layout

## Notes

- The model (~3.76MB) and WASM runtime load from jsdelivr/Google Cloud
  Storage on first use each session. Consider self-hosting those files in
  `/public` before shipping, to avoid depending on third-party CDN uptime.
- `delegate: "GPU"` in `FaceRatioAnalyzer.tsx` can be switched to `"CPU"`
  if you see WebGL-related errors in some browsers.
