import FaceRatioAnalyzer from "@/components/FaceRatioAnalyzer";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-12 max-w-2xl">
          <p className="text-sm tracking-wide text-brass mb-2">phi = 1.618…</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            How closely does a face follow the golden ratio?
          </h1>
          <p className="text-ink/70 text-base leading-relaxed">
            Upload a front-facing photo. We measure the distances between
            your features and compare them against phi — the proportion
            long associated with balanced, classical form.
          </p>
        </header>
        <FaceRatioAnalyzer />
      </div>
    </main>
  );
}
