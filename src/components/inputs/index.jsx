//components/inputs/index.jsx
import React from "react";
import { FaArrowDown } from "react-icons/fa";

export const Input = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  css,
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={css}
    />
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
