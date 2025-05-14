"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BellRing, Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

type TimerMode = "work" | "break";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Request notification permission on mount
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
    if (typeof window !== "undefined" && window.localStorage) {
      const currentStreak = parseInt(localStorage.getItem("studyStreak") || "0");
      if (mode === "work") {
         localStorage.setItem("studyStreak", (currentStreak + 1).toString());
         window.dispatchEvent(new CustomEvent("streakUpdate"));
      }
    }

    const notificationTitle = mode === "work" ? "Work session complete!" : "Break's over!";
    const notificationBody = mode === "work" ? "Time for a break. You earned it!" : "Ready to focus again?";
    
    if (mounted && Notification.permission === "granted") {
      try {
        new Notification(notificationTitle, { body: notificationBody, icon: "/favicon.ico" }); // Assuming you have a favicon
      } catch (e) {
        console.error("Error showing notification:", e);
         // Fallback for environments where new Notification might fail (e.g. if service worker not set up for it)
        alert(`${notificationTitle}\n${notificationBody}`);
      }
    }


    if (mode === "work") {
      toast({
        title: notificationTitle,
        description: "Time for a well-deserved break. Stretch it out!",
        action: <Button variant="ghost" size="sm" onClick={() => { setMode("break"); setTimeLeft(BREAK_DURATION); setIsActive(true); }}><Coffee className="mr-2 h-4 w-4" /> Start Break</Button>,
      });
      setMode("break");
      setTimeLeft(BREAK_DURATION);
    } else {
      toast({
        title: notificationTitle,
        description: "Ready to get back to it? You got this!",
        action: <Button variant="ghost" size="sm" onClick={() => { setMode("work"); setTimeLeft(WORK_DURATION); setIsActive(true); }}><Brain className="mr-2 h-4 w-4" /> Start Work</Button>,
      });
      setMode("work");
      setTimeLeft(WORK_DURATION);
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

  const progress = ((mode === "work" ? WORK_DURATION : BREAK_DURATION) - timeLeft) / (mode === "work" ? WORK_DURATION : BREAK_DURATION) * 100;

  if (!mounted) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="p-3">
          <CardTitle className="text-base font-semibold text-primary">Focus Timer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-3 p-3">
          <div className="text-4xl font-mono font-bold text-foreground">--:--</div>
           <Progress value={0} className="w-full h-2" />
          <div className="flex items-center justify-center space-x-2 w-full">
            <Button size="sm" className="flex-1" disabled><Play className="mr-1.5 h-4 w-4" />Start</Button>
            <Button variant="outline" size="sm" className="flex-1" disabled><RotateCcw className="mr-1.5 h-4 w-4" />Reset</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold text-primary">Focus Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-3 p-3">
        <div className={`text-4xl font-mono font-bold ${mode === 'work' ? 'text-foreground' : 'text-accent-foreground'}`}>
          {formatTime(timeLeft)}
        </div>
        <Progress value={progress} className="w-full h-2 bg-secondary/50" />
        <div className="flex items-center justify-center space-x-2 w-full">
          <Button onClick={toggleTimer} size="sm" className="flex-1 shadow-md hover:shadow-lg transition-shadow">
            {isActive ? <Pause className="mr-1.5 h-4 w-4" /> : <Play className="mr-1.5 h-4 w-4" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="sm" className="flex-1 shadow-md hover:shadow-lg transition-shadow">
            <RotateCcw className="mr-1.5 h-4 w-4" />
            Reset
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Mode: <span className={`font-medium ${mode === 'work' ? 'text-foreground' : 'text-accent-foreground'}`}>{mode === "work" ? "Focus" : "Break"}</span>
        </p>
      </CardContent>
    </Card>
  );
}
