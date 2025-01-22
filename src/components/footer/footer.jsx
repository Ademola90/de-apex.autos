import React from "react";
import logo from "../../assets/deapexlogo.png";
import { FaTiktok } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" bg-black lg:px-32 md:px-18 lg:mt-40 md:mt-40 mt-40 px-10 lg:h-40">
      <div className="bg-mainBlue px-10 pt-10 pb-5  relative lg:bottom-28 md:bottom-28 bottom-20 text-whiteColor">
        <div className="  lg:flex md:flex grid lg:gap-0 md:gap-0 gap-10 items-end justify-between">
          <div className="">
            <img className="w-32 h-10" src={logo} alt="" />
            <p className=" w-64 mt-5">
              Buy or Sell Cars and Find the Best Accessories with Ease
            </p>
          </div>
          <div className=" flex items-center gap-4 w-52 justify-start">
            <a href="https://www.tiktok.com/@de_apex.autos?_t=ZM-8tFk5E9PSU9&_r=1">
              <FaTiktok className="text-white" size={24} />
            </a>
            <a href="https://www.instagram.com/de_apexautos?igsh=cXN6MWdoeXNsdXN2&utm_source=qr">
              <FaInstagramSquare className="text-white" size={24} />
            </a>
          </div>
        </div>
        <div className=" bg-black w-full flex items-cente justify-center py-5 mt-5">
          <p className=" text-center text-wrap">© de-apex autos</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
