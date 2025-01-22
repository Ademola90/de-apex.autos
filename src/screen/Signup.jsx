import React, { useEffect } from "react";
import signupimg from "../assets/signupimg.jpg";
import apexblacklogo from "../assets/apexautologowhite.png";
import { Input } from "../components/inputs";
import { Buttons } from "../components/buttons";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <div className=" lg:mt-0 md:mt-10 mt-10 ">
      <div className=" flex flex-col md:flex-row items-center justify-center ">
        <div
          className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
          style={{
            backgroundImage: `url(${signupimg})`, // Inline style for the dynamic background
          }}
        >
          <div className=" bg-black bg-opacity-55 flex items-center h-full justify-center">
            <img
              className="w-56 h-20 animate-pulse"
              src={apexblacklogo}
              alt=""
            />
          </div>
        </div>
        <div className=" lg:w-1/2 md:w-full w-full h-full items-center grid">
          <div className=" lg:px-20 md:px-10 px-8">
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
                css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
              />
            </div>
            {/* Lastname */}
            <div className=" grid mt-5">
              <label
                className=" font-Poppins text-base text-blackColor"
                htmlFor=""
              >
                Last Name
              </label>
              <Input
                placeholder="Enter your last name"
                css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
              />
            </div>
            {/* Email */}
            <div className=" grid mt-5">
              <label
                className=" font-Poppins text-base text-blackColor"
                htmlFor=""
              >
                Email
              </label>
              <Input
                placeholder="Enter your email address"
                css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
              />
            </div>
            {/* Password */}
            <div className=" grid mt-5">
              <label
                className=" font-Poppins text-base text-blackColor"
                htmlFor=""
              >
                Password
              </label>
              <Input
                placeholder="Enter password"
                css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
              />
              <p className=" text-red-400 font-Poppins text-sm hidden">
                {" "}
                Uppercase, number and more than eight{" "}
              </p>
            </div>

            <div className=" justify-center flex items-center ">
              <Buttons
                onClick={() => navigate("/email-verifivation")}
                css={
                  "bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300 "
                }
                text="Sign Up"
              />
            </div>
            <div className=" flex items-center gap-2 mt-5">
              <p className=" text-base text-blackColor font-Poppins">
                Already Have An Account?
              </p>
              <p
                onClick={() => navigate("/login")}
                className=" text-mainBlue font-Poppins text-base cursor-pointer"
              >
                Login
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-cover bg-center h-screen  mt-10 md:w-full w-full lg:hidden md:hidden block "
          style={{
            backgroundImage: `url(${signupimg})`, // Inline style for the dynamic background
          }}
        >
          <div className=" bg-black bg-opacity-55 flex items-center h-full justify-center">
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

export default Signup;
