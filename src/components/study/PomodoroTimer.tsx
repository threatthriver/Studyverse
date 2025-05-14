"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BellRing, Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

type TimerMode = "work" | "break";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimerEnd = useCallback(() => {
    setIsActive(false);
    // Increment streak - can be done via a prop function or context
    if (typeof window !== "undefined" && window.localStorage) {
      const currentStreak = parseInt(localStorage.getItem("studyStreak") || "0");
      if (mode === "work") {
         localStorage.setItem("studyStreak", (currentStreak + 1).toString());
         // Dispatch an event to notify StreakTracker
         window.dispatchEvent(new CustomEvent("streakUpdate"));
      }
    }

    if (mode === "work") {
      toast({
        title: "Work session complete!",
        description: "Time for a well-deserved break. Stretch it out!",
        action: <Button variant="ghost" size="sm" onClick={() => { setMode("break"); setTimeLeft(BREAK_DURATION); setIsActive(true); }}><Coffee className="mr-2 h-4 w-4" /> Start Break</Button>,
      });
      setMode("break");
      setTimeLeft(BREAK_DURATION);
    } else {
      toast({
        title: "Break's over!",
        description: "Ready to get back to it? You got this!",
        action: <Button variant="ghost" size="sm" onClick={() => { setMode("work"); setTimeLeft(WORK_DURATION); setIsActive(true); }}><Brain className="mr-2 h-4 w-4" /> Start Work</Button>,
      });
      setMode("work");
      setTimeLeft(WORK_DURATION);
    }
    // Simple browser notification
    if (Notification.permission === "granted") {
      new Notification(`StudyVerse: ${mode === "work" ? "Work" : "Break"} session ended!`);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(`StudyVerse: ${mode === "work" ? "Work" : "Break"} session ended!`);
        }
      });
    }

  }, [mode, toast]);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleTimerEnd();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, handleTimerEnd]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode("work");
    setTimeLeft(WORK_DURATION);
  };

  const progress = ( (mode === "work" ? WORK_DURATION : BREAK_DURATION) - timeLeft) / (mode === "work" ? WORK_DURATION : BREAK_DURATION) * 100;

  return (
    <div className="flex flex-col items-center space-y-6 p-4 rounded-lg">
      <div className={`text-6xl md:text-8xl font-mono font-bold ${mode === 'work' ? 'text-primary' : 'text-accent'}`}>
        {formatTime(timeLeft)}
      </div>
      <Progress value={progress} className="w-full h-3" />
      <div className="flex items-center justify-center space-x-4 w-full">
        <Button onClick={toggleTimer} size="lg" className="w-32 shadow-md hover:shadow-lg transition-shadow">
          {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg" className="w-32 shadow-md hover:shadow-lg transition-shadow">
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-muted-foreground">
          Current Mode: <span className={`font-semibold ${mode === 'work' ? 'text-primary' : 'text-accent'}`}>{mode === "work" ? "Focus Session" : "Short Break"}</span>
        </p>
        {mode === 'work' && <p className="text-sm text-muted-foreground">Stay focused! You're doing great.</p>}
        {mode === 'break' && <p className="text-sm text-muted-foreground">Relax, recharge, and come back stronger!</p>}
      </div>
       <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => {
          if (Notification.permission !== "granted") {
            Notification.requestPermission();
          }
          toast({ title: "Test Notification", description: "This is how notifications will look!"});
        }}
        className="mt-4 text-xs text-muted-foreground"
      >
        <BellRing className="mr-1 h-3 w-3" /> Test Notifications
      </Button>
    </div>
  );
}
