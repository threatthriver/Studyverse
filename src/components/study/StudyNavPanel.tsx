
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings, UserPlus } from "lucide-react"; // Assuming Plus is for inviting more people
import { ScrollArea } from "@/components/ui/scroll-area";

const participants = [
  { name: "Kei", seed: "KE", online: true, hint: "student glasses" },
  { name: "Yumi", seed: "YU", online: true, hint: "woman hijab" },
  { name: "Alex", seed: "AL", online: true, hint: "person headphones" },
  { name: "예수", seed: "예", online: false, hint: "korean student" }, // Korean name
  { name: "Chloe", seed: "CH", online: true, hint: "girl smiling" },
  { name: "Kenji", seed: "KJ", online: true, hint: "anime character" }, // Placeholder for drawn avatar
  { name: "Omar", seed: "OM", online: true, hint: "man beard" },
  { name: "Sofia", seed: "SO", online: false, hint: "woman curly_hair" },
  { name: "Sam", seed: "SA", online: true, hint: "alien cute" }, // Placeholder for drawn avatar
];

export default function StudyNavPanel() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-20 bg-sidebar-background flex flex-col items-center justify-between py-4 border-r border-sidebar-border">
        <ScrollArea className="w-full">
          <div className="flex flex-col items-center gap-3 px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all ring-2 ring-green-500"> {/* Current User Highlight? */}
                  <AvatarImage src="https://placehold.co/60x60/7E57C2/FFFFFF.png?text=ME" alt="My Avatar" data-ai-hint="avatar person" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>You</p>
              </TooltipContent>
            </Tooltip>

            {participants.map((p, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                      <AvatarImage src={`https://placehold.co/60x60/${p.online ? '4CAF50' : '9E9E9E'}/FFFFFF.png?text=${p.seed}`} alt={p.name} data-ai-hint={p.hint}/>
                      <AvatarFallback>{p.seed}</AvatarFallback>
                    </Avatar>
                    {p.online && (
                       <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-sidebar-background" title="Online"></span>
                    )}
                     {!p.online && (
                       <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-500 ring-2 ring-sidebar-background" title="Offline"></span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{p.name} ({p.online ? "Online" : "Offline"})</p>
                </TooltipContent>
              </Tooltip>
            ))}
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-2 border-dashed border-sidebar-border/50">
                  <UserPlus className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Invite People</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </ScrollArea>

        <div className="flex flex-col items-center gap-3 mt-auto pt-4">
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
