"use client";
import { Link } from "react-router-dom";
import { MapPin, Users, Fuel } from "lucide-react";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative">
        <img
          src={car.images?.[0]?.secure_url || "/placeholder.svg"}
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        {car.status !== "available" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Currently Unavailable
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-mainBlue text-white px-3 py-1 rounded-full text-sm font-semibold">
          ₦{car.price.toLocaleString()}/day
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-blackColor">{car.name}</h3>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="ml-1 text-sm text-gray-600">
              {car.rating || "4.5"}
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{car.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded-md">
            <Users size={16} className="text-gray-500 mb-1" />
            <span className="text-xs">{car.seats} Seats</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 mb-1"
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
            <span className="text-xs">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded-md">
            <Fuel size={16} className="text-gray-500 mb-1" />
            <span className="text-xs">{car.fuelType}</span>
          </div>
        </div>

        <Link
          to={`/car-hire/details/${car._id}`}
          className={`w-full py-2 px-4 rounded-md text-center font-medium transition duration-300 ${
            car.status === "available"
              ? "bg-mainBlue text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          onClick={(e) => car.status !== "available" && e.preventDefault()}
        >
          {car.status === "available" ? "View Details" : "Unavailable"}
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
