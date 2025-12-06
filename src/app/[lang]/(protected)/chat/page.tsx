"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

const chats = [
  {
    id: "507f1f77bcf86cd799439011",
    user: {
      name: "Rahim Khan",
      avatar: "",
    },
    lastMessage: "Great! How should we proceed?",
    timestamp: "5m ago",
    unread: 1, // Calculated: 1 message not read by userId2
  },
  {
    id: "507f1f77bcf86cd799439012",
    user: {
      name: "Karim Ahmed",
      avatar: "",
    },
    lastMessage: "You can pick it up tomorrow at 10 AM.",
    timestamp: "1h ago",
    unread: 0, // All read
  },
  {
    id: "507f1f77bcf86cd799439013",
    user: {
      name: "Jamal Hossain",
      avatar: "",
    },
    lastMessage: "You're welcome! Let me know if you need anything else.",
    timestamp: "2h ago",
    unread: 1, // 1 message not read
  },
  {
    id: "507f1f77bcf86cd799439014",
    user: {
      name: "Fatima Begum",
      avatar: "",
    },
    lastMessage: "Yes, it's available. Would you like to book it?",
    timestamp: "1d ago",
    unread: 0, // All read
  },
];

export default function ChatListPage() {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter(
    (chat) =>
      chat.user.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="mb-2 text-xl sm:text-2xl font-bold">Messages</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Chat with renters and owners
        </p>
      </div>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-0">
        {filteredChats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <Card className="border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer rounded-none border-x-0 border-t-0 last:border-b">
              <CardContent className="p-2 sm:p-3">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Avatar className="size-8 sm:size-10 ring-2 ring-gray-100">
                    <AvatarImage src={chat.user.avatar} />
                    <AvatarFallback>
                      <User className="size-4 sm:size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                        {chat.user.name}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-indigo-600 text-xs px-2 py-1 rounded-full">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
