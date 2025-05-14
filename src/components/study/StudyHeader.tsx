import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, LogOut } from "lucide-react";

export default function StudyHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/study" className="flex items-center gap-2">
          <BookOpenCheck className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">StudyVerse Room</span>
        </Link>
        <nav className="flex items-center gap-2">
          {/* Placeholder for user avatar or settings */}
          {/* <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar> */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" /> Exit Room
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
