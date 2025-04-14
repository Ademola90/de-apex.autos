import { useEffect, useState } from "react";
import api from "../../utils/api";
import "../../style/style.css";

const AdBanner = ({ ad, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Track impression when ad is viewed
    const trackImpression = async () => {
      try {
        await api.put(`/advertisement/track-impression/${ad._id}`);
      } catch (error) {
        console.error("Error tracking impression:", error);
      }
    };

    // Set visible with slight delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    trackImpression();

    return () => clearTimeout(timer);
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
      className={`ad-banner relative overflow-hidden rounded-lg my-20 shadow-md transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block relative"
      >
        {/* Flex container for desktop layout */}
        <div className="flex flex-row items-center h-full">
          {/* Image container - takes 60% width on desktop, full width as background on mobile */}
          <div className="relative w-3/5 md:w-2/3 h-full">
            <img
              src={ad.image.secure_url || "/placeholder.svg"}
              alt=""
              className="w-full h-80 object-cover"
              aria-hidden="true"
            />
          </div>

          {/* Content container - takes 40% width on desktop, overlays image on mobile */}
          <div className="w-2/5 md:w-1/3 p-4 bg-gradient-to-l from-gray-900 to-gray-800 text-white z-10 flex flex-col md:hidden hidden justify-center">
            {/* Ad label */}
            <span className="inline-block px-2 py-1 bg-mainBlue text-white text-xs font-semibold rounded mb-2 animate-pulse">
              Ad
            </span>

            {/* Title with animation */}
            <h3 className="text-lg font-bold mb-2 transition-all duration-300 group-hover:text-mainBlue">
              {ad.title}
            </h3>

            {/* Description with truncation */}
            {ad.description && (
              <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                {ad.description}
              </p>
            )}

            {/* CTA Button with hover effect */}
            <div className="mt-auto">
              <span className="inline-block px-4 py-2 bg-mainBlue hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all duration-300 transform hover:scale-105">
                Learn More
              </span>
            </div>
          </div>
        </div>

        {/* Mobile layout - image as background */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
          <img
            src={ad.image.secure_url || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Mobile content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
          <span className="inline-block px-2 py-1 bg-mainBlue text-white text-xs font-semibold rounded mb-2">
            Ad
          </span>
          <h3 className="text-lg font-bold text-white mb-2">{ad.title}</h3>
          {ad.description && (
            <p className="text-sm text-gray-200 mb-3 line-clamp-2">
              {ad.description}
            </p>
          )}
          <span className="inline-block px-4 py-2 bg-mainBlue hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all duration-300">
            Learn More
          </span>
        </div>
      </a>
    </div>
  );
};

export default AdBanner;
