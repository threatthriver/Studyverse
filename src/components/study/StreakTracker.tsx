"use client";

// This component is currently not directly used in the new study page layout
// as the Pomodoro Timer fulfills the primary timer display.
// The streak count logic might be integrated elsewhere (e.g., StudyNavPanel or within PomodoroTimer)
// if a visible streak counter is desired in the new UI.
// For now, it's kept in case its logic for tracking streaks is useful later.

import { useState, useEffect } from "react";
import { Flame, TrendingUp, Award } from "lucide-react";

export default function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.localStorage) {
      const savedStreak = parseInt(localStorage.getItem("studyStreak") || "0");
      const savedLongestStreak = parseInt(localStorage.getItem("longestStudyStreak") || "0");
      setStreak(savedStreak);
      setLongestStreak(savedLongestStreak > savedStreak ? savedLongestStreak : savedStreak);
    }
    
    const handleStreakUpdate = () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const updatedStreak = parseInt(localStorage.getItem("studyStreak") || "0");
        setStreak(updatedStreak);
        if (updatedStreak > longestStreak) {
          setLongestStreak(updatedStreak);
          localStorage.setItem("longestStudyStreak", updatedStreak.toString());
        }
      }
    };
    window.addEventListener("streakUpdate", handleStreakUpdate);
    return () => window.removeEventListener("streakUpdate", handleStreakUpdate);

  }, [longestStreak]);

  const getStreakMessage = () => {
    if (!mounted) return "Loading streak...";
    if (streak === 0) return "Start your first session to build a streak!";
    if (streak > 0 && streak <= 5) return "Nice start! Keep the flame alive.";
    if (streak > 5 && streak <= 10) return "You're on fire! Amazing focus.";
    if (streak > 10) return "Incredible streak! You're a study legend.";
    return "Keep up the great work!";
  };
  
  if (!mounted) {
    return (
        <div className="space-y-2 text-center p-3 bg-card rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-primary flex items-center justify-center">
                <Flame className="w-5 h-5 mr-1.5" />
                Study Streak
            </h3>
            <div className="text-4xl font-bold text-muted-foreground">--</div>
            <p className="text-xs text-muted-foreground">Loading streak...</p>
        </div>
    );
  }


  return (
    <div className="space-y-2 text-center p-3 bg-card rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-primary flex items-center justify-center">
        <Flame className="w-5 h-5 mr-1.5 text-primary animate-pulse" />
        Study Streak
      </h3>
      <div className="text-4xl font-bold text-primary">{streak}</div>
      <p className="text-xs text-muted-foreground">{getStreakMessage()}</p>
      <div className="flex justify-around text-xs text-muted-foreground pt-1">
        <div className="flex items-center">
          <TrendingUp className="w-3.5 h-3.5 mr-1 text-accent" />
          Longest: {longestStreak}
        </div>
      </div>
      {streak > 0 && streak % 5 === 0 && (
         <div className="mt-1 p-1.5 bg-accent/10 text-accent rounded-md text-xs flex items-center justify-center gap-1">
            <Award className="w-3.5 h-3.5"/> Milestone! {streak} sessions!
        </div>
      )}
    </div>
  );
}

