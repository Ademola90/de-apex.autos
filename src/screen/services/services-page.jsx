import React, { useEffect } from "react";
import {
  Car,
  PenToolIcon as Tool,
  MapPin,
  ShieldCheck,
  Clock,
  Wrench,
  Truck,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import serviceimg from "../../assets/serviceimg.jpg";
import Navbar from "../../components/navbar/navbar";
import carfour from "../../assets/carfour.jpg";
import carfive from "../../assets/carfive.jpg";
import carsix from "../../assets/carsix.jpg";
import carseven from "../../assets/carseven.jpg";
import accc from "../../assets/accc.jpg";
import hiereee from "../../assets/hiereee.jpg";
import carmec from "../../assets/carmec.jpg";
import carrd from "../../assets/carrd.jpg";
import carrep from "../../assets/carrep.jpg";
import carment from "../../assets/carment.jpg";
import Footer from "../../components/footer/footer";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen mt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/50"></div>
            <img
              src={serviceimg}
              alt="Car service center"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto sm:px-6 py-24 md:py-32 lg:px-24 md:px-10 px-8">
            <h1 className="text-4xl font-Poppins md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl font-Outfit max-w-2xl mb-8">
              Comprehensive automotive solutions for all your needs - from
              buying and renting to maintenance and accessories.
            </p>
            <Link
              to="/contact/contact-page"
              className="inline-flex items-center bg-mainBlue hover:bg-blue-800 text-whiteColor font-Outfit font-medium px-6 py-3 rounded-md transition-colors"
            >
              Book a Service <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Services Overview */}
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
                From finding your dream car to keeping it running smoothly,
                we've got you covered with our comprehensive range of services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Car className="h-8 w-8 text-blue-600" />,
                  title: "Car Sales",
                  description:
                    "New and pre-owned vehicles from trusted brands.",
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
                  description:
                    "Expert diagnosis and repair of all car problems.",
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

        {/* Car Sales Section */}
        <section className="py-16 md:py-24 bg-gray-50 lg:px-16 md:px-10 px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-blue-100 font-Outfit text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Car Sales
                </div>
                <h2 className="text-3xl md:text-4xl font-Poppins font-bold mb-6">
                  Find Your Perfect Vehicle
                </h2>
                <p className="text-gray-600 mb-6 text-lg font-Outfit">
                  At De-apex autos, we offer a wide selection of new and
                  pre-owned vehicles to suit every need and budget. Our
                  inventory includes sedans, SUVs, trucks, and luxury vehicles
                  from top manufacturers.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold font-Poppins">
                        Quality Assurance
                      </h3>
                      <p className="text-gray-600 font-Outfit">
                        All our vehicles undergo rigorous inspection before
                        sale.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold font-Poppins">
                        Flexible Financing
                      </h3>
                      <p className="text-gray-600 font-Outfit">
                        Multiple payment options and financing plans available.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold font-Poppins">
                        After-Sales Support
                      </h3>
                      <p className="text-gray-600 font-Outfit">
                        Comprehensive warranty and maintenance packages.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact/contact-page"
                  className="inline-flex items-center bg-mainBlue hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  View Inventory <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                <img
                  src={carfour}
                  alt="Luxury sedan"
                  className="rounded-lg shadow-md h-[300px]"
                />

                <img
                  src={carsix}
                  alt="Truck"
                  className="rounded-lg shadow-md h-[300px] lg:mt-8 md:mt-8 mt-0"
                />
                <img
                  src={carseven}
                  alt="Sports car"
                  className="rounded-lg shadow-md h-[300px] lg:mt-8 md:mt-8 mt-0"
                />
                <img
                  src={carfive}
                  alt="SUV"
                  className="rounded-lg shadow-md h-[300px] "
                />
              </div>
            </div>
          </div>
        </section>

        {/* Car Accessories Section */}
        <section className="py-16 md:py-24 bg-white lg:px-16 md:px-10 px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <img
                    src={accc}
                    alt="Car accessories display"
                    className="rounded-lg shadow-xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-mainBlue p-6 rounded-lg shadow-lg">
                    <Tool className="h-8 w-8 text-white mb-2" />
                    <p className="text-white font-bold font-Outfit">
                      Premium Accessories
                    </p>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Car Accessories
                </div>
                <h2 className="text-3xl font-Poppins md:text-4xl font-bold mb-6">
                  Upgrade Your Ride
                </h2>
                <p className="text-gray-600 mb-6 text-lg font-Outfit">
                  Enhance your vehicle's performance, comfort, and style with
                  our extensive range of high-quality accessories. From
                  performance parts to interior upgrades, we have everything you
                  need.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 font-Poppins text-base">
                      Interior Accessories
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      <li className=" font-Outfit text-base">• Seat covers</li>
                      <li className=" font-Outfit text-base">• Floor mats</li>
                      <li className=" font-Outfit text-base">
                        • Steering wheel covers
                      </li>
                      <li className=" font-Outfit text-base">
                        • Car organizers
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 font-Poppins text-base">
                      Exterior Accessories
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      <li className=" font-Outfit text-base">• Wheel rims</li>
                      <li className=" font-Outfit text-base">• Body kits</li>
                      <li className=" font-Outfit text-base">• Car covers</li>
                      <li className=" font-Outfit text-base">• Window tints</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-base">
                    <h3 className="font-bold mb-2 font-Poppins text-base">
                      Electronics
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      <li className=" font-Outfit text-base">
                        • Car audio systems
                      </li>
                      <li className=" font-Outfit text-base">
                        • GPS navigation
                      </li>
                      <li className=" font-Outfit text-base">• Dash cams</li>
                      <li className=" font-Outfit text-base">
                        • Parking sensors
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 font-Poppins text-base">
                      Performance Parts
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      <li className=" font-Outfit text-base">• Air filters</li>
                      <li className=" font-Outfit text-base">
                        • Exhaust systems
                      </li>
                      <li className=" font-Outfit text-base">
                        • Suspension kits
                      </li>
                      <li className=" font-Outfit text-base">
                        • Brake upgrades
                      </li>
                    </ul>
                  </div>
                </div>

                <Link
                  to="/accessories"
                  className="inline-flex items-center bg-mainBlue hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Shop Accessories <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Car Rental Section */}
        <section className="py-16 md:py-24 bg-gray-50 lg:px-16 md:px-10 px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block font-Outfit bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Car Rentals
                </div>
                <h2 className="text-3xl md:text-4xl font-Poppins font-bold mb-6">
                  Travel Nigeria With Ease
                </h2>
                <p className="text-gray-600 mb-6 text-base font-Outfit">
                  Whether you need a vehicle for a business trip, family
                  vacation, or special occasion, our rental service offers a
                  diverse fleet of well-maintained vehicles at competitive
                  rates.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold font-Poppins text-base">
                        Nationwide Coverage
                      </h3>
                      <p className="text-gray-600 font-Outfit text-base">
                        Pickup and drop-off locations across major Nigerian
                        cities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold font-Poppins text-base">
                        Diverse Fleet
                      </h3>
                      <p className="text-gray-600 text-base font-Outfit">
                        Economy cars, luxury vehicles, SUVs, and vans available.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold font-Poppins text-base">
                        Flexible Rental Periods
                      </h3>
                      <p className="text-gray-600 font-Outfit text-base">
                        Daily, weekly, and monthly rental options to suit your
                        needs.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact/contact-page"
                  className="inline-flex items-center bg-mainBlue font-Outfit hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Book a Rental <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="relative">
                <img
                  src={hiereee}
                  alt="Car rental fleet"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-Poppins ">
                    Explore Nigeria
                  </h3>
                  <p className="text-gray-700 font-Outfit text-base">
                    Reliable vehicles for any journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostics & Repairs Section */}
        <section className="py-16 md:py-24 bg-white lg:px-16 md:px-10 px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-1 gap-6">
                  <img
                    src={carmec}
                    alt="Mechanic working on car"
                    className="rounded-lg shadow-md "
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <img
                      src={carrd}
                      alt="Diagnostic equipment"
                      className="rounded-lg shadow-md h-40 w-40"
                    />
                    <img
                      src={carrep}
                      alt="Car repair"
                      className="rounded-lg shadow-md h-40 w-40"
                    />
                    <img
                      src={carment}
                      alt="Car maintenance"
                      className="rounded-lg shadow-md h-40 w-40"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-block bg-blue-100 font-Outfit text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Diagnostics & Repairs
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-Poppins">
                  Expert Car Problem Solutions
                </h2>
                <p className="text-gray-600 mb-6 text-base font-Outfit">
                  Our team of certified mechanics uses state-of-the-art
                  diagnostic equipment to identify and resolve any issues with
                  your vehicle, ensuring optimal performance and safety.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold flex items-center text-base font-Poppins">
                      <Wrench className="h-5 w-5 text-blue-600 mr-2 " />
                      Comprehensive Diagnostics
                    </h3>
                    <p className="text-gray-600 mt-2 font-Outfit text-base">
                      Advanced computer diagnostics to identify electrical,
                      mechanical, and performance issues.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold flex items-center text-base font-Poppins">
                      <Tool className="h-5 w-5 text-blue-600 mr-2" />
                      Repairs & Maintenance
                    </h3>
                    <p className="text-gray-600 mt-2 text-base font-Outfit">
                      From routine maintenance to complex repairs, our skilled
                      technicians handle it all.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold flex items-center text-base font-Poppins">
                      <Truck className="h-5 w-5 text-blue-600 mr-2" />
                      Mobile Service
                    </h3>
                    <p className="text-gray-600 mt-2 text-base font-Outfit">
                      Can't come to us? Our mobile service brings our expertise
                      to your location.
                    </p>
                  </div>
                </div>

                <Link
                  to="/contact/contact-page"
                  className="inline-flex items-center bg-mainBlue font-Outfit hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Schedule Service <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-Poppins">
              Ready to Experience Our Services?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto font-Outfit">
              Contact us today to schedule a service appointment, inquire about
              our inventory, or book a rental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact/contact-page"
                className="inline-flex items-center justify-center bg-mainBlue hover:bg-blue-800 text-whiteColor text-base font-medium px-6 py-3 rounded-md transition-colors"
              >
                Contact Us Now
              </Link>
              <Link
                to="/about/about-page"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 font-Outfit text-base border border-white text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
