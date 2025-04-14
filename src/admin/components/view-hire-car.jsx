"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { fetchCarById, updateCarStatus } from "../../utils/carHireApi";
import {
  MapPin,
  Users,
  Fuel,
  Gauge,
  Check,
  ArrowLeft,
  Edit,
} from "lucide-react";

const ViewHireCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(null);

  // Fetch car details
  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchCarById(id);
        setCar(response.car);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to load car details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCarDetails();
    }
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      await updateCarStatus(id, status);
      setCar({ ...car, status });
      toast.success(`Car status updated to ${status}`);
    } catch (error) {
      console.error("Error updating car status:", error);
      toast.error("Failed to update car status. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Available
          </span>
        );
      case "booked":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Booked
          </span>
        );
      case "maintenance":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            Maintenance
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Unknown
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> Car not found.</span>
          </div>
          <button
            onClick={() => navigate("/admin/car-hire-management")}
            className="mt-4 flex items-center text-mainBlue hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Car Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/car-hire-management")}
            className="flex items-center text-mainBlue hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Car Management
          </button>
          <button
            onClick={() => navigate(`/admin/edit-hire-car/${id}`)}
            className="flex items-center bg-mainBlue text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Edit size={16} className="mr-2" /> Edit Car
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-[300px] md:h-[400px]">
            <img
              src={car.images?.[0]?.secure_url || "/placeholder.svg"}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-mainBlue text-white px-3 py-1 rounded-full text-sm font-semibold">
              ₦{car.price?.toLocaleString() || "0"}/day
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{car.name}</h1>
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
                      {car.rating || "4.5"} ({car.reviews || 0} reviews)
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
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  {getStatusBadge(car.status)}
                </div>
                <div className="mt-2">
                  <select
                    value={car.status || "available"}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue text-sm w-full"
                  >
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
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
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Description
              </h2>
              <p className="text-gray-700">{car.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
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

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Maintenance Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Last Maintenance</p>
                    <p className="font-semibold">
                      {car.lastMaintenance
                        ? new Date(car.lastMaintenance).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Maintenance</p>
                    <p className="font-semibold">
                      {car.nextMaintenance
                        ? new Date(car.nextMaintenance).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Images
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {car.images && car.images.length > 0 ? (
                  car.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-32 bg-gray-100 rounded-md overflow-hidden"
                    >
                      <img
                        src={image.secure_url || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-8 text-gray-500">
                    No images available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHireCar;
