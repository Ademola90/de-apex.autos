"use client";

import { useEffect, useState } from "react";
import { IoSpeedometer, IoCalendarOutline, IoCarSport } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import useStore from "../../data/store/store";
import AdInline from "../advertisements/AdInline";
import { toast } from "react-toastify";

const CarCard = () => {
  const [cars, setCars] = useState([]);
  const [likes, setLikes] = useState({});
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useStore();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/car/public-cars");
        setCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error.response?.data || error);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAds = async () => {
      try {
        const response = await api.get("/advertisement/for-page", {
          params: {
            page: "cars",
            type: "inline",
          },
        });
        setAds(response.data.advertisements || []);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    // Load likes from localStorage
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(storedLikes);

    fetchCars();
    fetchAds();
  }, []);

  const handleLike = (id) => {
    setLikes((prev) => {
      const newLikes = { ...prev, [id]: !prev[id] };
      // Store the likes in localStorage
      localStorage.setItem("likes", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  // const handleViewDetails = (carId) => {
  //   navigate(`/details/${carId}`); // Always allow navigation to details
  // };

  const handleViewDetails = (carId) => {
    if (!user) {
      toast.info("Please log in to view car details.");
      navigate("/login");
      return;
    }
    navigate(`/details/${carId}`);
  };

  // Insert ads at specific positions
  const getItemsWithAds = () => {
    if (!cars.length || !ads.length) return cars;

    const result = [...cars];

    // Insert ads after every 4th item
    if (ads[0]) result.splice(4, 0, { isAd: true, ad: ads[0] });
    if (ads[1] && result.length > 8)
      result.splice(9, 0, { isAd: true, ad: ads[1] });

    return result;
  };

  const itemsWithAds = getItemsWithAds();

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="lg:px-16 md:px-10 px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
            >
              <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                <div className="flex justify-between mt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-6 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="lg:px-16 md:px-10 px-8 mt-10">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:px-16 md:px-10 px-8 mt-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 font-Poppins">
          Featured Cars
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our selection of premium vehicles for every need and budget
        </p>
      </div>

      {itemsWithAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsWithAds.map((item, index) => {
            // Render ad
            if (item.isAd) {
              return (
                <AdInline
                  key={`ad-${index}`}
                  ad={item.ad}
                  className="col-span-full"
                />
              );
            }

            // Render car card
            const car = item;
            return (
              <div
                key={car._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 lg:hover:shadow-xl lg:hover:translate-y-[-5px] group"
                onClick={() => handleViewDetails(car._id)}
              >
                {/* Image Container with Overlay */}
                <div className="relative overflow-hidden lg:h-[250px] md:h-[250px] h-[300px]">
                  {car.images &&
                  car.images.length > 0 &&
                  car.images[0].secure_url ? (
                    <img
                      src={
                        car.images[0].secure_url.startsWith("http")
                          ? car.images[0].secure_url
                          : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0].secure_url}`
                      }
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=200&width=400";
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <IoCarSport className="text-gray-400 text-5xl" />
                    </div>
                  )}

                  {/* Car Type Badge */}
                  {car.type && (
                    <div className="absolute top-3 left-3 bg-mainBlue text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {car.type}
                    </div>
                  )}

                  {/* view */}
                  <div className="absolute lg:flex md:hidden hidden justify-center items-center w-full top-20">
                    <button
                      className="w-full py-2 text-whiteColor rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(car._id);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 grid">
                  <h3 className="text-lg truncate font-bold font-Poppins text-gray-800 group-hover:text-mainBlue transition-colors">
                    {car.make} {car.model}
                  </h3>

                  {/* Specs */}
                  <div className="mt-2 flex flex-wrap gap-3">
                    {car.year && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <IoCalendarOutline className="mr-1" />
                        <span>{car.year}</span>
                      </div>
                    )}
                    {car.mileage && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <IoSpeedometer className="mr-1" />
                        <span>{car.mileage.toLocaleString()} mi</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 h-10">
                    {car.description || "No description available"}
                  </p>

                  {/* Price */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-baseline">
                      {user ? (
                        <>
                          <span className="text-xl font-bold text-mainBlue">
                            ₦{Number.parseInt(car.price, 10).toLocaleString()}
                          </span>
                          {car.discountPrice && (
                            <span className="ml-2 text-sm line-through text-gray-400">
                              ₦
                              {Number.parseInt(
                                car.discountPrice,
                                10
                              ).toLocaleString()}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-mainBlue font-medium">
                          Login to view price
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="col-span-full bg-gray-50 rounded-lg p-10 text-center">
          <IoCarSport className="text-gray-400 text-5xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No cars available at the moment
          </p>
          <p className="text-gray-400 mt-2">
            Please check back later for new listings
          </p>
        </div>
      )}

      {cars.length > 12 && (
        <div className="flex justify-center mt-12 mb-6">
          <button
            onClick={() => navigate("/cars")}
            className="bg-mainBlue text-white font-Poppins px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
          >
            <span>View All Cars</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CarCard;
