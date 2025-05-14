"use client";

import { useState } from "react";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Palette } from "lucide-react";

export default function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Palette className="h-5 w-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Change Theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choose Study Environment</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-2 py-4">
          {availableThemes.map((theme) => (
            <Button
              key={theme.value}
              variant={currentTheme.value === theme.value ? "default" : "outline"}
              className={`justify-start h-auto py-3 px-4 ${
                currentTheme.value === theme.value ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => {
                setTheme(theme.value as ThemeType);
                setIsOpen(false);
              }}
            >
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">{theme.label}</span>
                <span className="text-xs opacity-80 mt-1">{theme.description}</span>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
