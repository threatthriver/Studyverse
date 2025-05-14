import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-tr from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 text-center">
        <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          The Future is Collaborative (and Kinda Cute, NGL)
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Look, learning doesn't have to be a solo slog. Studyverse is more than just a platform; it’s a community. It’s about accountability partners who get it, shared 'aha!' moments, and yes, the pure, unadulterated joy of learning together. We're building something special here, and it's not quite the same without you.
        </p>
        <Button size="xl" asChild className="shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
          <Link href="/study">
            Join the StudyVerse Family <Users className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
