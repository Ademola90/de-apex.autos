import React, { useState, useEffect, useRef } from "react";
import { IoHeart, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import useStore from "../../data/store/store";
import imgone from "../../assets/imgone.png";
import "../../style/style.css";

const useLocalStorageState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const Modal = ({ isOpen, onClose, title, children }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded shadow-lg max-w-md w-full h-auto max-h-[400px] overflow-y-auto"
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
          <button
            className="text-whiteColor font-Poppins px-4 py-2 bg-mainBlue"
            onClick={() => navigate("/check")}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginPromptCard = ({ onLogin, onClose }) => {
  return (
    <div
      onClick={onClose}
      className=" justify-center cursor-pointer w-full h-full flex items-center fixed left-0 bg-opacity-45 top-0 bg-black"
    >
      <div className="border z-40 relative p-4 shadow-md bg-white rounded max-w-sm mx-auto">
        <h3 className="text-lg font-semibold mb-2">Login Required</h3>
        <p className="mb-4">
          Please log in to proceed.
          <button onClick={onLogin} className="text-mainBlue underline ml-1">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

const CarAccessoriesCard = () => {
  const [likes, setLikes] = useLocalStorageState("likes", {});
  const [ratings, setRatings] = useLocalStorageState("ratings", {});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const { user } = useStore();
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const accessories = [
    {
      id: 1,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
    {
      id: 2,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
    {
      id: 3,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
    {
      id: 4,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
    {
      id: 5,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
    {
      id: 6,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
    {
      id: 7,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
    {
      id: 8,
      image: imgone,
      imagetwo: imgone,
      imagethree: imgone,
      imagefour: imgone,
      imagefive: imgone,
      imagesix: imgone,
      imageseven: imgone,
      imageeight: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: "Lorem ipsum dolor sit amet consectetur.",
      type: "New",
    },
  ];

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRating = (id) => {
    setRatings((prev) => ({
      ...prev,
      [id]: prev[id] < 5 ? (prev[id] || 0) + 1 : 1,
    }));
  };

  const handleBuyNow = (car) => {
    if (user) {
      navigate("/check");
    } else {
      setShowLoginPrompt(true); // Show the login prompt card
    }
  };

  const handleViewDetails = (car) => {
    if (user) {
      setSelectedCar(car);
      setModalOpen(true);
    } else {
      setShowLoginPrompt(true); // Show the login prompt card
    }
  };

  useEffect(() => {
    // Ensure Swiper can find the custom navigation buttons
    const swiper = document.querySelector(".swiper");
    if (swiper) {
      swiper.swiper.update();
    }
  }, []);

  return (
    <div className="lg:px-16 md:px-10 px-8 mt-10">
      {showLoginPrompt && (
        <LoginPromptCard
          onClose={() => setShowLoginPrompt(false)}
          onLogin={() => navigate("/login")}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {accessories.map((car) => (
          <div
            key={car.id}
            onClick={() => handleViewDetails(car)}
            className="border shadow-md flex py-3 flex-col items-center hover:scale-105 hover:ease-in duration-300 cursor-pointer"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-[251px] h-[155px] object-cover"
            />
            <div className="px-5">
              <h3 className="text-lg font-Poppins font-bold mt-2">
                {car.name}
              </h3>
              <p className="text-gray-500 font-Poppins text-sm">{car.type}</p>
              <p className="text-gray-500 font-Poppins text-sm">{car.text}</p>
              <div className="flex items-center justify-between">
                <p className="font-normal font-Poppins text-lg mt-2">
                  {car.price}
                </p>
              </div>
              <button
                className="bg-mainBlue text-white px-4 py-2 font-Poppins mt-4 hover:scale-105 hover:transition duration-300"
                onClick={() => handleBuyNow(car)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedCar ? "Accessory" : "Login Required"}
      >
        {user ? (
          selectedCar ? (
            <div>
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                navigation={{
                  prevEl: ".custom-prev",
                  nextEl: ".custom-next",
                }}
                className="w-full h-64"
              >
                {Object.keys(selectedCar)
                  .filter((key) => key.startsWith("image"))
                  .map((key, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={selectedCar[key]}
                        alt=""
                        className="w-full h-full object-cover rounded"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="flex justify-between mt-4">
                <button className="custom-prev bg-gray-200 p-2 rounded">
                  Prev
                </button>
                <button className="custom-next bg-gray-200 p-2 rounded">
                  Next
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold">{selectedCar.name}</h3>
                <p>{selectedCar.text}</p>
                <p>Price: {selectedCar.price}</p>
                <p>Type: {selectedCar.type}</p>
              </div>
            </div>
          ) : (
            <p>Proceed to buy car.</p>
          )
        ) : (
          <p>
            Please log in to proceed.{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-mainBlue underline"
            >
              Login
            </button>
          </p>
        )}
      </Modal>
    </div>
  );
};

export default CarAccessoriesCard;

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
//         className="bg-white p-6 rounded shadow-lg max-w-md w-full h-auto max-h-[400px] overflow-y-auto"
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
//             onClick={() => navigate("/login")}
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CarAccessoriesCard = () => {
//   const [likes, setLikes] = useLocalStorageState("likes", {});
//   const [ratings, setRatings] = useLocalStorageState("ratings", {});
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const { user } = useStore();
//   const navigate = useNavigate();
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const cars = [
//     {
//       id: 1,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
//     },
//     {
//       id: 2,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
//     },
//     {
//       id: 3,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
//     },
//     {
//       id: 4,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
//     },
//     {
//       id: 5,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
//     },
//     {
//       id: 6,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
//     },
//     {
//       id: 7,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
//     },
//     {
//       id: 8,
//       image: imgone,
//       imagetwo: imgone,
//       imagethree: imgone,
//       imagefour: imgone,
//       imagefive: imgone,
//       imagesix: imgone,
//       imageseven: imgone,
//       imageeight: imgone,
//       name: "Nissan GT-R",
//       year: 2023,
//       price: "#99.00",
//       text: "Lorem ipsum dolor sit amet consectetur.",
//       type: "New",
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
//       setModalOpen(true);
//       setSelectedCar(null); // Ensure the modal knows it's for buying a car.
//     }
//   };

//   const handleViewDetails = (car) => {
//     if (user) {
//       setSelectedCar(car); // Indicate "View Details" action in the modal
//       setModalOpen(true);
//     } else {
//       setModalOpen(true);
//       setSelectedCar(car); // Show "Proceed to View Details" modal
//     }
//   };
//   return (
//     <div className="lg:px-16 md:px-10 px-8 mt-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {cars.map((car) => (
//           <div
//             key={car.id}
//             onClick={() => handleViewDetails(car)}
//             className="border shadow-md flex py-3 flex-col items-center hover:scale-105 hover:ease-in duration-300 cursor-pointer"
//           >
//             <img
//               src={car.image}
//               alt={car.name}
//               className="w-[251px] h-[155px] object-cover"
//             />
//             <div className="px-5">
//               <h3 className="text-lg font-Poppins font-bold mt-2">
//                 {car.name}
//               </h3>
//               <p className="text-gray-500 font-Poppins text-sm">{car.type}</p>
//               <p className="text-gray-500 font-Poppins text-sm">{car.text}</p>
//               <div className="flex items-center justify-between">
//                 <p className="font-normal font-Poppins text-lg mt-2">
//                   {car.price}
//                 </p>
//               </div>
//               <button
//                 className="bg-mainBlue text-white px-4 py-2 font-Poppins mt-4 hover:scale-105 hover:transition duration-300"
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
//         title={selectedCar ? "Car Images" : "Proceed to Buy"}
//       >
//         {selectedCar ? (
//           user ? (
//             <div>
//               <Swiper
//                 modules={[Navigation, Pagination]}
//                 pagination={{ clickable: true }}
//                 navigation
//                 className="w-full h-64"
//               >
//                 {Object.keys(selectedCar)
//                   .filter((key) => key.startsWith("image"))
//                   .map((key, index) => (
//                     <SwiperSlide key={index}>
//                       <img
//                         src={selectedCar[key]}
//                         alt={`${selectedCar.name} ${key}`}
//                         className="w-full h-full object-cover rounded"
//                       />
//                     </SwiperSlide>
//                   ))}
//               </Swiper>

//               <div className="mt-4">
//                 <h3 className="text-lg font-bold">{selectedCar.name}</h3>
//                 <p>{selectedCar.text}</p>
//                 <p>Price: {selectedCar.price}</p>
//                 <p>Type: {selectedCar.type}</p>
//               </div>
//             </div>
//           ) : (
//             <p>Proceed to view car details.</p>
//           )
//         ) : (
//           <p>Proceed to buy car.</p>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CarAccessoriesCard;
