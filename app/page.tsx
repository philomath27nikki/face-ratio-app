"use client";

import { useState } from "react";
import FaceRatioAnalyzer, { ActiveTab } from "@/components/FaceRatioAnalyzer";
import AirbnbHeader from "@/components/AirbnbHeader";
import AirbnbSearchPill from "@/components/AirbnbSearchPill";
import AirbnbFooter from "@/components/AirbnbFooter";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>("shape");
  const [uploadTrigger, setUploadTrigger] = useState<number>(0);

  const handleUploadClick = () => {
    setUploadTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col justify-between selection:bg-rausch/20 selection:text-rausch">
      <div>
        {/* 1. Airbnb Sticky 80px Navbar */}
        <AirbnbHeader
          activeTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
          onUploadClick={handleUploadClick}
        />

        {/* 2. Signature Airbnb 3-Segment Search Capsule */}
        <AirbnbSearchPill
          onSegmentClick={(segment) => setCurrentTab(segment)}
          onUploadClick={handleUploadClick}
        />

        {/* 3. Main Workspace Container */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <FaceRatioAnalyzer
            externalTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
            externalUploadTrigger={uploadTrigger}
          />
        </main>
      </div>

      {/* 4. Airbnb Clean Light Footer */}
      <AirbnbFooter />
    </div>
  );
}
