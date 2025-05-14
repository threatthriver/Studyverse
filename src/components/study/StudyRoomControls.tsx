"use client";

// This component is currently not used in the new study page layout.
// Its functionality (theme/sound selection) might be integrated elsewhere
// (e.g., StudyNavPanel or StudyHeader) if needed in the future.
// For now, it's kept in case parts of its logic are useful later.

import { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Library, Coffee, Wind, Volume2, VolumeX, Sun, Moon, Users as LucideUsers, MessageSquare as LucideMessageSquare, CloudRain as LucideCloudRain, BookOpenCheck as LucideBookOpenCheck } from "lucide-react";

// Aliasing imported icons to avoid naming conflicts and for clarity
const BookOpenCheckIcon = LucideBookOpenCheck; 
const UsersIcon = LucideUsers; 
const MessageSquareIcon = LucideMessageSquare;
const CloudRainIcon = LucideCloudRain;


type Theme = "library" | "cafe" | "minimalist" | "custom";
interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ReactNode;
  backgroundImage: string;
  dataAiHint: string;
  ambientSounds: SoundOption[];
}
interface SoundOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  // file: string; // Path to sound file, for future implementation
}


const themes: ThemeOption[] = [
  {
    value: "library",
    label: "Quiet Library",
    icon: <Library className="mr-2 h-5 w-5" />,
    backgroundImage: "https://placehold.co/1200x300/8D6E63/FFFFFF.png?text=Library+Background",
    dataAiHint: "library bookshelf",
    ambientSounds: [
      { id: "pages", name: "Page Turning", icon: <BookOpenCheckIcon className="mr-2 h-4 w-4" /> },
      { id: "whispers", name: "Soft Whispers", icon: <UsersIcon className="mr-2 h-4 w-4" /> },
    ],
  },
  {
    value: "cafe",
    label: "Cozy Café",
    icon: <Coffee className="mr-2 h-5 w-5" />,
    backgroundImage: "https://placehold.co/1200x300/A1887F/FFFFFF.png?text=Cafe+Background",
    dataAiHint: "cafe interior",
    ambientSounds: [
      { id: "chatter", name: "Cafe Chatter", icon: <MessageSquareIcon className="mr-2 h-4 w-4" /> },
      { id: "coffee", name: "Coffee Machine", icon: <Coffee className="mr-2 h-4 w-4" /> },
    ],
  },
  {
    value: "minimalist",
    label: "Minimalist Focus",
    icon: <Sun className="mr-2 h-5 w-5" />, // Or Moon for dark mode
    backgroundImage: "https://placehold.co/1200x300/ECEFF1/37474F.png?text=Minimalist+Background",
    dataAiHint: "minimalist workspace",
    ambientSounds: [
      { id: "wind", name: "Gentle Wind", icon: <Wind className="mr-2 h-4 w-4" /> },
      { id: "rain", name: "Light Rain", icon: <CloudRainIcon className="mr-2 h-4 w-4" /> },
    ],
  },
];


export default function StudyRoomControls() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0].value);
  const [currentBackground, setCurrentBackground] = useState(themes[0].backgroundImage);
  const [currentAiHint, setCurrentAiHint] = useState(themes[0].dataAiHint);
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const currentThemeData = themes.find(t => t.value === selectedTheme) || themes[0];

  useEffect(() => {
    const theme = themes.find((t) => t.value === selectedTheme);
    if (theme) {
      setCurrentBackground(theme.backgroundImage);
      setCurrentAiHint(theme.dataAiHint);
      // document.documentElement.style.setProperty('--room-background-image', `url(${theme.backgroundImage})`);
    }
  }, [selectedTheme]);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value as Theme);
    setPlayingSound(null); 
  };

  const toggleSound = (soundId: string) => {
    if (playingSound === soundId) {
      setPlayingSound(null);
      console.log(`Stopped sound: ${soundId}`);
    } else {
      setPlayingSound(soundId);
      console.log(`Playing sound: ${soundId}`);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-card rounded-lg shadow-xl">
      <div 
        className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-inner bg-cover bg-center transition-all duration-500 ease-in-out"
      >
        <Image
            src={currentBackground}
            alt={`${currentThemeData.label} background`}
            layout="fill"
            objectFit="cover"
            data-ai-hint={currentAiHint}
            className="transition-opacity duration-500 ease-in-out"
            key={currentBackground}
          />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">{currentThemeData.label}</h2>
        </div>
      </div>

      <div>
        <Label htmlFor="theme-select" className="text-lg font-semibold mb-2 block text-foreground">
          Room Theme
        </Label>
        <Select value={selectedTheme} onValueChange={handleThemeChange}>
          <SelectTrigger id="theme-select" className="w-full text-base py-3">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.value} value={theme.value} className="text-base py-2">
                <div className="flex items-center">
                  {theme.icon}
                  {theme.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-lg font-semibold mb-2 block text-foreground">Ambient Sounds</Label>
        {currentThemeData.ambientSounds.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentThemeData.ambientSounds.map((sound) => (
              <Button
                key={sound.id}
                variant={playingSound === sound.id ? "default" : "outline"}
                onClick={() => toggleSound(sound.id)}
                className="flex items-center justify-center gap-2 transition-all duration-200 ease-in-out text-sm md:text-base"
              >
                {playingSound === sound.id ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                {sound.name}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No ambient sounds for this theme.</p>
        )}
      </div>
       <p className="text-xs text-muted-foreground text-center pt-4">Note: Full audio functionality requires backend integration for sound streaming.</p>
    </div>
  );
}
