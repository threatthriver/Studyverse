import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, XCircle } from "lucide-react";

export default function HistorySection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          The OG Studyverse: A Trip Down Memory Lane
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Ah, the good old days. Remember when Studyverse was *the* spot? Let's reminisce for a sec, shall we?
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="w-10 h-10 text-primary" />
              <CardTitle className="text-2xl">Cult Following</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Customizable rooms, ambient sounds, Pomodoro timers, AI buddies... it was a vibe. Solo or group, video chat buzzing – you were there, getting stuff done and making connections. We see you, power users.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Zap className="w-10 h-10 text-primary" />
              <CardTitle className="text-2xl">Peak Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Streaks were tracked, badges were earned. It wasn't just studying; it was a game you actually *wanted* to win. That playful gamification? Chef's kiss.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <XCircle className="w-10 h-10 text-destructive" />
              <CardTitle className="text-2xl">The Great Pause</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Then, August 2024 happened. The domain went dark. Poof. We know, it stung. The scramble for alternatives was real. We felt it too. It was like your favorite café closing down without warning. Ouch.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
