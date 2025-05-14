
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, Users } from "lucide-react"; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RoomTitleBarProps {
  roomName: string;
}

export default function RoomTitleBar({ roomName }: RoomTitleBarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-3 bg-card/70 backdrop-blur-md p-2.5 rounded-full shadow-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-card-foreground hover:bg-accent/20" onClick={() => console.log("Back button clicked")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom"><p>Back</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 text-card-foreground cursor-pointer hover:opacity-80" onClick={() => console.log("Room title clicked - open room settings?")}>
              <Users className="h-5 w-5 text-primary" />
              <h1 className="text-sm font-semibold whitespace-nowrap">{roomName}</h1>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom"><p>Room Details/Settings</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full text-card-foreground hover:bg-accent/20 hover:text-accent-foreground px-3" onClick={() => console.log("Add/Invite button clicked")}>
              <UserPlus className="mr-1.5 h-4 w-4" />
              Add
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom"><p>Invite People</p></TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
