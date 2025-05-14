import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
          Remember <span className="text-primary">Studyverse</span>? <br className="hidden md:inline" />
          It's Back, Baby. And It Missed You.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          That magical virtual study hall where focus flowed and friendships blossomed? We heard your pleas, felt your pain. So, we dusted off the blueprints, gave it a little glow-up, and now... Studyverse is ready for its encore.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/study">
              Enter the StudyVerse <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="#getting-started">Learn How to Get Started</Link>
          </Button>
        </div>
        <div className="relative aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-border">
           <Image 
            src="https://placehold.co/1200x675/3498db/ecf0f1.png?text=StudyVerse+Vibes" 
            alt="Studyverse virtual study room" 
            layout="fill"
            objectFit="cover"
            data-ai-hint="study group virtual"
            priority
          />
        </div>
      </div>
    </section>
  );
}
