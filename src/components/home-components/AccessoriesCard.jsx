import React, { useState, useEffect } from "react";

import imgone from "../../assets/imgone.png";
import imgtwo from "../../assets/imgtwo.png";
import imgthree from "../../assets/imgthree.png";
import imgfour from "../../assets/imgfour.png";
import { IoHeart } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

// Custom Hook for Local Storage State
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

const CarAccessoriesCard = () => {
  const [likes, setLikes] = useLocalStorageState("likes", {});
  const [ratings, setRatings] = useLocalStorageState("ratings", {});

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRating = (id) => {
    setRatings((prev) => ({
      ...prev,
      [id]: prev[id] < 5 ? (prev[id] || 0) + 1 : 1,
    }));
  };

  const resetData = () => {
    setLikes({});
    setRatings({});
    localStorage.removeItem("likes");
    localStorage.removeItem("ratings");
  };

  const cars = [
    {
      id: 1,
      image: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 2,
      image: imgtwo,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 3,
      image: imgthree,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 4,
      image: imgfour,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 5,
      image: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 6,
      image: imgtwo,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 7,
      image: imgthree,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: 8,
      image: imgfour,
      name: "Nissan GT-R",
      year: 2023,
      price: "$99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  return (
    <div className=" lg:px-16 md:px-10 px-8 mt-20">
      <p className="text-textBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center ">
        Find Perfect Car Accessories
      </p>
      <h2 className="text-center font-Poppinsr lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
        Quality Accessories for Every Ride
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  justify-center mt-10">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border grid p-5 shadow-md  py-3 items-center hover:scale-105 hover:ease-in duration-300 cursor-pointer"
          >
            <img
              src={car.image}
              alt={car.name}
              className=" w-full  h-[155px] object-cover "
            />
            <div className="">
              <h3 className="text-lg font-Poppins font-bold mt-2">
                {car.name}
              </h3>
              <p className="text-gray-500 font-Poppins text-sm">{car.text}</p>

              <div className=" r">
                <p className="font-normal font-Poppins text-lg mt-2">
                  {car.price}
                </p>
              </div>

              <button className="bg-mainBlue text-white px-4 py-2 font-Poppins  mt-4 hover:scale-105 hover:transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 my-6 bg-slate-300 py-5 ">
        <button className="bg-black text-white px-6 py-2 font-Poppins  hover:bg-gray-800">
          View More Accessories
        </button>
        {/* <button
          onClick={resetData}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
        >
          Reset All
        </button> */}
      </div>
    </div>
  );
};

export default CarAccessoriesCard;