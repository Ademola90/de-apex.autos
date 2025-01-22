import React, { useState, useRef, useEffect } from "react";
import emailimg from "../assets/signupimg.jpg";
import apexblacklogo from "../assets/apexautologowhite.png";
import { Buttons } from "../components/buttons";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Limit to 1 character
    setOtp(newOtp);

    // Move to the next input if available
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, 6);
    const newOtp = pasteData
      .split("")
      .concat(Array(6 - pasteData.length).fill(""));
    setOtp(newOtp);

    // Focus on the last filled input
    const lastIndex = Math.min(pasteData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      // Move to the previous input on backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="lg:mt-0 md:mt-10 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Left Section with Background Image */}
        <div
          className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
          style={{
            backgroundImage: `url(${emailimg})`, // Inline style for the dynamic background
          }}
        >
          <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
            <img
              className="w-56 h-20 lg:block md:block hidden animate-pulse"
              src={apexblacklogo}
              alt=""
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 md:w-full w-full h-full lg:items-center md:items-center grid">
          <div className="lg:px-20 md:px-10 px-8">
            <p className="text-center lg:text-4xl md:text-4xl text-3xl font-Poppins font-bold">
              Verify Email Address
            </p>
            <p className="text-center lg:text-base md:text-sm text-sm font-Poppins mt-2">
              Enter OTP sent to your email
            </p>

            {/* OTP Input */}
            <div className=" mt-3">
              <small className="text-sm font-medium lg:pl-16">OTP</small>
              <div
                className="flex justify-center items-center gap-3 mt-3"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="lg:w-12 md:w-12 w-10 lg:h-12 md:h-12 h-10 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-mainBlue"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <div className="justify-center flex items-center">
              <Buttons
                onClick={() => navigate("/login")}
                css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300"
                text="Verify Email"
              />
            </div>
          </div>
        </div>

        {/* Responsive Image Section */}
        <div
          className="bg-cover bg-center h-screen mt-10 md:w-full w-full lg:hidden md:hidden block"
          style={{
            backgroundImage: `url(${emailimg})`,
          }}
        >
          <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
            <img
              className="w-56 h-20 animate-pulse"
              src={apexblacklogo}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
