
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Keep progress for potential future use, but not directly visible in new design
import { BellRing, Play, Pause, RotateCcw, Coffee, Brain, ChevronDown, Settings2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WORK_DURATION = 7 * 60 + 57; // From image: 07:57
const BREAK_DURATION = 5 * 60; // 5 minutes (default)

type TimerMode = "work" | "break";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(true); // Timer starts active in new design
  const [mode, setMode] = useState<TimerMode>("work");
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimerEnd = useCallback(() => {
    setIsActive(false);
    // Streak logic (can be kept if desired)
    if (typeof window !== "undefined" && window.localStorage) {
      const currentStreak = parseInt(localStorage.getItem("studyStreak") || "0");
      if (mode === "work") {
         localStorage.setItem("studyStreak", (currentStreak + 1).toString());
         window.dispatchEvent(new CustomEvent("streakUpdate"));
      }
    }

    const notificationTitle = mode === "work" ? "Focus session complete!" : "Break's over!";
    const notificationBody = mode === "work" ? "Time for a break!" : "Back to focus!";
    
    if (mounted && Notification.permission === "granted") {
      try {
        new Notification(notificationTitle, { body: notificationBody, icon: "/favicon.ico" });
      } catch (e) {
        console.error("Error showing notification:", e);
        alert(`${notificationTitle}\n${notificationBody}`);
      }
    }

    if (mode === "work") {
      toast({
        title: notificationTitle,
        description: "Switching to break time.",
      });
      setMode("break");
      setTimeLeft(BREAK_DURATION);
      // setIsActive(true); // Optionally auto-start break
    } else {
      toast({
        title: notificationTitle,
        description: "Switching to focus time.",
      });
      setMode("work");
      setTimeLeft(WORK_DURATION);
      // setIsActive(true); // Optionally auto-start work
    }
  }, [mode, toast, mounted]);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && mounted) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0 && mounted) {
      handleTimerEnd();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, handleTimerEnd, mounted]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode("work");
    setTimeLeft(WORK_DURATION);
  };
  
  const selectMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false); // Pause timer when switching modes manually
    if (newMode === 'work') {
      setTimeLeft(WORK_DURATION);
    } else {
      setTimeLeft(BREAK_DURATION);
    }
  }

  // Progress not directly shown in new UI, but calculated for potential internal use
  // const progress = ((mode === "work" ? WORK_DURATION : BREAK_DURATION) - timeLeft) / (mode === "work" ? WORK_DURATION : BREAK_DURATION) * 100;

  if (!mounted) {
    // Simplified loading state
    return (
      <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="p-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary flex items-center">Group timer <ChevronDown className="ml-1 h-4 w-4 opacity-70" /></CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-2 p-3">
          <div className="text-5xl font-mono font-bold text-foreground">--:--</div>
          <div className="flex items-center justify-center space-x-2 w-full">
            <Button size="sm" variant="ghost" className="flex-1 text-xs h-7" disabled>Focus time</Button>
            <Button size="sm" variant="ghost" className="flex-1 text-xs h-7" disabled>Break time</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-primary flex items-center cursor-pointer hover:opacity-80">
            Group timer <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
        </CardTitle>
        {/* Placeholder for dropdown content or actions */}
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-2 p-3">
        <div className="flex items-center gap-2">
            <div className={`text-5xl font-mono font-bold ${mode === 'work' ? 'text-foreground' : 'text-accent-foreground'}`}>
            {formatTime(timeLeft)}
            </div>
            <div className="flex flex-col gap-1">
                 <Button onClick={toggleTimer} variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                    {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span className="sr-only">{isActive ? "Pause" : "Start"}</span>
                </Button>
                <Button onClick={resetTimer} variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                    <Settings2 className="h-4 w-4" /> {/* Using Settings2 for timer options */}
                    <span className="sr-only">Reset/Settings</span>
                </Button>
            </div>
        </div>
        
        {/* <Progress value={progress} className="w-full h-1.5 bg-secondary/50" /> */}
        
        <div className="flex items-center justify-center space-x-1 w-full">
          <Button 
            onClick={() => selectMode("work")} 
            variant={mode === 'work' ? "default" : "ghost"} 
            size="sm" 
            className={`flex-1 text-xs h-7 shadow-sm ${mode === 'work' ? 'bg-green-600 hover:bg-green-700 text-white' : 'text-muted-foreground'}`}
          >
            <Brain className={`mr-1.5 h-3.5 w-3.5 ${mode === 'work' ? '' : 'opacity-50'}`} /> Focus time
          </Button>
          <Button 
            onClick={() => selectMode("break")} 
            variant={mode === 'break' ? "default" : "ghost"} 
            size="sm" 
            className={`flex-1 text-xs h-7 shadow-sm ${mode === 'break' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-muted-foreground'}`}
          >
            <Coffee className={`mr-1.5 h-3.5 w-3.5 ${mode === 'break' ? '' : 'opacity-50'}`} /> Break time
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
