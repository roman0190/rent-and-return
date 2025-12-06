import { useState, useEffect } from "react";

interface LocationMapPickerProps {
  center: { lat: number; lng: number };
  selectedPosition: { lat: number; lng: number } | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

export function LocationMapPicker({
  center,
  selectedPosition,
  onLocationSelect,
}: LocationMapPickerProps) {
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstance && center) {
      mapInstance.setView([center.lat, center.lng], 13);
    }
  }, [center, mapInstance]);

  const initMap = () => {
    const L = (window as any).L;
    if (!L) return;

    const map = L.map("location-map").setView([center.lat, center.lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    let marker: any = null;

    // Add click event to map
    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng;

      // Remove existing marker
      if (marker) {
        map.removeLayer(marker);
      }

      // Add new marker
      marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          shadowSize: [41, 41],
        }),
      }).addTo(map);

      onLocationSelect(lat, lng);
    });

    // Add initial marker if position is selected
    if (selectedPosition) {
      marker = L.marker([selectedPosition.lat, selectedPosition.lng]).addTo(
        map
      );
    }

    setMapInstance(map);
  };

  return (
    <div
      id="location-map"
      className="w-full h-[400px] rounded-lg border border-gray-200"
    />
  );
}
