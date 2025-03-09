import React, { useEffect } from "react";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Car,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import contcar from "../../assets/contcar.jpg";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "general",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll get back to you shortly!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      service: "general",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen mt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/50"></div>
            <img
              src={contcar}
              alt="Customer service representative"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto sm:px-6 py-24 lg:px-24 md:px-10 px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-Poppins">
              Contact Us
            </h1>
            <p className="text-xl max-w-2xl mb-8 font-Outfit">
              Have questions or need assistance? Our team is here to help you
              with all your automotive needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+2348012345678"
                className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" /> +2349 0329 76552
              </a>
              <a
                href="mailto:info@autoelite.ng"
                className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" /> deapexautos@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 md:py-24 bg-white lg:px-16 md:px-10 px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="inline-block font-Outfit bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Get In Touch
                </div>
                <h2 className="text-3xl font-bold mb-6 font-Poppins">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8 font-Outfit">
                  Fill out the form below, and our team will get back to you as
                  soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 font-Outfit">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+234 801 234 5678"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Car Sales</option>
                        <option value="accessories">Car Accessories</option>
                        <option value="rental">Car Rental</option>
                        <option value="diagnostics">Car Diagnostics</option>
                        <option value="repair">Car Repair</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <div className="inline-block font-Outfit bg-slate-100 text-slate-800-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Contact Information
                </div>
                <h2 className="text-3xl font-bold mb-6 font-Poppins">
                  How to Reach Us
                </h2>
                <p className="text-gray-600 mb-8 font-bold font-Outfit text-base">
                  Visit our showroom, give us a call, or send us an email. We're
                  available to assist you through multiple channels.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-Poppins">
                        Main Showroom
                      </h3>
                      <p className="text-gray-600 text-base font-Outfit ">
                        113 Osogbo road, Dagbolu, Osun State, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-Poppins">Phone</h3>
                      <p className="text-gray-600 text-base font-Outfit">
                        +234 903 297 6552
                      </p>
                      {/* <p className="text-gray-600 text-base font-Outfit">+234 905 678 9012</p> */}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-Poppins">Email</h3>
                      <p className="text-gray-600 font-Outfit text-base">
                        deapexautos@gmail.com
                      </p>
                      {/* <p className="text-gray-600 font-Outfit text-base">
                        support@autoelite.ng
                      </p> */}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-Poppins">
                        Business Hours
                      </h3>
                      <p className="text-gray-600 font-Outfit text-base">
                        Monday - Friday: 8:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-600 font-Outfit text-base">
                        Saturday: 9:00 AM - 4:00 PM
                      </p>
                      <p className="text-gray-600 font-Outfit text-base">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-bold mb-4 text-lg font-Poppins">
                    Other Locations
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-base font-Poppins">
                        AKure Branch
                      </h4>
                      <p className="text-gray-600 text-base font-Outfit">
                        45 Alagbaka Way, AKure, Ondo State
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-base font-Poppins">
                        Osun State Branch
                      </h4>
                      <p className="text-gray-600  font-Outfit">
                        78 Osogbo Road, Dagbolu Ilobu
                      </p>
                    </div>
                    {/* <div>
                      <h4 className="font-medium">Kano Branch</h4>
                      <p className="text-gray-600">
                        15 Murtala Mohammed Way, Kano
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                Our Location
              </div>
              <h2 className="text-3xl font-bold">Find Us on the Map</h2>
            </div>

            <div className="bg-white p-2 rounded-lg shadow-md">
              {/* This would be replaced with an actual map integration */}
              <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">
                    Interactive Map Would Be Displayed Here
                  </p>
                  <p className="text-gray-500 text-sm">
                    (Integration with Google Maps or other mapping service)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white lg:px-16 md:px-10 px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-Poppins">
                  Ready for Your Next Automotive Experience?
                </h2>
                <p className="text-xl mb-8 font-Outfit">
                  Whether you're looking to buy, rent, or service a vehicle,
                  we're here to help you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/service/services-page"
                    className="inline-flex items-center font-Outfit justify-center bg-mainBlue hover:bg-blue-600 text-whiteColor font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    <Car className="mr-2 h-5 w-5" /> Explore Our Services
                  </Link>
                  {/* <a
                    href="tel:+2349 0329 76552"
                    className="inline-flex items-center font-Outfit justify-center bg-transparent hover:bg-white/10 border border-white text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    <Phone className="mr-2 h-5 w-5" /> Call Us Now
                  </a> */}
                </div>
              </div>

              <div className="bg-white/10 p-8 rounded-lg font-Outfit">
                <h3 className="text-2xl font-bold mb-4">Quick Contact</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white placeholder-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white placeholder-white/50"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="3"
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white placeholder-white/50"
                  ></textarea>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full bg-mainBlue hover:bg-blue-600 text-whiteColor font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Send Quick Message <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
