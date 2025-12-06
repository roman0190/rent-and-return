"use client";
import HeroSection from "@/components/protected/home/HeroSection";
import StatsSection from "@/components/protected/home/StatsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";

import items from "@/lib/items.json";
const DasboardPage = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setUserLocation(null);
        }
      );
    }
  }, []);

  // Haversine formula
  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  const myLat = userLocation?.lat ?? 23.8201;
  const myLng = userLocation?.lng ?? 90.4256;

  const itemsWithDistance = items.map((item) => {
    const [lng, lat] = item.location.coordinates;
    const realDistance = getDistanceFromLatLonInKm(myLat, myLng, lat, lng);
    return { ...item, realDistance };
  });

  return (
    <div className="space-y-8">
      <HeroSection />
      <StatsSection />
      {/* Featured Items */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Featured Items</h2>
          <Link href={"/items"}>
            <Button variant={"ghost"}>Nearby Items</Button>
          </Link>
        </div>
        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsWithDistance.map((item) => (
            <Link key={item.id} href={`/items/${item.id}`}>
              <Card className="group hover:shadow-lg transition-shadow h-full py-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={item.image[0]}
                    alt={item.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-2 right-2">
                    {item.category}
                  </Badge>
                  <Badge className="absolute top-2 left-2 bg-white text-gray-900">
                    {item.condition}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-base sm:text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-xs sm:text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3">
                    <MapPin className="size-4 text-indigo-600" />
                    <span>
                      {item.location.label} • {item.realDistance.toFixed(1)}km
                      away
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm">
                        {(
                          item.reviews?.reduce(
                            (sum, review) => sum + review.rating,
                            0
                          ) / item.reviews?.length
                        )?.toFixed(1) ?? 0}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-400">
                        ({item.reviews?.length})
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-indigo-600">
                      Tk{item.price}/{item.priceUnit}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DasboardPage;
