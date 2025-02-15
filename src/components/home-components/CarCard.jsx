import { useEffect, useState } from "react";
import { IoHeart, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import api from "../../utils/api";
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded shadow-lg max-w-md w-full h-auto max-h-[500px] overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-4">
          <button
            className="text-mainBlue px-4 py-2 border border-mainBlue"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CarCard = () => {
  const [cars, setCars] = useState([]);
  const [likes, setLikes] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/car/public-cars");
        setCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error.response?.data || error);
      } finally {
        setIsLoading(false);
      }
    };

    // Load likes from localStorage
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(storedLikes);

    fetchCars();
  }, []);

  const handleLike = (id) => {
    setLikes((prev) => {
      const newLikes = { ...prev, [id]: !prev[id] };

      // Store the likes in localStorage
      localStorage.setItem("likes", JSON.stringify(newLikes));

      return newLikes;
    });
  };

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading cars...</div>;
  }

  return (
    <div className="lg:px-16 md:px-10 px-8 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
              onClick={() => handleViewDetails(car)}
            >
              {car.images && car.images.length > 0 ? (
                <img
                  src={
                    car.images[0].startsWith("http")
                      ? car.images[0]
                      : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0]}`
                  }
                  alt={`${car.make} ${car.model}`}
                  className="w-[251px] h-[155px] object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=155&width=251";
                    e.target.onerror = null;
                  }}
                />
              ) : (
                <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}

              <div className="px-5 w-full">
                <h3 className="text-lg font-bold mt-2">
                  {car.make} {car.model}
                </h3>
                <p className="text-gray-500 text-sm">{car.type}</p>
                <p className="text-gray-500 text-sm">{car.year}</p>
                <p className="text-gray-500 text-sm truncate">
                  {car.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg">${car.price}</p>
                  <button
                    className={`text-2xl ${
                      likes[car._id] ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(car._id);
                    }}
                  >
                    <IoHeart />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No cars available
          </p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={
          selectedCar
            ? `${selectedCar.make} ${selectedCar.model}`
            : "Car Details"
        }
      >
        {selectedCar && (
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              className="w-full h-64 mb-4"
            >
              {selectedCar.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={
                      image.startsWith("http")
                        ? image
                        : `${process.env.NEXT_PUBLIC_API_URL}${image}`
                    }
                    alt=""
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=256&width=256";
                      e.target.onerror = null;
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-between mt-4">
              <button className="custom-prev bg-gray-200 p-2 rounded">
                <IoArrowBack />
              </button>
              <button className="custom-next bg-gray-200 p-2 rounded">
                <IoArrowForward />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold">
                {selectedCar.make} {selectedCar.model}
              </h3>
              <p className="text-gray-600">{selectedCar.description}</p>
              <p className="font-semibold mt-2">Price: ${selectedCar.price}</p>
              <p>Type: {selectedCar.type}</p>
              <p>Year: {selectedCar.year}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CarCard;

//////////////////////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import { IoHeart, IoArrowBack, IoArrowForward } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import useStore from "../../data/store/store";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center z-50"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-6 rounded shadow-lg max-w-md w-full h-auto max-h-[500px] overflow-y-auto"
//       >
//         <h2 className="text-xl font-semibold mb-4">{title}</h2>
//         <div className="mb-4">{children}</div>
//         <div className="flex justify-end gap-4">
//           <button
//             className="text-mainBlue px-4 py-2 border border-mainBlue"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CarCard = () => {
//   const [cars, setCars] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const { user } = useStore();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         // Fetch cars without requiring user token
//         const response = await api.get("/car/cars");
//         setCars(response.data.cars);
//       } catch (error) {
//         console.error("Error fetching cars:", error.response?.data || error);
//         // Set a default fallback if the fetch fails
//         setCars([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   // useEffect(() => {
//   //   const fetchCars = async () => {
//   //     try {
//   //       setIsLoading(true);
//   //       setError(null);
//   //       const response = await api.get("/car/cars", {
//   //         headers: {
//   //           Authorization: `Bearer ${user?.token}`, // Ensure this token is set correctly
//   //         },
//   //       });
//   //       setCars(response.data.cars);
//   //     } catch (error) {
//   //       console.error("Error fetching cars:", error.response?.data || error);
//   //       setError("Failed to load cars. Please try again later.");
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   fetchCars();
//   // }, [user]);

//   const handleLike = (id) => {
//     setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleViewDetails = (car) => {
//     if (user) {
//       setSelectedCar(car);
//       setModalOpen(true);
//     } else {
//       toast.error("Please login to view car details");
//       navigate("/login");
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading cars...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="lg:px-16 md:px-10 px-8 mt-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {cars.length > 0 ? (
//           cars.map((car) => (
//             <div
//               key={car._id}
//               className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
//               onClick={() => handleViewDetails(car)}
//             >
//               {car.images && car.images.length > 0 ? (
//                 <img
//                   src={
//                     car.images[0].startsWith("http")
//                       ? car.images[0]
//                       : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0]}`
//                   }
//                   alt={`${car.make} ${car.model}`}
//                   className="w-[251px] h-[155px] object-cover rounded"
//                   onError={(e) => {
//                     e.target.src = "/placeholder.svg?height=155&width=251";
//                     e.target.onerror = null;
//                   }}
//                 />
//               ) : (
//                 <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
//                   <p className="text-gray-500">No Image</p>
//                 </div>
//               )}

//               <div className="px-5 w-full">
//                 <h3 className="text-lg font-bold mt-2">
//                   {car.make} {car.model}
//                 </h3>
//                 <p className="text-gray-500 text-sm">{car.type}</p>
//                 <p className="text-gray-500 text-sm">{car.year}</p>
//                 <p className="text-gray-500 text-sm truncate">
//                   {car.description}
//                 </p>
//                 <div className="flex items-center justify-between mt-2">
//                   <p className="text-lg">${car.price}</p>
//                   <button
//                     className={`text-2xl ${
//                       likes[car._id] ? "text-red-500" : "text-gray-500"
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleLike(car._id);
//                     }}
//                   >
//                     <IoHeart />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-full">
//             No cars available
//           </p>
//         )}
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         title={
//           selectedCar
//             ? `${selectedCar.make} ${selectedCar.model}`
//             : "Car Details"
//         }
//       >
//         {selectedCar && (
//           <div>
//             <Swiper
//               modules={[Navigation, Pagination]}
//               pagination={{ clickable: true }}
//               navigation={{
//                 prevEl: ".custom-prev",
//                 nextEl: ".custom-next",
//               }}
//               className="w-full h-64 mb-4"
//             >
//               {selectedCar.images.map((image, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     src={
//                       image.startsWith("http")
//                         ? image
//                         : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                     }
//                     alt=""
//                     className="w-full h-full object-cover rounded"
//                     onError={(e) => {
//                       e.target.src = "/placeholder.svg?height=256&width=256";
//                       e.target.onerror = null;
//                     }}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <div className="flex justify-between mt-4">
//               <button className="custom-prev bg-gray-200 p-2 rounded">
//                 <IoArrowBack />
//               </button>
//               <button className="custom-next bg-gray-200 p-2 rounded">
//                 <IoArrowForward />
//               </button>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-lg font-bold">
//                 {selectedCar.make} {selectedCar.model}
//               </h3>
//               <p className="text-gray-600">{selectedCar.description}</p>
//               <p className="font-semibold mt-2">Price: ${selectedCar.price}</p>
//               <p>Type: {selectedCar.type}</p>
//               <p>Year: {selectedCar.year}</p>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CarCard;

///////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useEffect, useState } from "react";
// import { IoHeart, IoArrowBack, IoArrowForward } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import useStore from "../../data/store/store";
// import api from "../../utils/api";

// const useLocalStorageState = (key, initialValue) => {
//   const [state, setState] = useState(() => {
//     const saved = localStorage.getItem(key);
//     return saved ? JSON.parse(saved) : initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// };

// const LoginPromptCard = ({ onLogin, onClose }) => (
//   <div
//     onClick={onClose}
//     className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//   >
//     <div className="bg-white p-6 rounded shadow-md text-center">
//       <h3 className="text-lg font-semibold">Login Required</h3>
//       <p className="mt-4">
//         Please log in to proceed.
//         <button onClick={onLogin} className="text-mainBlue underline ml-1">
//           Login
//         </button>
//       </p>
//     </div>
//   </div>
// );

// const Modal = ({ isOpen, onClose, title, children }) => {
//   const navigate = useNavigate();
//   if (!isOpen) return null;

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center z-50"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-6 rounded shadow-lg max-w-md w-full h-auto max-h-[500px] overflow-y-auto"
//       >
//         <h2 className="text-xl font-semibold mb-4">{title}</h2>
//         <div className="mb-4">{children}</div>
//         <div className="flex justify-end gap-4">
//           <button
//             className="text-mainBlue px-4 py-2 border border-mainBlue"
//             onClick={onClose}
//           >
//             Close
//           </button>
//           <button
//             className="text-white px-4 py-2 bg-mainBlue rounded"
//             onClick={() => navigate("/check")}
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CarCard = () => {
//   const [cars, setCars] = useState([]);
//   const [likes, setLikes] = useLocalStorageState("likes", {});
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const { user } = useStore();
//   const navigate = useNavigate();
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await api.get("/car/cars");
//         setCars(response.data.cars);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };

//     fetchCars();
//   }, []);

//   const handleLike = (id) => {
//     setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleViewDetails = (car) => {
//     if (user) {
//       setSelectedCar(car);
//       setModalOpen(true);
//     } else {
//       setShowLoginPrompt(true);
//     }
//   };

//   return (
//     <div className="lg:px-16 md:px-10 px-8 mt-10">
//       {showLoginPrompt && (
//         <LoginPromptCard
//           onClose={() => setShowLoginPrompt(false)}
//           onLogin={() => navigate("/login")}
//         />
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {cars && cars.length > 0 ? (
//           cars.map((car) => (
//             <div
//               key={car._id}
//               className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
//               onClick={() => handleViewDetails(car)}
//             >
//               {car.images && car.images.length > 0 ? (
//                 <img
//                   src={
//                     car.images[0].startsWith("http")
//                       ? car.images[0]
//                       : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0]}`
//                   }
//                   alt={`${car.make} ${car.model}`}
//                   className="w-[251px] h-[155px] object-cover rounded"
//                   onError={(e) => {
//                     e.target.src = "/placeholder.svg?height=155&width=251";
//                     e.target.onerror = null;
//                   }}
//                 />
//               ) : (
//                 <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
//                   <p className="text-gray-500">No Image</p>
//                 </div>
//               )}

//               <div className="px-5 w-full">
//                 <h3 className="text-lg font-bold mt-2">
//                   {car.make} {car.model}
//                 </h3>
//                 <p className="text-gray-500 text-sm">{car.type}</p>
//                 <p className="text-gray-500 text-sm">{car.year}</p>
//                 <p className="text-gray-500 text-sm truncate">
//                   {car.description}
//                 </p>
//                 <div className="flex items-center justify-between mt-2">
//                   <p className="text-lg">${car.price}</p>
//                   <button
//                     className={`text-2xl ${
//                       likes[car._id] ? "text-red-500" : "text-gray-500"
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleLike(car._id);
//                     }}
//                   >
//                     <IoHeart />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-full">
//             No cars available
//           </p>
//         )}
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         title={
//           selectedCar
//             ? `${selectedCar.make} ${selectedCar.model}`
//             : "Car Details"
//         }
//       >
//         {selectedCar && (
//           <div>
//             <Swiper
//               modules={[Navigation, Pagination]}
//               pagination={{ clickable: true }}
//               navigation={{
//                 prevEl: ".custom-prev",
//                 nextEl: ".custom-next",
//               }}
//               className="w-full h-64 mb-4"
//             >
//               {selectedCar.images.map((image, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     src={
//                       image.startsWith("http")
//                         ? image
//                         : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                     }
//                     alt=""
//                     className="w-full h-full object-cover rounded"
//                     onError={(e) => {
//                       e.target.src = "/placeholder.svg?height=256&width=256";
//                       e.target.onerror = null;
//                     }}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <div className="flex justify-between mt-4">
//               <button className="custom-prev bg-gray-200 p-2 rounded">
//                 <IoArrowBack />
//               </button>
//               <button className="custom-next bg-gray-200 p-2 rounded">
//                 <IoArrowForward />
//               </button>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-lg font-bold">
//                 {selectedCar.make} {selectedCar.model}
//               </h3>
//               <p className="text-gray-600">{selectedCar.description}</p>
//               <p className="font-semibold mt-2">Price: ${selectedCar.price}</p>
//               <p>Type: {selectedCar.type}</p>
//               <p>Year: {selectedCar.year}</p>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CarCard;

// import React, { useState, useEffect, useRef } from "react";
// import { IoHeart, IoArrowBack, IoArrowForward } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";
// import useStore from "../../data/store/store";
// import imgone from "../../assets/imgone.png";
// import "../../style/style.css";

// const useLocalStorageState = (key, initialValue) => {
//   const [state, setState] = useState(() => {
//     const saved = localStorage.getItem(key);
//     return saved ? JSON.parse(saved) : initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// };

// const Modal = ({ isOpen, onClose, title, children }) => {
//   const navigate = useNavigate();
//   if (!isOpen) return null;

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center z-50"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-6 rounded shadow-lg max-w-md w-full h-auto max-h-[500px] overflow-y-auto"
//       >
//         <h2 className="text-xl font-semibold mb-4">{title}</h2>
//         <div className="mb-4">{children}</div>
//         <div className="flex justify-end gap-4">
//           <button
//             className="text-mainBlue px-4 py-2 border border-mainBlue"
//             onClick={onClose}
//           >
//             Close
//           </button>
//           <button
//             className="text-whiteColor font-Poppins px-4 py-2 bg-mainBlue"
//             onClick={() => navigate("/check")}
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LoginPromptCard = ({ onLogin, onClose }) => {
//   return (
//     <div
//       onClick={onClose}
//       className="justify-center z-40 cursor-pointer w-full h-full flex items-center fixed left-0 bg-opacity-45 top-0 bg-black"
//     >
//       <div className="border relative p-4 shadow-md bg-white rounded max-w-sm mx-auto">
//         <h3 className="text-lg font-semibold mb-2">Login Required</h3>
//         <p className="mb-4">
//           Please log in to proceed.
//           <button onClick={onLogin} className="text-mainBlue underline ml-1">
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// const CarCard = () => {
//   const [likes, setLikes] = useLocalStorageState("likes", {});
//   const [ratings, setRatings] = useLocalStorageState("ratings", {});
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const { user } = useStore();
//   const navigate = useNavigate();
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const cars = [
//     {
//       id: 1,
//       images: [imgone, imgone, imgone, imgone, imgone, imgone, imgone, imgone],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//     {
//       id: 2,
//       images: [imgone, imgone, imgone, imgone, imgone, imgone, imgone, imgone],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//     {
//       id: 3,
//       images: [imgone, imgone, imgone, imgone, imgone, imgone, imgone, imgone],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//     {
//       id: 4,
//       images: [imgone, imgone, imgone, imgone, imgone, imgone, imgone, imgone],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//     {
//       id: 5,
//       images: [
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//       ],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//     {
//       id: 6,
//       images: [imgone, imgone, imgone, imgone, imgone, imgone, imgone],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//     {
//       id: 7,
//       images: [
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//         imgone,
//       ],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//     {
//       id: 8,
//       images: [imgone, imgone, imgone, imgone, imgone, imgone, imgone],
//       make: "Nissan",
//       model: "GT-R",
//       year: 2023,
//       type: "Sport",
//       price: "#99.00",
//       description: "Lorem ipsum dolor sit amet consectetur.",
//     },
//   ];

//   const handleLike = (id) => {
//     setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleRating = (id) => {
//     setRatings((prev) => ({
//       ...prev,
//       [id]: prev[id] < 5 ? (prev[id] || 0) + 1 : 1,
//     }));
//   };

//   const handleBuyNow = (car) => {
//     if (user) {
//       navigate("/check");
//     } else {
//       setShowLoginPrompt(true);
//     }
//   };

//   const handleViewDetails = (car) => {
//     if (user) {
//       setSelectedCar(car);
//       setModalOpen(true);
//     } else {
//       setShowLoginPrompt(true);
//     }
//   };

//   useEffect(() => {
//     const swiper = document.querySelector(".swiper")?.swiper;
//     if (swiper) {
//       swiper.params.navigation.prevEl = prevRef.current;
//       swiper.params.navigation.nextEl = nextRef.current;
//       swiper.navigation.init();
//       swiper.navigation.update();
//     }
//   }, []);

//   return (
//     <div className="lg:px-16 md:px-10 px-8 mt-10">
//       {showLoginPrompt && (
//         <LoginPromptCard
//           onClose={() => setShowLoginPrompt(false)}
//           onLogin={() => navigate("/login")}
//         />
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {cars.map((car) => (
//           <div
//             key={car.id}
//             className="border z-10 shadow-md flex py-3 flex-col items-center hover:scale-105 hover:ease-in duration-300 cursor-pointer"
//             onClick={() => handleViewDetails(car)}
//           >
//             <img
//               src={car.images[0] || "/placeholder.svg"}
//               alt={`${car.make} ${car.model}`}
//               className="w-[251px] h-[155px] object-cover"
//             />
//             <div className="px-5 w-full">
//               <h3 className="text-lg font-Poppins font-bold mt-2">
//                 {car.make} {car.model}
//               </h3>
//               <p className="text-gray-500 font-Poppins text-sm">{car.type}</p>
//               <p className="text-gray-500 font-Poppins text-sm">{car.year}</p>
//               <p className="text-gray-500 font-Poppins text-sm">
//                 {car.description}
//               </p>
//               <div className="flex items-center justify-between">
//                 <p className="font-normal font-Poppins text-lg mt-2">
//                   {car.price}
//                 </p>
//                 <div className="flex items-center gap-4 mt-2">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleLike(car.id);
//                     }}
//                   >
//                     <IoHeart
//                       className={`text-2xl ${
//                         likes[car.id] ? "text-red-500" : "text-gray-400"
//                       }`}
//                     />
//                   </button>
//                   <div className="flex items-center gap-1">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleRating(car.id);
//                       }}
//                     >
//                       <FaStar
//                         className={`text-2xl ${
//                           ratings[car.id] ? "text-yellow-500" : "text-gray-400"
//                         }`}
//                       />
//                     </button>
//                     <span className="text-sm font-medium text-gray-700">
//                       {ratings[car.id] || ""}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 className="bg-mainBlue text-white px-4 py-2 font-Poppins mt-4 w-full hover:bg-mainBlue-dark transition duration-300"
//                 onClick={() => handleBuyNow(car)}
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         title={
//           selectedCar
//             ? `${selectedCar.make} ${selectedCar.model}`
//             : "Car Details"
//         }
//       >
//         {selectedCar && (
//           <div>
//             <Swiper
//               modules={[Navigation, Pagination]}
//               pagination={{ clickable: true }}
//               navigation={{
//                 prevEl: ".custom-prev",
//                 nextEl: ".custom-next",
//               }}
//               className="w-full h-64 mb-4"
//             >
//               {selectedCar.images.map((image, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     src={image || "/placeholder.svg"}
//                     alt=""
//                     className="w-full h-full object-cover rounded"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Custom Navigation Buttons */}
//             <div className="flex justify-between mt-4">
//               <button className="custom-prev bg-gray-200 p-2 rounded">
//                 <IoArrowBack />
//               </button>
//               <button className="custom-next bg-gray-200 p-2 rounded">
//                 <IoArrowForward />
//               </button>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-lg font-bold">
//                 {selectedCar.make} {selectedCar.model}
//               </h3>
//               <p className="text-gray-600">{selectedCar.description}</p>
//               <p className="font-semibold mt-2">Price: {selectedCar.price}</p>
//               <p>Type: {selectedCar.type}</p>
//               <p>Year: {selectedCar.year}</p>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CarCard;
