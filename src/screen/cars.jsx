import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../data/store/store";
import api from "../utils/api";
import Navbar from "../components/navbar/navbar";
import OthersHero from "../components/OthersHero";

const Cars = () => {
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

  const handleViewDetails = (carId) => {
    if (!user) {
      toast.info("Please log in to view car details.");
      navigate("/login");
      return;
    }
    navigate(`/details/${carId}`); // Navigate to the details page with car ID
  };

  const handleShowAllCars = () => {
    setSelectedMake("All"); // Reset Make filter
    setSelectedType("All Vehicles"); // Reset Type filter
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading cars...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <OthersHero text={"STOCKS"} />
      </div>
      <div className="lg:px-16 md:px-10 px-8 mt-10 ">
        {/* Dropdown Menus */}
        <div className="flex items-center gap-4 mb-6">
          <p
            onClick={handleShowAllCars}
            className="cursor-pointer font-Poppins text-blue-500 hover:text-blue-700"
          >
            All Cars
          </p>
          {/* Dropdown for Vehicle Make */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-sm ring-gray-300 hover:bg-gray-50">
                Search By Vehicle Make
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-2 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute h-[300px] overflow-y-scroll right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
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
              <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-sm ring-gray-300 hover:bg-gray-50">
                Search By Vehicle Type
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-2 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute h-[300px] overflow-y-scroll  right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car._id}
                className="border shadow-md bg-mainBlue rounded-xl flex flex-col items-center hover:scale-105 cursor-pointer"
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
                    className="w-full h-[155px] object-cover rounded-t-xl"
                  />
                ) : (
                  <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
                    <p className="text-white">No Image</p>
                  </div>
                )}
                <div className="px-5 w-full pt-3 pb-5">
                  <h3 className="text-lg font-Poppins text-white font-bold mt-2 truncate">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-whiteColor py-1 text-sm font-Poppins">
                    {car.type}
                  </p>
                  <p className="text-whiteColor text-sm font-Poppins">
                    {car.year}
                  </p>
                  <p className="text-whiteColor text-sm font-Poppins truncate">
                    {car.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xl text-whiteColor">
                      #{parseInt(car.price, 10).toLocaleString()}
                    </p>
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
      </div>
    </div>
  );
};

export default Cars;

// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { IoArrowBack, IoArrowForward } from "react-icons/io5";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import useStore from "../data/store/store";
// import api from "../utils/api";
// import Navbar from "../components/navbar/navbar";
// import { FaArrowDown } from "react-icons/fa";

// export const Modal = ({ isOpen, onClose, title, children }) => {
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
//           <p className="text-xl font-semibold mb-4">{title}</p>
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

// const Cars = () => {
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedMake, setSelectedMake] = useState("All");
//   const [selectedType, setSelectedType] = useState("All Vehicles");
//   const navigate = useNavigate();
//   const { user } = useStore();

//   const [showMessage, setShowMessage] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowMessage(false);
//     }, 2000); // 2 seconds

//     return () => clearTimeout(timer); // Cleanup the timer
//   }, []);

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

//   const handleViewDetails = (car) => {
//     if (!user) {
//       toast.info("Please log in to view car details.");
//       navigate("/login");
//       return;
//     }
//     setSelectedCar(car);
//     setModalOpen(true);
//   };

//   const handleShowAllCars = () => {
//     setSelectedMake("All"); // Reset Make filter
//     setSelectedType("All Vehicles"); // Reset Type filter
//   };

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading cars...</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="lg:px-16 md:px-10 px-8 mt-32">
//         {/* Dropdown Menus */}
//         <div className="flex items-center gap-4 mb-6">
//           <p
//             onClick={handleShowAllCars}
//             className="cursor-pointer font-Poppins text-blue-500 hover:text-blue-700"
//           >
//             All Cars
//           </p>
//           {/* Dropdown for Vehicle Make */}
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-sm ring-gray-300 hover:bg-gray-50">
//                 Search By Vehicle Make
//                 <ChevronDownIcon
//                   aria-hidden="true"
//                   className="-mr-1 ml-2 h-5 w-5 text-gray-400"
//                 />
//               </MenuButton>
//             </div>
//             <MenuItems className="absolute h-[300px] overflow-y-scroll right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
//               {[
//                 "All",
//                 "Toyota",
//                 "Lexus",
//                 "Mercedes-Benz",
//                 "BMW",
//                 "Honda",
//                 "Hyundai",
//                 "Audi",
//                 "Kia",
//                 "Nissan",
//                 "Mazda",
//                 "Ford",
//                 "Jeep",
//                 "Chevrolet",
//                 "Volkswagen",
//                 "Tesla",
//                 "Subaru",
//               ].map((make) => (
//                 <MenuItem key={make}>
//                   {({ active }) => (
//                     <button
//                       onClick={() => setSelectedMake(make)}
//                       className={`${
//                         active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                       } block w-full text-left px-4 py-2 text-sm`}
//                     >
//                       {make}
//                     </button>
//                   )}
//                 </MenuItem>
//               ))}
//             </MenuItems>
//           </Menu>

//           {/* Dropdown for Vehicle Type */}
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-sm ring-gray-300 hover:bg-gray-50">
//                 Search By Vehicle Type
//                 <ChevronDownIcon
//                   aria-hidden="true"
//                   className="-mr-1 ml-2 h-5 w-5 text-gray-400"
//                 />
//               </MenuButton>
//             </div>
//             <MenuItems className="absolute h-[300px] overflow-y-scroll  right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
//               {[
//                 "All Vehicles",
//                 "Sedan",
//                 "SUV",
//                 "Truck",
//                 "Buses & Vans",
//                 "Pick-up",
//                 "Hatchback",
//                 "Coupe",
//               ].map((type) => (
//                 <MenuItem key={type}>
//                   {({ active }) => (
//                     <button
//                       onClick={() => setSelectedType(type)}
//                       className={`${
//                         active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                       } block w-full text-left px-4 py-2 text-sm`}
//                     >
//                       {type}
//                     </button>
//                   )}
//                 </MenuItem>
//               ))}
//             </MenuItems>
//           </Menu>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {filteredCars.length > 0 ? (
//             filteredCars.map((car) => (
//               <div
//                 key={car._id}
//                 className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
//                 onClick={() => handleViewDetails(car)}
//               >
//                 {car.images && car.images.length > 0 ? (
//                   <img
//                     src={
//                       car.images[0].startsWith("http")
//                         ? car.images[0]
//                         : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0]}`
//                     }
//                     alt={`${car.make} ${car.model}`}
//                     className="w-[251px] h-[155px] object-cover rounded"
//                   />
//                 ) : (
//                   <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
//                     <p className="text-gray-500">No Image</p>
//                   </div>
//                 )}
//                 <div className="px-5 w-full">
//                   <h3 className="text-lg font-bold mt-2">
//                     {car.make} {car.model}
//                   </h3>
//                   <p className="text-gray-500 text-sm">{car.type}</p>
//                   <p className="text-gray-500 text-sm">{car.year}</p>
//                   <p className="text-gray-500 text-sm truncate">
//                     {car.description}
//                   </p>
//                   <div className="flex items-center justify-between mt-2">
//                     <p className="text-lg">
//                       #{parseInt(car.price, 10).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">
//               No cars available
//             </p>
//           )}
//         </div>
//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => setModalOpen(false)}
//           title={
//             selectedCar
//               ? `${selectedCar.make} ${selectedCar.model}`
//               : "Car Details"
//           }
//         >
//           {selectedCar && (
//             <div>
//               <Swiper
//                 modules={[Navigation, Pagination]}
//                 pagination={{ clickable: true }}
//                 navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
//                 className="w-full h-96 mb-4"
//               >
//                 {selectedCar.images.map((image, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       src={
//                         image.startsWith("http")
//                           ? image
//                           : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                       }
//                       alt=""
//                       className="w-full h-full object-cover rounded"
//                       onError={(e) => {
//                         e.target.src = "/placeholder.svg?height=256&width=256";
//                         e.target.onerror = null;
//                       }}
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//   <div className="flex justify-between mt-4">
//     <button className="custom-prev bg-gray-200 p-2 rounded">
//       <IoArrowBack />
//     </button>
//     <button className="custom-next bg-gray-200 p-2 rounded">
//       <IoArrowForward />
//     </button>
//   </div>

//               <div className="mt-4">
//                 <h3 className="text-lg font-bold">
//                   {selectedCar.make} {selectedCar.model}
//                 </h3>
//                 <p className="text-gray-600">{selectedCar.description}</p>
//                 <p className="font-semibold mt-2">
//                   Price: ${selectedCar.price}
//                 </p>
//                 <p>Type: {selectedCar.type}</p>
//                 <p>Year: {selectedCar.year}</p>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Cars;
