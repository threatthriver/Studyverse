import StudyHeader from "@/components/study/StudyHeader";
import StudyNavPanel from "@/components/study/StudyNavPanel";
import MainStudyArea from "@/components/study/MainStudyArea";
import StudyToolsPanel from "@/components/study/StudyToolsPanel";

export default function StudyPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans overflow-hidden">
      <StudyHeader />
      <main className="flex-grow grid grid-cols-[auto_1fr_auto] overflow-hidden">
        <StudyNavPanel />
        <MainStudyArea />
        <StudyToolsPanel />
      </main>
      {/* Footer removed as it's not in the new design */}
    </div>
  );
}
