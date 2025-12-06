"use client";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MapPin, MessageSquare, Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import items from "../../../../../lib/items.json";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const item = items.find((itm) => String(itm.id) === String(id));
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  if (!item) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center text-gray-500">
        Item not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <ImageWithFallback
              src={item.image?.[0]}
              alt={item.title}
              className="size-full object-cover"
            />
            <Badge className="absolute top-4 right-4">{item.category}</Badge>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2">{item.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {(
                    item.reviews?.reduce(
                      (sum, review) => sum + review.rating,
                      0
                    ) / item.reviews?.length
                  )?.toFixed(1) ?? 0}{" "}
                  ({item.reviews?.length} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>{item.location.label}</span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-indigo-600">Tk{item.price}</span>
                <span className="text-gray-600">per {item.priceUnit}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">
                    Select Rental Period
                  </label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <CalendarIcon className="size-4 mr-2" />
                          {startDate
                            ? startDate.toLocaleDateString()
                            : "Start Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <CalendarIcon className="size-4 mr-2" />
                          {endDate ? endDate.toLocaleDateString() : "End Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Dialog
                  open={isRequestModalOpen}
                  onOpenChange={setIsRequestModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Request to Rent
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rental Request Sent!</DialogTitle>
                      <DialogDescription>
                        Your rental request has been sent to the owner. They
                        will review and respond soon.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          Request details have been sent to {item.owner}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => setIsRequestModalOpen(false)}
                        >
                          OK
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href="/chat/1">
                            <MessageSquare className="size-4 mr-2" />
                            Message Owner
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/chat/${item.id}`}>
                    <MessageSquare className="size-4 mr-2" />
                    Message Owner
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Owner Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="size-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="hover:text-indigo-600">{item.owner}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>{item.location.label}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4">Description</h2>
            <p className="text-gray-600">{item.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4">Features</h2>
            <ul className="space-y-2">
              {item.features?.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <div className="size-1.5 rounded-full bg-indigo-600"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Reviews */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4">Reviews</h2>
          <div className="space-y-4">
            {item.reviews?.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="size-10">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>
                      <User className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{review.user}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {review.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm ml-13">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
