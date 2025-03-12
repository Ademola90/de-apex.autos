import React from "react";
import { Car, PenToolIcon as Tool, MapPin, Wrench } from "lucide-react";

const OurServices = () => {
  return (
    <div>
      <section className="lg:pt-12 lg:pb-16 py-16 md:py-24 bg-white lg:px-16 md:px-10 px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 font-Outfit px-4 py-1 rounded-full text-sm font-medium mb-6">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-Poppins">
              Complete Automotive Solutions
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-Outfit">
              From finding your dream car to keeping it running smoothly, we've
              got you covered with our comprehensive range of services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Car className="h-8 w-8 text-blue-600" />,
                title: "Car Sales",
                description: "New and pre-owned vehicles from trusted brands.",
              },
              {
                icon: <Tool className="h-8 w-8 text-green-600" />,
                title: "Car Accessories",
                description:
                  "Quality parts and accessories for all vehicle makes and models.",
              },
              {
                icon: <MapPin className="h-8 w-8 text-red-600" />,
                title: "Car Rentals",
                description:
                  "Flexible rental options for travel across Nigeria.",
              },
              {
                icon: <Wrench className="h-8 w-8 text-purple-600" />,
                title: "Diagnostics & Repairs",
                description: "Expert diagnosis and repair of all car problems.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-white p-4 rounded-full w-fit mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 font-Poppins">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-Outfit">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
