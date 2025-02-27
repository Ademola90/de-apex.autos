import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../utils/api";
import Navbar from "../components/navbar/navbar";

const AccessoryDetails = () => {
  const { accessoryId } = useParams();
  const [accessory, setAccessory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccessoryDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/accessory/accessories/${accessoryId}`);
        console.log("API Response:", response.data); // Debugging log
        setAccessory(response.data.accessory); // Correctly access the nested data
      } catch (error) {
        console.error("Error fetching accessory details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessoryDetails();
  }, [accessoryId]);

  if (isLoading) {
    return (
      <div className="text-center mt-10">Loading accessory details...</div>
    );
  }

  if (!accessory) {
    return <div className="text-center mt-10">Accessory not found.</div>;
  }

  return (
    <div className="p-6">
      <Navbar />
      <div className=" mt-20 lg:px-16 md:px-10 px-8">
        <h1 className="text-2xl font-bold mb-4">{accessory.name}</h1>
        <div className=" lg:flex md:flex lg:gap-20 justify-center">
          {/* Swiper for Images */}
          <div className="lg:w-[60%] md:w-full w-full">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              className="rounded"
            >
              {accessory.images && accessory.images.length > 0 ? (
                accessory.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={
                        image.startsWith("http")
                          ? image
                          : `${process.env.NEXT_PUBLIC_API_URL}${image}`
                      }
                      alt={`${accessory.name}`}
                      className="w-full h-[500px] object-cover rounded"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded">
                    <p className="text-gray-500">No Images Available</p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          <div className="lg:w-[40%] md:w-full w-full">
            <p className="font-semibold mt-2 text-xl font-Poppins">
              Price: #{accessory.price || "N/A"}
            </p>
            {/* <p className="text-xl font-Poppins">
              Category: {accessory.category || "N/A"}
            </p>
            <p className="text-base font-Poppins">
              Make: {accessory.make || "N/A"}
            </p> */}
            <p className="text-gray-600 text-base font-Poppins">
              {accessory.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoryDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import api from "../utils/api";
// import Navbar from "../components/navbar/navbar";

// const AccessoryDetails = () => {
//   const { accessoryId } = useParams();
//   const [accessory, setAccessory] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchAccessoryDetails = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get(`/accessory/accessories/${accessoryId}`);
//         console.log("API Response:", response.data); // Debugging log
//         setAccessory(response.data.data); // Access the nested data
//       } catch (error) {
//         console.error("Error fetching accessory details:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAccessoryDetails();
//   }, [accessoryId]);

//   if (isLoading) {
//     return (
//       <div className="text-center mt-10">Loading accessory details...</div>
//     );
//   }

//   if (!accessory) {
//     return <div className="text-center mt-10">Accessory not found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <Navbar />
//       <div className=" mt-20">
//         <h1 className="text-2xl font-bold mb-4">{accessory.name}</h1>
//         <div className="flex gap-20 justify-center">
//           {/* Swiper for Images */}
//           <div className="lg:w-[60%] md:w-full w-full">
//             <Swiper
//               modules={[Navigation]}
//               navigation
//               spaceBetween={10}
//               slidesPerView={1}
//               className="rounded"
//             >
//               {accessory.images && accessory.images.length > 0 ? (
//                 accessory.images.map((image, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       src={
//                         image.startsWith("http")
//                           ? image
//                           : `${process.env.NEXT_PUBLIC_API_URL}${image}`
//                       }
//                       alt={`${accessory.name}`}
//                       className="w-full h-[500px] object-cover rounded"
//                     />
//                   </SwiperSlide>
//                 ))
//               ) : (
//                 <SwiperSlide>
//                   <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded">
//                     <p className="text-gray-500">No Images Available</p>
//                   </div>
//                 </SwiperSlide>
//               )}
//             </Swiper>
//           </div>

//           <div className="lg:w-[40%] md:w-full w-full">
//             <p className="font-semibold mt-2 text-xl font-Poppins">
//               Price: #{accessory.price || "N/A"}
//             </p>
//             <p className="text-xl font-Poppins">
//               Category: {accessory.category || "N/A"}
//             </p>
//             <p className="text-base font-Poppins">
//               Make: {accessory.make || "N/A"}
//             </p>
//             <p className="text-gray-600 text-base font-Poppins">
//               {accessory.description || "No description available."}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccessoryDetails;
