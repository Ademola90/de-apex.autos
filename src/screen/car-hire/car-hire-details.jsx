"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Shield,
  Users,
  Fuel,
  Gauge,
  Check,
} from "lucide-react";
import { fetchCarById } from "../../utils/carHireApi";
import useStore from "../../data/store/store";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import MapComponent from "../../components/car-hire/map-component";
import { toast } from "react-toastify";

const CarHireDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useStore();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [driverOption, setDriverOption] = useState("self");
  const [totalDays, setTotalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  // Load saved search criteria from session storage
  useEffect(() => {
    const savedSearch = sessionStorage.getItem("carHireSearch");
    if (savedSearch) {
      const search = JSON.parse(savedSearch);
      setPickupLocation(search.location || "");
      setPickupDate(search.pickupDate || "");
      setPickupTime(search.pickupTime || "");
      setReturnDate(search.returnDate || "");
      setReturnTime(search.returnTime || "");
    }
  }, []);

  // Fetch car details from API
  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchCarById(carId);
        setCar(response.car);
        setError(null);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError("Failed to load car details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCarDetails();
  }, [carId]);

  // Calculate total days and price
  useEffect(() => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays || 1);
    }
  }, [pickupDate, returnDate]);

  useEffect(() => {
    if (car && totalDays) {
      let basePrice = car.price * totalDays;
      if (driverOption === "chauffeur") {
        basePrice += 5000 * totalDays; // Add driver fee
      }
      setTotalPrice(basePrice);
    }
  }, [car, totalDays, driverOption]);

  // Calculate distance and duration when locations change
  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      // This would be replaced with actual API call to Google Maps or similar
      // Mock data  {
      // This would be replaced with actual API call to Google Maps or similar
      // Mock data
      setDistance("120 km");
      setDuration("2 hours 15 minutes");
    }
  }, [pickupLocation, dropoffLocation]);

  const handleBooking = (e) => {
    e.preventDefault();

    if (!user) {
      // Redirect to login if not logged in
      toast.info("Please login to continue with booking");
      navigate("/login", {
        state: {
          redirectTo: `/car-hire/checkout/${carId}`,
          bookingDetails: {
            carId,
            pickupLocation,
            dropoffLocation,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
            driverOption,
            totalDays,
            totalPrice,
          },
        },
      });
      return;
    }

    // If logged in, proceed to checkout
    navigate(`/car-hire/checkout/${carId}`, {
      state: {
        bookingDetails: {
          carId,
          pickupLocation,
          dropoffLocation,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          driverOption,
          totalDays,
          totalPrice,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-8 md:px-10 lg:px-16 mt-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[300px] md:h-[400px]">
                <img
                  src={car.images[0]?.secure_url || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-mainBlue text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₦{car.price.toLocaleString()}/day
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-blackColor">
                      {car.name}
                    </h1>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="ml-1 text-gray-600">
                          {car.rating} ({car.reviews || 0} reviews)
                        </span>
                      </div>
                      <span className="mx-2 text-gray-300">|</span>
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="ml-1 text-gray-600">
                          {car.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Users size={18} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-gray-700">{car.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel size={18} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{car.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <Gauge size={18} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">
                      {car.fuelEfficiency || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-blackColor">
                    Description
                  </h2>
                  <p className="text-gray-700">{car.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-blackColor">
                    Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check size={16} className="text-mainBlue mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {pickupLocation && dropoffLocation && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-blackColor">
                      Route Information
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Distance</p>
                          <p className="font-semibold">{distance}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Estimated Duration
                          </p>
                          <p className="font-semibold">{duration}</p>
                        </div>
                      </div>
                      <MapComponent
                        pickupLocation={pickupLocation}
                        dropoffLocation={dropoffLocation}
                        height="300px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-blackColor">
                Book This Car
              </h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    >
                      <option value="">Select location</option>
                      <option value="Osogbo">Osogbo, Osun State</option>
                      <option value="Akure">Akure, Ondo State</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dropoff Location
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      required
                    >
                      <option value="">Select location</option>
                      <option value="Osogbo">Osogbo, Osun State</option>
                      <option value="Akure">Akure, Ondo State</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Ibadan">Ibadan, Oyo State</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pickup Date
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="date"
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pickup Time
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="time"
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Return Date
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="date"
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={
                          pickupDate || new Date().toISOString().split("T")[0]
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Return Time
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="time"
                        className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Driver Option
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-md p-3 cursor-pointer ${
                        driverOption === "self"
                          ? "border-mainBlue bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setDriverOption("self")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Self Drive</span>
                        {driverOption === "self" && (
                          <Check size={16} className="text-mainBlue" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Drive the car yourself
                      </p>
                    </div>

                    <div
                      className={`border rounded-md p-3 cursor-pointer ${
                        driverOption === "chauffeur"
                          ? "border-mainBlue bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setDriverOption("chauffeur")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Chauffeur</span>
                        {driverOption === "chauffeur" && (
                          <Check size={16} className="text-mainBlue" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">+₦5,000/day</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      ₦{car.price.toLocaleString()} × {totalDays} day
                      {totalDays > 1 ? "s" : ""}
                    </span>
                    <span className="font-medium">
                      ₦{(car.price * totalDays).toLocaleString()}
                    </span>
                  </div>

                  {driverOption === "chauffeur" && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        Driver fee (₦5,000 × {totalDays} day
                        {totalDays > 1 ? "s" : ""})
                      </span>
                      <span className="font-medium">
                        ₦{(5000 * totalDays).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-mainBlue">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-mainBlue text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Continue to Booking
                </button>

                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <Shield size={16} className="mr-2" />
                  <span>
                    Secure booking process. No charges until confirmed.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarHireDetails;
