"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "rental",
    icon: Package,
    title: "New Rental Request",
    message: "Alice Brown requested to rent your Power Drill Set",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "message",
    icon: MessageSquare,
    title: "New Message",
    message: "John Doe sent you a message about Camera Kit",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "review",
    icon: Star,
    title: "New Review",
    message: "Bob Wilson left a 5-star review for your Guitar",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "rental",
    icon: CheckCircle,
    title: "Rental Approved",
    message: "Your rental request for Camping Tent has been approved",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "system",
    icon: AlertCircle,
    title: "Payment Reminder",
    message: "Your payment for Camera Kit rental is due in 2 days",
    time: "1 day ago",
    read: true,
  },
];

const NotificationsPage = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIconColor = (type: string) => {
    switch (type) {
      case "rental":
        return "bg-blue-100 text-blue-600";
      case "message":
        return "bg-green-100 text-green-600";
      case "review":
        return "bg-yellow-100 text-yellow-600";
      case "system":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Notifications</h1>
          <p className="text-gray-600">
            You have {unreadCount} unread notification
            {unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-2 mt-6">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`${
                !notification.read ? "border-indigo-200 bg-indigo-50/50" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg ${getIconColor(
                      notification.type
                    )}`}
                  >
                    <notification.icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3>{notification.title}</h3>
                      {!notification.read && (
                        <div className="size-2 rounded-full bg-indigo-600"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="size-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-2 mt-6">
          {notifications
            .filter((n) => !n.read)
            .map((notification) => (
              <Card
                key={notification.id}
                className="border-indigo-200 bg-indigo-50/50"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${getIconColor(
                        notification.type
                      )}`}
                    >
                      <notification.icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3>{notification.title}</h3>
                        <div className="size-2 rounded-full bg-indigo-600"></div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="size-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="rentals" className="space-y-2 mt-6">
          {notifications
            .filter((n) => n.type === "rental")
            .map((notification) => (
              <Card
                key={notification.id}
                className={`${
                  !notification.read ? "border-indigo-200 bg-indigo-50/50" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${getIconColor(
                        notification.type
                      )}`}
                    >
                      <notification.icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="size-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="messages" className="space-y-2 mt-6">
          {notifications
            .filter((n) => n.type === "message")
            .map((notification) => (
              <Card
                key={notification.id}
                className={`${
                  !notification.read ? "border-indigo-200 bg-indigo-50/50" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${getIconColor(
                        notification.type
                      )}`}
                    >
                      <notification.icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="size-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
