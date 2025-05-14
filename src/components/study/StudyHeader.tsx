"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LogOut, Music2, CloudRain, Settings } from "lucide-react";
import { useState, useEffect } from "react";


export default function StudyHeader() {
  const [isLofiOn, setIsLofiOn] = useState(true);
  const [isRainOn, setIsRainOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <header className="shrink-0 h-16 flex items-center justify-between px-4 md:px-6 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        {/* Using Settings icon as a placeholder for Studyverse specific logo if needed */}
        <Settings className="h-6 w-6 text-primary" /> 
        <span className="text-lg font-semibold text-foreground">Studyverse's Lofi Cafe</span>
      </div>
      <nav className="flex items-center gap-4 md:gap-6">
        {mounted && (
          <>
            <div className="flex items-center space-x-2">
              <Music2 className="h-5 w-5 text-primary/80" />
              <Label htmlFor="lofi-toggle" className="text-sm text-muted-foreground sr-only md:not-sr-only">
                LoFi
              </Label>
              <Switch
                id="lofi-toggle"
                checked={isLofiOn}
                onCheckedChange={setIsLofiOn}
                aria-label="Toggle LoFi music"
              />
            </div>
            <div className="flex items-center space-x-2">
              <CloudRain className="h-5 w-5 text-primary/80" />
              <Label htmlFor="rain-toggle" className="text-sm text-muted-foreground sr-only md:not-sr-only">
                Rain
              </Label>
              <Switch
                id="rain-toggle"
                checked={isRainOn}
                onCheckedChange={setIsRainOn}
                aria-label="Toggle rain sound"
              />
            </div>
          </>
        )}
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link href="/">
            <LogOut className="mr-1.5 h-4 w-4" /> Leave
          </Link>
        </Button>
      </nav>
    </header>
  );
}
