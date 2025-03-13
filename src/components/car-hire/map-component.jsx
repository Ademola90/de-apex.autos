"use client";

import { useEffect, useRef } from "react";

const MapComponent = ({
  pickupLocation,
  dropoffLocation,
  height = "400px",
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // This is a placeholder for the actual map implementation
    // In a real application, you would use Google Maps or OpenStreetMap APIs

    const renderMap = () => {
      if (mapRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = mapRef.current.clientWidth;
        canvas.height = mapRef.current.clientHeight;

        const ctx = canvas.getContext("2d");

        // Draw a placeholder map
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw a route line
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.2, canvas.height * 0.6);
        ctx.bezierCurveTo(
          canvas.width * 0.4,
          canvas.height * 0.4,
          canvas.width * 0.6,
          canvas.height * 0.7,
          canvas.width * 0.8,
          canvas.height * 0.3
        );
        ctx.strokeStyle = "#415CF2";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw pickup point
        ctx.beginPath();
        ctx.arc(canvas.width * 0.2, canvas.height * 0.6, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#415CF2";
        ctx.fill();

        // Draw dropoff point
        ctx.beginPath();
        ctx.arc(canvas.width * 0.8, canvas.height * 0.3, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#415CF2";
        ctx.fill();

        // Add labels
        ctx.font = "14px Arial";
        ctx.fillStyle = "#111111";
        ctx.fillText(
          pickupLocation,
          canvas.width * 0.2 - 30,
          canvas.height * 0.6 - 15
        );
        ctx.fillText(
          dropoffLocation,
          canvas.width * 0.8 - 30,
          canvas.height * 0.3 - 15
        );

        // Add to DOM
        mapRef.current.innerHTML = "";
        mapRef.current.appendChild(canvas);

        // Add note about placeholder
        const note = document.createElement("div");
        note.className =
          "absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-500";
        note.textContent =
          "Map placeholder - will use Google Maps API in production";
        mapRef.current.appendChild(note);
      }
    };

    renderMap();

    // Handle resize
    const handleResize = () => {
      renderMap();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pickupLocation, dropoffLocation]);

  return (
    <div
      ref={mapRef}
      className="relative rounded-md overflow-hidden"
      style={{ height }}
    ></div>
  );
};

export default MapComponent;
