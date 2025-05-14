
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, SmilePlus, MoreVertical, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface Message {
  id: string;
  user: string;
  avatarSeed: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

const quickReplies = ["Hey!", "Sup?", "Howdy", "👍", "😂"];

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<{ name: string, avatarSeed: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setMounted(true);
    const userName = "Kei"; 
    setCurrentUser({ name: userName, avatarSeed: userName.substring(0,2).toUpperCase() });

    if (typeof window !== "undefined") {
        const savedMessages = localStorage.getItem("studyChatMessagesNew"); // Use new key
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages).map((m: any) => ({...m, timestamp: new Date(m.timestamp)})));
        } else {
             setMessages([
              { id: "1", user: "Vivian", avatarSeed: "VI", text: "@Vivian", timestamp: new Date(Date.now() - 60000 * 10), isOwn: false },
              { id: "2", user: "John", avatarSeed: "JO", text: "John joined the room. Say hi!", timestamp: new Date(Date.now() - 60000 * 8), isOwn: false },
              { id: "3", user: currentUser?.name || "Kei", avatarSeed: currentUser?.avatarSeed || "KE", text: "Welcome!", timestamp: new Date(Date.now() - 60000 * 7), isOwn: true },
              { id: "4", user: "Gecko8209", avatarSeed: "G8", text: "Gecko8209 joined the room. Say hi!", timestamp: new Date(Date.now() - 60000 * 5), isOwn: false },
              { id: "5", user: currentUser?.name || "Kei", avatarSeed: currentUser?.avatarSeed || "KE", text: "Welcome!", timestamp: new Date(Date.now() - 60000 * 4), isOwn: true },
              { id: "6", user: "Gecko8209", avatarSeed: "G8", text: "Hi all!", timestamp: new Date(Date.now() - 60000 * 3), isOwn: false },
              { id: "7", user: currentUser?.name || "Kei", avatarSeed: currentUser?.avatarSeed || "KE", text: "good luck, gecko!", timestamp: new Date(Date.now() - 60000 * 2), isOwn: true },
              { id: "8", user: "Amyrah_Odette (Anna)", avatarSeed: "AO", text: "Amyrah_Odette (Anna) joined the room. Say hi!", timestamp: new Date(Date.now() - 60000 * 1.5), isOwn: false },
              { id: "9", user: currentUser?.name || "Kei", avatarSeed: currentUser?.avatarSeed || "KE", text: "Welcome!", timestamp: new Date(Date.now() - 60000 * 1), isOwn: true },
              { id: "10", user: "Amyrah_Odette (Anna)", avatarSeed: "AO", text: "Hey!", timestamp: new Date(Date.now() - 60000 * 0.5), isOwn: false },
              { id: "11", user: "girlocky", avatarSeed: "GI", text: "Hey!", timestamp: new Date(Date.now() - 60000 * 0.2), isOwn: false },

            ]);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]); // Add currentUser to dep array if it's truly dynamic from props/context

   useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("studyChatMessagesNew", JSON.stringify(messages));
    }
    // Auto scroll to bottom
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, mounted]);


  const sendMessage = (text: string) => {
    if (!text.trim() || !currentUser) return;
    const message: Message = {
      id: Date.now().toString(),
      user: currentUser.name,
      avatarSeed: currentUser.avatarSeed,
      text: text,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages(prev => [...prev, message]);
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  }

  if (!mounted) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm shadow-lg flex-grow flex flex-col">
        <CardHeader className="p-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary flex items-center">Chat <ChevronDown className="ml-1 h-4 w-4 opacity-70" /></CardTitle>
          <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <div className="text-sm text-muted-foreground text-center pt-8">Loading chat...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg flex-grow flex flex-col min-h-[300px] max-h-[400px] md:max-h-[450px]">
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-primary flex items-center cursor-pointer hover:opacity-80">
            Chat <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
            <span className="ml-1.5 text-xs bg-destructive/80 text-destructive-foreground rounded-full px-1.5 py-0.5">99+</span>
        </CardTitle>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                     <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>Chat Settings</p></TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="p-3 flex-grow overflow-hidden flex flex-col space-y-2">
        <ScrollArea className="flex-grow mb-2 pr-1" ref={scrollAreaRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-1.5 mb-2.5 ${msg.isOwn ? 'justify-end' : ''}`}>
              {!msg.isOwn && (
                <Avatar className="w-6 h-6 self-start mt-1">
                  <AvatarImage src={`https://placehold.co/40x40/${msg.isOwn ? '3498db' : '7E57C2'}/FFFFFF.png?text=${msg.avatarSeed}`} alt={msg.user} data-ai-hint="avatar person" />
                  <AvatarFallback>{msg.avatarSeed}</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col max-w-[80%]`}>
                {!msg.isOwn && <span className="text-xs text-muted-foreground/80 mb-0.5 ml-1">{msg.user}</span>}
                 <div className={`p-2 rounded-lg shadow-sm text-sm ${msg.isOwn ? 'bg-primary/90 text-primary-foreground rounded-br-none' : 'bg-background/50 text-foreground rounded-bl-none'}`}>
                    <p>{msg.text}</p>
                 </div>
                 <span className={`text-[10px] opacity-60 mt-0.5 ${msg.isOwn ? 'text-right mr-1 text-primary-foreground/70' : 'text-left ml-1 text-muted-foreground'}`}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
               {msg.isOwn && (
                <Avatar className="w-6 h-6 self-start mt-1">
                 <AvatarImage src={`https://placehold.co/40x40/3498db/FFFFFF.png?text=${msg.avatarSeed}`} alt={msg.user} data-ai-hint="avatar person" />
                  <AvatarFallback>{msg.avatarSeed}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center gap-1.5 pt-1.5 border-t border-border/20">
          {quickReplies.map(reply => (
            <Button key={reply} variant="outline" size="sm" className="text-xs h-7 px-2.5 bg-background/40 hover:bg-accent/50" onClick={() => handleQuickReply(reply)}>
              {reply}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-1.5">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Say something..."
            className="flex-grow bg-input/50 text-sm h-9"
            aria-label="Chat message input"
          />
          <Tooltip>
            <TooltipTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground hover:text-primary">
                    <SmilePlus className="h-4.5 w-4.5" />
                    <span className="sr-only">Add emoji</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top"><p>Emoji</p></TooltipContent>
          </Tooltip>
          <Button type="submit" size="icon" disabled={!newMessage.trim()} className="h-9 w-9 shrink-0">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}
