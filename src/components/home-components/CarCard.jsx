import { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import useStore from "../../data/store/store";

const CarCard = () => {
  const [cars, setCars] = useState([]);
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useStore();

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

  const handleViewDetails = (carId) => {
    if (!user) {
      // Redirect to login page if the user is not authenticated
      toast.info("Please log in to view car details.");
      navigate("/login");
      return;
    }
    navigate(`/details/${carId}`); // Navigate to the details page with car ID
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading cars...</div>;
  }

  return (
    <div className="lg:px-16 md:px-10 px-8 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cars.length > 0 ? (
          cars.slice(0, 12).map((car) => (
            <div
              key={car._id}
              className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
              onClick={() => handleViewDetails(car._id)} // Pass car ID to handleViewDetails
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
                <h3 className="text-lg font-bold mt-2 truncate font-Poppins">
                  {car.make} {car.model}
                </h3>
                <p className="text-gray-500 text-sm font-Poppins">{car.type}</p>
                <p className="text-gray-500 text-sm font-Poppins ">
                  {car.year}
                </p>
                <p className="text-gray-500 text-sm font-Poppins truncate">
                  {car.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg">
                    #{parseInt(car.price, 10).toLocaleString()}
                  </p>
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

      <div className=" justify-center flex items-center mt-10 ">
        <button
          onClick={() => navigate("/cars")}
          className=" bg-mainBlue text-whiteColor font-Poppins text-base px-4 py-2 rounded-md"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default CarCard;

// import { useEffect, useState } from "react";
// import { IoHeart, IoArrowBack, IoArrowForward } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import useStore from "../../data/store/store";
// import { FaArrowDown } from "react-icons/fa";

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center z-50"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-6 rounded shadow-lg lg:max-w-xl md:max-w-xl max-w-md w-full h-auto max-h-[500px] overflow-y-auto"
//       >
//         <div className=" flex items-center justify-between">
//           <h2 className="text-xl font-semibold mb-4">{title}</h2>
//           <div className=" mb-2">
//             <FaArrowDown size={10} />
//           </div>
//         </div>

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
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   const { user } = useStore();

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get("/car/public-cars");
//         setCars(response.data.cars);
//       } catch (error) {
//         console.error("Error fetching cars:", error.response?.data || error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Load likes from localStorage
//     const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
//     setLikes(storedLikes);

//     fetchCars();
//   }, []);

//   const handleLike = (id) => {
//     setLikes((prev) => {
//       const newLikes = { ...prev, [id]: !prev[id] };

//       // Store the likes in localStorage
//       localStorage.setItem("likes", JSON.stringify(newLikes));

//       return newLikes;
//     });
//   };

//   const handleViewDetails = (car) => {
//     if (!user) {
//       // Redirect to login page if the user is not authenticated
//       toast.info("Please log in to view car details.");
//       navigate("/login");
//       return;
//     }
//     // Show modal for authenticated users
//     setSelectedCar(car);
//     setModalOpen(true);
//   };

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading cars...</div>;
//   }

//   return (
//     <div className="lg:px-16 md:px-10 px-8 mt-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {cars.length > 0 ? (
//           cars.slice(0, 12).map((car) => (
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
//                   <p className="text-lg">
//                     #{parseInt(car.price, 10).toLocaleString()}
//                   </p>
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
//               className="w-full h-96 mb-4"
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

//       <div className=" justify-center flex items-center mt-10 ">
//         <button
//           onClick={() => navigate("/cars")}
//           className=" bg-mainBlue text-whiteColor font-Poppins text-base px-4 py-2 rounded-md"
//         >
//           View More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarCard;
