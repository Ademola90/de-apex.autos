import { ArrowRight } from "lucide-react";
import carhireheroimg from "../../assets/carhireheroimg.jpeg";
import { Link } from "react-router-dom";

const CarHireHero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={carhireheroimg} // Replace with your actual image
          alt="Car Hire"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative container mx-auto px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rent the Perfect Car for Your Journey
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore our wide range of vehicles for any occasion. From economy to
            luxury, we've got you covered.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              <span>Flexible Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHireHero;
