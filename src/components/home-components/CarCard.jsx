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

const CarCard = () => {
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
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
    {
      id: 2,
      image: imgtwo,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
    {
      id: 3,
      image: imgthree,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
    {
      id: 4,
      image: imgfour,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
    {
      id: 5,
      image: imgone,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
    {
      id: 6,
      image: imgtwo,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
    {
      id: 7,
      image: imgthree,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
    {
      id: 8,
      image: imgfour,
      name: "Nissan GT-R",
      year: 2023,
      price: "#99.00",
      text: " Lorem ipsum dolor sit amet consectetur.",
      type: "Sport",
    },
  ];

  return (
    <div className=" lg:px-16 md:px-10 px-8 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border shadow-md flex py-3 flex-col items-center hover:scale-105 hover:ease-in duration-300 cursor-pointer"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-[251px] h-[155px] object-cover "
            />
            <div className=" px-5">
              <h3 className="text-lg font-Poppins font-bold mt-2">
                {car.name}
              </h3>
              <p className="text-gray-500 font-Poppins text-sm">{car.type}</p>
              <p className="text-gray-500 font-Poppins text-sm">{car.text}</p>
              {/* <div className="flex gap-2 mt-2">
                <span className="text-gray-500 text-xs">{car.year}</span>
                <span className="text-gray-500 text-xs">200km</span>
                <span className="text-gray-500 text-xs">Manual</span>
                <span className="text-gray-500 text-xs">2 People</span>
              </div> */}
              <div className=" flex items-center justify-between">
                <p className="font-normal font-Poppins text-lg mt-2">
                  {car.price}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  {/* Like Button */}
                  <button onClick={() => handleLike(car.id)}>
                    <IoHeart
                      className={`text-2xl ${
                        likes[car.id] ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* Rating Section */}
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleRating(car.id)}>
                      <FaStar
                        className={`text-2xl ${
                          ratings[car.id] ? "text-yellow-500" : "text-gray-400"
                        }`}
                      />
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      {ratings[car.id] || ""}
                    </span>
                  </div>
                </div>
              </div>

              <button className="bg-mainBlue text-white px-4 py-2 font-Poppins mt-4 hover:scale-105 hover:transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 my-6 bg-slate-300 py-5 ">
        <button className="bg-black text-white px-6 py-2 font-Poppins  hover:bg-gray-800">
          View More Cars
        </button>
        {/* <button
          onClick={resetData}
          className="bg-gray-500 text-white px-6 py-2 hover:bg-gray-700"
        >
          Reset All
        </button> */}
      </div>
    </div>
  );
};

export default CarCard;
