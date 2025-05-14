import PomodoroTimer from "@/components/study/PomodoroTimer";
import TaskList from "@/components/study/TaskList";
import ChatPanel from "@/components/study/ChatPanel";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StudyToolsPanel() {
  return (
    <div className="w-72 md:w-80 bg-sidebar-background p-3 flex flex-col gap-3 border-l border-sidebar-border overflow-y-auto">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-3 pr-2">
            <PomodoroTimer />
            <TaskList />
            <ChatPanel />
        </div>
      </ScrollArea>
    </div>
  );
}
