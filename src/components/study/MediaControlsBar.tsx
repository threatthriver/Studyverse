
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneMissed, MoreHorizontal, Volume2, VolumeX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MediaControlsBarProps {
  userName: string;
  userStatus: string;
}

export default function MediaControlsBar({ userName, userStatus }: MediaControlsBarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsSoundMuted(!isSoundMuted)} className="rounded-full h-8 w-8 text-card-foreground hover:bg-accent/20">
                {isSoundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>{isSoundMuted ? "Unmute Sound" : "Mute Sound"}</p></TooltipContent>
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
