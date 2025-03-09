import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../utils/api";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaTag,
  FaInfoCircle,
} from "react-icons/fa";
import Navbar from "../components/navbar/navbar";

const AccessoryDetails = () => {
  const { accessoryId } = useParams();
  const [accessory, setAccessory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const phoneNumber = "09032976552"; // The phone number to contact

  // References for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchAccessoryDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/accessory/accessories/${accessoryId}`);
        setAccessory(response.data.accessory); // Correctly access the nested data
      } catch (error) {
        console.error("Error fetching accessory details:", error);
        setError("Failed to load accessory details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessoryDetails();
  }, [accessoryId]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, [accessory]); // Re-run this effect when `accessory` changes

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Navbar />
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="lg:flex gap-10">
            <div className="lg:w-3/5 w-full">
              <div className="h-[500px] bg-gray-200 rounded animate-pulse"></div>
              <div className="flex justify-between mt-4">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="lg:w-2/5 w-full mt-6 lg:mt-0">
              <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Navbar />
        <div className="mt-16 flex flex-col items-center justify-center">
          <div className="text-red-500 text-xl font-medium">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Accessory not found
  if (!accessory) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Navbar />
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Accessory Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The accessory you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Format price with commas
  const formattedPrice = accessory.price
    ? accessory.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "N/A";

  return (
    <div className="container mx-auto px-4 py-10">
      <Navbar />
      <div className="mt-16 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {accessory.name}
        </h1>

        <div className="lg:flex gap-10">
          {/* Left Column - Image Gallery */}
          <div className="lg:w-3/5 w-full">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                spaceBetween={0}
                slidesPerView={1}
                className="rounded-lg"
              >
                {accessory.images && accessory.images.length > 0 ? (
                  accessory.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={
                            image.startsWith("http")
                              ? image
                              : `${process.env.NEXT_PUBLIC_API_URL}${image}`
                          }
                          alt=""
                          className="w-full h-[500px] object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No Images Available</p>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>

            {/* Custom Navigation Buttons */}
            {accessory.images && accessory.images.length > 1 && (
              <div className="flex justify-between mt-4">
                <button
                  ref={prevRef}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
                  aria-label="Previous image"
                >
                  <IoArrowBack className="text-gray-700 text-xl" />
                </button>
                <button
                  ref={nextRef}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
                  aria-label="Next image"
                >
                  <IoArrowForward className="text-gray-700 text-xl" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Accessory Details */}
          <div className="lg:w-2/5 w-full mt-8 lg:mt-0">
            <div className="bg-mainBlue rounded-t-lg p-6 text-white">
              <h2 className="text-2xl font-bold font-Poppins mb-2">
                Accessory Details
              </h2>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold font-Outfit">
                  ₦{formattedPrice}
                </span>
                {accessory.discountPrice && (
                  <span className="ml-2 text-lg line-through opacity-70">
                    ₦
                    {accessory.discountPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-4 border border-gray-200 border-t-0">
              {/* Accessory Specifications */}
              <div className="grid grid-cols-2 gap-4">
                {accessory.category && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-800">
                      {accessory.category}
                    </p>
                  </div>
                )}
                {accessory.make && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Make</p>
                    <p className="font-medium text-gray-800">
                      {accessory.make}
                    </p>
                  </div>
                )}
                {accessory.model && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="font-medium text-gray-800">
                      {accessory.model}
                    </p>
                  </div>
                )}
                {accessory.condition && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium text-gray-800">
                      {accessory.condition}
                    </p>
                  </div>
                )}
                {accessory.brand && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Brand</p>
                    <p className="font-medium text-gray-800">
                      {accessory.brand}
                    </p>
                  </div>
                )}
                {accessory.year && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium text-gray-800">
                      {accessory.year}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {accessory.description || "No description available."}
                </p>
              </div>

              {/* Availability Badge */}
              {accessory.inStock !== undefined && (
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    accessory.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <FaTag className="mr-1" />
                  {accessory.inStock ? "In Stock" : "Out of Stock"}
                </div>
              )}

              {/* Contact Options */}
              <div className="pt-4 mt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Contact Seller
                </h3>

                {/* Phone Call Button */}
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-mainBlue text-white rounded-md font-medium hover:bg-blue-700 transition-colors mb-3"
                >
                  <FaPhone />
                  <span>Call {phoneNumber}</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${phoneNumber}?text=I'm interested in the ${accessory.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors mb-3"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>

                {/* SMS Button (for mobile) */}
                <a
                  href={`sms:${phoneNumber}?body=I'm interested in the ${accessory.name}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gray-700 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  <FaEnvelope />
                  <span>Send SMS</span>
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-mainBlue">S</span>
                </div>
                <div>
                  <h3 className="font-semibold">Seller Support</h3>
                  <p className="text-sm text-gray-500">Quick Response</p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-mainBlue hover:underline"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Available: Mon-Fri, 9AM-6PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        {accessory.features && accessory.features.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {accessory.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded"
                >
                  <div className="w-2 h-2 bg-mainBlue rounded-full mr-2"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compatibility Section (if applicable) */}
        {accessory.compatibleWith && accessory.compatibleWith.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Compatible With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {accessory.compatibleWith.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded"
                >
                  <div className="w-2 h-2 bg-mainBlue rounded-full mr-2"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Installation Guide (if applicable) */}
        {accessory.installationGuide && (
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaInfoCircle className="text-mainBlue text-xl" />
              <h2 className="text-2xl font-bold text-gray-800">
                Installation Guide
              </h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600">{accessory.installationGuide}</p>
            </div>
          </div>
        )}

        {/* Related Accessories (if applicable) */}
        {accessory.relatedAccessories &&
          accessory.relatedAccessories.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Related Accessories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessory.relatedAccessories.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                  >
                    {item.image && (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.name}
                      </h3>
                      <p className="text-mainBlue font-bold">
                        ₦
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                      <a
                        href={`/accessories/${item.id}`}
                        className="mt-3 inline-block px-4 py-2 bg-mainBlue text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AccessoryDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import api from "../utils/api";
// import Navbar from "../components/navbar/navbar";

// const AccessoryDetails = () => {
//   const { accessoryId } = useParams();
//   const [accessory, setAccessory] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchAccessoryDetails = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get(`/accessory/accessories/${accessoryId}`);
//         console.log("API Response:", response.data); // Debugging log
//         setAccessory(response.data.accessory); // Correctly access the nested data
//       } catch (error) {
//         console.error("Error fetching accessory details:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAccessoryDetails();
//   }, [accessoryId]);

//   if (isLoading) {
//     return (
//       <div className="text-center mt-10">Loading accessory details...</div>
//     );
//   }

//   if (!accessory) {
//     return <div className="text-center mt-10">Accessory not found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <Navbar />
//       <div className=" mt-20 lg:px-16 md:px-10 px-8">
//         <h1 className="text-2xl font-bold mb-4">{accessory.name}</h1>
//         <div className=" lg:flex md:flex lg:gap-20 justify-center">
//           {/* Swiper for Images */}
//           <div className="lg:w-[60%] md:w-full w-full">
//             <Swiper
//               modules={[Navigation]}
//               navigation
//               spaceBetween={10}
//               slidesPerView={1}
//               className="rounded"
//             >
//               {accessory.images && accessory.images.length > 0 ? (
//                 accessory.images.map((image, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       src={
//                         image.startsWith("http")
//                           ? image
//                           : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                       }
//                       alt={`${accessory.name}`}
//                       className="w-full h-[500px] object-cover rounded"
//                     />
//                   </SwiperSlide>
//                 ))
//               ) : (
//                 <SwiperSlide>
//                   <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded">
//                     <p className="text-gray-500">No Images Available</p>
//                   </div>
//                 </SwiperSlide>
//               )}
//             </Swiper>
//           </div>

//           <div className="lg:w-[40%] md:w-full w-full">
//             <p className="font-semibold mt-2 text-xl font-Poppins">
//               Price: #{accessory.price || "N/A"}
//             </p>
//             {/* <p className="text-xl font-Poppins">
//               Category: {accessory.category || "N/A"}
//             </p>
//             <p className="text-base font-Poppins">
//               Make: {accessory.make || "N/A"}
//             </p> */}
//             <p className="text-gray-600 text-base font-Poppins">
//               {accessory.description || "No description available."}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccessoryDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import api from "../utils/api";
// import Navbar from "../components/navbar/navbar";

// const AccessoryDetails = () => {
//   const { accessoryId } = useParams();
//   const [accessory, setAccessory] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchAccessoryDetails = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get(`/accessory/accessories/${accessoryId}`);
//         console.log("API Response:", response.data); // Debugging log
//         setAccessory(response.data.data); // Access the nested data
//       } catch (error) {
//         console.error("Error fetching accessory details:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAccessoryDetails();
//   }, [accessoryId]);

//   if (isLoading) {
//     return (
//       <div className="text-center mt-10">Loading accessory details...</div>
//     );
//   }

//   if (!accessory) {
//     return <div className="text-center mt-10">Accessory not found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <Navbar />
//       <div className=" mt-20">
//         <h1 className="text-2xl font-bold mb-4">{accessory.name}</h1>
//         <div className="flex gap-20 justify-center">
//           {/* Swiper for Images */}
//           <div className="lg:w-[60%] md:w-full w-full">
//             <Swiper
//               modules={[Navigation]}
//               navigation
//               spaceBetween={10}
//               slidesPerView={1}
//               className="rounded"
//             >
//               {accessory.images && accessory.images.length > 0 ? (
//                 accessory.images.map((image, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       src={
//                         image.startsWith("http")
//                           ? image
//                           : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                       }
//                       alt={`${accessory.name}`}
//                       className="w-full h-[500px] object-cover rounded"
//                     />
//                   </SwiperSlide>
//                 ))
//               ) : (
//                 <SwiperSlide>
//                   <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded">
//                     <p className="text-gray-500">No Images Available</p>
//                   </div>
//                 </SwiperSlide>
//               )}
//             </Swiper>
//           </div>

//           <div className="lg:w-[40%] md:w-full w-full">
//             <p className="font-semibold mt-2 text-xl font-Poppins">
//               Price: #{accessory.price || "N/A"}
//             </p>
//             <p className="text-xl font-Poppins">
//               Category: {accessory.category || "N/A"}
//             </p>
//             <p className="text-base font-Poppins">
//               Make: {accessory.make || "N/A"}
//             </p>
//             <p className="text-gray-600 text-base font-Poppins">
//               {accessory.description || "No description available."}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccessoryDetails;
