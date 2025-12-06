"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Navigation, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocation } from "@/hooks/useLocation";
import { LocationMapPicker } from "@/components/shared/LocationMapPicker";
import toast from "react-hot-toast";


export default function ItemAddPage() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    priceUnit: "day",
    condition: "",
    description: "",
    features: "",
  });
  const [images, setImages] = useState<string[]>([]);

  const {
    location,
    loadingLocation,
    showMapDialog,
    mapCenter,
    setMapCenter,
    selectedPosition,
    setSelectedPosition,
    setShowMapDialog,
    getUserCurrentLocation,
    handleDetectLocation,
    handleMapClick,
    confirmLocationSelection,
  } = useLocation();

  useEffect(() => {
    // Initialize with user's current location
    getUserCurrentLocation();
  }, [getUserCurrentLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      toast.error("Please select a location on the map");
      return;
    }

    // This is the data that would be sent to backend
    const itemData = {
      ...formData,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat], // [longitude, latitude] for MongoDB
      },
      images,
    };

    console.log("Item data to be sent to backend:", itemData);
    toast.success("Item listed successfully!");
    navigate.push("/my-items");
  };

  const handleImageUpload = () => {
    // Mock image upload
    setImages([
      ...images,
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400",
    ]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Add New Item</h1>
        <p className="text-gray-600">List your item for rent</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Images */}
            <div className="space-y-2">
              <Label>Item Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <Upload className="size-6" />
                  <span className="text-sm">Upload</span>
                </button>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Professional Camera Kit"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (Tk) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="45"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceUnit">Price Unit *</Label>
                <Select
                  value={formData.priceUnit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priceUnit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Per Day</SelectItem>
                    <SelectItem value="week">Per Week</SelectItem>
                    <SelectItem value="month">Per Month</SelectItem>
                    <SelectItem value="year">Per Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) =>
                    setFormData({ ...formData, condition: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location *</Label>

              {/* Location Actions */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDetectLocation}
                  disabled={loadingLocation}
                  className="flex-1"
                >
                  {loadingLocation ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    <Navigation className="size-4 mr-2" />
                  )}
                  Detect My Location
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // center map and show a pin at current detected location if available
                    if (selectedPosition) {
                      setMapCenter({
                        lat: selectedPosition.lat,
                        lng: selectedPosition.lng,
                      });
                    } else if (location) {
                      setMapCenter({ lat: location.lat, lng: location.lng });
                      setSelectedPosition({
                        lat: location.lat,
                        lng: location.lng,
                      });
                    } else {
                      getUserCurrentLocation();
                    }
                    setShowMapDialog(true);
                  }}
                  className="flex-1"
                >
                  <MapPin />
                  Select on Map
                </Button>
              </div>

              {/* Selected Location Display */}
              {location && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-5 text-green-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-green-900">
                        {location.address}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Coordinates: {location.lat.toFixed(6)},{" "}
                        {location.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!location && (
                <p className="text-sm text-gray-500">
                  Click "Detect My Location" or "Select on Map" to set the item
                  location
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={5}
                required
              />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                placeholder={`Feature 1\nFeature 2\nFeature 3`}
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={!location}>
                Publish Item
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate.push("/my-items")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Item Location</DialogTitle>
            <DialogDescription>
              Click on the map to select the location of your item
            </DialogDescription>
          </DialogHeader>

          <LocationMapPicker
            center={mapCenter}
            selectedPosition={selectedPosition}
            onLocationSelect={handleMapClick}
          />

          <div className="flex gap-3">
            <Button
              onClick={confirmLocationSelection}
              disabled={!selectedPosition}
              className="flex-1"
            >
              Confirm Location
            </Button>
            <Button variant="outline" onClick={() => setShowMapDialog(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
