"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getStudyBuddyAssistance, type GetStudyBuddyAssistanceInput } from "@/ai/flows/ai-study-buddy";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, MessageCircleQuestion } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function AiBuddy() {
  const [question, setQuestion] = useState("");
  const [studyMaterial, setStudyMaterial] = useState(""); // Optional: could be pre-filled or from another source
  const [conversation, setConversation] = useState<{type: 'user' | 'ai', content: string}[]>([]);

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: async (input: GetStudyBuddyAssistanceInput) => {
      return getStudyBuddyAssistance(input);
    },
    onSuccess: (response) => {
      setConversation(prev => [...prev, { type: 'ai', content: response.answer }]);
      setQuestion(""); // Clear question input after successful submission
    },
    onError: () => {
       setConversation(prev => [...prev, { type: 'ai', content: "Oops! I had a little hiccup. Try asking again?" }]);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setConversation(prev => [...prev, { type: 'user', content: question}]);
    mutate({ question, studyMaterial });
  };

  return (
    <Card className="flex flex-col h-full shadow-none border-none">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <CardTitle className="text-xl">AI Study Buddy</CardTitle>
        </div>
        <CardDescription>Your personal AI assistant to help you conquer any topic. Just ask!</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden p-0">
        <ScrollArea className="flex-grow h-[200px] md:h-[300px] p-4 border rounded-md bg-muted/30">
          {conversation.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <MessageCircleQuestion className="w-12 h-12 mb-2" />
              <p>Ask me anything about your study material!</p>
              <p className="text-xs">e.g., "Explain photosynthesis in simple terms."</p>
            </div>
          )}
          {conversation.map((entry, index) => (
            <div key={index} className={`mb-3 p-3 rounded-lg max-w-[85%] ${entry.type === 'user' ? 'bg-primary/10 text-primary-foreground ml-auto' : 'bg-secondary mr-auto'}`}>
               <p className={`text-sm ${entry.type === 'user' ? 'text-right text-foreground' : 'text-left text-foreground'}`}>
                <span className="font-semibold">{entry.type === 'user' ? 'You' : 'AI Buddy'}: </span>
                {entry.content}
              </p>
            </div>
          ))}
          {isPending && (
            <div className="flex items-center justify-start p-3 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...
            </div>
          )}
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="space-y-3 p-4 border-t">
          <div>
            <Label htmlFor="study-material" className="sr-only">Study Material (Context)</Label>
            <Textarea
              id="study-material"
              value={studyMaterial}
              onChange={(e) => setStudyMaterial(e.target.value)}
              placeholder="Optional: Paste relevant study material here for context..."
              rows={3}
              className="text-sm bg-background"
            />
          </div>
          <div>
            <Label htmlFor="question" className="sr-only">Your Question</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question for the AI Buddy..."
              rows={2}
              required
              className="text-sm bg-background"
            />
          </div>
          <Button type="submit" disabled={isPending || !question.trim()} className="w-full shadow-md">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Ask AI Buddy
          </Button>
        </form>
      </CardContent>
      {error && (
        <CardFooter className="p-4 border-t">
          <Alert variant="destructive">
            <AlertDescription>{error.message || "An error occurred. Please try again."}</AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  );
}
