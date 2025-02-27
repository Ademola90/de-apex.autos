import React from "react";
import otherhero from "../assets/otherhero.jpeg";

const OthersHero = ({ text }) => {
  return (
    <div
      className="bg-cover bg-center    "
      style={{
        backgroundImage: `url(${otherhero})`,
      }}
    >
      <div className=" h-[400px]  w-full bg-black bg-opacity-70 flex justify-center items-center">
        <p className=" text-5xl font-Poppins text-whiteColor font-bold">
          {text}
        </p>
      </div>
    </div>
  );
};

export default OthersHero;
