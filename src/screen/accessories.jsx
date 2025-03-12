import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../data/store/store";
import api from "../utils/api";
import Navbar from "../components/navbar/navbar";
import OthersHero from "../components/OthersHero";
import {
  IoSearch,
  IoFilterSharp,
  IoPricetag,
  IoCarSport,
  IoCheckmarkCircle,
} from "react-icons/io5";
import Footer from "../components/footer/footer";

const Accessories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [accessories, setAccessories] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMake, setSelectedMake] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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

  // Predefined list of categories
  const categories = [
    { value: "All", label: "All Categories" },
    { value: "Exterior", label: "Exterior" },
    { value: "Interior", label: "Interior" },
    { value: "Electronics", label: "Electronics" },
    { value: "Performance", label: "Performance" },
    { value: "Wheels & Tires", label: "Wheels & Tires" },
    { value: "Others", label: "Others" },
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
        setError("Failed to load accessories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    let filtered = accessories;

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (accessory) =>
          accessory.name?.toLowerCase().includes(term) ||
          (accessory.description &&
            accessory.description.toLowerCase().includes(term))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (accessory) => accessory.category === selectedCategory
      );
    }

    // Filter by make (case-insensitive and handle null/undefined)
    if (selectedMake !== "All") {
      filtered = filtered.filter(
        (accessory) =>
          accessory.make &&
          accessory.make.toLowerCase() === selectedMake.toLowerCase()
      );
    }

    setFilteredAccessories(filtered);
  }, [selectedCategory, selectedMake, accessories, searchTerm]);

  // useEffect(() => {
  //   let filtered = accessories;

  //   // Filter by search term
  //   if (searchTerm.trim() !== "") {
  //     const term = searchTerm.toLowerCase();
  //     filtered = filtered.filter(
  //       (accessory) =>
  //         accessory.name.toLowerCase().includes(term) ||
  //         (accessory.description &&
  //           accessory.description.toLowerCase().includes(term))
  //     );
  //   }

  //   // Filter by category
  //   if (selectedCategory !== "All") {
  //     filtered = filtered.filter(
  //       (accessory) => accessory.category === selectedCategory
  //     );
  //   }

  //   // Filter by make
  //   if (selectedMake !== "All") {
  //     filtered = filtered.filter(
  //       (accessory) => accessory.make === selectedMake
  //     );
  //   }

  //   setFilteredAccessories(filtered);
  // }, [selectedCategory, selectedMake, accessories, searchTerm]);

  const handleViewDetails = (accessoryId) => {
    if (!user) {
      toast.info("Please log in to view accessory details.");
      navigate("/login");
      return;
    }
    navigate(`/accessory-details/${accessoryId}`);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedMake("All");
    setSearchTerm("");
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div>
          <OthersHero text={"STOCKS"} />
        </div>
        <div className="lg:px-16 md:px-10 px-8 mt-10 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <div className="w-full h-[250px] bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
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

  // Error state
  if (error) {
    return (
      <div>
        <Navbar />
        <div>
          <OthersHero text={"STOCKS"} />
        </div>
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
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <OthersHero text={"ACCESSORIES"} />
      </div>
      <div className="lg:px-16 md:px-10 px-8 mt-10 mb-16">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-Poppins">
            Car Accessories
          </h1>
          <p className="text-gray-600">
            Find the perfect accessories for your vehicle
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 font-Poppins flex items-center">
              <IoFilterSharp className="mr-2" /> Filter Accessories
            </h2>
            <button
              onClick={resetFilters}
              className="text-sm text-mainBlue hover:text-blue-700 font-medium"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search accessories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Make Dropdown */}
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
            >
              {carMakes.map((make) => (
                <option key={make} value={make}>
                  {make === "All" ? "All Makes" : make}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-Poppins">
            Showing {filteredAccessories.length}{" "}
            {filteredAccessories.length === 1 ? "accessory" : "accessories"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedMake !== "All" && ` for ${selectedMake}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Accessories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAccessories.length > 0 ? (
            filteredAccessories.map((accessory) => (
              <div
                key={accessory._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group"
                onClick={() => handleViewDetails(accessory._id)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-[220px]">
                  {accessory.images &&
                  accessory.images.length > 0 &&
                  accessory.images[0].secure_url ? (
                    <img
                      src={
                        accessory.images[0].secure_url.startsWith("http")
                          ? accessory.images[0].secure_url
                          : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0].secure_url}`
                      }
                      alt={accessory.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=220&width=400";
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <IoPricetag className="text-gray-400 text-5xl" />
                    </div>
                  )}

                  {/* Category Badge */}
                  {accessory.make && (
                    <div className="absolute top-3 left-3 bg-mainBlue text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {accessory.make}
                    </div>
                  )}

                  {/* In Stock Badge (if applicable) */}
                  {accessory.inStock !== undefined && (
                    <div
                      className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${
                        accessory.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {accessory.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-mainBlue transition-colors font-Poppins line-clamp-1">
                      {accessory.name}
                    </h3>

                    {/* Compatible Badge */}
                    {accessory.make && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {accessory.make}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 min-h-[40px]">
                    {accessory.description || "No description available"}
                  </p>

                  {/* Price and Action */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xl font-bold text-mainBlue">
                      ₦{parseInt(accessory.price, 10).toLocaleString()}
                    </div>
                    <button
                      className="px-3 py-1 bg-mainBlue text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(accessory._id);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-gray-50 rounded-lg p-10 text-center">
              <IoPricetag className="text-gray-400 text-5xl mx-auto mb-4" />

              <p className="text-gray-700 text-lg font-medium">
                No accessories found
              </p>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Show All Accessories
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Accessories;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import useStore from "../data/store/store";
// import api from "../utils/api";
// import Navbar from "../components/navbar/navbar";
// import OthersHero from "../components/OthersHero";

// const Accessories = () => {
//   const [accessories, setAccessories] = useState([]);
//   const [filteredAccessories, setFilteredAccessories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedMake, setSelectedMake] = useState("All");
//   const navigate = useNavigate();
//   const { user } = useStore();

//   // Predefined list of car makes
//   const carMakes = [
//     "All",
//     "Toyota",
//     "Lexus",
//     "Mercedes-Benz",
//     "BMW",
//     "Honda",
//     "Hyundai",
//     "Audi",
//     "Kia",
//     "Nissan",
//     "Mazda",
//     "Ford",
//     "Jeep",
//     "Chevrolet",
//     "Volkswagen",
//     "Tesla",
//     "Subaru",
//   ];

//   useEffect(() => {
//     const fetchAccessories = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/accessory/accessories");
//         setAccessories(response.data.accessories);
//         setFilteredAccessories(response.data.accessories);
//       } catch (error) {
//         console.error(
//           "Error fetching accessories:",
//           error.response?.data || error
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAccessories();
//   }, []);

//   useEffect(() => {
//     let filtered = accessories;

//     // Filter by category
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(
//         (accessory) => accessory.category === selectedCategory
//       );
//     }

//     // Filter by make
//     if (selectedMake !== "All") {
//       filtered = filtered.filter(
//         (accessory) => accessory.make === selectedMake
//       );
//     }

//     setFilteredAccessories(filtered);
//   }, [selectedCategory, selectedMake, accessories]);

//   const handleViewDetails = (accessoryId) => {
//     if (!user) {
//       toast.info("Please log in to view accessory details.");
//       navigate("/login");
//       return;
//     }
//     navigate(`/accessory-details/${accessoryId}`);
//   };

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading accessories...</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div>
//         <OthersHero text={"STOCKS"} />
//       </div>
//       <div className="lg:px-16 md:px-10 px-8 mt-32">
//         <p>All Accessories</p>
//         {/* Dropdown Menus */}
//         <div className="flex items-center gap-4 mb-6">
//           <p
//             onClick={() => {
//               setSelectedCategory("All");
//               setSelectedMake("All");
//             }}
//             className="cursor-pointer font-Poppins text-blue-500 hover:text-blue-700"
//           >
//             All Accessories
//           </p>
//           {/* Dropdown for Category */}
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="border p-2 rounded-md"
//           >
//             <option value="All">All Categories</option>
//             <option value="Exterior">Exterior</option>
//             <option value="Interior">Interior</option>
//             <option value="Others">Others</option>
//           </select>
//           {/* Dropdown for Make */}
//           <select
//             value={selectedMake}
//             onChange={(e) => setSelectedMake(e.target.value)}
//             className="border p-2 rounded-md"
//           >
//             {carMakes.map((make) => (
//               <option key={make} value={make}>
//                 {make}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {filteredAccessories.length > 0 ? (
//             filteredAccessories.map((accessory) => (
//               <div
//                 key={accessory._id}
//                 className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
//                 onClick={() => handleViewDetails(accessory._id)}
//               >
//                 {accessory.images &&
//                 accessory.images.length > 0 &&
//                 accessory.images[0].secure_url ? (
//                   <img
//                     src={
//                       accessory.images[0].secure_url.startsWith("http")
//                         ? accessory.images[0].secure_url
//                         : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0].secure_url}`
//                     }
//                     alt=""
//                     className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
//                     onError={(e) => {
//                       e.target.src = "/placeholder.svg?height=250&width=400";
//                       e.target.onerror = null;
//                     }}
//                   />
//                 ) : (
//                   <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center">
//                     <p className="text-gray-500">No Image</p>
//                   </div>
//                 )}

//                 {/* {accessory.images && accessory.images.length > 0 ? (
//                   <img
//                     src={
//                       accessory.images[0].startsWith("http")
//                         ? accessory.images[0]
//                         : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0]}`
//                     }
//                     alt={`${accessory.name}`}
//                     className="w-[251px] h-[155px] object-cover rounded"
//                   />
//                 ) : (
//                   // <img
//                   //   src={
//                   //     accessory.images[0].startsWith("http")
//                   //       ? accessory.images[0]
//                   //       : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0]}`
//                   //   }
//                   //   alt={`${accessory.name}`}
//                   //   className="w-[251px] h-[155px] object-cover rounded"
//                   // />
//                   <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
//                     <p className="text-gray-500">No Image</p>
//                   </div>
//                 )} */}

//                 <div className="px-5 w-full">
//                   <h3 className="text-lg font-bold mt-2 truncate font-Poppins">
//                     {accessory.name}
//                   </h3>
//                   <p className="text-gray-500 text-sm font-Poppins truncate">
//                     {accessory.description}
//                   </p>
//                   <div className="flex items-center justify-between mt-2">
//                     <p className="text-lg">
//                       #{parseInt(accessory.price, 10).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">
//               No accessories available
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Accessories;
