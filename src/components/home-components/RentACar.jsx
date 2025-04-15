import React from "react";
import imgfive from "../../assets/imgfive.png";
import { useNavigate } from "react-router-dom";

const RentACar = () => {
  const navigate = useNavigate();
  return (
    <div className="lg:flex md:grid grid items-center justify-center gap-10 w-full lg:px-16 md:px-10 px-8 mt-20 mb-10">
      {/* Image Section */}
      <div className="lg:w-1/2 md:w-full w-full">
        <img src={imgfive} alt="Car Rental" className="rounded-lg shadow-md" />
      </div>

      {/* Text Section */}
      <div className="lg:w-1/2 md:w-full w-full">
        <p className="text-[#23AAF2] font-semibold text-sm">
          Your Trusted Car Hirering Service
        </p>
        <h2 className="text-black font-extrabold lg:text-4xl md:text-4xl text-3xl font-Poppins leading-snug">
          Experience the Freedom of Hirering the Best Cars.
        </h2>
        <p className="text-gray-600 font-Poppins lg:text-lg md:text-lg text-base mt-4">
          Discover our wide range of top-quality vehicles, perfect for every
          journey. Whether it's a business trip or a weekend getaway, we make
          renting cars simple and affordable.
        </p>
        <button
          onClick={() => navigate("/car-hire")}
          className="mt-6 bg-mainBlue text-white px-6 py-3 text-lg font-medium hover:scale-105 hover:transition duration-300 transition-all"
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default RentACar;
