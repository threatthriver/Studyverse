
"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

export default function MainStudyArea() {
  const { currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch by only showing the themed content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Show a simple placeholder during SSR/initial load
    return (
      <div className="flex-grow relative overflow-hidden bg-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow relative overflow-hidden">
      <Image
        src={currentTheme.backgroundImage}
        alt={`${currentTheme.label} study environment`}
        fill
        style={{ objectFit: "cover" }}
        data-ai-hint={currentTheme.dataAiHint}
        priority
        className="opacity-90 transition-all duration-1000 ease-in-out"
      />
      {/* Vignette or overlay for better text readability on top */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 pointer-events-none"></div>
      {/* RoomTitleBar and MediaControlsBar will be placed by the parent layout */}
    </div>
  );
}
