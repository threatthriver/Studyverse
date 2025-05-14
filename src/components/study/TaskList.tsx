"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load tasks from local storage
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("studyTasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("studyTasks", JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
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

  if (!mounted) {
     return (
      <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="p-3">
          <CardTitle className="text-base font-semibold text-primary">My Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          <div className="text-sm text-muted-foreground h-24 text-center pt-8">Loading tasks...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg flex flex-col max-h-[300px]">
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold text-primary">My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-2 flex-grow overflow-hidden flex flex-col">
        <form onSubmit={handleAddTask} className="flex items-center gap-2">
          <Input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add new task..."
            className="flex-grow bg-input/50 text-sm h-9"
            aria-label="New task input"
          />
          <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
            <PlusCircle className="h-4 w-4" />
             <span className="sr-only">Add Task</span>
          </Button>
        </form>
        <ScrollArea className="flex-grow">
          {tasks.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No tasks yet. Add some!</p>
          )}
          <ul className="space-y-1.5 pr-1">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 p-1.5 bg-background/30 rounded-md text-sm"
              >
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  aria-labelledby={`task-label-${task.id}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  id={`task-label-${task.id}`}
                  className={`flex-grow cursor-pointer ${
                    task.completed ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {task.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTask(task.id)}
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  aria-label={`Delete task: ${task.text}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
