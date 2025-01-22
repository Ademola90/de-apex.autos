import React from "react";
import { FaArrowDown } from "react-icons/fa";

export const Input = ({ placeholder, css }) => {
  return (
    <div>
      <input className={`${css}`} placeholder={placeholder} type="text" />
    </div>
  );
};

export const ArrowDownInput = ({ placeholder, css }) => {
  return (
    <div className=" relative items-center flex">
      <input className={` px-2 ${css}`} placeholder={placeholder} type="text" />
      <FaArrowDown className=" absolute right-4" />
    </div>
  );
};
