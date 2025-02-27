import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../utils/api";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Navbar from "../components/navbar/navbar";

const Details = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // References for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/car/cars/${carId}`);
        console.log("API Response:", response.data);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (isLoading) {
    return <div className="text-center mt-10">Loading car details...</div>;
  }

  if (!car) {
    return <div className="text-center mt-10">Car not found.</div>;
  }

  return (
    <div className="p-6">
      <div className=" mt-16">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">
          {car.make} {car.model}
        </h1>
        <div className="lg:flex md:flex gap-20 justify-center">
          {/* Swiper for Images */}
          <div className="lg:w-[60%] md:w-full w-full">
            <div className="mt-4">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                spaceBetween={10}
                slidesPerView={1}
                className="rounded"
              >
                {car.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={
                        image.startsWith("http")
                          ? image
                          : `${process.env.NEXT_PUBLIC_API_URL}${image}`
                      }
                      alt={`${car.make} ${car.model}`}
                      className="w-full lg:h-[500px] md:h-[500px] h-[300px] object-cover rounded"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Custom Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                ref={prevRef}
                className="custom-prev bg-gray-200 p-2 rounded"
              >
                <IoArrowBack />
              </button>
              <button
                ref={nextRef}
                className="custom-next bg-gray-200 p-2 rounded"
              >
                <IoArrowForward />
              </button>
            </div>
          </div>

          <div className=" lg:w-[40%] md:w-full w-full bg-mainBlue p-5 font-Outfit rounded-md">
            <p className="font-semibold text-whiteColor mt-2 text-xl font-Poppins">
              Price: ${car.price}
            </p>
            <div className=" w-full max-w-lg bg-white p-5 space-y-2 lg:mt-10 md:mt-5 mt-5">
              <p className=" text-xl font-Poppins ">Type: {car.type}</p>
              <p className="text-base font-Poppins">Year: {car.year}</p>
              <p className="text-gray-600 text-base font-Poppins">
                {car.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../utils/api";

// const Details = () => {
//   const { carId } = useParams();
//   const [car, setCar] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await api.get(`/car/cars/${carId}`);
//         console.log("API Response:", response.data);
//         setCar(response.data); // Adjusted to directly use response.data
//       } catch (error) {
//         console.error("Error fetching car details:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCarDetails();
//   }, [carId]);

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading car details...</div>;
//   }

//   if (!car) {
//     return <div className="text-center mt-10">Car not found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         {car.make} {car.model}
//       </h1>

//       <div className="mt-4">
//         {car.images.map((image, index) => (
//           <img
//             key={index}
//             src={
//               image.startsWith("http")
//                 ? image
//                 : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//             }
//             alt={`${car.make} ${car.model}`}
//             className="w-full h-64 object-cover rounded"
//           />
//         ))}
//       </div>

//       <p className="font-semibold mt-2">Price: ${car.price}</p>
//       <p>Type: {car.type}</p>
//       <p>Year: {car.year}</p>
//       <p className="text-gray-600">{car.description}</p>
//     </div>
//   );
// };

// export default Details;
