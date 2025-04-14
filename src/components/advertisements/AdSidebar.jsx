"use client";

import { useEffect } from "react";
import api from "../../utils/api";

const AdSidebar = ({ ad, className = "" }) => {
  useEffect(() => {
    // Track impression when ad is viewed
    const trackImpression = async () => {
      try {
        await api.put(`/advertisement/track-impression/${ad._id}`);
      } catch (error) {
        console.error("Error tracking impression:", error);
      }
    };

    trackImpression();
  }, [ad._id]);

  const handleClick = async () => {
    try {
      // Track click when ad is clicked
      await api.put(`/advertisement/track-click/${ad._id}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  if (!ad) return null;

  return (
    <div
      className={`ad-sidebar relative overflow-hidden rounded-lg shadow-md ${className}`}
    >
      <p
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block relative"
      >
        <img
          src={ad.image.secure_url || "/placeholder.svg"}
          alt={ad.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-0 right-0 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1">
          Ad
        </div>
        {ad.title && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center items-center bg-black bg-opacity-5 text-white p-2">
            <h3 className="lg:text-3xl md:text-2xl text-2xl font-Outfit font-bold animate-pulse">
              {ad.title}
            </h3>
          </div>
        )}
      </p>
    </div>
  );
};

export default AdSidebar;
