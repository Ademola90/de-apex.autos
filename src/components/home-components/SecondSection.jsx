import React from "react";
import { ArrowRightButtons } from "../buttons";
import imgone from "../../assets/imgone.png";
import imgtwo from "../../assets/imgtwo.png";
import imgthree from "../../assets/imgthree.png";
import imgfour from "../../assets/imgfour.png";

const HomeSecondSection = () => {
  return (
    <div className=" flex justify-center ">
      <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center">
        <div
          className=" bg-cover bg-center  "
          style={{
            backgroundImage: `url(${imgone})`, // Inline style for the dynamic background
          }}
        >
          <div className="bg-black bg-opacity-70 h-full text-whiteColor py-3 pl-5 pr-16">
            <p className=" font-Poppins text-2xl font-medium">
              Top Buy And Easy Payment
            </p>
            <p className=" font-Poppins text-[#D6D6D6] font-normal text-sm mt-3">
              Discover the best car deals with flexible payment options tailored
              just for you.
            </p>
            <ArrowRightButtons
              css={
                " text-base font-normal mt-10 text-whiteColor w-28 h-10 border-[1px] border-[#fff] hover:scale-105 hover:transition duration-300 "
              }
              text="Buy Car"
            />
          </div>
        </div>
        <div>
          <img
            className=" lg:h-full md:h-full h-64 w-full"
            src={imgtwo}
            alt=""
          />
        </div>
        <div
          className=" bg-cover bg-center  "
          style={{
            backgroundImage: `url(${imgfour})`, // Inline style for the dynamic background
          }}
        >
          <div className="bg-black bg-opacity-70 h-full text-whiteColor py-3 pl-5 pr-16">
            <p className=" font-Poppins text-2xl font-medium">
              Top Easy To User
            </p>
            <p className=" font-Poppins text-[#D6D6D6] font-normal text-sm mt-3">
              Discover the best car deals with flexible payment options tailored
              just for you.
            </p>
            <ArrowRightButtons
              css={
                " text-base font-normal mt-10 text-whiteColor w-28 h-10 border-[1px] border-[#fff] hover:scale-105 hover:transition duration-300 "
              }
              text="Buy Car"
            />
          </div>
        </div>
        <div>
          <img
            className="lg:h-full md:h-full h-64 w-full"
            src={imgthree}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSecondSection;
