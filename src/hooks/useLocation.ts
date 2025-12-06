import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

export interface UseLocationReturn {
  location: LocationData | null;
  loadingLocation: boolean;
  showMapDialog: boolean;
  mapCenter: { lat: number; lng: number };
  selectedPosition: { lat: number; lng: number } | null;
  setLocation: (location: LocationData | null) => void;
  setLoadingLocation: (loading: boolean) => void;
  setShowMapDialog: (show: boolean) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setSelectedPosition: (position: { lat: number; lng: number } | null) => void;
  getUserCurrentLocation: () => void;
  handleDetectLocation: () => void;
  handleMapClick: (lat: number, lng: number) => void;
  confirmLocationSelection: () => void;
  reverseGeocode: (lat: number, lng: number) => Promise<string>;
}

export const useLocation = (
  initialLocation?: LocationData | null
): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(
    initialLocation || null
  );
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    { lat: 23.8103, lng: 90.4125 } // Dhaka
  );
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
      setSelectedPosition({
        lat: initialLocation.lat,
        lng: initialLocation.lng,
      });
      setMapCenter({
        lat: initialLocation.lat,
        lng: initialLocation.lng,
      });
    }
  }, [initialLocation]);

  const getUserCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          // Reverse geocode to get address
          const address = await reverseGeocode(latitude, longitude);

          setLocation({
            lat: latitude,
            lng: longitude,
            address: address,
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

  const handleDetectLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode to get address
          const address = await reverseGeocode(latitude, longitude);

          setLocation({
            lat: latitude,
            lng: longitude,
            address: address,
          });

          setMapCenter({ lat: latitude, lng: longitude });
          setSelectedPosition({ lat: latitude, lng: longitude });

          toast.success("Location detected successfully!");
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get location. Please select on map.");
          setLoadingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setLoadingLocation(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // Using Nominatim (OpenStreetMap) for reverse geocoding - free service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data.display_name) {
        return data.display_name;
      }
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  const handleMapClick = async (lat: number, lng: number) => {
    const address = await reverseGeocode(lat, lng);

    setLocation({
      lat,
      lng,
      address,
    });

    setSelectedPosition({ lat, lng });
    toast.success("Location selected!");
  };

  const confirmLocationSelection = () => {
    if (selectedPosition) {
      setShowMapDialog(false);
      toast.success("Location saved!");
    }
  };

  return {
    location,
    loadingLocation,
    showMapDialog,
    mapCenter,
    selectedPosition,
    setLocation,
    setLoadingLocation,
    setShowMapDialog,
    setMapCenter,
    setSelectedPosition,
    getUserCurrentLocation,
    handleDetectLocation,
    handleMapClick,
    confirmLocationSelection,
    reverseGeocode,
  };
};
