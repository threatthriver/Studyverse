"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Settings, Users, Headphones } from "lucide-react";

export default function StudyNavPanel() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-16 bg-sidebar-background flex flex-col items-center justify-between py-4 border-r border-sidebar-border">
        <div className="flex flex-col items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                <AvatarImage src="https://placehold.co/40x40/7E57C2/FFFFFF.png?text=ST" alt="User" data-ai-hint="avatar person" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Your Profile</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add New</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Users className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Friends</p>
            </TooltipContent>
          </Tooltip>

           <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Headphones className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Music & Sounds</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
