"use client";

import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import {
//   getFormattedAddress,
//   getMajorCityCoordinates,
// } from "../../utils/nigerianStates";
import { toast } from "react-toastify";
import {
  getFormattedAddress,
  getMajorCityCoordinates,
} from "../../utils/nigerianStates";

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom marker icons
const createIcon = (color) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const LeafletMapComponent = ({
  pickupLocation,
  dropoffLocation,
  height = "400px",
  onDistanceCalculated,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const markersRef = useRef([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Format addresses
  const pickupAddress = pickupLocation
    ? getFormattedAddress(pickupLocation)
    : "";
  const dropoffAddress = dropoffLocation
    ? getFormattedAddress(dropoffLocation)
    : "";

  // Initialize map
  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Create map instance
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [9.082, 8.6753],
        6
      );

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Geocode address to coordinates with fallback
  const geocodeAddress = async (address, location) => {
    try {
      // First try with Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1`,
        {
          headers: {
            "User-Agent": "CarHireApp/1.0",
          },
        }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: Number.parseFloat(data[0].lat),
          lng: Number.parseFloat(data[0].lon),
        };
      }

      // If Nominatim fails, use our fallback coordinates
      if (location && location.state && location.city) {
        console.log(
          `Falling back to predefined coordinates for ${location.city}, ${location.state}`
        );
        return getMajorCityCoordinates(location.state, location.city);
      }

      throw new Error(`Could not geocode address: ${address}`);
    } catch (error) {
      console.error("Geocoding error:", error);

      // Use fallback coordinates instead of failing
      if (location && location.state && location.city) {
        console.log(
          `Using fallback coordinates for ${location.city}, ${location.state}`
        );
        return getMajorCityCoordinates(location.state, location.city);
      }

      setError(`Failed to geocode address: ${address}`);
      return null;
    }
  };

  // Calculate route when locations change
  useEffect(() => {
    const calculateRoute = async () => {
      if (!mapInstanceRef.current || !pickupLocation || !dropoffLocation)
        return;

      setIsLoading(true);
      setError(null);

      try {
        // Clear previous markers and route
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        if (routeLayerRef.current) {
          routeLayerRef.current.remove();
          routeLayerRef.current = null;
        }

        // Geocode addresses with fallback to predefined coordinates
        const pickupCoords = await geocodeAddress(
          pickupAddress,
          pickupLocation
        );
        const dropoffCoords = await geocodeAddress(
          dropoffAddress,
          dropoffLocation
        );

        if (!pickupCoords || !dropoffCoords) {
          setError("Could not find coordinates for one or both locations");
          setIsLoading(false);
          return;
        }

        // Add markers
        const pickupMarker = L.marker([pickupCoords.lat, pickupCoords.lng], {
          icon: createIcon("#4CAF50"),
          title: "Pickup Location",
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>Pickup:</b> ${pickupAddress}`);

        const dropoffMarker = L.marker([dropoffCoords.lat, dropoffCoords.lng], {
          icon: createIcon("#F44336"),
          title: "Dropoff Location",
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>Dropoff:</b> ${dropoffAddress}`);

        markersRef.current.push(pickupMarker, dropoffMarker);

        // Fit map to markers
        const bounds = L.latLngBounds([
          [pickupCoords.lat, pickupCoords.lng],
          [dropoffCoords.lat, dropoffCoords.lng],
        ]);
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });

        // Calculate route using OSRM
        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${pickupCoords.lng},${pickupCoords.lat};${dropoffCoords.lng},${dropoffCoords.lat}?overview=full&geometries=geojson`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            }
          );

          const data = await response.json();

          if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
            throw new Error("Could not calculate route");
          }

          const route = data.routes[0];
          const routeCoordinates = route.geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);

          // Draw route on map
          routeLayerRef.current = L.polyline(routeCoordinates, {
            color: "#415CF2",
            weight: 5,
            opacity: 0.7,
          }).addTo(mapInstanceRef.current);

          // Calculate distance in kilometers (rounded to 1 decimal place)
          const distanceInKm = Number.parseFloat(
            (route.distance / 1000).toFixed(1)
          );

          // Format duration
          const durationInSeconds = route.duration;
          const hours = Math.floor(durationInSeconds / 3600);
          const minutes = Math.floor((durationInSeconds % 3600) / 60);
          const durationText =
            hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;

          // Call the callback with distance and duration
          if (onDistanceCalculated) {
            onDistanceCalculated(distanceInKm, durationText);
          }
        } catch (routeError) {
          console.error("Route calculation error:", routeError);

          // Calculate straight-line distance as fallback
          const R = 6371; // Radius of the Earth in km
          const dLat = ((dropoffCoords.lat - pickupCoords.lat) * Math.PI) / 180;
          const dLon = ((dropoffCoords.lng - pickupCoords.lng) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((pickupCoords.lat * Math.PI) / 180) *
              Math.cos((dropoffCoords.lat * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;

          // Add 30% to account for roads not being straight
          const estimatedRoadDistance = Number.parseFloat(
            (distance * 1.3).toFixed(1)
          );

          // Draw a straight line as fallback
          routeLayerRef.current = L.polyline(
            [
              [pickupCoords.lat, pickupCoords.lng],
              [dropoffCoords.lat, dropoffCoords.lng],
            ],
            {
              color: "#FF9800",
              weight: 5,
              opacity: 0.7,
              dashArray: "10, 10",
            }
          ).addTo(mapInstanceRef.current);

          // Estimate duration (assuming average speed of 60 km/h)
          const estimatedMinutes = Math.round(
            (estimatedRoadDistance * 60) / 60
          );
          const hours = Math.floor(estimatedMinutes / 60);
          const minutes = estimatedMinutes % 60;
          const durationText =
            hours > 0
              ? `${hours} hr ${minutes} min (est.)`
              : `${minutes} min (est.)`;

          // Add a warning to the map
          L.control
            .attribution({
              position: "bottomleft",
              prefix:
                '<span style="color: #FF9800; font-weight: bold;">⚠️ Estimated route</span>',
            })
            .addTo(mapInstanceRef.current);

          toast.warning(
            "Could not calculate exact route. Using estimated distance."
          );

          if (onDistanceCalculated) {
            onDistanceCalculated(estimatedRoadDistance, durationText);
          }
        }
      } catch (error) {
        console.error("Map error:", error);
        setError("Could not calculate route. Please check your locations.");
        if (onDistanceCalculated) {
          onDistanceCalculated(null, null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (pickupLocation && dropoffLocation) {
      calculateRoute();
    }
  }, [
    pickupLocation,
    dropoffLocation,
    pickupAddress,
    dropoffAddress,
    onDistanceCalculated,
  ]);

  return (
    <div style={{ position: "relative", height, width: "100%" }}>
      <div
        ref={mapRef}
        style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mainBlue"></div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-100 text-red-700 p-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {!pickupLocation || !dropoffLocation ? (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center">
          <p className="text-gray-700 bg-white p-3 rounded-md shadow-sm">
            {!pickupLocation && !dropoffLocation
              ? "Please enter pickup and dropoff locations"
              : !pickupLocation
              ? "Please enter pickup location"
              : "Please enter dropoff location"}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default LeafletMapComponent;
