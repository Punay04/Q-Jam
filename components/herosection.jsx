import React from "react";
import HeroLeft from "./heroleft";
import HeroRight from "./heroright";

const HeroSection = () => {
  return (
    <main className="min-h-screen bg--black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-30 p-10">
        <HeroLeft />
        <HeroRight />
      </div>
    </main>
  );
};

export default HeroSection;
