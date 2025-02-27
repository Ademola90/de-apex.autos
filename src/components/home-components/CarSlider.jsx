import { useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CarSlider = () => {
  const sliderRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handleBrandClick = (brand) => {
    navigate(`/cars/${brand}`);
  };

  const carBrands = [
    "Toyota",
    "Lexus",
    "Nissan",
    "Mercedes Benz",
    "BMW",
    "Mitsubishi",
    "Honda",
    "Audi",
    "Kia",
    "Hyundai",
    "Jeep",
    "Chevrolet",
    "Tesla",
    "Ford",
    "Volkswagen",
    "Subaru",
    "Volvo",
    "Porsche",
    "Ferrari",
    "Lamborghini",
  ];

  const visibleBrands = carBrands.slice(0, 9);
  const hiddenBrands = carBrands.slice(9);

  return (
    <div className="w-full lg:px-16 md:px-10 px-8 mt-10">
      <p className="text-textBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center">
        Find Your Perfect Ride
      </p>
      <h2 className="text-center font-Poppins lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
        Experience the Best Cars
      </h2>

      <div className="relative flex items-center gap-5 mt-10">
        <button
          onClick={scrollLeft}
          className="bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
        >
          <MdKeyboardArrowLeft size={24} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth items-center"
        >
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-black text-white h-10 w-[120px] pl-7 text-center flex items-center cursor-pointer hover:bg-gray-800"
            >
              Show All
            </button>
          </div>

          {visibleBrands.map((brand, index) => (
            <div
              key={index}
              className="bg-gray-300 text-black h-10 px-4 text-center flex items-center cursor-pointer hover:bg-gray-400"
              onClick={() => handleBrandClick(brand)}
            >
              <p className="w-32">{brand}</p>
            </div>
          ))}
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
            {hiddenBrands.map((brand, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleBrandClick(brand)}
              >
                {brand}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={scrollRight}
          className="bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
        >
          <MdKeyboardArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CarSlider;

// import { useRef, useState } from "react";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const CarSlider = () => {
//   const sliderRef = useRef(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const scrollLeft = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({
//         left: -200,
//         behavior: "smooth",
//       });
//     }
//   };

//   const scrollRight = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({
//         left: 200,
//         behavior: "smooth",
//       });
//     }
//   };

//   const carBrands = [
//     "Toyota",
//     "Lexus",
//     "Nissan",
//     "Mercedes Benz",
//     "BMW",
//     "Mitsubishi",
//     "Honda",
//     "Audi",
//     "Kia",
//     "Hyundai",
//     "Jeep",
//     "Chevrolet",
//     "Tesla",
//     "Ford",
//     "Volkswagen",
//     "Subaru",
//     "Volvo",
//     "Porsche",
//     "Ferrari",
//     "Lamborghini",
//   ];

//   const visibleBrands = carBrands.slice(0, 9);
//   const hiddenBrands = carBrands.slice(9);

//   return (
//     <div className="w-full lg:px-16 md:px-10 px-8 mt-10">
//       <p className="text-textBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center">
//         Find Your Perfect Ride
//       </p>
//       <h2 className="text-center font-Poppins lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
//         Experience the Best Cars
//       </h2>

//       <div className="relative flex items-center gap-5 mt-10">
//         <button
//           onClick={scrollLeft}
//           className="bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
//         >
//           <MdKeyboardArrowLeft size={24} />
//         </button>

//         <div
//           ref={sliderRef}
//           className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth items-center"
//         >
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="bg-black text-white h-10 w-[120px] pl-7 text-center flex items-center cursor-pointer hover:bg-gray-800"
//             >
//               Show All
//             </button>
//           </div>

//           {visibleBrands.map((brand, index) => (
//             <div
//               key={index}
//               className="bg-gray-300 text-black h-10 px-4 text-center flex items-center cursor-pointer hover:bg-gray-400"
//             >
//               <p className="w-32">{brand}</p>
//             </div>
//           ))}
//         </div>

//         {showDropdown && (
//           <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
//             {hiddenBrands.map((brand, index) => (
//               <div
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {brand}
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           onClick={scrollRight}
//           className="bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
//         >
//           <MdKeyboardArrowRight size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarSlider;

// import React, { useRef, useState } from "react";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const CarSlider = () => {
//   const sliderRef = useRef(null);

//   const scrollLeft = () => {
//     sliderRef.current.scrollBy({
//       left: -200,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     sliderRef.current.scrollBy({
//       left: 200,
//       behavior: "smooth",
//     });
//   };

//   const carBrands = [
//     "Show All",
//     "Chevrolet",
//     "Nissan",
//     "Mitsubishi",
//     "Tesla",
//     "Jeep",
//     "Mercedes Benz",
//     "BMW",
//     "Toyota",
//     "Ford",
//     "Honda",
//     "Audi",
//     "Volkswagen",
//     "Kia",
//     "Hyundai",
//     "Lexus",
//     "Subaru",
//     "Volvo",
//     "Porsche",
//     "Ferrari",
//     "Lamborghini",
//     "Jaguar",
//     "Land Rover",
//     "Mazda",
//     "Bugatti",
//     "Rolls Royce",
//     "Bentley",
//     "Peugeot",
//     "Renault",
//     "Fiat",
//     "Alfa Romeo",
//     "Chrysler",
//     "Cadillac",
//     "Acura",
//     "Infiniti",
//     "Aston Martin",
//     "Mini",
//     "Suzuki",
//     "Maserati",
//     "Saab",
//     "Citroën",
//     "McLaren",
//     "Pagani",
//     "Koenigsegg",
//     "Geely",
//     "Scion",
//     "SEAT",
//     "Skoda",
//     "Opel",
//     "Genesis",
//     "Tata",
//     "Mahindra",
//     "Isuzu",
//     "Lincoln",
//   ];

//   return (
//     <div className="w-full lg:px-16 md:px-10 px-8 mt-10">
//       <p className="text-textBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center ">
//         Find Your Perfect Ride
//       </p>
//       <h2 className="text-center font-Poppinsr lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
//         Experience the Best Cars
//       </h2>

//       <div className="relative flex items-center gap-5 mt-10">
//         {/* Left Arrow */}
//         <button
//           onClick={scrollLeft}
//           className=" bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
//         >
//           <MdKeyboardArrowLeft size={24} />
//         </button>

//         {/* Car Brands Slider */}
//         <div
//           ref={sliderRef}
//           className="flex  gap-4 overflow-x-auto no-scrollbar scroll-smooth items-center "
//         >
//           {carBrands.map((brand, index) => (
//             <div
//               key={index}
//               className={`${
//                 brand === "Show All"
//                   ? "bg-black text-white"
//                   : "bg-gray-300 text-black"
//               } h-10 px-4 text-center flex items-center cursor-pointer hover:bg-gray-400`}
//             >
//               <p className=" w-32">{brand}</p>
//             </div>
//           ))}
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={scrollRight}
//           className="  bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
//         >
//           <MdKeyboardArrowRight size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarSlider;
