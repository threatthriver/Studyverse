import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Zap, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

const steps = [
  { icon: <ExternalLinkIcon className="w-8 h-8 text-primary" />, title: "Head to app.csw.live and Sign Up", description: "It's quick, painless, and your first step back to glory. Or, you know, just good grades." },
  { icon: <Users className="w-8 h-8 text-primary" />, title: "Pick or Customize Your Room", description: "Library vibes? Cozy café? Minimalist chic? Your call. Choose your theme and soundtrack. Set the mood." },
  { icon: <Target className="w-8 h-8 text-primary" />, title: "Invite Friends or Join a Public Room", description: "Studying is better together (sometimes). Rally your crew or make new study buddies." },
  { icon: <Zap className="w-8 h-8 text-primary" />, title: "Set Goals, Fire Up Your AI Buddy, and Start Your Pomodoro Timer", description: "This is where the magic happens. Focus, learn, and let our AI give you a friendly nudge. You've got this." },
];

export default function GettingStartedSection() {
  return (
    <section id="getting-started" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Ready to Dive Back In? Getting Started is a Breeze.
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Alright, superstar. Enough chit-chat. Let's get you back in the zone. It's easier than deciding what to watch on Netflix, promise.
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {steps.map((step, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 flex items-start gap-6">
                <div className="flex-shrink-0 mt-1">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/study" className="flex items-center">
              I'm Ready, Take Me to StudyVerse! <CheckCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
