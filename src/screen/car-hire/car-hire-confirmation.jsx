"use client";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  Download,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const CarHireConfirmation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.bookingId) {
      navigate("/car-hire");
    }
  }, [location.state, navigate]);

  if (!location.state?.bookingId) {
    return null;
  }

  const { bookingId, bookingDetails, car, customerDetails } = location.state;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 pb-8 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col items-center justify-center mb-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-blackColor">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 mt-2">
                Your booking has been successfully confirmed. We've sent the
                details to your email.
              </p>
            </div>

            <div className="border-t border-b py-4 my-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Booking Reference:</span>
                <span className="font-semibold">{bookingId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Booking Date:</span>
                <span>
                  {new Date().toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blackColor">
                Car Details
              </h2>
              <div className="flex items-center">
                <img
                  src={car.images?.[0]?.secure_url || "/placeholder.svg"}
                  alt={car.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{car.name}</h3>
                  <p className="text-sm text-gray-500">
                    {bookingDetails.driverOption === "self"
                      ? "Self Drive"
                      : "With Chauffeur"}
                  </p>
                  <p className="text-sm text-mainBlue font-medium mt-1">
                    ₦{car.price.toLocaleString()}/day
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blackColor">
                Booking Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pickup Location</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.pickupLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Dropoff Location</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.dropoffLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pickup Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {new Date(bookingDetails.pickupDate).toLocaleDateString(
                        "en-NG",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      at {bookingDetails.pickupTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Return Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {new Date(bookingDetails.returnDate).toLocaleDateString(
                        "en-NG",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      at {bookingDetails.returnTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.totalDays} day
                      {bookingDetails.totalDays > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[18px] w-[18px] text-gray-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium">Total Amount</p>
                    <p className="text-sm font-semibold text-mainBlue">
                      ₦{bookingDetails.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blackColor">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-sm text-gray-600">
                    {customerDetails.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-sm text-gray-600">
                    {customerDetails.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Phone Number</p>
                  <p className="text-sm text-gray-600">
                    {customerDetails.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-gray-600">
                    {customerDetails.address}, {customerDetails.city},{" "}
                    {customerDetails.state}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-white border border-mainBlue text-mainBlue py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center"
              >
                <Download size={18} className="mr-2" />
                Download Receipt
              </button>

              <button
                onClick={() => navigate("/car-hire")}
                className="flex-1 bg-mainBlue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                Back to Car Hire
                <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blackColor">
              What's Next?
            </h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-gray-600">
                    Check your email for a detailed confirmation of your
                    booking.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Prepare Documents</p>
                  <p className="text-sm text-gray-600">
                    Bring your ID, driver's license, and a copy of this booking
                    confirmation.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Car Pickup</p>
                  <p className="text-sm text-gray-600">
                    Arrive at the pickup location at the scheduled time. Our
                    staff will assist you.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Enjoy Your Ride</p>
                  <p className="text-sm text-gray-600">
                    Drive safely and enjoy your journey with De-apex Autos!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Need assistance?</span> Contact
                our customer support at{" "}
                <a href="tel:+2348012345678" className="text-mainBlue">
                  +234 801 234 5678
                </a>{" "}
                or email us at{" "}
                <a
                  href="mailto:support@deapexautos.com"
                  className="text-mainBlue"
                >
                  support@deapexautos.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarHireConfirmation;

// "use client";

// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   CheckCircle,
//   MapPin,
//   Calendar,
//   Clock,
//   Download,
//   ChevronRight,
// } from "lucide-react";
// import Navbar from "../../components/navbar/navbar";
// import Footer from "../../components/footer/footer";

// const CarHireConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!location.state?.bookingId) {
//       navigate("/car-hire");
//     }
//   }, [location.state, navigate]);

//   if (!location.state?.bookingId) {
//     return null;
//   }

//   const { bookingId, bookingDetails, car, customerDetails } = location.state;

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <div className="container mx-auto px-4 pb-8 mt-20">
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//             <div className="flex flex-col items-center justify-center mb-6 text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <CheckCircle size={32} className="text-green-500" />
//               </div>
//               <h1 className="text-2xl font-bold text-blackColor">
//                 Booking Confirmed!
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Your booking has been successfully confirmed. We've sent the
//                 details to your email.
//               </p>
//             </div>

//             <div className="border-t border-b py-4 my-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-gray-600">Booking Reference:</span>
//                 <span className="font-semibold">{bookingId}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Booking Date:</span>
//                 <span>
//                   {new Date().toLocaleDateString("en-NG", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-4 text-blackColor">
//                 Car Details
//               </h2>
//               <div className="flex items-center">
//                 <img
//                   src={car.image || "/placeholder.svg"}
//                   alt={car.name}
//                   className="w-20 h-20 object-cover rounded-md mr-4"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{car.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     {bookingDetails.driverOption === "self"
//                       ? "Self Drive"
//                       : "With Chauffeur"}
//                   </p>
//                   <p className="text-sm text-mainBlue font-medium mt-1">
//                     ₦{car.price.toLocaleString()}/day
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-4 text-blackColor">
//                 Booking Details
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-start">
//                   <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Pickup Location</p>
//                     <p className="text-sm text-gray-600">
//                       {bookingDetails.pickupLocation}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Dropoff Location</p>
//                     <p className="text-sm text-gray-600">
//                       {bookingDetails.dropoffLocation}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <Calendar size={18} className="text-gray-500 mr-2 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Pickup Date & Time</p>
//                     <p className="text-sm text-gray-600">
//                       {new Date(bookingDetails.pickupDate).toLocaleDateString(
//                         "en-NG",
//                         {
//                           weekday: "short",
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )}{" "}
//                       at {bookingDetails.pickupTime}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <Calendar size={18} className="text-gray-500 mr-2 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Return Date & Time</p>
//                     <p className="text-sm text-gray-600">
//                       {new Date(bookingDetails.returnDate).toLocaleDateString(
//                         "en-NG",
//                         {
//                           weekday: "short",
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )}{" "}
//                       at {bookingDetails.returnTime}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <Clock size={18} className="text-gray-500 mr-2 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Duration</p>
//                     <p className="text-sm text-gray-600">
//                       {bookingDetails.totalDays} day
//                       {bookingDetails.totalDays > 1 ? "s" : ""}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-[18px] w-[18px] text-gray-500 mr-2 mt-0.5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <div>
//                     <p className="text-sm font-medium">Total Amount</p>
//                     <p className="text-sm font-semibold text-mainBlue">
//                       ₦{bookingDetails.totalPrice.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-4 text-blackColor">
//                 Customer Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium">Full Name</p>
//                   <p className="text-sm text-gray-600">
//                     {customerDetails.fullName}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium">Email Address</p>
//                   <p className="text-sm text-gray-600">
//                     {customerDetails.email}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium">Phone Number</p>
//                   <p className="text-sm text-gray-600">
//                     {customerDetails.phone}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium">Address</p>
//                   <p className="text-sm text-gray-600">
//                     {customerDetails.address}, {customerDetails.city},{" "}
//                     {customerDetails.state}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4 mt-8">
//               <button
//                 onClick={() => window.print()}
//                 className="flex-1 bg-white border border-mainBlue text-mainBlue py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center"
//               >
//                 <Download size={18} className="mr-2" />
//                 Download Receipt
//               </button>

//               <button
//                 onClick={() => navigate("/car-hire")}
//                 className="flex-1 bg-mainBlue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//               >
//                 Back to Car Hire
//                 <ChevronRight size={18} className="ml-2" />
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-50 rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-blackColor">
//               What's Next?
//             </h2>
//             <div className="space-y-4">
//               <div className="flex">
//                 <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
//                   1
//                 </div>
//                 <div>
//                   <p className="font-medium">Confirmation Email</p>
//                   <p className="text-sm text-gray-600">
//                     Check your email for a detailed confirmation of your
//                     booking.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex">
//                 <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
//                   2
//                 </div>
//                 <div>
//                   <p className="font-medium">Prepare Documents</p>
//                   <p className="text-sm text-gray-600">
//                     Bring your ID, driver's license, and a copy of this booking
//                     confirmation.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex">
//                 <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
//                   3
//                 </div>
//                 <div>
//                   <p className="font-medium">Car Pickup</p>
//                   <p className="text-sm text-gray-600">
//                     Arrive at the pickup location at the scheduled time. Our
//                     staff will assist you.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex">
//                 <div className="w-8 h-8 bg-mainBlue rounded-full flex items-center justify-center text-white font-bold mr-3 shrink-0">
//                   4
//                 </div>
//                 <div>
//                   <p className="font-medium">Enjoy Your Ride</p>
//                   <p className="text-sm text-gray-600">
//                     Drive safely and enjoy your journey with De-apex Autos!
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
//               <p className="text-sm text-gray-700">
//                 <span className="font-medium">Need assistance?</span> Contact
//                 our customer support at{" "}
//                 <a href="tel:+2348012345678" className="text-mainBlue">
//                   +234 801 234 5678
//                 </a>{" "}
//                 or email us at{" "}
//                 <a
//                   href="mailto:support@deapexautos.com"
//                   className="text-mainBlue"
//                 >
//                   support@deapexautos.com
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CarHireConfirmation;
