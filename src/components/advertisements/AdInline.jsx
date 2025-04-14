"use client";

import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";
import TypewriterText from "../animations/TypewriterText";

const AdInline = ({ ad, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const adRef = useRef(null);

  useEffect(() => {
    // Track impression when ad is viewed
    const trackImpression = async () => {
      try {
        await api.put(`/advertisement/track-impression/${ad._id}`);
      } catch (error) {
        console.error("Error tracking impression:", error);
      }
    };

    // Check if ad is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          trackImpression();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      observer.disconnect();
    };
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
      ref={adRef}
      className={`col-span-full my-8 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/3 relative overflow-hidden">
              <img
                src={ad.image.secure_url || "/placeholder.svg"}
                alt=""
                className={`w-full h-48 md:h-full object-cover transition-transform duration-700 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute top-2 left-2 bg-mainBlue text-white text-xs px-2 py-1 rounded-full">
                Ad
              </div>
            </div>

            {/* Content */}
            <div className="md:w-2/3 p-6 flex flex-col justify-center">
              <div
                className={`slide-in-right ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {ad.title && (
                    <p className="text-gray-600 mb-4 stagger-2 animate-bounce">
                      {ad.title}
                    </p>
                  )}
                </h3>

                {ad.description && (
                  <p className="text-gray-600 mb-4 stagger-2">
                    {ad.description}
                  </p>
                )}

                <div className="mt-2 stagger-3">
                  <span
                    className={`inline-block px-4 py-2 bg-mainBlue text-white font-medium rounded-md transition-all duration-300 ${
                      isHovered ? "bg-blue-700" : ""
                    }`}
                  >
                    Discover Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AdInline;
