
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings, UserPlus, Palette, LogOut } from "lucide-react";
import ThemeSelector from "@/components/study/ThemeSelector";
import ColorCustomizer from "@/components/settings/ColorCustomizer";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const participants = [
  { name: "Kei", seed: "KE", online: true, hint: "student glasses" },
  { name: "Yumi", seed: "YU", online: true, hint: "woman hijab" },
  { name: "Alex", seed: "AL", online: true, hint: "person headphones" },
  { name: "예수", seed: "예", online: false, hint: "korean student" }, // Korean name
  { name: "Chloe", seed: "CH", online: true, hint: "girl smiling" },
  { name: "Kenji", seed: "KJ", online: true, hint: "anime character" },
  { name: "Omar", seed: "OM", online: true, hint: "man beard" },
  { name: "Sofia", seed: "SO", online: false, hint: "woman curly_hair" },
  { name: "Sam", seed: "SA", online: true, hint: "alien cute" },
];

export default function StudyNavPanel() {
  const [accentColor, setAccentColor] = useState("#7C3AED");
  const [mounted, setMounted] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();

  // Load saved accent color on mount
  useEffect(() => {
    setMounted(true);
    const savedColor = localStorage.getItem('studyverse_accent_color');
    if (savedColor) {
      setAccentColor(savedColor);
      document.documentElement.style.setProperty('--primary', savedColor);
    }
  }, []);

  const handleLogout = () => {
    logout();
    // Set a cookie to track logout for middleware
    document.cookie = "studyverse_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/login');
  };
  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-20 bg-sidebar-background flex flex-col items-center justify-between py-4 border-r border-sidebar-border">
        <ScrollArea className="w-full">
          <div className="flex flex-col items-center gap-3 px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar
                  className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all ring-2 ring-green-500"
                  onClick={() => console.log("My avatar clicked")}
                >
                  <AvatarImage src="https://placehold.co/60x60/7E57C2/FFFFFF.png?text=ME" alt="My Avatar" data-ai-hint="avatar person" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>You (Kei)</p>
              </TooltipContent>
            </Tooltip>

            {participants.map((p, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="relative" onClick={() => console.log(`Participant ${p.name} clicked`)}>
                    <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                      <AvatarImage src={`https://placehold.co/60x60/${p.online ? '4CAF50' : '9E9E9E'}/FFFFFF.png?text=${p.seed}`} alt={p.name} data-ai-hint={p.hint}/>
                      <AvatarFallback>{p.seed}</AvatarFallback>
                    </Avatar>
                    {p.online && (
                       <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-sidebar-background" title="Online"></span>
                    )}
                     {!p.online && (
                       <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-500 ring-2 ring-sidebar-background" title="Offline"></span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{p.name} ({p.online ? "Online" : "Offline"})</p>
                </TooltipContent>
              </Tooltip>
            ))}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-12 w-12 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-2 border-dashed border-sidebar-border/50"
                  onClick={() => console.log("Invite people button clicked")}
                >
                  <UserPlus className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Invite People</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </ScrollArea>

        <div className="flex flex-col items-center gap-3 mt-auto pt-4">
          {/* Theme Selector */}
          <ThemeSelector />

          {/* Color Customizer */}
          <ColorCustomizer
            currentColor={accentColor}
            onColorChange={(color) => {
              setAccentColor(color);
              // Apply the color to CSS variables
              document.documentElement.style.setProperty('--primary', color);
              // Save to localStorage
              localStorage.setItem('studyverse_accent_color', color);
            }}
          />

          {/* Settings Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={() => console.log("Settings button clicked")}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          {/* Logout Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 text-sidebar-foreground hover:bg-red-500/20 hover:text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
