"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar, MapPin, User, MessageSquare, Star } from "lucide-react";

const rentalData = {
  id: 1,
  item: {
    id: 1,
    name: "Professional Camera Kit",
    image:
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTc2MzA4Mjg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Dhaka, Bangladesh",
  },
  owner: {
    id: 1,
    name: "Ayaan Rahman",
    avatar: "",
  },
  renter: {
    id: 2,
    name: "Farhana Akter",
    avatar: "",
  },
  startDate: "2024-11-20",
  endDate: "2024-11-25",
  status: "Active",
  pricePerDay: 45,
  days: 5,
  total: 225,
  requestDate: "2024-11-15",
  approvedDate: "2024-11-16",
  paymentMethod: "bKash",
  paymentStatus: "Completed",
  transactionId: "BKH20241116ABC123",
};

export default function RentalDetailsPage() {
  const { id } = useParams();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const handleSubmitReview = () => {
    setIsReviewOpen(false);
  };

  const handleCompleteRental = () => {
    setIsCompleteOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Rental Details</h1>
          <p className="text-gray-600">Rental ID: #{rentalData.id}</p>
        </div>
        <Badge
          className={
            rentalData.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {rentalData.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Item Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Item Details</h2>
              <div className="flex gap-4">
                <div className="w-32 aspect-square overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={rentalData.item.image}
                    alt={rentalData.item.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/items/${rentalData.item.id}`}>
                    <h3 className="hover:text-indigo-600">
                      {rentalData.item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 text-gray-600 mt-2">
                    <MapPin className="size-4" />
                    <span className="text-sm">{rentalData.item.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Period */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Rental Period</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-gray-400" />
                    <span>{rentalData.startDate}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">End Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-gray-400" />
                    <span>{rentalData.endDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment button for Approved, history/details for Active/Completed */}
          {rentalData.status === "Approved" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Payment</h2>
                <Link href="/payment">
                  <Button className="w-full" size="lg">
                    Proceed to Payment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
          {(rentalData.status === "Active" ||
            rentalData.status === "Completed") && (
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Payment Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per day</span>
                    <span>${rentalData.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of days</span>
                    <span>{rentalData.days}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between mb-2">
                      <span>Total Amount</span>
                      <span className="text-indigo-600">
                        ${rentalData.total}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">
                        {rentalData.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className="text-green-600 font-medium">
                        {rentalData.paymentStatus}
                      </span>
                    </div>
                    {rentalData.transactionId &&
                      rentalData.paymentMethod !== "Cash" && (
                        <div className="flex justify-between mt-2 pt-2 border-t">
                          <span className="text-gray-600">Transaction ID</span>
                          <span className="text-sm font-mono">
                            {rentalData.transactionId}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* People Involved */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Owner</p>
                <Link href={`/profile/${rentalData.owner.id}`}>
                  <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg -m-2">
                    <Avatar>
                      <AvatarImage src={rentalData.owner.avatar} />
                      <AvatarFallback>
                        <User className="size-5" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{rentalData.owner.name}</span>
                  </div>
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Renter</p>
                <Link href={`/profile/${rentalData.renter.id}`}>
                  <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg -m-2">
                    <Avatar>
                      <AvatarImage src={rentalData.renter.avatar} />
                      <AvatarFallback>
                        <User className="size-5" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{rentalData.renter.name}</span>
                  </div>
                </Link>
              </div>
              <Link href="/chat/1">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="size-4 mr-2" />
                  Send Message
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Actions: Hide if Pending */}
          {rentalData.status !== "Pending" && (
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3>Actions</h3>
                {rentalData.status === "Active" && (
                  <Dialog
                    open={isCompleteOpen}
                    onOpenChange={setIsCompleteOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">Mark as Completed</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Rental</DialogTitle>
                        <DialogDescription>
                          Mark this rental as completed and finalize the
                          transaction.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsCompleteOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleCompleteRental}>Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Star className="size-4 mr-2" />
                      Review Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Review Item</DialogTitle>
                      <DialogDescription>
                        Share your experience with this item
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm mb-2 block">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`size-8 ${
                                  star <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm mb-2 block">
                          Your Review
                        </label>
                        <Textarea
                          placeholder="Share your experience..."
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsReviewOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitReview}>
                        Submit Review
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
