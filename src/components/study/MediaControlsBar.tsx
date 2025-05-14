
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneMissed, MoreHorizontal, Volume2, VolumeX, Music2, CloudRain } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";

interface MediaControlsBarProps {
  userName: string;
  userStatus: string;
}

export default function MediaControlsBar({ userName, userStatus }: MediaControlsBarProps) {
  const { isMusicPlaying, toggleMusic, isRainPlaying, toggleRain } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-between gap-3 bg-card/70 backdrop-blur-md p-2.5 rounded-full shadow-lg min-w-[300px] max-w-fit">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20"></div>
          <div className="w-24 h-4 bg-muted rounded"></div>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-8 w-8 rounded-full bg-muted"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-between gap-3 bg-card/70 backdrop-blur-md p-2.5 rounded-full shadow-lg min-w-[300px] max-w-fit">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://placehold.co/40x40/3498db/FFFFFF.png?text=${userName.substring(0,1)}`} alt={userName} data-ai-hint="avatar person" />
            <AvatarFallback>{userName.substring(0,1)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-card-foreground whitespace-nowrap">{userStatus}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Music toggle button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isMusicPlaying ? "default" : "ghost"}
                size="icon"
                onClick={toggleMusic}
                className={`rounded-full h-8 w-8 ${isMusicPlaying ? 'bg-primary text-primary-foreground' : 'text-card-foreground hover:bg-accent/20'}`}
              >
                <Music2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>{isMusicPlaying ? "Stop Music" : "Play LoFi Music"}</p></TooltipContent>
          </Tooltip>

          {/* Rain sound toggle button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isRainPlaying ? "default" : "ghost"}
                size="icon"
                onClick={toggleRain}
                className={`rounded-full h-8 w-8 ${isRainPlaying ? 'bg-primary text-primary-foreground' : 'text-card-foreground hover:bg-accent/20'}`}
              >
                <CloudRain className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>{isRainPlaying ? "Stop Rain Sound" : "Play Rain Sound"}</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsCamOff(!isCamOff)} className="rounded-full h-8 w-8 text-card-foreground hover:bg-accent/20">
                {isCamOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>{isCamOff ? "Turn Camera On" : "Turn Camera Off"}</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => console.log("Screen share clicked")} className="rounded-full h-8 w-8 text-card-foreground hover:bg-accent/20">
                <ScreenShare className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>Share Screen</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="rounded-full h-8 w-8 text-card-foreground hover:bg-accent/20">
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>{isMuted ? "Unmute Mic" : "Mute Mic"}</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon" onClick={() => console.log("Leave call clicked")} className="rounded-full h-8 w-8 bg-red-500/80 hover:bg-red-600/80 text-white">
                <PhoneMissed className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>Leave Call</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => console.log("More options clicked")} className="rounded-full h-8 w-8 text-card-foreground hover:bg-accent/20">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>More Options</p></TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
