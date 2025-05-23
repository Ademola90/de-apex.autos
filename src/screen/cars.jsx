"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../data/store/store";
import api from "../utils/api";
import Navbar from "../components/navbar/navbar";
import OthersHero from "../components/OthersHero";
import Footer from "../components/footer/footer";
import {
  IoSpeedometer,
  IoCarSport,
  IoColorPaletteOutline,
} from "react-icons/io5";
import OurMission from "../components/OurMission";
import OurServices from "../components/OurServices";
import { toast } from "react-toastify";

const Cars = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedType, setSelectedType] = useState("All Vehicles");
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/car/public-cars");
        setCars(response.data.cars);
        setFilteredCars(response.data.cars); // Initialize filtered cars with all cars
      } catch (error) {
        console.error("Error fetching cars:", error.response?.data || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // Filter cars based on selected Make and Type
    let filtered = cars;

    if (selectedMake !== "All") {
      filtered = filtered.filter((car) => car.make === selectedMake);
    }

    if (selectedType !== "All Vehicles") {
      filtered = filtered.filter((car) => car.type === selectedType);
    }

    setFilteredCars(filtered);
  }, [selectedMake, selectedType, cars]);

  // Modify the Cars page to not require authentication for viewing
  const handleViewDetails = (carId) => {
    if (!user) {
      toast.info("Please log in to view car details.");
      navigate("/login");
      return;
    }
    navigate(`/details/${carId}`);
  };

  const handleShowAllCars = () => {
    setSelectedMake("All"); // Reset Make filter
    setSelectedType("All Vehicles"); // Reset Type filter
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="mt-16">
          <OthersHero text={"VEHICLES"} />
        </div>
        <div className="lg:px-16 md:px-10 px-8 mt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
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
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <OthersHero text={"STOCKS"} />
      </div>
      <div className="lg:px-16 md:px-10 px-8 mt-10 mb-16">
        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 font-Poppins">
            Filter Vehicles
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleShowAllCars}
              className={`px-4 py-2 rounded-md font-Poppins transition-colors ${
                selectedMake === "All" && selectedType === "All Vehicles"
                  ? "bg-mainBlue text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Cars
            </button>

            {/* Dropdown for Vehicle Make */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:ring-offset-2">
                  <span className="mr-1">
                    {selectedMake === "All" ? "Vehicle Make" : selectedMake}
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute z-10 h-[300px] overflow-y-auto right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
                {[
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
                ].map((make) => (
                  <MenuItem key={make}>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedMake(make)}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } ${
                          selectedMake === make ? "bg-blue-50 font-medium" : ""
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        {make}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            {/* Dropdown for Vehicle Type */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:ring-offset-2">
                  <span className="mr-1">
                    {selectedType === "All Vehicles"
                      ? "Vehicle Type"
                      : selectedType}
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute z-10 h-[300px] overflow-y-auto right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
                {[
                  "All Vehicles",
                  "Sedan",
                  "SUV",
                  "Truck",
                  "Buses & Vans",
                  "Pick-up",
                  "Hatchback",
                  "Coupe",
                ].map((type) => (
                  <MenuItem key={type}>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedType(type)}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } ${
                          selectedType === type ? "bg-blue-50 font-medium" : ""
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        {type}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-Poppins">
            Showing {filteredCars.length}{" "}
            {filteredCars.length === 1 ? "vehicle" : "vehicles"}
            {selectedMake !== "All" && ` in ${selectedMake}`}
            {selectedType !== "All Vehicles" && ` of type ${selectedType}`}
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group"
                onClick={() => handleViewDetails(car._id)}
              >
                {/* Image Container */}
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
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <IoCarSport className="text-gray-400 text-5xl" />
                    </div>
                  )}

                  {/* Type Badge */}
                  {car.type && (
                    <div className="absolute top-3 left-3 bg-mainBlue text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {car.type}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-mainBlue truncate transition-colors font-Poppins">
                      {car.make} {car.model}
                    </h3>
                    {car.year && (
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {car.year}
                      </span>
                    )}
                  </div>

                  {/* Specs */}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                    {car.transmission && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <IoColorPaletteOutline className="mr-1 text-gray-400" />
                        <span>{car.transmission}</span>
                      </div>
                    )}
                    {car.mileage && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <IoSpeedometer className="mr-1 text-gray-400" />
                        <span>{car.mileage.toLocaleString()} mi</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-3 line-clamp-2 min-h-[40px]">
                    {car.description || "No description available"}
                  </p>

                  {/* Price */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-mainBlue">
                        {user ? (
                          <>
                            ₦{Number.parseInt(car.price, 10).toLocaleString()}
                          </>
                        ) : (
                          <span className="text-mainBlue font-medium text-sm font-Poppins">
                            Login to view price
                          </span>
                        )}
                      </div>
                      <button
                        className="px-3 py-1 bg-mainBlue text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(car._id);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-gray-50 rounded-lg p-10 text-center">
              <IoCarSport className="text-gray-400 text-5xl mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-medium">
                No vehicles found
              </p>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={handleShowAllCars}
                className="mt-4 px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Show All Cars
              </button>
            </div>
          )}
        </div>
      </div>
      <OurServices />

      <OurMission />

      <Footer />
    </div>
  );
};

export default Cars;

// "use client";

// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useStore from "../data/store/store";
// import api from "../utils/api";
// import Navbar from "../components/navbar/navbar";
// import OthersHero from "../components/OthersHero";
// import Footer from "../components/footer/footer";
// import {
//   IoSpeedometer,
//   IoCarSport,
//   IoColorPaletteOutline,
// } from "react-icons/io5";
// import OurMission from "../components/OurMission";
// import OurServices from "../components/OurServices";

// const Cars = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedMake, setSelectedMake] = useState("All");
//   const [selectedType, setSelectedType] = useState("All Vehicles");
//   const navigate = useNavigate();
//   const { user } = useStore();

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/car/public-cars");
//         setCars(response.data.cars);
//         setFilteredCars(response.data.cars); // Initialize filtered cars with all cars
//       } catch (error) {
//         console.error("Error fetching cars:", error.response?.data || error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   useEffect(() => {
//     // Filter cars based on selected Make and Type
//     let filtered = cars;

//     if (selectedMake !== "All") {
//       filtered = filtered.filter((car) => car.make === selectedMake);
//     }

//     if (selectedType !== "All Vehicles") {
//       filtered = filtered.filter((car) => car.type === selectedType);
//     }

//     setFilteredCars(filtered);
//   }, [selectedMake, selectedType, cars]);

//   // Modify the Cars page to not require authentication for viewing
//   const handleViewDetails = (carId) => {
//     navigate(`/details/${carId}`); // Always allow navigation to details
//   };

//   const handleShowAllCars = () => {
//     setSelectedMake("All"); // Reset Make filter
//     setSelectedType("All Vehicles"); // Reset Type filter
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div>
//         <Navbar />
//         <div className="mt-16">
//           <OthersHero text={"VEHICLES"} />
//         </div>
//         <div className="lg:px-16 md:px-10 px-8 mt-10">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//             {[...Array(8)].map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
//               >
//                 <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
//                 <div className="p-4">
//                   <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
//                   <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mt-4"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="mt-16">
//         <OthersHero text={"STOCKS"} />
//       </div>
//       <div className="lg:px-16 md:px-10 px-8 mt-10 mb-16">
//         {/* Filter Section */}
//         <div className="bg-white p-4 rounded-lg shadow-md mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 font-Poppins">
//             Filter Vehicles
//           </h2>
//           <div className="flex flex-wrap items-center gap-4">
//             <button
//               onClick={handleShowAllCars}
//               className={`px-4 py-2 rounded-md font-Poppins transition-colors ${
//                 selectedMake === "All" && selectedType === "All Vehicles"
//                   ? "bg-mainBlue text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               All Cars
//             </button>

//             {/* Dropdown for Vehicle Make */}
//             <Menu as="div" className="relative inline-block text-left">
//               <div>
//                 <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:ring-offset-2">
//                   <span className="mr-1">
//                     {selectedMake === "All" ? "Vehicle Make" : selectedMake}
//                   </span>
//                   <ChevronDownIcon
//                     aria-hidden="true"
//                     className="h-5 w-5 text-gray-400"
//                   />
//                 </MenuButton>
//               </div>
//               <MenuItems className="absolute z-10 h-[300px] overflow-y-auto right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
//                 {[
//                   "All",
//                   "Toyota",
//                   "Lexus",
//                   "Mercedes-Benz",
//                   "BMW",
//                   "Honda",
//                   "Hyundai",
//                   "Audi",
//                   "Kia",
//                   "Nissan",
//                   "Mazda",
//                   "Ford",
//                   "Jeep",
//                   "Chevrolet",
//                   "Volkswagen",
//                   "Tesla",
//                   "Subaru",
//                 ].map((make) => (
//                   <MenuItem key={make}>
//                     {({ active }) => (
//                       <button
//                         onClick={() => setSelectedMake(make)}
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } ${
//                           selectedMake === make ? "bg-blue-50 font-medium" : ""
//                         } block w-full text-left px-4 py-2 text-sm`}
//                       >
//                         {make}
//                       </button>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuItems>
//             </Menu>

//             {/* Dropdown for Vehicle Type */}
//             <Menu as="div" className="relative inline-block text-left">
//               <div>
//                 <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:ring-offset-2">
//                   <span className="mr-1">
//                     {selectedType === "All Vehicles"
//                       ? "Vehicle Type"
//                       : selectedType}
//                   </span>
//                   <ChevronDownIcon
//                     aria-hidden="true"
//                     className="h-5 w-5 text-gray-400"
//                   />
//                 </MenuButton>
//               </div>
//               <MenuItems className="absolute z-10 h-[300px] overflow-y-auto right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
//                 {[
//                   "All Vehicles",
//                   "Sedan",
//                   "SUV",
//                   "Truck",
//                   "Buses & Vans",
//                   "Pick-up",
//                   "Hatchback",
//                   "Coupe",
//                 ].map((type) => (
//                   <MenuItem key={type}>
//                     {({ active }) => (
//                       <button
//                         onClick={() => setSelectedType(type)}
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } ${
//                           selectedType === type ? "bg-blue-50 font-medium" : ""
//                         } block w-full text-left px-4 py-2 text-sm`}
//                       >
//                         {type}
//                       </button>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuItems>
//             </Menu>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-gray-600 font-Poppins">
//             Showing {filteredCars.length}{" "}
//             {filteredCars.length === 1 ? "vehicle" : "vehicles"}
//             {selectedMake !== "All" && ` in ${selectedMake}`}
//             {selectedType !== "All Vehicles" && ` of type ${selectedType}`}
//           </p>
//         </div>

//         {/* Car Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredCars.length > 0 ? (
//             filteredCars.map((car) => (
//               <div
//                 key={car._id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group"
//                 onClick={() => handleViewDetails(car._id)}
//               >
//                 {/* Image Container */}
//                 <div className="relative overflow-hidden lg:h-[250px] md:h-[250px] h-[300px]">
//                   {car.images &&
//                   car.images.length > 0 &&
//                   car.images[0].secure_url ? (
//                     <img
//                       src={
//                         car.images[0].secure_url.startsWith("http")
//                           ? car.images[0].secure_url
//                           : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0].secure_url}`
//                       }
//                       alt={`${car.make} ${car.model}`}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       onError={(e) => {
//                         e.target.src = "/placeholder.svg?height=200&width=400";
//                         e.target.onerror = null;
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                       <IoCarSport className="text-gray-400 text-5xl" />
//                     </div>
//                   )}

//                   {/* Type Badge */}
//                   {car.type && (
//                     <div className="absolute top-3 left-3 bg-mainBlue text-white text-xs font-semibold px-2 py-1 rounded-full">
//                       {car.type}
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <div className="flex items-baseline justify-between mb-1">
//                     <h3 className="text-lg font-bold text-gray-800 group-hover:text-mainBlue truncate transition-colors font-Poppins">
//                       {car.make} {car.model}
//                     </h3>
//                     {car.year && (
//                       <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
//                         {car.year}
//                       </span>
//                     )}
//                   </div>

//                   {/* Specs */}
//                   <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
//                     {car.transmission && (
//                       <div className="flex items-center text-gray-600 text-sm">
//                         <IoColorPaletteOutline className="mr-1 text-gray-400" />
//                         <span>{car.transmission}</span>
//                       </div>
//                     )}
//                     {car.mileage && (
//                       <div className="flex items-center text-gray-600 text-sm">
//                         <IoSpeedometer className="mr-1 text-gray-400" />
//                         <span>{car.mileage.toLocaleString()} mi</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Description */}
//                   <p className="text-gray-600 text-sm mt-3 line-clamp-2 min-h-[40px]">
//                     {car.description || "No description available"}
//                   </p>

//                   {/* Price */}
//                   <div className="mt-4 pt-3 border-t border-gray-100">
//                     <div className="flex items-center justify-between">
//                       <div className="text-xl font-bold text-mainBlue">
//                         ₦{Number.parseInt(car.price, 10).toLocaleString()}
//                       </div>
//                       <button
//                         className="px-3 py-1 bg-mainBlue text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleViewDetails(car._id);
//                         }}
//                       >
//                         Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full bg-gray-50 rounded-lg p-10 text-center">
//               <IoCarSport className="text-gray-400 text-5xl mx-auto mb-4" />
//               <p className="text-gray-700 text-lg font-medium">
//                 No vehicles found
//               </p>
//               <p className="text-gray-500 mt-2">
//                 Try adjusting your filters to see more results
//               </p>
//               <button
//                 onClick={handleShowAllCars}
//                 className="mt-4 px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Show All Cars
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <OurServices />

//       <OurMission />

//       <Footer />
//     </div>
//   );
// };

// export default Cars;

// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import useStore from "../data/store/store";
// import api from "../utils/api";
// import Navbar from "../components/navbar/navbar";
// import OthersHero from "../components/OthersHero";
// import Footer from "../components/footer/footer";
// import {
//   IoCalendarOutline,
//   IoSpeedometer,
//   IoCarSport,
//   IoColorPaletteOutline,
// } from "react-icons/io5";
// import OurMission from "../components/OurMission";
// import OurServices from "../components/OurServices";

// const Cars = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedMake, setSelectedMake] = useState("All");
//   const [selectedType, setSelectedType] = useState("All Vehicles");
//   const navigate = useNavigate();
//   const { user } = useStore();

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/car/public-cars");
//         setCars(response.data.cars);
//         setFilteredCars(response.data.cars); // Initialize filtered cars with all cars
//       } catch (error) {
//         console.error("Error fetching cars:", error.response?.data || error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   useEffect(() => {
//     // Filter cars based on selected Make and Type
//     let filtered = cars;

//     if (selectedMake !== "All") {
//       filtered = filtered.filter((car) => car.make === selectedMake);
//     }

//     if (selectedType !== "All Vehicles") {
//       filtered = filtered.filter((car) => car.type === selectedType);
//     }

//     setFilteredCars(filtered);
//   }, [selectedMake, selectedType, cars]);

//   const handleViewDetails = (carId) => {
//     if (!user) {
//       toast.info("Please log in to view car details.");
//       navigate("/login");
//       return;
//     }
//     navigate(`/details/${carId}`); // Navigate to the details page with car ID
//   };

//   const handleShowAllCars = () => {
//     setSelectedMake("All"); // Reset Make filter
//     setSelectedType("All Vehicles"); // Reset Type filter
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div>
//         <Navbar />
//         <div className="mt-16">
//           <OthersHero text={"VEHICLES"} />
//         </div>
//         <div className="lg:px-16 md:px-10 px-8 mt-10">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//             {[...Array(8)].map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
//               >
//                 <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
//                 <div className="p-4">
//                   <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
//                   <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mt-4"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="mt-16">
//         <OthersHero text={"STOCKS"} />
//       </div>
//       <div className="lg:px-16 md:px-10 px-8 mt-10 mb-16">
//         {/* Filter Section */}
//         <div className="bg-white p-4 rounded-lg shadow-md mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 font-Poppins">
//             Filter Vehicles
//           </h2>
//           <div className="flex flex-wrap items-center gap-4">
//             <button
//               onClick={handleShowAllCars}
//               className={`px-4 py-2 rounded-md font-Poppins transition-colors ${
//                 selectedMake === "All" && selectedType === "All Vehicles"
//                   ? "bg-mainBlue text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               All Cars
//             </button>

//             {/* Dropdown for Vehicle Make */}
//             <Menu as="div" className="relative inline-block text-left">
//               <div>
//                 <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:ring-offset-2">
//                   <span className="mr-1">
//                     {selectedMake === "All" ? "Vehicle Make" : selectedMake}
//                   </span>
//                   <ChevronDownIcon
//                     aria-hidden="true"
//                     className="h-5 w-5 text-gray-400"
//                   />
//                 </MenuButton>
//               </div>
//               <MenuItems className="absolute z-10 h-[300px] overflow-y-auto right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
//                 {[
//                   "All",
//                   "Toyota",
//                   "Lexus",
//                   "Mercedes-Benz",
//                   "BMW",
//                   "Honda",
//                   "Hyundai",
//                   "Audi",
//                   "Kia",
//                   "Nissan",
//                   "Mazda",
//                   "Ford",
//                   "Jeep",
//                   "Chevrolet",
//                   "Volkswagen",
//                   "Tesla",
//                   "Subaru",
//                 ].map((make) => (
//                   <MenuItem key={make}>
//                     {({ active }) => (
//                       <button
//                         onClick={() => setSelectedMake(make)}
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } ${
//                           selectedMake === make ? "bg-blue-50 font-medium" : ""
//                         } block w-full text-left px-4 py-2 text-sm`}
//                       >
//                         {make}
//                       </button>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuItems>
//             </Menu>

//             {/* Dropdown for Vehicle Type */}
//             <Menu as="div" className="relative inline-block text-left">
//               <div>
//                 <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:ring-offset-2">
//                   <span className="mr-1">
//                     {selectedType === "All Vehicles"
//                       ? "Vehicle Type"
//                       : selectedType}
//                   </span>
//                   <ChevronDownIcon
//                     aria-hidden="true"
//                     className="h-5 w-5 text-gray-400"
//                   />
//                 </MenuButton>
//               </div>
//               <MenuItems className="absolute z-10 h-[300px] overflow-y-auto right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
//                 {[
//                   "All Vehicles",
//                   "Sedan",
//                   "SUV",
//                   "Truck",
//                   "Buses & Vans",
//                   "Pick-up",
//                   "Hatchback",
//                   "Coupe",
//                 ].map((type) => (
//                   <MenuItem key={type}>
//                     {({ active }) => (
//                       <button
//                         onClick={() => setSelectedType(type)}
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } ${
//                           selectedType === type ? "bg-blue-50 font-medium" : ""
//                         } block w-full text-left px-4 py-2 text-sm`}
//                       >
//                         {type}
//                       </button>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuItems>
//             </Menu>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-gray-600 font-Poppins">
//             Showing {filteredCars.length}{" "}
//             {filteredCars.length === 1 ? "vehicle" : "vehicles"}
//             {selectedMake !== "All" && ` in ${selectedMake}`}
//             {selectedType !== "All Vehicles" && ` of type ${selectedType}`}
//           </p>
//         </div>

//         {/* Car Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredCars.length > 0 ? (
//             filteredCars.map((car) => (
//               <div
//                 key={car._id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group"
//                 onClick={() => handleViewDetails(car._id)}
//               >
//                 {/* Image Container */}
//                 <div className="relative overflow-hidden lg:h-[250px] md:h-[250px] h-[300px]">
//                   {car.images &&
//                   car.images.length > 0 &&
//                   car.images[0].secure_url ? (
//                     <img
//                       src={
//                         car.images[0].secure_url.startsWith("http")
//                           ? car.images[0].secure_url
//                           : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0].secure_url}`
//                       }
//                       alt={`${car.make} ${car.model}`}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       onError={(e) => {
//                         e.target.src = "/placeholder.svg?height=200&width=400";
//                         e.target.onerror = null;
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                       <IoCarSport className="text-gray-400 text-5xl" />
//                     </div>
//                   )}

//                   {/* Type Badge */}
//                   {car.type && (
//                     <div className="absolute top-3 left-3 bg-mainBlue text-white text-xs font-semibold px-2 py-1 rounded-full">
//                       {car.type}
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <div className="flex items-baseline justify-between mb-1">
//                     <h3 className="text-lg font-bold text-gray-800 group-hover:text-mainBlue truncate transition-colors font-Poppins">
//                       {car.make} {car.model}
//                     </h3>
//                     {car.year && (
//                       <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
//                         {car.year}
//                       </span>
//                     )}
//                   </div>

//                   {/* Specs */}
//                   <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
//                     {car.transmission && (
//                       <div className="flex items-center text-gray-600 text-sm">
//                         <IoColorPaletteOutline className="mr-1 text-gray-400" />
//                         <span>{car.transmission}</span>
//                       </div>
//                     )}
//                     {car.mileage && (
//                       <div className="flex items-center text-gray-600 text-sm">
//                         <IoSpeedometer className="mr-1 text-gray-400" />
//                         <span>{car.mileage.toLocaleString()} mi</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Description */}
//                   <p className="text-gray-600 text-sm mt-3 line-clamp-2 min-h-[40px]">
//                     {car.description || "No description available"}
//                   </p>

//                   {/* Price */}
//                   <div className="mt-4 pt-3 border-t border-gray-100">
//                     <div className="flex items-center justify-between">
//                       <div className="text-xl font-bold text-mainBlue">
//                         ₦{parseInt(car.price, 10).toLocaleString()}
//                       </div>
//                       <button
//                         className="px-3 py-1 bg-mainBlue text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleViewDetails(car._id);
//                         }}
//                       >
//                         Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full bg-gray-50 rounded-lg p-10 text-center">
//               <IoCarSport className="text-gray-400 text-5xl mx-auto mb-4" />
//               <p className="text-gray-700 text-lg font-medium">
//                 No vehicles found
//               </p>
//               <p className="text-gray-500 mt-2">
//                 Try adjusting your filters to see more results
//               </p>
//               <button
//                 onClick={handleShowAllCars}
//                 className="mt-4 px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Show All Cars
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <OurServices />

//       <OurMission />

//       <Footer />
//     </div>
//   );
// };

// export default Cars;
