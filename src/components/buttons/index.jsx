//components/buttos/index.jsx
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ImPriceTag } from "react-icons/im";

export const Buttons = ({ text, css, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={` cursor-pointer font-Poppins ${css}`}
      >
        {text}
      </button>
    </div>
  );
};
export const ArrowRightButtons = ({ text, css, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex font-Poppins items-center justify-center gap-3  ${css} cursor-pointer`}
    >
      <button className={``}>{text}</button>
      <IoIosArrowForward className=" text-whiteColor" />

      {/* <IoIosArrowForward className=" mt-1 text-whiteColor" /> */}
    </div>
  );
};
export const BuyCartButtons = ({ text, css, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center gap-3 font-Poppins  ${css} cursor-pointer`}
    >
      <button className={``}>{text}</button>
      <ImPriceTag className=" text-mainBlue" />
    </div>
  );
};
