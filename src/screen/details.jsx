import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../utils/api";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/navbar/navbar";

const Details = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const phoneNumber = "09032976552";

  // References for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/car/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, [car]); // Re-run this effect when `car` changes

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

  // Car not found
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Navbar />
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Car Not Found</h2>
          <p className="mt-2 text-gray-600">
            The car you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Navbar />
      <div className="mt-16 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {car.make} {car.model}{" "}
          <span className="text-mainBlue">{car.year}</span>
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
                {car.images && car.images.length > 0 ? (
                  car.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="relative w-full"
                        style={{ height: "500px" }}
                      >
                        <img
                          src={
                            image.secure_url.startsWith("http")
                              ? image.secure_url
                              : `${process.env.NEXT_PUBLIC_API_URL}${image.secure_url}`
                          }
                          alt=""
                          className="w-full h-full object-contain"
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
                {/* {car.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="relative w-full"
                      style={{ height: "500px" }}
                    >
                      <img
                        src={
                          image.startsWith("http")
                            ? image
                            : `${process.env.NEXT_PUBLIC_API_URL}${image}`
                        }
                        alt=""
                        className="w-full h-full object-contain"
                      />
                   
                    </div>
                  </SwiperSlide>
                ))} */}
              </Swiper>
            </div>

            {/* Custom Navigation Buttons */}
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
          </div>

          {/* Right Column - Car Details */}
          <div className="lg:w-2/5 w-full mt-8 lg:mt-0">
            <div className="bg-mainBlue rounded-t-lg p-6 text-white">
              <h2 className="text-2xl font-bold font-Poppins mb-2">
                Car Details
              </h2>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold font-Outfit">
                  #{car.price.toLocaleString()}
                </span>
                {car.discountPrice && (
                  <span className="ml-2 text-lg line-through opacity-70">
                    #{car.discountPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-4 border border-gray-200 border-t-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium text-gray-800">{car.type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium text-gray-800">{car.year}</p>
                </div>
                {car.mileage && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-medium text-gray-800">
                      {car.mileage.toLocaleString()} miles
                    </p>
                  </div>
                )}
                {car.transmission && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-medium text-gray-800">
                      {car.transmission}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 break-words whitespace-normal overflow-hidden">
                  {car.description}
                </p>
              </div>

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
                  href={`https://wa.me/2349032976552?text=${encodeURIComponent(
                    `I'm interested in your ${car.year} ${car.make} ${car.model}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors mb-3"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
                {/* <a
                  href={`https://wa.me/${phoneNumber}?text=I'm interested in your ${car.year} ${car.make} ${car.model}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors mb-3"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a> */}

                {/* SMS Button (for mobile) */}
                <a
                  href={`sms:${phoneNumber}?body=I'm interested in your ${car.year} ${car.make} ${car.model}`}
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
                  Available: Mon-Sat, 9AM-6PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Car Features Section (if available) */}
        {car.features && car.features.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {car.features.map((feature, index) => (
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
      </div>
    </div>
  );
};

export default Details;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import api from "../utils/api";
// import { IoArrowBack, IoArrowForward } from "react-icons/io5";
// import Navbar from "../components/navbar/navbar";

// const Details = () => {
//   const { carId } = useParams();
//   const [car, setCar] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   // References for custom navigation buttons
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await api.get(`/car/cars/${carId}`);
//         setCar(response.data);
//       } catch (error) {
//         console.error("Error fetching car details:", error);
//         setError("Failed to load car details. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCarDetails();
//   }, [carId]);

//   useEffect(() => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
//       swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
//       swiperRef.current.swiper.navigation.init();
//       swiperRef.current.swiper.navigation.update();
//     }
//   }, [car]); // Re-run this effect when `car` changes

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <Navbar />
//         <div className="mt-16 max-w-7xl mx-auto">
//           <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
//           <div className="lg:flex gap-10">
//             <div className="lg:w-3/5 w-full">
//               <div className="h-[500px] bg-gray-200 rounded animate-pulse"></div>
//               <div className="flex justify-between mt-4">
//                 <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
//                 <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//             </div>
//             <div className="lg:w-2/5 w-full mt-6 lg:mt-0">
//               <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <Navbar />
//         <div className="mt-16 flex flex-col items-center justify-center">
//           <div className="text-red-500 text-xl font-medium">{error}</div>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Car not found
//   if (!car) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <Navbar />
//         <div className="mt-16 text-center">
//           <h2 className="text-2xl font-bold text-gray-800">Car Not Found</h2>
//           <p className="mt-2 text-gray-600">
//             The car you're looking for doesn't exist or has been removed.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <Navbar />
//       <div className="mt-16 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           {car.make} {car.model}{" "}
//           <span className="text-mainBlue">{car.year}</span>
//         </h1>

//         <div className="lg:flex gap-10">
//           {/* Left Column - Image Gallery */}
//           <div className="lg:w-3/5 w-full">
//             <div className="relative overflow-hidden rounded-lg shadow-lg">
//               <Swiper
//                 ref={swiperRef}
//                 modules={[Navigation]}
//                 navigation={{
//                   prevEl: prevRef.current,
//                   nextEl: nextRef.current,
//                 }}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 className="rounded-lg"
//               >
//                 {car.images.map((image, index) => (
//                   <SwiperSlide key={index}>
//                     <div className="aspect-w-16 aspect-h-9">
//                       <img
//                         src={
//                           image.startsWith("http")
//                             ? image
//                             : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                         }
//                         alt=""
//                         className="w-full h-[500px] object-cover"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>

//             {/* Custom Navigation Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 ref={prevRef}
//                 className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
//                 aria-label="Previous image"
//               >
//                 <IoArrowBack className="text-gray-700 text-xl" />
//               </button>
//               <button
//                 ref={nextRef}
//                 className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
//                 aria-label="Next image"
//               >
//                 <IoArrowForward className="text-gray-700 text-xl" />
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Car Details */}
//           <div className="lg:w-2/5 w-full mt-8 lg:mt-0">
//             <div className="bg-mainBlue rounded-t-lg p-6 text-white">
//               <h2 className="text-2xl font-bold font-Poppins mb-2">
//                 Car Details
//               </h2>
//               <div className="flex items-baseline">
//                 <span className="text-3xl font-bold font-Outfit">
//                   #{car.price.toLocaleString()}
//                 </span>
//                 {car.discountPrice && (
//                   <span className="ml-2 text-lg line-through opacity-70">
//                     ${car.discountPrice.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-4 border border-gray-200 border-t-0">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-gray-50 p-3 rounded">
//                   <p className="text-sm text-gray-500">Type</p>
//                   <p className="font-medium text-gray-800">{car.type}</p>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded">
//                   <p className="text-sm text-gray-500">Year</p>
//                   <p className="font-medium text-gray-800">{car.year}</p>
//                 </div>
//                 {car.mileage && (
//                   <div className="bg-gray-50 p-3 rounded">
//                     <p className="text-sm text-gray-500">Mileage</p>
//                     <p className="font-medium text-gray-800">
//                       {car.mileage.toLocaleString()} miles
//                     </p>
//                   </div>
//                 )}
//                 {car.transmission && (
//                   <div className="bg-gray-50 p-3 rounded">
//                     <p className="text-sm text-gray-500">Transmission</p>
//                     <p className="font-medium text-gray-800">
//                       {car.transmission}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Description
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {car.description}
//                 </p>
//               </div>

//               <div className="pt-4 mt-6 border-t border-gray-200">
//                 <button
//                   onClick={() => navigate("/contact/contact-page")}
//                   className="w-full py-3 bg-mainBlue text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
//                 >
//                   Contact Seller
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Car Features Section (if available) */}
//         {car.features && car.features.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {car.features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center p-3 bg-gray-50 rounded"
//                 >
//                   <div className="w-2 h-2 bg-mainBlue rounded-full mr-2"></div>
//                   <span className="text-gray-700">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Details;

// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import api from "../utils/api";
// import { IoArrowBack, IoArrowForward } from "react-icons/io5";
// import Navbar from "../components/navbar/navbar";

// const Details = () => {
//   const { carId } = useParams();
//   const [car, setCar] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // References for custom navigation buttons
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await api.get(`/car/cars/${carId}`);
//         console.log("API Response:", response.data);
//         setCar(response.data);
//       } catch (error) {
//         console.error("Error fetching car details:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCarDetails();
//   }, [carId]);

//   useEffect(() => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
//       swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
//       swiperRef.current.swiper.navigation.init();
//       swiperRef.current.swiper.navigation.update();
//     }
//   }, [car]); // Re-run this effect when `car` changes

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading car details...</div>;
//   }

//   if (!car) {
//     return <div className="text-center mt-10">Car not found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className=" mt-16">
//         <Navbar />
//         <h1 className="text-2xl font-bold mb-4">
//           {car.make} {car.model}
//         </h1>
//         <div className="lg:flex md:flex grid gap-20 justify-center">
//           {/* Swiper for Images */}
//           <div className="lg:w-[60%] md:w-full w-full">
//             <div className="mt-4">
//               <Swiper
//                 ref={swiperRef}
//                 modules={[Navigation]}
//                 navigation={{
//                   prevEl: prevRef.current,
//                   nextEl: nextRef.current,
//                 }}
//                 spaceBetween={10}
//                 slidesPerView={1}
//                 className="rounded"
//               >
//                 {car.images.map((image, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       src={
//                         image.startsWith("http")
//                           ? image
//                           : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                       }
//                       alt={`${car.make} ${car.model}`}
//                       className="w-full lg:h-[500px] md:h-[500px] h-[300px] object-cover rounded"
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//             {/* Custom Navigation Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 ref={prevRef}
//                 className="custom-prev bg-gray-200 p-2 rounded"
//               >
//                 <IoArrowBack />
//               </button>
//               <button
//                 ref={nextRef}
//                 className="custom-next bg-gray-200 p-2 rounded"
//               >
//                 <IoArrowForward />
//               </button>
//             </div>
//           </div>

//           <div className=" lg:w-[40%] md:w-full w-full bg-mainBlue p-5 font-Outfit rounded-md">
//             <p className="font-semibold text-whiteColor mt-2 text-xl font-Poppins">
//               Price: ${car.price}
//             </p>
//             <div className=" w-full max-w-lg bg-white p-5 space-y-2 lg:mt-10 md:mt-5 mt-5">
//               <p className=" text-xl font-Poppins ">Type: {car.type}</p>
//               <p className="text-base font-Poppins">Year: {car.year}</p>
//               <p className="text-gray-600 text-base font-Poppins">
//                 {car.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;
