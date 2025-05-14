import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HistorySection from "@/components/landing/HistorySection";
import RelaunchSection from "@/components/landing/RelaunchSection";
import AlternativesSection from "@/components/landing/AlternativesSection";
import GettingStartedSection from "@/components/landing/GettingStartedSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HistorySection />
        <RelaunchSection />
        <AlternativesSection />
        <GettingStartedSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
