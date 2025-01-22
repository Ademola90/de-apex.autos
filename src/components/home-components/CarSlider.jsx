import React, { useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CarSlider = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const carBrands = [
    "Show All",
    "Chevrolet",
    "Nissan",
    "Mitsubishi",
    "Tesla",
    "Jeep",
    "Mercedes Benz",
    "BMW",
    "Toyota",
    "Ford",
    "Honda",
    "Audi",
    "Volkswagen",
    "Kia",
    "Hyundai",
    "Lexus",
    "Subaru",
    "Volvo",
    "Porsche",
    "Ferrari",
    "Lamborghini",
    "Jaguar",
    "Land Rover",
    "Mazda",
    "Bugatti",
    "Rolls Royce",
    "Bentley",
    "Peugeot",
    "Renault",
    "Fiat",
    "Alfa Romeo",
    "Chrysler",
    "Cadillac",
    "Acura",
    "Infiniti",
    "Aston Martin",
    "Mini",
    "Suzuki",
    "Maserati",
    "Saab",
    "Citroën",
    "McLaren",
    "Pagani",
    "Koenigsegg",
    "Geely",
    "Scion",
    "SEAT",
    "Skoda",
    "Opel",
    "Genesis",
    "Tata",
    "Mahindra",
    "Isuzu",
    "Lincoln",
  ];

  return (
    <div className="w-full lg:px-16 md:px-10 px-8 mt-10">
      <p className="text-textBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center ">
        Find Your Perfect Ride
      </p>
      <h2 className="text-center font-Poppinsr lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
        Experience the Best Cars
      </h2>

      <div className="relative flex items-center gap-5 mt-10">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className=" bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
        >
          <MdKeyboardArrowLeft size={24} />
        </button>

        {/* Car Brands Slider */}
        <div
          ref={sliderRef}
          className="flex  gap-4 overflow-x-auto no-scrollbar scroll-smooth items-center "
        >
          {carBrands.map((brand, index) => (
            <div
              key={index}
              className={`${
                brand === "Show All"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-black"
              } h-10 px-4 text-center flex items-center cursor-pointer hover:bg-gray-400`}
            >
              <p className=" w-32">{brand}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="  bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
        >
          <MdKeyboardArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CarSlider;
