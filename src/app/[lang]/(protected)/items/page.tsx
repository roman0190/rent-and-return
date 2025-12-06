"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, MapPin, Search, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import items from "@/lib/items.json";

export default function ItemListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedPriceUnit, setSelectedPriceUnit] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [distanceRange, setDistanceRange] = useState([5]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Get user's location on mount
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingLocation(false);
        }
      );
    } else {
      setLoadingLocation(false);
    }
  };

  // Haversine formula to calculate distance in km
  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  // Your location (fallback if userLocation not available)
  const myLat = userLocation?.lat ?? 0;
  const myLng = userLocation?.lng ?? 0;

  // Compute distances for all items first
  const itemsWithDistance = items.map((item) => {
    const [itemLng, itemLat] = item.location.coordinates;
    const realDistance = getDistanceFromLatLonInKm(
      myLat,
      myLng,
      itemLat,
      itemLng
    );
    return { ...item, realDistance };
  });

  // Then apply the UI filters (search, category, etc.) on the list with distances
  const filteredItems = itemsWithDistance.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory;
    const matchesCondition =
      selectedCondition === "all" || item.condition === selectedCondition;
    const matchesPriceUnit =
      selectedPriceUnit === "all" || item.priceUnit === selectedPriceUnit;
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesDistance = item.realDistance <= distanceRange[0] + 0.1;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesCondition &&
      matchesPriceUnit &&
      matchesPrice &&
      matchesDistance
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Browse Items</h1>
        <p className="text-gray-600">Find the perfect item to rent</p>
      </div>

      {/* Search & Quick Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="size-4 mr-2" />
                {showFilters ? "Hide" : "More"} Filters
              </Button>
            </div>

            {/* Location Info */}
            {userLocation && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="size-4 text-indigo-600" />
                <span>
                  Showing items within {distanceRange[0]}km of your location
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <h3>Advanced Filters</h3>

            {/* Distance Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Distance Range</Label>
                <span className="text-sm text-gray-600">
                  Up to {distanceRange[0]}km
                </span>
              </div>
              <Slider
                value={distanceRange}
                onValueChange={setDistanceRange}
                max={10}
                min={1}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1km</span>
                <span>10km</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Price Range</Label>
                <span className="text-sm text-gray-600">
                  Tk{priceRange[0]} - Tk{priceRange[1]}
                </span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Tk0</span>
                <span>Tk5000</span>
              </div>
            </div>

            {/* Condition Filter */}
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select
                value={selectedCondition}
                onValueChange={setSelectedCondition}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Like New">Like New</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Unit Filter */}
            <div className="space-y-2">
              <Label>Price Unit</Label>
              <Select
                value={selectedPriceUnit}
                onValueChange={setSelectedPriceUnit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  <SelectItem value="day">Per Day</SelectItem>
                  <SelectItem value="week">Per Week</SelectItem>
                  <SelectItem value="month">Per Month</SelectItem>
                  <SelectItem value="year">Per Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedCondition("all");
                setSelectedPriceUnit("all");
                setPriceRange([0, 5000]);
                setDistanceRange([5]);
              }}
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredItems.length} of {items.length} items
        </p>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
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
                <h3 className="mb-2 text-base sm:text-lg">{item.title}</h3>
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

      {/* No Results */}
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600 mb-4">
              No items found matching your filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedCondition("all");
                setSelectedPriceUnit("all");
                setPriceRange([0, 5000]);
                setDistanceRange([5]);
              }}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
