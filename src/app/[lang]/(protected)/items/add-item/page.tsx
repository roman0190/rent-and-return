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
import { useTranslations } from "next-intl";

export default function ItemAddPage() {
  const t = useTranslations("items.addItem");
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
      toast.error(t("selectLocationError"));
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
    toast.success(t("itemListedSuccess"));
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
        <h1 className="mb-2">{t("title")}</h1>
        <p className="text-gray-600">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Images */}
            <div className="space-y-2">
              <Label>{t("itemImages")}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`${t("upload")} ${index + 1}`}
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
                  <span className="text-sm">{t("upload")}</span>
                </button>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("itemName")} *</Label>
                <Input
                  id="name"
                  placeholder={t("itemNamePlaceholder")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">{t("category")} *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">
                      {t("categories.electronics")}
                    </SelectItem>
                    <SelectItem value="Tools">
                      {t("categories.tools")}
                    </SelectItem>
                    <SelectItem value="Outdoor">
                      {t("categories.outdoor")}
                    </SelectItem>
                    <SelectItem value="Music">
                      {t("categories.music")}
                    </SelectItem>
                    <SelectItem value="Sports">
                      {t("categories.sports")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">{t("price")} *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder={t("pricePlaceholder")}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceUnit">{t("priceUnit")} *</Label>
                <Select
                  value={formData.priceUnit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priceUnit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectUnit")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">{t("priceUnits.day")}</SelectItem>
                    <SelectItem value="week">{t("priceUnits.week")}</SelectItem>
                    <SelectItem value="month">
                      {t("priceUnits.month")}
                    </SelectItem>
                    <SelectItem value="year">{t("priceUnits.year")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">{t("condition")} *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) =>
                    setFormData({ ...formData, condition: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCondition")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">{t("conditions.new")}</SelectItem>
                    <SelectItem value="Like New">
                      {t("conditions.likeNew")}
                    </SelectItem>
                    <SelectItem value="Good">{t("conditions.good")}</SelectItem>
                    <SelectItem value="Fair">{t("conditions.fair")}</SelectItem>
                    <SelectItem value="Poor">{t("conditions.poor")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>{t("location")} *</Label>

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
                  {t("detectLocation")}
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
                  {t("selectOnMap")}
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
                        {t("coordinates", {
                          lat: location.lat.toFixed(6),
                          lng: location.lng.toFixed(6),
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!location && (
                <p className="text-sm text-gray-500">{t("locationHelp")}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t("description")} *</Label>
              <Textarea
                id="description"
                placeholder={t("descriptionPlaceholder")}
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
              <Label htmlFor="features">{t("features")}</Label>
              <Textarea
                id="features"
                placeholder={t("featuresPlaceholder")}
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
                {t("publishItem")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate.push("/my-items")}
              >
                {t("cancel")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("selectItemLocation")}</DialogTitle>
            <DialogDescription>{t("mapDescription")}</DialogDescription>
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
              {t("confirmLocation")}
            </Button>
            <Button variant="outline" onClick={() => setShowMapDialog(false)}>
              {t("cancel")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
