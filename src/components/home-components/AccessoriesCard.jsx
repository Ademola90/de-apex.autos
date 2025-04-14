"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import useStore from "../../data/store/store";
import { FaTag, FaEye } from "react-icons/fa";
import AdInline from "../advertisements/AdInline";

const CarAccessoriesCard = () => {
  const [accessories, setAccessories] = useState([]);
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/accessory/accessories");
        setAccessories(response.data.accessories);
      } catch (error) {
        console.error(
          "Error fetching accessories:",
          error.response?.data || error
        );
        toast.error("Failed to load accessories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAds = async () => {
      try {
        const response = await api.get("/advertisement/for-page", {
          params: {
            page: "accessories",
            type: "inline",
          },
        });
        setAds(response.data.advertisements || []);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAccessories();
    fetchAds();
  }, []);

  const handleViewDetails = (accessoryId) => {
    navigate(`/accessory-details/${accessoryId}`); // Always allow navigation
  };

  // Insert ads at specific positions
  const getItemsWithAds = () => {
    if (!accessories.length || !ads.length) return accessories;

    const result = [...accessories];

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
        <div className="py-10">
          <div className="h-6 bg-gray-200 w-48 mx-auto rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 w-96 mx-auto rounded mt-3 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <div className="w-full h-[250px] bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:px-16 md:px-10 px-8 mt-10">
      <div className="py-10">
        <p className="text-mainBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center">
          Find Your Car Accessories
        </p>
        <h2 className="text-center font-Poppins lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
          Experience the Best Car Accessories
        </h2>
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

            // Render accessory card
            const accessory = item;
            return (
              <div
                key={accessory._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group"
                onClick={() => handleViewDetails(accessory._id)}
              >
                {/* Image Container with Overlay */}
                <div className="relative overflow-hidden lg:h-[250px] md:h-[250px] h-[300px]">
                  {accessory.images &&
                  accessory.images.length > 0 &&
                  accessory.images[0].secure_url ? (
                    <img
                      src={
                        accessory.images[0].secure_url.startsWith("http")
                          ? accessory.images[0].secure_url
                          : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0].secure_url}`
                      }
                      alt={`${accessory.name}`}
                      className="w-full h-full object-cover rounded-t-md image-hover-zoom"
                    />
                  ) : (
                    <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}

                  {/* Category Badge */}
                  {accessory.make && (
                    <div className="absolute top-3 left-3 bg-mainBlue text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {accessory.make}
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      className="bg-white text-mainBlue p-3 rounded-full mx-2 hover:bg-mainBlue hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(accessory._id);
                      }}
                      aria-label="View details"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 grid">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold font-Poppins line-clamp-1 text-gray-800 group-hover:text-mainBlue transition-colors">
                      {accessory.name}
                    </h3>

                    {/* In Stock Badge */}
                    {accessory.inStock !== undefined && (
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          accessory.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {accessory.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 h-10">
                    {accessory.description || "No description available"}
                  </p>

                  {/* Price and Action */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-baseline">
                      {user ? (
                        <>
                          <span className="text-xl font-bold text-mainBlue">
                            ₦
                            {Number.parseInt(
                              accessory.price,
                              10
                            ).toLocaleString()}
                          </span>
                          {accessory.discountPrice && (
                            <span className="ml-2 text-sm line-through text-gray-400">
                              ₦
                              {Number.parseInt(
                                accessory.discountPrice,
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
        <div className="bg-gray-50 rounded-lg p-10 text-center">
          <FaTag className="text-gray-400 text-5xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No accessories available at the moment
          </p>
          <p className="text-gray-400 mt-2">
            Please check back later for new items
          </p>
        </div>
      )}

      {accessories.length > 12 && (
        <div className="flex justify-center mt-12 mb-6">
          <button
            onClick={() => navigate("/accessories")}
            className="bg-mainBlue text-white font-Poppins px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
          >
            <span>View All Accessories</span>
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

export default CarAccessoriesCard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import useStore from "../../data/store/store";
// import { FaTag, FaEye, FaShoppingCart } from "react-icons/fa";

// const CarAccessoriesCard = () => {
//   const [accessories, setAccessories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const { user } = useStore();

//   useEffect(() => {
//     const fetchAccessories = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/accessory/accessories");
//         setAccessories(response.data.accessories);
//       } catch (error) {
//         console.error(
//           "Error fetching accessories:",
//           error.response?.data || error
//         );
//         toast.error("Failed to load accessories. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAccessories();
//   }, []);

//   const handleViewDetails = (accessoryId) => {
//     navigate(`/accessory-details/${accessoryId}`); // Always allow navigation
//   };

//   // const handleViewDetails = (accessoryId) => {
//   //   if (!user) {
//   //     toast.info("Please log in to view accessory details.");
//   //     navigate("/login");
//   //     return;
//   //   }
//   //   navigate(`/accessory-details/${accessoryId}`);
//   // };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="lg:px-16 md:px-10 px-8 mt-10">
//         <div className="py-10">
//           <div className="h-6 bg-gray-200 w-48 mx-auto rounded animate-pulse"></div>
//           <div className="h-10 bg-gray-200 w-96 mx-auto rounded mt-3 animate-pulse"></div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={index}
//               className="border rounded-lg shadow-md overflow-hidden"
//             >
//               <div className="w-full h-[250px] bg-gray-200 animate-pulse"></div>
//               <div className="p-4">
//                 <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
//                 <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mt-4"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="lg:px-16 md:px-10 px-8 mt-10">
//       <div className="py-10">
//         <p className="text-mainBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center">
//           Find Your Car Accessories
//         </p>
//         <h2 className="text-center font-Poppins lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
//           Experience the Best Car Accessories
//         </h2>
//       </div>

//       {accessories.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {accessories.slice(0, 12).map((accessory) => (
//             <div
//               key={accessory._id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group"
//               onClick={() => handleViewDetails(accessory._id)}
//             >
//               {/* Image Container with Overlay */}
//               <div className="relative overflow-hidden lg:h-[250px] md:h-[250px] h-[300px]">
//                 {accessory.images &&
//                 accessory.images.length > 0 &&
//                 accessory.images[0].secure_url ? (
//                   <img
//                     src={
//                       accessory.images[0].secure_url.startsWith("http")
//                         ? accessory.images[0].secure_url
//                         : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0].secure_url}`
//                     }
//                     alt={`${accessory.name}`}
//                     className="w-full h-full object-cover rounded-t-md"
//                   />
//                 ) : (
//                   <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
//                     <p className="text-gray-500">No Image</p>
//                   </div>
//                 )}

//                 {/* Category Badge */}
//                 {accessory.make && (
//                   <div className="absolute top-3 left-3 bg-mainBlue text-white text-xs font-semibold px-2 py-1 rounded-full">
//                     {accessory.make}
//                   </div>
//                 )}

//                 {/* Quick Action Buttons */}
//                 <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <button
//                     className="bg-white text-mainBlue p-3 rounded-full mx-2 hover:bg-mainBlue hover:text-white transition-colors"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleViewDetails(accessory._id);
//                     }}
//                     aria-label="View details"
//                   >
//                     <FaEye />
//                   </button>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-4 grid">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-lg font-bold font-Poppins line-clamp-1 text-gray-800 group-hover:text-mainBlue transition-colors">
//                     {accessory.name}
//                   </h3>

//                   {/* In Stock Badge */}
//                   {accessory.inStock !== undefined && (
//                     <span
//                       className={`text-xs font-medium px-2 py-1 rounded-full ${
//                         accessory.inStock
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {accessory.inStock ? "In Stock" : "Out of Stock"}
//                     </span>
//                   )}
//                 </div>

//                 {/* Make/Model */}
//                 {/* {(accessory.make || accessory.model) && (
//                   <div className="flex items-center text-gray-500 text-sm mt-1 space-x-2">
//                     {accessory.make && <span>{accessory.make}</span>}
//                     {accessory.make && accessory.model && <span>•</span>}
//                     {accessory.model && <span>{accessory.model}</span>}
//                   </div>
//                 )} */}

//                 {/* Description */}
//                 <p className="text-gray-600 text-sm mt-2 line-clamp-2 h-10">
//                   {accessory.description || "No description available"}
//                 </p>

//                 {/* Price and Action */}
//                 <div className="mt-2 flex items-center justify-between">
//                   <div className="flex items-baseline">
//                     {user ? (
//                       <>
//                         <span className="text-xl font-bold text-mainBlue">
//                           ₦{parseInt(accessory.price, 10).toLocaleString()}
//                         </span>
//                         {accessory.discountPrice && (
//                           <span className="ml-2 text-sm line-through text-gray-400">
//                             ₦
//                             {parseInt(
//                               accessory.discountPrice,
//                               10
//                             ).toLocaleString()}
//                           </span>
//                         )}
//                       </>
//                     ) : (
//                       <span className="text-mainBlue font-medium">
//                         Login to view price
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-gray-50 rounded-lg p-10 text-center">
//           <FaTag className="text-gray-400 text-5xl mx-auto mb-4" />
//           <p className="text-gray-500 text-lg">
//             No accessories available at the moment
//           </p>
//           <p className="text-gray-400 mt-2">
//             Please check back later for new items
//           </p>
//         </div>
//       )}

//       {accessories.length > 12 && (
//         <div className="flex justify-center mt-12 mb-6">
//           <button
//             onClick={() => navigate("/accessories")}
//             className="bg-mainBlue text-white font-Poppins px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
//           >
//             <span>View All Accessories</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarAccessoriesCard;
