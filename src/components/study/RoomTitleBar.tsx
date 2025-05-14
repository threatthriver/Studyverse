
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, Users } from "lucide-react"; // Using UserPlus for "Add" as it seems more fitting for adding people to a space

interface RoomTitleBarProps {
  roomName: string;
}

export default function RoomTitleBar({ roomName }: RoomTitleBarProps) {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-3 bg-card/70 backdrop-blur-md p-2.5 rounded-full shadow-lg">
      <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-card-foreground hover:bg-accent/20">
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </Button>
      <div className="flex items-center gap-2 text-card-foreground">
        <Users className="h-5 w-5 text-primary" />
        <h1 className="text-sm font-semibold whitespace-nowrap">{roomName}</h1>
      </div>
      <Button variant="ghost" size="sm" className="rounded-full text-card-foreground hover:bg-accent/20 hover:text-accent-foreground px-3">
        <UserPlus className="mr-1.5 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}
