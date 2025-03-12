import { Award, Car, Users } from "lucide-react";
import React from "react";

const OurMission = () => {
  return (
    <div>
      <section className="py-16 md:py-24 bg-gray-50 lg:px-16 md:px-10 px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block font-Outfit bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
              Our Mission & Values
            </div>
            <h2 className="text-3xl font-Poppins md:text-4xl font-bold">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 font-Outfit">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-6">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                We rigorously inspect and maintain all our vehicles to ensure
                they meet the highest standards of performance and safety.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-6">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen to your needs and
                provide personalized solutions for your automotive requirements.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-6">
                <Car className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Automotive Excellence</h3>
              <p className="text-gray-600">
                We stay at the forefront of automotive technology to offer you
                the latest innovations and solutions for your vehicle needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurMission;
