"use client";

import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// This component simulates audio playback for the study environment
// In a real implementation, it would actually play audio files
export default function AudioPlayer() {
  const {
    playingSound,
    isMusicPlaying,
    isRainPlaying
  } = useTheme();

  // Log audio state changes for demonstration
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (playingSound) {
      console.log(`Playing ambient sound: ${playingSound}`);
    }

    if (isMusicPlaying) {
      console.log("Playing lofi music");
    }

    if (isRainPlaying) {
      console.log("Playing rain sounds");
    }

  }, [playingSound, isMusicPlaying, isRainPlaying]);

  // This component doesn't render anything visible
  return null;
}
