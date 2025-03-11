import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../data/store/store";
import api from "../utils/api";
import Navbar from "../components/navbar/navbar";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMake, setSelectedMake] = useState("All");
  const navigate = useNavigate();
  const { user } = useStore();

  // Predefined list of car makes
  const carMakes = [
    "All",
    "Toyota",
    "Lexus",
    "Mercedes-Benz",
    "BMW",
    "Honda",
    "Hyundai",
    "Audi",
    "Kia",
    "Nissan",
    "Mazda",
    "Ford",
    "Jeep",
    "Chevrolet",
    "Volkswagen",
    "Tesla",
    "Subaru",
  ];

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/accessory/accessories");
        setAccessories(response.data.accessories);
        setFilteredAccessories(response.data.accessories);
      } catch (error) {
        console.error(
          "Error fetching accessories:",
          error.response?.data || error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    let filtered = accessories;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (accessory) => accessory.category === selectedCategory
      );
    }

    // Filter by make
    if (selectedMake !== "All") {
      filtered = filtered.filter(
        (accessory) => accessory.make === selectedMake
      );
    }

    setFilteredAccessories(filtered);
  }, [selectedCategory, selectedMake, accessories]);

  const handleViewDetails = (accessoryId) => {
    if (!user) {
      toast.info("Please log in to view accessory details.");
      navigate("/login");
      return;
    }
    navigate(`/accessory-details/${accessoryId}`);
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading accessories...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="lg:px-16 md:px-10 px-8 mt-32">
        <p>All Accessories</p>
        {/* Dropdown Menus */}
        <div className="flex items-center gap-4 mb-6">
          <p
            onClick={() => {
              setSelectedCategory("All");
              setSelectedMake("All");
            }}
            className="cursor-pointer font-Poppins text-blue-500 hover:text-blue-700"
          >
            All Accessories
          </p>
          {/* Dropdown for Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="All">All Categories</option>
            <option value="Exterior">Exterior</option>
            <option value="Interior">Interior</option>
            <option value="Others">Others</option>
          </select>
          {/* Dropdown for Make */}
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="border p-2 rounded-md"
          >
            {carMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAccessories.length > 0 ? (
            filteredAccessories.map((accessory) => (
              <div
                key={accessory._id}
                className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
                onClick={() => handleViewDetails(accessory._id)}
              >
                {accessory.images &&
                accessory.images.length > 0 &&
                accessory.images[0].secure_url ? (
                  <img
                    src={
                      accessory.images[0].secure_url.startsWith("http")
                        ? accessory.images[0].secure_url
                        : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0].secure_url}`
                    }
                    alt=""
                    className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=250&width=400";
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No Image</p>
                  </div>
                )}

                {/* {accessory.images && accessory.images.length > 0 ? (
                  <img
                    src={
                      accessory.images[0].startsWith("http")
                        ? accessory.images[0]
                        : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0]}`
                    }
                    alt={`${accessory.name}`}
                    className="w-[251px] h-[155px] object-cover rounded"
                  />
                ) : (
                  // <img
                  //   src={
                  //     accessory.images[0].startsWith("http")
                  //       ? accessory.images[0]
                  //       : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0]}`
                  //   }
                  //   alt={`${accessory.name}`}
                  //   className="w-[251px] h-[155px] object-cover rounded"
                  // />
                  <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
                    <p className="text-gray-500">No Image</p>
                  </div>
                )} */}

                <div className="px-5 w-full">
                  <h3 className="text-lg font-bold mt-2 truncate font-Poppins">
                    {accessory.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-Poppins truncate">
                    {accessory.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg">
                      #{parseInt(accessory.price, 10).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No accessories available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accessories;
