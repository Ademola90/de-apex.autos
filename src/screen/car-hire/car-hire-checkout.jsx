"use client";

import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  CreditCard,
  Check,
  ChevronRight,
  AlertCircle,
  ArrowRight,
  RotateCw,
} from "lucide-react";
import { fetchCarById, createBooking } from "../../utils/carHireApi";
import useStore from "../../data/store/store";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import GoogleMapComponent from "../../components/car-hire/google-map";
import { toast } from "react-toastify";

const CarHireCheckout = () => {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useStore();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    licenseNumber: "",
    licenseExpiry: "",
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!location.state?.bookingDetails) {
      navigate(`/car-hire/details/${carId}`);
      return;
    }

    setBookingDetails(location.state.bookingDetails);

    // Fetch car details
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchCarById(carId);
        setCar(response.car);
      } catch (err) {
        console.error("Error fetching car details:", err);
        toast.error("Failed to load car details. Please try again.");
        navigate(`/car-hire/details/${carId}`);
      } finally {
        setLoading(false);
      }
    };

    loadCarDetails();
  }, [carId, location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    if (bookingDetails.driverOption === "self") {
      if (!formData.licenseNumber.trim())
        newErrors.licenseNumber = "License number is required";
      if (!formData.licenseExpiry.trim())
        newErrors.licenseExpiry = "License expiry date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsProcessing(true);

    try {
      // Create booking
      const response = await createBooking({
        carId: bookingDetails.carId,
        pickupLocation: bookingDetails.pickupLocation,
        dropoffLocation: bookingDetails.dropoffLocation,
        pickupDate: bookingDetails.pickupDate,
        pickupTime: bookingDetails.pickupTime,
        returnDate: bookingDetails.returnDate,
        returnTime: bookingDetails.returnTime,
        driverOption: bookingDetails.driverOption,
        journeyType: bookingDetails.journeyType,
        distance: bookingDetails.distance,
        duration: bookingDetails.duration,
        totalDays: bookingDetails.totalDays,
        customerDetails: formData,
        paymentMethod,
      });

      // Redirect to confirmation page
      navigate("/car-hire/confirmation", {
        state: {
          bookingId: response.booking.bookingId,
          bookingDetails,
          car,
          customerDetails: formData,
        },
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to process booking. Please try again.");
      setIsProcessing(false);
    }
  };

  if (loading || !bookingDetails) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <div className="text-sm breadcrumbs">
            <ul className="flex items-center space-x-2">
              <li>
                <a
                  href="/car-hire"
                  className="text-gray-500 hover:text-mainBlue"
                >
                  Car Hire
                </a>
              </li>
              <li>
                <ChevronRight size={16} className="text-gray-400" />
              </li>
              <li>
                <a
                  href={`/car-hire/details/${carId}`}
                  className="text-gray-500 hover:text-mainBlue"
                >
                  Car Details
                </a>
              </li>
              <li>
                <ChevronRight size={16} className="text-gray-400" />
              </li>
              <li className="text-mainBlue">Checkout</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6 text-blackColor">
                Complete Your Booking
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-blackColor">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500 error-message">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 error-message">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 error-message">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-blackColor">
                    Address Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500 error-message">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500 error-message">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                            errors.state ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-500 error-message">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {bookingDetails.driverOption === "self" && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-blackColor">
                      Driver's License Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          License Number
                        </label>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                            errors.licenseNumber
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.licenseNumber && (
                          <p className="mt-1 text-sm text-red-500 error-message">
                            {errors.licenseNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          License Expiry Date
                        </label>
                        <input
                          type="date"
                          name="licenseExpiry"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                          className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                            errors.licenseExpiry
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.licenseExpiry && (
                          <p className="mt-1 text-sm text-red-500 error-message">
                            {errors.licenseExpiry}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-blackColor">
                    Payment Method
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-mainBlue bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <CreditCard
                            size={20}
                            className="mr-2 text-gray-600"
                          />
                          <span className="font-medium">Card Payment</span>
                        </div>
                        {paymentMethod === "card" && (
                          <Check size={16} className="text-mainBlue" />
                        )}
                      </div>
                    </div>

                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        paymentMethod === "bank_transfer"
                          ? "border-mainBlue bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("bank_transfer")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                        {paymentMethod === "bank_transfer" && (
                          <Check size={16} className="text-mainBlue" />
                        )}
                      </div>
                    </div>

                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        paymentMethod === "cash"
                          ? "border-mainBlue bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-medium">Cash on Pickup</span>
                        </div>
                        {paymentMethod === "cash" && (
                          <Check size={16} className="text-mainBlue" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-md">
                  <AlertCircle size={20} className="text-yellow-500 mr-2" />
                  <p className="text-sm text-yellow-700">
                    By proceeding with this booking, you agree to our{" "}
                    <a href="/terms" className="text-mainBlue hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-mainBlue hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-mainBlue text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    "Complete Booking"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-blackColor">
                Booking Summary
              </h2>

              <div className="flex items-center mb-4">
                <img
                  src={car.images?.[0]?.secure_url || "/placeholder.svg"}
                  alt={car.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{car.name}</h3>
                  <p className="text-sm text-gray-500">
                    {bookingDetails.driverOption === "self"
                      ? "Self Drive"
                      : "With Chauffeur"}
                  </p>
                </div>
              </div>

              <div className="border-t border-b py-4 my-4 space-y-3">
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pickup Location</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.pickupLocation.address},{" "}
                      {bookingDetails.pickupLocation.city},{" "}
                      {bookingDetails.pickupLocation.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Dropoff Location</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.dropoffLocation.address},{" "}
                      {bookingDetails.dropoffLocation.city},{" "}
                      {bookingDetails.dropoffLocation.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pickup Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {new Date(bookingDetails.pickupDate).toLocaleDateString(
                        "en-NG",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      at {bookingDetails.pickupTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Return Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {new Date(bookingDetails.returnDate).toLocaleDateString(
                        "en-NG",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      at {bookingDetails.returnTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  {bookingDetails.journeyType === "one-way" ? (
                    <ArrowRight
                      size={18}
                      className="text-gray-500 mr-2 mt-0.5"
                    />
                  ) : (
                    <RotateCw size={18} className="text-gray-500 mr-2 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Journey Type</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.journeyType === "one-way"
                        ? "One Way"
                        : "Round Trip"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[18px] w-[18px] text-gray-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium">Distance & Duration</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.distance} km ({bookingDetails.duration})
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Car Rental ({bookingDetails.totalDays} day
                    {bookingDetails.totalDays > 1 ? "s" : ""})
                  </span>
                  <span>₦{bookingDetails.basePrice.toLocaleString()}</span>
                </div>

                {bookingDetails.driverOption === "chauffeur" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Driver Fee</span>
                    <span>₦{bookingDetails.chauffeurFee.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Distance ({bookingDetails.distance} km × ₦10,000)
                    {bookingDetails.journeyType === "round-trip" ? " × 2" : ""}
                  </span>
                  <span>₦{bookingDetails.distancePrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-mainBlue">
                    ₦{bookingDetails.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  <span className="font-medium block mb-1">
                    Cancellation Policy:
                  </span>
                  Free cancellation up to 24 hours before pickup. After that, a
                  fee of 30% of the total booking amount will apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarHireCheckout;
