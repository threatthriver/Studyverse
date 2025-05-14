"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<{ name: string, avatar: string } | null>(null);

  useEffect(() => {
    // Simulate fetching user info and initial messages
    setUser({ name: "You", avatar: "https://placehold.co/40x40/3498db/ffffff.png?text=U" });
    setMessages([
      { id: "1", user: "StudyBot", avatar: "https://placehold.co/40x40/2ecc71/ffffff.png?text=SB", text: "Welcome to the study room chat! Say hi!", timestamp: new Date(Date.now() - 60000 * 5) },
      { id: "2", user: "Alex", avatar: "https://placehold.co/40x40/f1c40f/000000.png?text=A", text: "Hey everyone! Ready to focus?", timestamp: new Date(Date.now() - 60000 * 2) },
    ]);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    const message: Message = {
      id: Date.now().toString(),
      user: user.name,
      avatar: user.avatar,
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate a bot response or another user response
    setTimeout(() => {
      if (newMessage.toLowerCase().includes("hello") || newMessage.toLowerCase().includes("hi")) {
        setMessages(prev => [...prev, { id: Date.now().toString() + "bot", user: "StudyBot", avatar: "https://placehold.co/40x40/2ecc71/ffffff.png?text=SB", text: `Hi ${user.name}! Glad to have you here.`, timestamp: new Date() }]);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <Users className="w-6 h-6 mr-2 text-primary" />
        Group Chat
      </h3>
      <p className="text-xs text-muted-foreground mb-3 text-center bg-secondary/50 p-2 rounded-md">
        Note: This is a conceptual chat panel. Full real-time functionality (video/audio) requires further backend integration.
      </p>
      <ScrollArea className="flex-grow h-[250px] md:h-[300px] mb-4 p-3 border rounded-md bg-muted/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2.5 mb-3 ${msg.user === user?.name ? 'justify-end' : ''}`}>
            {msg.user !== user?.name && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint="avatar person" />
                <AvatarFallback>{msg.user.substring(0,1)}</AvatarFallback>
              </Avatar>
            )}
            <div className={`flex flex-col max-w-[70%] p-2.5 rounded-lg ${msg.user === user?.name ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background border rounded-bl-none'}`}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-0.5">
                    <span className="text-xs font-semibold">{msg.user}</span>
                    <span className="text-xs font-normal text-muted-foreground/80">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-sm font-normal">{msg.text}</p>
            </div>
             {msg.user === user?.name && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint="avatar person" />
                <AvatarFallback>{msg.user.substring(0,1)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow bg-background"
          aria-label="Chat message input"
        />
        <Button type="submit" size="icon" disabled={!newMessage.trim()} className="shadow-md">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
