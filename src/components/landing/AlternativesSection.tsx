import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const alternatives = [
  { name: "StudyStream", bestAt: "Distraction-free focus rooms with a large community.", link: "https://www.studystream.live/" },
  { name: "Study Together", bestAt: "Discord-based community with diverse study rooms and events.", link: "https://studytogether.com/" },
  { name: "Fiveable", bestAt: "AP-focused content, live reviews, and cram sessions.", link: "https://fiveable.me/" },
  { name: "GoConqr", bestAt: "Creating and sharing learning resources like mind maps and flashcards.", link: "https://www.goconqr.com/" },
  { name: "Gather", bestAt: "Virtual spaces for more interactive and customizable group meetings.", link: "https://www.gather.town/" },
];

export default function AlternativesSection() {
  return (
    <section id="alternatives" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Still Window Shopping? Top Studyverse Alternatives
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Hey, we get it. Maybe you found a new flame while we were on our... break. Or maybe you're just curious. Here's the lowdown on some other cool spots, and what they do best (though, spoiler: we think you'll still like us more 😉).
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alternatives.map((alt) => (
            <Card key={alt.name} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{alt.name}</CardTitle>
                  <a href={alt.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${alt.name}`}>
                    <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{alt.bestAt}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
