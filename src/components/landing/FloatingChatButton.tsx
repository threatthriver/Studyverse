"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function FloatingChatButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50"
      aria-label="Open chat"
      onClick={() => console.log("Floating chat button clicked")} // Replace with actual chat opening logic
    >
      <MessageSquare className="h-7 w-7" />
    </Button>
  );
}
