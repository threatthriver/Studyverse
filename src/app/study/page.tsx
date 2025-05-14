
import MainStudyArea from "@/components/study/MainStudyArea";
import StudyNavPanel from "@/components/study/StudyNavPanel";
import StudyToolsPanel from "@/components/study/StudyToolsPanel";
import RoomTitleBar from "@/components/study/RoomTitleBar";
import MediaControlsBar from "@/components/study/MediaControlsBar";
import AudioPlayer from "@/components/study/AudioPlayer";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function StudyPage() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-background text-foreground font-sans overflow-hidden">
        {/* Hidden audio player component to handle all sound playback */}
        <AudioPlayer />

        <main className="flex-grow grid grid-cols-[auto_1fr_auto] overflow-hidden relative">
          <StudyNavPanel />
          <div className="flex-grow flex flex-col relative overflow-hidden">
            <RoomTitleBar roomName="Kei's Study and Work Space (v2.0)" />
            <MainStudyArea />
            <MediaControlsBar userName="You" userStatus="studying alone at the library..." />
          </div>
          <StudyToolsPanel />
        </main>
      </div>
    </ThemeProvider>
  );
}
