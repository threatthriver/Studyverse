import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpenCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BookOpenCheck className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">StudyVerse</span>
        </Link>
        <nav className="flex items-center gap-4">
          {/* <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#alternatives" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Alternatives
          </Link> */}
          <Button asChild>
            <Link href="/study">Launch App</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
