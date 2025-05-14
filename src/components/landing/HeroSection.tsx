import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Your space to <br className="md:hidden"/>
              <span className="bg-gradient-to-r from-primary via-accent to-pink-500 bg-clip-text text-transparent">
                study and chill
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 mb-10">
              Can't focus? Create your own study rooms that help you study & chill in peace. With friends, classmates, and study buddies.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-lg px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Link href="/study">
                Explore Studyverse
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto md:mx-0">
            <Image 
              src="https://placehold.co/800x600.png" 
              alt="A person meditating in a cosmic environment, representing a focused study space."
              layout="fill"
              objectFit="contain"
              data-ai-hint="galaxy meditation person"
              priority
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
