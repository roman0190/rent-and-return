"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, User } from "lucide-react";
import "./chat.css";

const chatData = {
  _id: "507f1f77bcf86cd799439011",
  participants: ["userId1", "userId2"],
  itemId: "itemId1",
  user: {
    id: "userId1",
    name: "Rahim Khan",
    avatar: "",
  },
  messages: [
    {
      id: 1,
      sender: "them", // userId1 is "them" for userId2
      text: "Hi! I'm interested in renting your camera.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "me", // userId2 is "me"
      text: "Sure! It's available. When do you need it?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "them",
      text: "I need it for November 20-25. Is that okay?",
      timestamp: "10:35 AM",
    },
    {
      id: 4,
      sender: "me",
      text: "Yes, that works perfectly! The camera is in excellent condition.",
      timestamp: "10:36 AM",
    },
    {
      id: 5,
      sender: "them",
      text: "Great! How should we proceed?",
      timestamp: "10:40 AM",
    },
  ],
  isActive: true,
  createdAt: new Date("2025-12-06T10:30:00Z"),
  updatedAt: new Date("2025-12-06T10:40:00Z"),
};

export default function ChatWindowPage() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatData.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "me",
          text: message,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <Card className="rounded-b-none">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/chat">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="size-4 sm:size-5" />
              </Button>
            </Link>
            <Avatar className="size-8 sm:size-10 ring-2 ring-gray-100">
              <AvatarImage src={chatData.user.avatar} />
              <AvatarFallback>
                <User className="size-4 sm:size-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Link href={`/profile/${chatData.user.id}`}>
                <h3 className="text-sm sm:text-base font-semibold hover:text-indigo-600">
                  {chatData.user.name}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm text-green-600">Online</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <div className="bg-gray-200 shadow-2xl p-3 sm:p-4 h-[400px] sm:h-[500px] overflow-y-scroll messages-container">
        <div className="space-y-3 sm:space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] shadow-2xl rounded-lg p-2 sm:p-3 ${
                  msg.sender === "me"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-900 shadow-sm"
                }`}
              >
                <p className="text-xs sm:text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "me" ? "text-indigo-200" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <Card className="sticky bottom-0 bg-white border-t rounded-t-none ">
        <CardContent className="p-3 sm:p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <Send className="size-4 sm:size-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
