import StudyHeader from "@/components/study/StudyHeader";
import StudyRoomControls from "@/components/study/StudyRoomControls";
import PomodoroTimer from "@/components/study/PomodoroTimer";
import AiBuddy from "@/components/study/AiBuddy";
import StreakTracker from "@/components/study/StreakTracker";
import ChatPanel from "@/components/study/ChatPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StudyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30 font-sans">
      <StudyHeader />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column / Main Focus Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <StudyRoomControls />
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <PomodoroTimer />
              </CardContent>
            </Card>
            <Card className="shadow-lg hidden lg:block"> {/* AI Buddy for larger screens here */}
              <CardContent className="p-6">
                <AiBuddy />
              </CardContent>
            </Card>
          </div>

          {/* Right Column / Tools */}
          <div className="flex flex-col gap-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <StreakTracker />
              </CardContent>
            </Card>
            <Card className="shadow-lg lg:hidden"> {/* AI Buddy for smaller screens here */}
              <CardContent className="p-6">
                <AiBuddy />
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <ChatPanel />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border/40">
        Happy Studying from StudyVerse!
      </footer>
    </div>
  );
}
