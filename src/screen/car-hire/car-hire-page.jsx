"use client";

import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, Search } from "lucide-react";
import { fetchAllCars } from "../../utils/carHireApi";
import CarCard from "../../components/car-hire/car-card";
import CarHireHero from "../../components/car-hire/car-hire-hero";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const CarHirePage = () => {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [carType, setCarType] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const response = await fetchAllCars({ status: "available" });
        setCars(response.cars || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load available cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Build filter object
      const filters = {
        status: "available",
      };

      if (location) filters.location = location;
      if (carType) filters.type = carType;

      // Store search criteria in session storage for booking process
      sessionStorage.setItem(
        "carHireSearch",
        JSON.stringify({
          location,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          carType,
        })
      );

      const response = await fetchAllCars(filters);
      setCars(response.cars || []);
      setError(null);
    } catch (err) {
      console.error("Error searching cars:", err);
      setError("Failed to search cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CarHireHero />

      <div className="container mx-auto py-8 ">
        {/* Search Form */}
        <div className="lg:px-16 md:px-10 px-8 mb-20">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blackColor">
              Find Your Perfect Ride
            </h2>
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pickup your Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <select
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  >
                    <option value="">Select location</option>
                    <option value="Osogbo">Osogbo, Osun State</option>
                    <option value="Akure">Akure, Ondo State</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="date"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Time
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="time"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="date"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Return Time
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="time"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Car Type
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Bus">Bus & Vans</option>
                  <option value="Truck">Truck</option>
                  <option value="Pick-up">Pick-up</option>
                </select>
              </div>

              <div className="md:col-span-3 mt-4">
                <button
                  type="submit"
                  className="w-full bg-mainBlue text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <Search size={18} className="mr-2" />
                  Search Available Cars
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Available Cars */}
        <div className="my-10 lg:px-16 md:px-10 px-8">
          <h2 className="text-2xl font-bold mb-6 text-blackColor">
            Available Cars for Hire
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
            </div>
          ) : error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">
                No cars available matching your criteria.
              </p>
              <p className="text-gray-500 mt-2">
                Try adjusting your search parameters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>

        {/* Car Hire Services */}
        <div className="my-20 lg:px-16 md:px-10 px-8">
          <h2 className="text-2xl font-bold mb-6 text-blackColor">
            Our Car Hire Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-mainBlue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Drive Rentals</h3>
              <p className="text-gray-600">
                Take control of your journey with our self-drive options.
                Perfect for those who prefer to be behind the wheel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-mainBlue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chauffeur Services</h3>
              <p className="text-gray-600">
                Sit back and relax with our professional chauffeur services.
                Ideal for business trips or special occasions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-mainBlue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Airport Transfers</h3>
              <p className="text-gray-600">
                Convenient and reliable airport pickup and drop-off services
                across major Nigerian airports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-mainBlue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Long-Term Leasing</h3>
              <p className="text-gray-600">
                Flexible long-term car leasing solutions for businesses and
                individuals with discounted rates.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-blackColor">
            Why Choose De-apex Autos Car Hire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-mainBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Well-Maintained Fleet
              </h3>
              <p className="text-gray-600">
                Our vehicles undergo regular maintenance checks to ensure safety
                and reliability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mainBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Competitive Pricing
              </h3>
              <p className="text-gray-600">
                Transparent pricing with no hidden fees. We offer the best rates
                in the market.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mainBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                24/7 Customer Support
              </h3>
              <p className="text-gray-600">
                Our dedicated team is available round the clock to assist you
                with any queries.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarHirePage;

// "use client";

// import { useState, useEffect } from "react";
// import { MapPin, Calendar, Clock, Search } from "lucide-react";

// import CarCard from "../../components/car-hire/car-card";
// import CarHireHero from "../../components/car-hire/car-hire-hero";
// import Navbar from "../../components/navbar/navbar";
// import Footer from "../../components/footer/footer";
// import { fetchAllCars } from "../../utils/carHireApi";

// const CarHirePage = () => {
//   const [location, setLocation] = useState("");
//   const [pickupDate, setPickupDate] = useState("");
//   const [pickupTime, setPickupTime] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [returnTime, setReturnTime] = useState("");
//   const [carType, setCarType] = useState("");
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch cars from API
//   useEffect(() => {
//     const loadCars = async () => {
//       try {
//         setLoading(true);
//         const response = await fetchAllCars({ status: "available" });
//         setCars(response.cars || []);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching cars:", err);
//         setError("Failed to load available cars. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // Build filter object
//       const filters = {
//         status: "available",
//       };

//       if (location) filters.location = location;
//       if (carType) filters.type = carType;

//       // Store search criteria in session storage for booking process
//       sessionStorage.setItem(
//         "carHireSearch",
//         JSON.stringify({
//           location,
//           pickupDate,
//           pickupTime,
//           returnDate,
//           returnTime,
//           carType,
//         })
//       );

//       const response = await fetchAllCars(filters);
//       setCars(response.cars || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error searching cars:", err);
//       setError("Failed to search cars. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <CarHireHero />

//       <div className="container mx-auto py-8 ">
//         {/* Search Form */}
//         <div className="lg:px-16 md:px-10 px-8 mb-20">
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold mb-4 text-blackColor">
//               Find Your Perfect Ride
//             </h2>
//             <form
//               onSubmit={handleSearch}
//               className="grid grid-cols-1 md:grid-cols-3 gap-4"
//             >
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Pickup your Location
//                 </label>
//                 <div className="relative">
//                   <MapPin
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={18}
//                   />
//                   <select
//                     className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     required
//                   >
//                     <option value="">Select location</option>
//                     <option value="Osogbo">Osogbo, Osun State</option>
//                     <option value="Akure">Akure, Ondo State</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Pickup Date
//                 </label>
//                 <div className="relative">
//                   <Calendar
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={18}
//                   />
//                   <input
//                     type="date"
//                     className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                     value={pickupDate}
//                     onChange={(e) => setPickupDate(e.target.value)}
//                     min={new Date().toISOString().split("T")[0]}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Pickup Time
//                 </label>
//                 <div className="relative">
//                   <Clock
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={18}
//                   />
//                   <input
//                     type="time"
//                     className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                     value={pickupTime}
//                     onChange={(e) => setPickupTime(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Return Date
//                 </label>
//                 <div className="relative">
//                   <Calendar
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={18}
//                   />
//                   <input
//                     type="date"
//                     className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                     value={returnDate}
//                     onChange={(e) => setReturnDate(e.target.value)}
//                     min={pickupDate || new Date().toISOString().split("T")[0]}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Return Time
//                 </label>
//                 <div className="relative">
//                   <Clock
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={18}
//                   />
//                   <input
//                     type="time"
//                     className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                     value={returnTime}
//                     onChange={(e) => setReturnTime(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Car Type
//                 </label>
//                 <select
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                   value={carType}
//                   onChange={(e) => setCarType(e.target.value)}
//                 >
//                   <option value="">All Types</option>
//                   <option value="Sedan">Sedan</option>
//                   <option value="SUV">SUV</option>
//                   <option value="Bus">Bus & Vans</option>
//                   <option value="Truck">Truck</option>
//                   <option value="Pick-up">Pick-up</option>
//                 </select>
//               </div>

//               <div className="md:col-span-3 mt-4">
//                 <button
//                   type="submit"
//                   className="w-full bg-mainBlue text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//                 >
//                   <Search size={18} className="mr-2" />
//                   Search Available Cars
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Available Cars */}
//         <div className="my-10 lg:px-16 md:px-10 px-8">
//           <h2 className="text-2xl font-bold mb-6 text-blackColor">
//             Available Cars for Hire
//           </h2>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
//             </div>
//           ) : error ? (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <strong className="font-bold">Error!</strong>
//               <span className="block sm:inline"> {error}</span>
//             </div>
//           ) : cars.length === 0 ? (
//             <div className="text-center py-10">
//               <p className="text-gray-600 text-lg">
//                 No cars available matching your criteria.
//               </p>
//               <p className="text-gray-500 mt-2">
//                 Try adjusting your search parameters.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {cars.map((car) => (
//                 <CarCard key={car._id} car={car} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Available Cars */}
//         <div className="my-10 lg:px-16 md:px-10 px-8">
//           <h2 className="text-2xl font-bold mb-6 text-blackColor">
//             Available Cars for Hire
//           </h2>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {cars.map((car) => (
//                 <CarCard key={car.id} car={car} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Car Hire Services */}
//         <div className="my-20 lg:px-16 md:px-10 px-8">
//           <h2 className="text-2xl font-bold mb-6 text-blackColor">
//             Our Car Hire Services
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-mainBlue"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Self-Drive Rentals</h3>
//               <p className="text-gray-600">
//                 Take control of your journey with our self-drive options.
//                 Perfect for those who prefer to be behind the wheel.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-mainBlue"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Chauffeur Services</h3>
//               <p className="text-gray-600">
//                 Sit back and relax with our professional chauffeur services.
//                 Ideal for business trips or special occasions.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-mainBlue"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Airport Transfers</h3>
//               <p className="text-gray-600">
//                 Convenient and reliable airport pickup and drop-off services
//                 across major Nigerian airports.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-mainBlue"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Long-Term Leasing</h3>
//               <p className="text-gray-600">
//                 Flexible long-term car leasing solutions for businesses and
//                 individuals with discounted rates.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Why Choose Us */}
//         <div className="bg-gray-50 p-8 rounded-lg mb-12">
//           <h2 className="text-2xl font-bold mb-6 text-center text-blackColor">
//             Why Choose De-apex Autos Car Hire
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-mainBlue rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">
//                 Well-Maintained Fleet
//               </h3>
//               <p className="text-gray-600">
//                 Our vehicles undergo regular maintenance checks to ensure safety
//                 and reliability.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-mainBlue rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">
//                 Competitive Pricing
//               </h3>
//               <p className="text-gray-600">
//                 Transparent pricing with no hidden fees. We offer the best rates
//                 in the market.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-mainBlue rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">
//                 24/7 Customer Support
//               </h3>
//               <p className="text-gray-600">
//                 Our dedicated team is available round the clock to assist you
//                 with any queries.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CarHirePage;
