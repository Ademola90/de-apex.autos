import React from "react";
import signupimg from "../assets/signupimg.jpg";
import apexblacklogo from "../assets/apexautologowhite.png";
import { Input } from "../components/inputs";

const Signup = () => {
  return (
    <div className=" ">
      <div className=" flex items-center justify-center">
        <div
          className="bg-cover bg-center h-screen w-1/2 "
          style={{
            backgroundImage: `url(${signupimg})`, // Inline style for the dynamic background
          }}
        >
          <div className=" bg-black bg-opacity-55 flex items-center h-full justify-center">
            <img className=" animate-pulse" src={apexblacklogo} alt="" />
          </div>
        </div>
        <div className=" w-1/2 h-full items-center grid px-20">
          <div>
            <p className=" text-center text-4xl font-Poppins font-bold">
              Sign Up
            </p>
            <div className=" grid mt-5">
              <label
                className=" font-Poppins text-base text-blackColor"
                htmlFor=""
              >
                First Name
              </label>
              <Input
                placeholder="Enter your first name"
                css={"border border-mainBlue h-[40px] w-full mt-1"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
