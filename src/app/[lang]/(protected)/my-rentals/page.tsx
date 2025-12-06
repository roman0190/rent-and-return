"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Calendar, User, MessageSquare } from "lucide-react";

const asRenter = [
  {
    id: 1,
    item: {
      id: 1,
      name: "Professional Camera Kit",
      image:
        "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTc2MzA4Mjg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    owner: "Ayaan Rahman",
    startDate: "2024-11-20",
    endDate: "2024-11-25",
    status: "Active",
    total: 225,
    paymentMethod: "bKash",
  },
  {
    id: 2,
    item: {
      id: 3,
      name: "Camping Tent",
      image:
        "https://images.unsplash.com/photo-1596055746427-d5f61aa5df99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwZ2VhcnxlbnwxfHx8fDE3NjMwODI4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    owner: "Farhana Akter",
    startDate: "2024-11-15",
    endDate: "2024-11-18",
    status: "Completed",
    total: 105,
    paymentMethod: "Cash",
  },
  {
    id: 3,
    item: {
      id: 4,
      name: "Guitar & Amplifier",
      image:
        "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHN8ZW58MXx8fHwxNzYzMDgyODY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    owner: "Mehedi Hasan",
    startDate: "2024-11-25",
    endDate: "2024-11-28",
    status: "Pending",
    total: 120,
    paymentMethod: "",
  },
  {
    id: 4,
    item: {
      id: 4,
      name: "Guitar & Amplifier",
      image:
        "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHN8ZW58MXx8fHwxNzYzMDgyODY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    owner: "Mehedi Hasan",
    startDate: "2024-11-25",
    endDate: "2024-11-28",
    status: "Approved",
    total: 120,
    paymentMethod: "",
  },
];

const asOwner = [
  {
    id: 4,
    item: {
      id: 2,
      name: "Power Drill Set",
      image:
        "https://images.unsplash.com/photo-1683115099413-5b7d85c2950c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzfGVufDF8fHx8MTc2MzAyMjA5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    renter: "Nusrat Jahan",
    startDate: "2024-11-18",
    endDate: "2024-11-22",
    status: "Active",
    total: 100,
    paymentMethod: "Rocket",
  },
  {
    id: 5,
    item: {
      id: 1,
      name: "Professional Camera Kit",
      image:
        "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTc2MzA4Mjg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    renter: "Sabbir Ahmed",
    startDate: "2024-11-26",
    endDate: "2024-11-30",
    status: "Pending",
    total: 180,
    paymentMethod: "Cash",
  },
];

export default function MyRentalsPage() {
  const [activeTab, setActiveTab] = useState("renter");
  const [renterList, setRenterList] = useState(asRenter);
  const [ownerList, setOwnerList] = useState(asOwner);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">My Rentals</h1>
        <p className="text-gray-600">Track your rental activities</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 transition-all duration-300">
          <TabsTrigger
            value="renter"
            className="transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            As Renter
          </TabsTrigger>
          <TabsTrigger
            value="owner"
            className="transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            As Owner
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="renter"
          className="space-y-4 mt-6 animate-in slide-in-from-left-4 duration-500 ease-out"
        >
          {renterList.map((rental) => (
            <Card key={rental.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-32 aspect-square overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={rental.item.image}
                      alt={rental.item.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/items/${rental.item.id}`}>
                          <h3 className="hover:text-indigo-600">
                            {rental.item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <User className="size-4" />
                          Owner: {rental.owner}
                        </p>
                      </div>
                      <Badge className={getStatusColor(rental.status)}>
                        {rental.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>
                          {rental.startDate} - {rental.endDate}
                        </span>
                      </div>
                      <span className="text-indigo-600">
                        Total: Tk {rental.total}
                      </span>
                      <span className="text-gray-500">
                        {(rental.status === "Active" ||
                          rental.status === "Completed") && (
                          <>• {rental.paymentMethod}</>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/my-rentals/${rental.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/chat/1">
                          <MessageSquare className="size-4 mr-2" />
                          Message
                        </Link>
                      </Button>
                      {rental.status === "Pending" && (
                        <Button size="sm" variant="default" asChild>
                          <Link
                            href="#"
                            style={{ pointerEvents: "none", opacity: 0.5 }}
                          >
                            Payment
                          </Link>
                        </Button>
                      )}
                      {rental.status === "Approved" && (
                        <Button size="sm" variant="default" asChild>
                          <Link href="/payment">Payment</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent
          value="owner"
          className="space-y-4 mt-6 animate-in slide-in-from-right-4 duration-500 ease-out"
        >
          {ownerList.map((rental, idx) => (
            <Card key={rental.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-32 aspect-square overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={rental.item.image}
                      alt={rental.item.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/items/${rental.item.id}`}>
                          <h3 className="hover:text-indigo-600">
                            {rental.item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <User className="size-4" />
                          Renter: {rental.renter}
                        </p>
                      </div>
                      <Badge className={getStatusColor(rental.status)}>
                        {rental.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>
                          {rental.startDate} - {rental.endDate}
                        </span>
                      </div>
                      <span className="text-indigo-600">
                        Total: Tk {rental.total}
                      </span>
                      <span className="text-gray-500">
                        {(rental.status === "Active" ||
                          rental.status === "Completed") && (
                          <>• {rental.paymentMethod}</>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/rentals/${rental.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                      {rental.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => {
                              const updated = [...ownerList];
                              updated[idx] = { ...rental, status: "Approved" };
                              setOwnerList(updated);
                              // Also update renterList if matching rental exists
                              setRenterList((prev) =>
                                prev.map((r) =>
                                  r.id === rental.item.id
                                    ? { ...r, status: "Approved" }
                                    : r
                                )
                              );
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      <Link href="/chat/1">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="size-4 mr-2" />
                          Message
                        </Button>
                      </Link>
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
}
