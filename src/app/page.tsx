import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FloatingChatButton from "@/components/landing/FloatingChatButton";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      <main className="flex-grow flex items-center"> {/* Added flex items-center for vertical centering of HeroSection content */}
        <HeroSection />
      </main>
      <FloatingChatButton />
    </div>
  );
}
