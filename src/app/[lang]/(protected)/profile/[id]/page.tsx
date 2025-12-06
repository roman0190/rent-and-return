"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
  Edit,
  MapPin,
  MessageSquare,
  Star,
  User,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import items from "@/lib/items.json";

// Mock user data based on owners in items
const getUserProfile = (userId: string) => {
  const owners = [...new Set(items.map((item) => item.owner))];
  const ownerName = owners[parseInt(userId) - 1] || owners[0]; // Default to first owner if invalid id

  return {
    id: parseInt(userId),
    name: ownerName,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 4.8,
    totalRentals: 24,
    location: "Dhaka, Bangladesh",
    joinDate: "January 2024",
    bio: `Professional with experience in various fields. Love sharing equipment with fellow creatives.`,
    totalListings: items.filter((item) => item.owner === ownerName).length,
    items: items
      .filter((item) => item.owner === ownerName)
      .map((item) => ({
        id: item.id,
        name: item.title,
        image: item.image[0],
        category: item.category,
        rating: item.reviews?.length
          ? (
              item.reviews.reduce((sum, review) => sum + review.rating, 0) /
              item.reviews.length
            ).toFixed(1)
          : 0,
        price: item.price,
      })),
  };
};

const handleSendMessage = () => {
  console.log("Message Send.");
};
export default function ProfilePage() {
  const { id } = useParams();
  const userId = id as string;
  const userProfile = getUserProfile(userId);

  // In a real app, this would check if the current logged-in user matches the profile user
  // For demo purposes, assume user ID "1" is the current user
  const isOwnProfile = userId === "1";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <ImageWithFallback
                src={userProfile.avatar}
                alt={userProfile.name}
                className="size-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="mb-2">{userProfile.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {userProfile.rating} ({userProfile.totalRentals} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{userProfile.bio}</p>
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Link href="/profile/edit/1">
                    <Button>
                      <Edit className="size-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <Button onClick={handleSendMessage}>
                    <MessageSquare className="size-4 mr-2" />
                    Send Message
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-indigo-600 mb-2">{userProfile.totalListings}</p>
            <p className="text-sm text-gray-600">Active Listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-indigo-600 mb-2">{userProfile.totalRentals}</p>
            <p className="text-sm text-gray-600">Total Rentals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <p className="text-indigo-600">{userProfile.rating}</p>
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Listed Items */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4">Listed Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProfile.items.map((item) => (
              <Link key={item.id} href={`/items/${item.id}`}>
                <Card className="group hover:shadow-lg transition-shadow py-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-2 right-2">
                      {item.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                      <span className="text-indigo-600">
                        Tk {item.price}/day
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
