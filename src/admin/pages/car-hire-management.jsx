"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import Header from "../components/Header";
import {
  fetchAllCars,
  updateCarStatus,
  deleteCar,
} from "../../utils/carHireApi";
import { toast } from "react-toastify";

const CarHireManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");

  // Fetch cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const response = await fetchAllCars();
        setCars(response.cars || []);
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Failed to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || car.status === filterStatus;
    const matchesLocation =
      filterLocation === "all" || car.location === filterLocation;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        setCars(cars.filter((car) => car._id !== id));
        toast.success("Car deleted successfully");
      } catch (error) {
        console.error("Error deleting car:", error);
        toast.error("Failed to delete car. Please try again.");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateCarStatus(id, status);
      setCars(cars.map((car) => (car._id === id ? { ...car, status } : car)));
      toast.success("Car status updated successfully");
    } catch (error) {
      console.error("Error updating car status:", error);
      toast.error("Failed to update car status. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Available
          </span>
        );
      case "booked":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            Booked
          </span>
        );
      case "maintenance":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            Maintenance
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="">
      <Header />
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Car Hire Management
            </h1>
            <p className="text-gray-600">Manage your fleet of rental cars</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => navigate("/admin/add-hire-car")}
              className="bg-mainBlue text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Add New Car
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search cars..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className=" lg:flex md:flex grid gap-4">
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  className="pl-10 p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  className="pl-10 p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  <option value="Osogbo">Osogbo</option>
                  <option value="Akure">Akure</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Car
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price/Day
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Maintenance
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCars.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No cars found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredCars.map((car) => (
                      <tr key={car._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={
                                  car.images?.[0]?.secure_url ||
                                  "/placeholder.svg"
                                }
                                alt={car.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {car.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {car.bookings} bookings
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {car.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ₦{car.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {car.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative">
                            {getStatusBadge(car.status)}
                            <select
                              className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                              value={car.status}
                              onChange={(e) =>
                                handleStatusChange(car._id, e.target.value)
                              }
                            >
                              <option value="available">Available</option>
                              <option value="booked">Booked</option>
                              <option value="maintenance">Maintenance</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(car.lastMaintenance).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                navigate(`/admin/edit-hire-car/${car._id}`)
                              }
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/view-hire-car/${car._id}`)
                              }
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(car._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Cars
              </h2>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {cars.filter((car) => car.status === "available").length}
            </div>
            <p className="text-gray-600 text-sm">
              {cars.length > 0
                ? `${Math.round(
                    (cars.filter((car) => car.status === "available").length /
                      cars.length) *
                      100
                  )}% of total fleet`
                : "0% of total fleet"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Booked Cars
              </h2>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {cars.filter((car) => car.status === "booked").length}
            </div>
            <p className="text-gray-600 text-sm">
              {cars.length > 0
                ? `${Math.round(
                    (cars.filter((car) => car.status === "booked").length /
                      cars.length) *
                      100
                  )}% of total fleet`
                : "0% of total fleet"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                In Maintenance
              </h2>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <XCircle size={20} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {cars.filter((car) => car.status === "maintenance").length}
            </div>
            <p className="text-gray-600 text-sm">
              {cars.length > 0
                ? `${Math.round(
                    (cars.filter((car) => car.status === "maintenance").length /
                      cars.length) *
                      100
                  )}% of total fleet`
                : "0% of total fleet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHireManagement;
