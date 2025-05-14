"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define theme types
export type ThemeType = "library" | "cafe" | "minimalist" | "forest" | "night";

// Define sound types
export type SoundType = {
  id: string;
  name: string;
  file?: string;
  volume?: number;
  playing?: boolean;
};

// Define theme data structure
export type ThemeData = {
  value: ThemeType;
  label: string;
  backgroundImage: string;
  dataAiHint: string;
  ambientSounds: SoundType[];
  description: string;
};

// Theme context type
type ThemeContextType = {
  currentTheme: ThemeData;
  setTheme: (theme: ThemeType) => void;
  availableThemes: ThemeData[];
  playingSound: string | null;
  toggleSound: (soundId: string) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  isRainPlaying: boolean;
  toggleRain: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType | null>(null);

// Define available themes
const themes: ThemeData[] = [
  {
    value: "library",
    label: "Quiet Library",
    backgroundImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000",
    dataAiHint: "library bookshelf",
    description: "A peaceful library environment with soft lighting and rows of books.",
    ambientSounds: [
      { id: "pages", name: "Page Turning", file: "/sounds/page-turning.mp3" },
      { id: "whispers", name: "Soft Whispers", file: "/sounds/soft-whispers.mp3" },
    ],
  },
  {
    value: "cafe",
    label: "Cozy Café",
    backgroundImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000",
    dataAiHint: "cafe interior",
    description: "A warm café atmosphere with the gentle hum of conversation.",
    ambientSounds: [
      { id: "chatter", name: "Cafe Chatter", file: "/sounds/cafe-chatter.mp3" },
      { id: "coffee", name: "Coffee Machine", file: "/sounds/coffee-machine.mp3" },
    ],
  },
  {
    value: "minimalist",
    label: "Minimalist Focus",
    backgroundImage: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2000",
    dataAiHint: "minimalist workspace",
    description: "A clean, distraction-free workspace for maximum focus.",
    ambientSounds: [
      { id: "wind", name: "Gentle Wind", file: "/sounds/gentle-wind.mp3" },
      { id: "typing", name: "Keyboard Typing", file: "/sounds/keyboard-typing.mp3" },
    ],
  },
  {
    value: "forest",
    label: "Forest Retreat",
    backgroundImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000",
    dataAiHint: "forest nature",
    description: "A serene forest setting with natural light filtering through trees.",
    ambientSounds: [
      { id: "birds", name: "Bird Songs", file: "/sounds/bird-songs.mp3" },
      { id: "leaves", name: "Rustling Leaves", file: "/sounds/rustling-leaves.mp3" },
    ],
  },
  {
    value: "night",
    label: "Night Study",
    backgroundImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000",
    dataAiHint: "night desk lamp",
    description: "A cozy late-night study space with warm lamp lighting.",
    ambientSounds: [
      { id: "crickets", name: "Night Crickets", file: "/sounds/night-crickets.mp3" },
      { id: "fire", name: "Crackling Fire", file: "/sounds/crackling-fire.mp3" },
    ],
  },
];

// Provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeData>(themes[0]);
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isRainPlaying, setIsRainPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      // Load theme preference
      const savedTheme = localStorage.getItem("studyverse_theme");
      if (savedTheme) {
        const themeData = themes.find(t => t.value === savedTheme);
        if (themeData) setCurrentTheme(themeData);
      }

      // Load sound preferences
      const savedSound = localStorage.getItem("studyverse_sound");
      if (savedSound) setPlayingSound(savedSound);

      const savedMusicState = localStorage.getItem("studyverse_music");
      if (savedMusicState) setIsMusicPlaying(savedMusicState === "true");

      const savedRainState = localStorage.getItem("studyverse_rain");
      if (savedRainState) setIsRainPlaying(savedRainState === "true");
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("studyverse_theme", currentTheme.value);
      localStorage.setItem("studyverse_sound", playingSound || "");
      localStorage.setItem("studyverse_music", String(isMusicPlaying));
      localStorage.setItem("studyverse_rain", String(isRainPlaying));
    }
  }, [currentTheme, playingSound, isMusicPlaying, isRainPlaying, mounted]);

  // Set theme function
  const setTheme = (theme: ThemeType) => {
    const themeData = themes.find(t => t.value === theme);
    if (themeData) {
      setCurrentTheme(themeData);
      setPlayingSound(null); // Reset playing sound when theme changes
    }
  };

  // Toggle sound function
  const toggleSound = (soundId: string) => {
    if (playingSound === soundId) {
      setPlayingSound(null);
    } else {
      setPlayingSound(soundId);
    }
  };

  // Toggle music function
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Toggle rain function
  const toggleRain = () => {
    setIsRainPlaying(!isRainPlaying);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes: themes,
        playingSound,
        toggleSound,
        isMusicPlaying,
        toggleMusic,
        isRainPlaying,
        toggleRain,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
