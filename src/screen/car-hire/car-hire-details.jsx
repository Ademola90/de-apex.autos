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
  ArrowRight,
  RotateCw,
} from "lucide-react";
import { fetchCarById } from "../../utils/carHireApi";
import useStore from "../../data/store/store";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
// import LeafletMapComponent from "../../components/car-hire/leaflet-map";
import { getAllStates, getCitiesByState } from "../../utils/nigerianStates";
import { toast } from "react-toastify";
import LeafletMapComponent from "../../components/car-hire/google-map";

const CarHireDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useStore();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Location states
  const [pickupState, setPickupState] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffState, setDropoffState] = useState("");
  const [dropoffCity, setDropoffCity] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");

  // Date and time states
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  // Options states
  const [driverOption, setDriverOption] = useState("self");
  const [journeyType, setJourneyType] = useState("one-way");

  // Distance and pricing states
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [totalDays, setTotalDays] = useState(1);
  const [distancePrice, setDistancePrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [chauffeurFee, setChauffeurFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // States list
  const [states, setStates] = useState([]);
  const [pickupCities, setPickupCities] = useState([]);
  const [dropoffCities, setDropoffCities] = useState([]);

  // Load states and cities
  useEffect(() => {
    setStates(getAllStates());
  }, []);

  useEffect(() => {
    if (pickupState) {
      setPickupCities(getCitiesByState(pickupState));
    }

    if (dropoffState) {
      setDropoffCities(getCitiesByState(dropoffState));
    }
  }, [pickupState, dropoffState]);

  // Load saved search criteria from session storage
  useEffect(() => {
    const savedSearch = sessionStorage.getItem("carHireSearch");
    if (savedSearch) {
      const search = JSON.parse(savedSearch);
      if (search.pickupState) setPickupState(search.pickupState);
      if (search.pickupCity) setPickupCity(search.pickupCity);
      if (search.pickupDate) setPickupDate(search.pickupDate);
      if (search.pickupTime) setPickupTime(search.pickupTime);
      if (search.returnDate) setReturnDate(search.returnDate);
      if (search.returnTime) setReturnTime(search.returnTime);
    }
  }, []);

  // Fetch car details from API
  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchCarById(carId);
        setCar(response.car);
        setBasePrice(response.car.price);
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

  // Calculate total price
  useEffect(() => {
    if (car && totalDays) {
      const dailyRate = car.price * totalDays;
      const driverFee = driverOption === "chauffeur" ? 5000 * totalDays : 0;

      // Calculate distance price (₦10,000 per km)
      let distPrice = distance ? distance * 10000 : 0;

      // Double the distance price for round trips
      if (journeyType === "round-trip") {
        distPrice *= 2;
      }

      setBasePrice(dailyRate);
      setChauffeurFee(driverFee);
      setDistancePrice(distPrice);
      setTotalPrice(dailyRate + driverFee + distPrice);
    }
  }, [car, totalDays, driverOption, distance, journeyType]);

  // Handle distance calculation from LeafletMapComponent
  const handleDistanceCalculated = (calculatedDistance, calculatedDuration) => {
    if (calculatedDistance && calculatedDuration) {
      setDistance(calculatedDistance);
      setDuration(calculatedDuration);
    } else {
      setDistance(null);
      setDuration(null);
      toast.error("Failed to calculate route. Please check the locations.");
    }
  };

  // Check if form is complete for map rendering
  const canShowMap =
    pickupState &&
    pickupCity &&
    pickupAddress &&
    dropoffState &&
    dropoffCity &&
    dropoffAddress;

  const pickupLocation = canShowMap
    ? {
        state: pickupState,
        city: pickupCity,
        address: pickupAddress,
      }
    : null;

  const dropoffLocation = canShowMap
    ? {
        state: dropoffState,
        city: dropoffCity,
        address: dropoffAddress,
      }
    : null;

  // Check if form is complete
  const isFormComplete = () => {
    return (
      pickupState &&
      pickupCity &&
      pickupAddress &&
      dropoffState &&
      dropoffCity &&
      dropoffAddress &&
      pickupDate &&
      pickupTime &&
      returnDate &&
      returnTime &&
      distance !== null &&
      duration !== null
    );
  };

  // Get message for incomplete form
  const getMissingFieldsMessage = () => {
    if (!pickupState || !pickupCity || !pickupAddress) {
      return "Please Complete Pickup Details";
    }
    if (!dropoffState || !dropoffCity || !dropoffAddress) {
      return "Please Complete Dropoff Details";
    }
    if (!pickupDate || !pickupTime) {
      return "Please Set Pickup Date & Time";
    }
    if (!returnDate || !returnTime) {
      return "Please Set Return Date & Time";
    }
    if (distance === null || duration === null) {
      return "Calculating Route...";
    }
    return "Please Complete All Details";
  };

  const handleBooking = (e) => {
    e.preventDefault();

    // Validate form
    if (!isFormComplete()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      // Redirect to login if not logged in
      toast.info("Please login to continue with booking");
      navigate("/login", {
        state: {
          redirectTo: `/car-hire/checkout/${carId}`,
          bookingDetails: {
            carId,
            pickupLocation: {
              state: pickupState,
              city: pickupCity,
              address: pickupAddress,
            },
            dropoffLocation: {
              state: dropoffState,
              city: dropoffCity,
              address: dropoffAddress,
            },
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
            driverOption,
            journeyType,
            distance,
            duration,
            totalDays,
            basePrice,
            chauffeurFee,
            distancePrice,
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
          pickupLocation: {
            state: pickupState,
            city: pickupCity,
            address: pickupAddress,
          },
          dropoffLocation: {
            state: dropoffState,
            city: dropoffCity,
            address: dropoffAddress,
          },
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          driverOption,
          journeyType,
          distance,
          duration,
          totalDays,
          basePrice,
          chauffeurFee,
          distancePrice,
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
                  src={car.images?.[0]?.secure_url || "/placeholder.svg"}
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
                        <span className="ml-1 text-sm text-gray-600">
                          {car.rating} ({car.reviews || 0} reviews)
                        </span>
                      </div>
                      <span className="mx-2 text-gray-300">|</span>
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="ml-1 text-sm text-gray-600">
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
                    {car.features &&
                      car.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check size={16} className="text-mainBlue mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {canShowMap && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-blackColor">
                      Route Information
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <LeafletMapComponent
                        pickupLocation={pickupLocation}
                        dropoffLocation={dropoffLocation}
                        height="300px"
                        onDistanceCalculated={handleDistanceCalculated}
                      />
                      {distance && duration && (
                        <div className="flex justify-between mt-4 p-3 bg-blue-50 rounded-md">
                          <div>
                            <p className="text-sm text-gray-500">Distance</p>
                            <p className="font-semibold">{distance} km</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Estimated Duration
                            </p>
                            <p className="font-semibold">{duration}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Distance Price
                            </p>
                            <p className="font-semibold">
                              ₦{distancePrice.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}
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
                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup State
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                      value={pickupState}
                      onChange={(e) => setPickupState(e.target.value)}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup City
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    required
                    disabled={!pickupState}
                  >
                    <option value="">Select City</option>
                    {pickupCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter specific address"
                    required
                  />
                </div>

                {/* Dropoff Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dropoff State
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                      value={dropoffState}
                      onChange={(e) => setDropoffState(e.target.value)}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dropoff City
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={dropoffCity}
                    onChange={(e) => setDropoffCity(e.target.value)}
                    required
                    disabled={!dropoffState}
                  >
                    <option value="">Select City</option>
                    {dropoffCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dropoff Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={dropoffAddress}
                    onChange={(e) => setDropoffAddress(e.target.value)}
                    placeholder="Enter specific address"
                    required
                  />
                </div>

                {/* Date and Time */}
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

                {/* Journey Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Journey Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-md p-3 cursor-pointer ${
                        journeyType === "one-way"
                          ? "border-mainBlue bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setJourneyType("one-way")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">One Way</span>
                        {journeyType === "one-way" && (
                          <Check size={16} className="text-mainBlue" />
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <ArrowRight size={14} className="mr-1" />
                        <span>Single direction</span>
                      </div>
                    </div>

                    <div
                      className={`border rounded-md p-3 cursor-pointer ${
                        journeyType === "round-trip"
                          ? "border-mainBlue bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setJourneyType("round-trip")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Round Trip</span>
                        {journeyType === "round-trip" && (
                          <Check size={16} className="text-mainBlue" />
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <RotateCw size={14} className="mr-1" />
                        <span>Return journey</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver Option */}
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
                      ₦{basePrice.toLocaleString()}
                    </span>
                  </div>

                  {driverOption === "chauffeur" && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        Driver fee (₦5,000 × {totalDays} day
                        {totalDays > 1 ? "s" : ""})
                      </span>
                      <span className="font-medium">
                        ₦{chauffeurFee.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {distance > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        Distance ({distance} km × ₦10,000)
                        {journeyType === "round-trip" ? " × 2" : ""}
                      </span>
                      <span className="font-medium">
                        ₦{distancePrice.toLocaleString()}
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
                  className={`w-full py-3 px-4 rounded-md transition duration-300 ${
                    isFormComplete()
                      ? "bg-mainBlue text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!isFormComplete()}
                >
                  {isFormComplete()
                    ? "Continue to Booking"
                    : getMissingFieldsMessage()}
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
