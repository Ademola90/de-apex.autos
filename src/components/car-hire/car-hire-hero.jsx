import { ArrowRight } from "lucide-react";
import carhireheroimg from "../../assets/carhireheroimg.jpeg";
import { Link } from "react-router-dom";

const CarHireHero = () => {
  return (
    <div className="relative bg-gray-900 text-white lg:px-16 md:px-10 px-8 mt-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: `url(${carhireheroimg})`,
        }}
      ></div>
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-Poppins font-bold mb-4">
            Rent a Car for Your Journey Across Nigeria
          </h1>
          <p className="text-lg md:text-xl font-Outfit mb-8 text-gray-200">
            Explore Nigeria with comfort and style. Choose from our wide range
            of well-maintained vehicles for your business trips, family outings,
            or special occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link className="bg-mainBlue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 inline-flex items-center justify-center">
              Browse Cars
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <a
              href="tel:+2348012345678"
              className="bg-white hover:bg-gray-100 text-blackColor font-medium py-3 px-6 rounded-md transition duration-300 inline-flex items-center justify-center"
            >
              Call to Book
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHireHero;
