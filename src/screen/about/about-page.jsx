import React, { useEffect } from "react";
import { Car, Users, History, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutimg from "../../assets/aboutimg.jpg";
import Navbar from "../../components/navbar/navbar";
import aboutes from "../../assets/aboutes.jpg";
import Footer from "../../components/footer/footer";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen mt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white ">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/50"></div>
            <img
              src={aboutimg}
              alt="Luxury cars in showroom"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto  sm:px-6 py-24 md:py-32 lg:px-24 md:px-10 px-8">
            <h1 className="text-4xl md:text-5xl font-bold font-Poppins mb-6">
              About De-apex autos
            </h1>
            <p className="text-xl max-w-2xl mb-8 font-Outfit">
              Your trusted partner for premium automobiles, accessories, and
              rental services across Nigeria.
            </p>
            <Link
              to="/contact/contact-page"
              className="inline-flex items-center bg-mainBlue font-Outfit hover:bg-blue-950 text-whiteColor font-medium px-6 py-3 rounded-md transition-colors"
            >
              Contact Us <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="lg:pt-10 lg:pb-16 py-16 md:py-24 bg-white lg:px-16 md:px-10 px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-blue-100 text-textBlue font-Outfit px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Our Story
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-Poppins mb-6">
                  Building Trust Since 2005
                </h2>
                <p className="text-gray-600 mb-6 font-Outfit">
                  De-apex autos started with a simple vision: to provide
                  Nigerians with access to quality vehicles and services at fair
                  prices. What began as a small car dealership in Lagos has
                  grown into a nationwide network of showrooms, service centers,
                  and rental locations.
                </p>
                <p className="text-gray-600 mb-6 font-Outfit">
                  Our journey has been defined by our commitment to excellence,
                  integrity, and customer satisfaction. We've helped thousands
                  of Nigerians find their perfect vehicle, maintain their cars,
                  and travel conveniently across the country.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-4 rounded-lg text-center font-Outfit">
                    <span className="block text-3xl font-bold text-gray-900">
                      18+
                    </span>
                    <span className="text-sm text-gray-500">
                      Years of Experience
                    </span>
                  </div>
                  {/* <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <span className="block text-3xl font-bold text-gray-900">
                      12
                    </span>
                    <span className="text-sm text-gray-500">Locations</span>
                  </div> */}
                  <div className="bg-gray-100 p-4 rounded-lg text-center font-Outfit">
                    <span className="block text-3xl font-bold text-gray-900">
                      10k+
                    </span>
                    <span className="text-sm text-gray-500">
                      Happy Customers
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={aboutes}
                  alt="AutoElite showroom"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-mainBlue p-6 rounded-lg shadow-lg">
                  <History className="h-8 w-8 text-whiteColor mb-2" />
                  <p className="text-whiteColor font-Outfit font-bold">
                    Established 2005
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
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
                  provide personalized solutions for your automotive
                  requirements.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="bg-purple-100 p-3 rounded-full w-fit mb-6">
                  <Car className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Automotive Excellence
                </h3>
                <p className="text-gray-600">
                  We stay at the forefront of automotive technology to offer you
                  the latest innovations and solutions for your vehicle needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                Our Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Meet The Experts
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Our team of automotive professionals is dedicated to providing
                you with exceptional service and expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "Oluwaseun Adeyemi",
                  role: "Founder & CEO",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Chioma Okafor",
                  role: "Head of Sales",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Emmanuel Nwachukwu",
                  role: "Chief Mechanic",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Aisha Mohammed",
                  role: "Customer Relations",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-4 inline-block">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-48 h-48 object-cover rounded-full mx-auto"
                    />
                    <div className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white font-Outfit">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-Poppins font-bold mb-6">
              Ready to Experience De-apex autos?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Visit one of our showrooms today or contact us to learn more about
              our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/service/services-page"
                className="inline-flex items-center justify-center bg-mainBlue hover:bg-blue-800 text-whiteColor font-medium px-6 py-3 rounded-md transition-colors"
              >
                Explore Our Services
              </Link>
              <Link
                to="/contact/contact-page"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 border border-mainBlue text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
