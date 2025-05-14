"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  user: string;
  avatarSeed: string; // Seed for placeholder image
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<{ name: string, avatarSeed: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate fetching user info
    const userName = "You"; // Could be dynamic
    setCurrentUser({ name: userName, avatarSeed: userName.substring(0,2).toUpperCase() });

    // Load messages from local storage or set initial
    if (typeof window !== "undefined") {
        const savedMessages = localStorage.getItem("studyChatMessages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages).map((m: any) => ({...m, timestamp: new Date(m.timestamp)})));
        } else {
            setMessages([
              { id: "1", user: "StudyBot", avatarSeed: "SB", text: "Welcome to the Studyverse! Say hi!", timestamp: new Date(Date.now() - 60000 * 5), isOwn: false },
              { id: "2", user: "Alex", avatarSeed: "AL", text: "Hey everyone! Ready for a focused session?", timestamp: new Date(Date.now() - 60000 * 2), isOwn: false },
            ]);
        }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("studyChatMessages", JSON.stringify(messages));
    }
  }, [messages, mounted]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    const message: Message = {
      id: Date.now().toString(),
      user: currentUser.name,
      avatarSeed: currentUser.avatarSeed,
      text: newMessage,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate a bot response
    if (newMessage.toLowerCase().includes("hello") || newMessage.toLowerCase().includes("hi")) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString() + "bot", user: "StudyBot", avatarSeed: "SB", text: `Hi ${currentUser.name}! Good to see you.`, timestamp: new Date(), isOwn: false }]);
      }, 1000);
    }
  };

  if (!mounted) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm shadow-lg flex-grow flex flex-col">
        <CardHeader className="p-3">
          <CardTitle className="text-base font-semibold text-primary">Group Chat</CardTitle>
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <div className="text-sm text-muted-foreground text-center pt-8">Loading chat...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg flex-grow flex flex-col min-h-[300px] max-h-[400px]">
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold text-primary">Group Chat</CardTitle>
      </CardHeader>
      <CardContent className="p-3 flex-grow overflow-hidden flex flex-col space-y-2">
        <ScrollArea className="flex-grow mb-2 pr-1">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 mb-2.5 ${msg.isOwn ? 'justify-end' : ''}`}>
              {!msg.isOwn && (
                <Avatar className="w-7 h-7">
                  <AvatarImage src={`https://placehold.co/40x40/7E57C2/FFFFFF.png?text=${msg.avatarSeed}`} alt={msg.user} data-ai-hint="avatar person" />
                  <AvatarFallback>{msg.avatarSeed}</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col max-w-[75%] p-2 rounded-lg shadow-sm ${msg.isOwn ? 'bg-primary/80 text-primary-foreground rounded-br-none' : 'bg-background/40 text-foreground rounded-bl-none'}`}>
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs mb-0.5">
                      {!msg.isOwn && <span className="font-semibold opacity-80">{msg.user}</span>}
                      <span className={`opacity-60 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm">{msg.text}</p>
              </div>
               {msg.isOwn && (
                <Avatar className="w-7 h-7">
                  <AvatarImage src={`https://placehold.co/40x40/3498db/FFFFFF.png?text=${msg.avatarSeed}`} alt={msg.user} data-ai-hint="avatar person" />
                  <AvatarFallback>{msg.avatarSeed}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-1 border-t border-border/30">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message..."
            className="flex-grow bg-input/50 text-sm h-9"
            aria-label="Chat message input"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()} className="h-9 w-9 shrink-0">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
