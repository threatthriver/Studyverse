"use client";

import { useState, useEffect } from "react";
import { Flame, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    // Load streak from local storage on component mount
    if (typeof window !== "undefined" && window.localStorage) {
      const savedStreak = parseInt(localStorage.getItem("studyStreak") || "0");
      const savedLongestStreak = parseInt(localStorage.getItem("longestStudyStreak") || "0");
      setStreak(savedStreak);
      setLongestStreak(savedLongestStreak > savedStreak ? savedLongestStreak : savedStreak);
    }
    
    // Listen for streak updates from PomodoroTimer
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

  }, [longestStreak]); // Add longestStreak to dependency array to update it if streak becomes larger

  // For demo purposes, a button to manually increment streak
  // const incrementStreak = () => {
  //   const newStreak = streak + 1;
  //   setStreak(newStreak);
  //   localStorage.setItem("studyStreak", newStreak.toString());
  //   if (newStreak > longestStreak) {
  //     setLongestStreak(newStreak);
  //     localStorage.setItem("longestStudyStreak", newStreak.toString());
  //   }
  // };

  const getStreakMessage = () => {
    if (streak === 0) return "Start your first session to build a streak!";
    if (streak > 0 && streak <= 5) return "Nice start! Keep the flame alive.";
    if (streak > 5 && streak <= 10) return "You're on fire! Amazing focus.";
    if (streak > 10) return "Incredible streak! You're a study legend.";
    return "Keep up the great work!";
  };

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-xl font-semibold text-foreground flex items-center justify-center">
        <Flame className="w-6 h-6 mr-2 text-primary animate-pulse" />
        Study Streak
      </h3>
      <div className="text-6xl font-bold text-primary">{streak}</div>
      <p className="text-muted-foreground">{getStreakMessage()}</p>
      <div className="flex justify-around text-sm text-muted-foreground pt-2">
        <div className="flex items-center">
          <TrendingUp className="w-4 h-4 mr-1 text-accent" />
          Longest Streak: {longestStreak}
        </div>
      </div>
      {streak > 0 && streak % 5 === 0 && (
         <div className="mt-2 p-2 bg-accent/10 text-accent rounded-md text-sm flex items-center justify-center gap-1">
            <Award className="w-4 h-4"/> Milestone! {streak} sessions complete!
        </div>
      )}
      {/* <Button onClick={incrementStreak} variant="outline" size="sm" className="mt-2">
        Manual Increment (Dev)
      </Button> */}
    </div>
  );
}
