import { Button } from "@/components/ui/button";
import { PartyPopper, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RelaunchSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <PartyPopper className="w-5 h-5 mr-2" />
              The Comeback Kid!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Studyverse Reborn: We're So Back!
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Plot twist! By early 2025, the core team (that's us!) just couldn't stay away. We missed you too much. So, we've brought Studyverse back to life under CSW.live’s "Study Verse" rooms, now at <strong className="text-primary">app.csw.live</strong>.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Think of it as your favorite band reuniting for a world tour, but for, you know, acing those exams. All the beloved features – ambiance controls, shared timers, those quirky AI companions – they're all here, waiting for you.
            </p>
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/study" className="flex items-center">
                Explore the New StudyVerse <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-square max-w-md mx-auto md:max-w-none md:mx-0 rounded-xl shadow-xl overflow-hidden border border-border">
            <Image 
              src="https://placehold.co/600x600/2ecc71/ffffff.png?text=Reimagined" 
              alt="Studyverse Reimagined" 
              layout="fill"
              objectFit="cover"
              data-ai-hint="modern workspace"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
