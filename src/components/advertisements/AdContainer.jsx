"use client";

import { useState, useEffect } from "react";
import api from "../../utils/api";
import AdBanner from "./AdBanner";
import AdSidebar from "./AdSidebar";

const AdContainer = ({
  page,
  category = null,
  type = "banner",
  className = "",
  limit = 1,
}) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const params = { page };
        if (category) params.category = category;

        const response = await api.get("/advertisement/for-page", { params });

        // Filter by type and limit
        const filteredAds = response.data.advertisements
          .filter((ad) => ad.type === type)
          .slice(0, limit);

        setAds(filteredAds);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError("Failed to load advertisements");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [page, category, type, limit]);

  if (loading) return <div className={`ad-placeholder ${className}`}></div>;
  if (error || ads.length === 0) return null;

  return (
    <div className={`ad-container ${className}`}>
      {ads.map((ad) => {
        switch (ad.type) {
          case "banner":
            return <AdBanner key={ad._id} ad={ad} />;
          case "sidebar":
            return <AdSidebar key={ad._id} ad={ad} />;
          default:
            return <AdBanner key={ad._id} ad={ad} />;
        }
      })}
    </div>
  );
};

export default AdContainer;
