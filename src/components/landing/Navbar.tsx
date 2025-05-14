import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react"; // Using Brain as a placeholder for the 'S' logo

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* Placeholder for stylized 'S' logo. Using Brain icon for now. */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-white"
          >
            <path d="M16.1474 6.2928C17.3623 5.07791 18.0526 5.76822 18.0526 5.76822C18.0526 5.76822 16.0947 3.81026 13.0947 3.81026C10.0947 3.81026 7.94737 5.95763 7.94737 8.95763C7.94737 11.9576 10.0947 14.105 13.0947 14.105C15.1798 14.105 16.5947 13.0421 16.5947 13.0421M16.1474 6.2928V6.2928C15.1053 7.33494 14.7368 8.3771 14.7368 9.41925C14.7368 11.4202 16.0211 12.4623 17.2368 12.4623C18.4526 12.4623 20.1053 11.3377 20.1053 9.04237C20.1053 6.74705 18.4526 5.62242 17.2368 5.62242C16.8622 5.62242 16.4903 5.71336 16.1474 5.87678V6.2928Z" />
            <path d="M7.89474 17.7072C6.67985 18.9221 5.98954 18.2318 5.98954 18.2318C5.98954 18.2318 7.94737 20.1897 10.9474 20.1897C13.9474 20.1897 16.0947 18.0424 16.0947 15.0424C16.0947 12.0424 13.9474 9.89498 10.9474 9.89498C8.86216 9.89498 7.44737 10.9579 7.44737 10.9579M7.89474 17.7072V17.7072C8.93684 16.6651 9.30526 15.6229 9.30526 14.5808C9.30526 12.5798 8.02105 11.5377 6.80526 11.5377C5.58947 11.5377 3.93684 12.6623 3.93684 14.9576C3.93684 17.2529 5.58947 18.3776 6.80526 18.3776C7.17989 18.3776 7.55181 18.2866 7.89474 18.1232V17.7072Z" />
          </svg>
          <span className="text-2xl font-bold text-white">studyverse</span>
        </Link>
        <nav className="flex items-center">
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2.5 text-sm font-medium"
          >
            <Link href="/study">Explore Studyverse</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
