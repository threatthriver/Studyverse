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
              <Link href="/login">
                Explore Studyverse
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto md:mx-0">
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000"
              alt="A peaceful library study environment with soft lighting and books."
              fill
              style={{ objectFit: "cover" }}
              priority
              className="rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay rounded-xl"></div>
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-[80%]">
              <p className="text-sm text-foreground font-medium">
                Choose from multiple study environments with ambient sounds to boost your focus and productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
