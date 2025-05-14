
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "SDFS", completed: false },
    { id: "2", text: "Part1", completed: true },
    { id: "3", text: "Part2 Gr", completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("studyTasksNew"); 
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("studyTasksNew", JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTaskItem: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTaskItem]);
    setNewTaskText("");
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;

  if (!mounted) {
     return (
      <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="p-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary flex items-center">My tasks <ChevronDown className="ml-1 h-4 w-4 opacity-70" /></CardTitle>
           <span className="text-xs text-muted-foreground">--/--</span>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          <div className="text-sm text-muted-foreground h-24 text-center pt-8">Loading tasks...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Card className="bg-card/80 backdrop-blur-sm shadow-lg flex flex-col max-h-[300px]">
        <CardHeader className="p-3 flex flex-row items-center justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle 
                className="text-sm font-semibold text-primary flex items-center cursor-pointer hover:opacity-80"
                onClick={() => console.log("Task list options clicked")}
              >
                  My tasks <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent side="top"><p>Task Options</p></TooltipContent>
          </Tooltip>
          <span className="text-xs text-muted-foreground">{completedTasksCount}/{totalTasksCount}</span>
        </CardHeader>
        <CardContent className="p-3 space-y-2 flex-grow overflow-hidden flex flex-col">
          <ScrollArea className="flex-grow pr-1">
            {tasks.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No tasks yet. Add some!</p>
            )}
            <ul className="space-y-1.5">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-2 p-1.5 bg-background/30 rounded-md text-sm hover:bg-accent/10"
                >
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    aria-labelledby={`task-label-${task.id}`}
                    className="border-primary/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600"
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    id={`task-label-${task.id}`}
                    className={`flex-grow cursor-pointer ${
                      task.completed ? "line-through text-muted-foreground/70" : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTask(task.id)}
                        className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-50 hover:opacity-100"
                        aria-label={`Delete task: ${task.text}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right"><p>Delete Task</p></TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </ScrollArea>
           <form onSubmit={handleAddTask} className="flex items-center gap-2 pt-2 border-t border-border/20 mt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <PlusCircle className="h-4 w-4 mr-1.5" /> Add new task
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start"><p>Add a new task to your list</p></TooltipContent>
            </Tooltip>
            <Input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Type and press Enter or click Add"
              className="flex-grow bg-input/50 text-sm h-8"
              aria-label="New task input"
              onKeyDown={(e) => { if(e.key === 'Enter' && newTaskText.trim()) handleAddTask(e);}}
            />
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
