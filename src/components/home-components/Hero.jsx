import React from "react";
import herobg from "../../assets/herobg.png";
import { ArrowRightButtons, BuyCartButtons } from "../buttons";
import { FaInstagram, FaInstagramSquare, FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useStore from "../../data/store/store"; // Import useStore
import { toast } from "react-toastify"; // Import toast for notifications

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useStore(); // Get user from store to check authentication

  // Handler for button clicks that require authentication
  const handleAuthenticatedNavigation = (path) => {
    if (!user) {
      // Show toast notification if user is not logged in
      toast.info("Login is required to access this feature.");
      navigate("/login"); // Optionally redirect to login page
      return;
    }
    // Navigate to the requested page if user is logged in
    navigate(path);
  };

  return (
    <div
      className="bg-cover bg-center lg:pl-28 lg:pr-0 md:pl-10 md:pr-10 pl-8 pr-8 lg:mt-16 md:mt-16 mt-14  py-10 "
      style={{
        backgroundImage: `url(${herobg})`, // Inline style for the dynamic background
      }}
    >
      <p className=" font-medium font-Poppins lg:text-lg md:text-base text-sm text-textBlue">
        / Car in easy staps
      </p>

      <div className=" lg:w-[600px] lg:mt-3 md:mt-3 mt-5">
        <p className=" font-Poppins lg:text-6xl md:text-6xl text-4xl font-extrabold lg:leading-[80px] md:leading-[50px] leading-[50px]">
          Buy or Sell Cars and Find the{" "}
          <span className=" text-mainBlue">Best Accessories</span> with Ease
        </p>
      </div>
      <div className=" flex items-center gap-3 mt-10">
        <ArrowRightButtons
          onClick={() =>
            handleAuthenticatedNavigation("/service/services-page")
          }
          css={
            " text-base font-medium text-whiteColor w-36 h-10 bg-mainBlue hover:scale-105 hover:transition duration-300 "
          }
          text="Services"
        />
        <BuyCartButtons
          onClick={() => handleAuthenticatedNavigation("/cars")}
          css={
            "Poppins text-base font-medium text-mainBlue w-36 h-10 bg-whiteColor  border-[1px] border-mainBlue hover:scale-105 hover:transition duration-300"
          }
          text="Stocks"
        />
      </div>

      <div className=" flex items-center gap-3 mt-10">
        <p className=" font-Poppins text-xl font-medium text-blackColor">
          We Are In Socials Media :
        </p>
        <div className=" flex gap-2 items-center">
          <a href="https://www.tiktok.com/@de_apex.autos?_t=ZM-8tFk5E9PSU9&_r=1">
            <FaTiktok className=" lg:text-black md:text-black text-whiteColor" />
          </a>
          <a href="https://www.instagram.com/de_apexautos?igsh=cXN6MWdoeXNsdXN2&utm_source=qr">
            <FaInstagramSquare className=" lg:text-black md:text-black text-whiteColor" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// import React from "react";
// import herobg from "../../assets/herobg.png";
// import { ArrowRightButtons, BuyCartButtons } from "../buttons";
// import { FaInstagram, FaInstagramSquare, FaTiktok } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="bg-cover bg-center lg:pl-28 lg:pr-0 md:pl-10 md:pr-10 pl-8 pr-8 lg:mt-16 md:mt-16 mt-14  py-10 "
//       style={{
//         backgroundImage: `url(${herobg})`, // Inline style for the dynamic background
//       }}
//     >
//       <p className=" font-medium font-Poppins lg:text-lg md:text-base text-sm text-textBlue">
//         / Car in easy staps
//       </p>

//       <div className=" lg:w-[600px] lg:mt-3 md:mt-3 mt-5">
//         <p className=" font-Poppins lg:text-6xl md:text-6xl text-4xl font-extrabold lg:leading-[80px] md:leading-[50px] leading-[50px]">
//           Buy or Sell Cars and Find the{" "}
//           <span className=" text-mainBlue">Best Accessories</span> with Ease
//         </p>
//       </div>
//       <div className=" flex items-center gap-3 mt-10">
//         <ArrowRightButtons
//           onClick={() => navigate("/service/services-page")}
//           css={
//             " text-base font-medium text-whiteColor w-36 h-10 bg-mainBlue hover:scale-105 hover:transition duration-300 "
//           }
//           text="Services"
//         />
//         <BuyCartButtons
//           onClick={() => navigate("/cars")}
//           css={
//             "Poppins text-base font-medium text-mainBlue w-36 h-10 bg-whiteColor  border-[1px] border-mainBlue hover:scale-105 hover:transition duration-300"
//           }
//           text="Stocks"
//         />
//       </div>

//       <div className=" flex items-center gap-3 mt-10">
//         <p className=" font-Poppins text-xl font-medium text-blackColor">
//           We Are In Socials Media :
//         </p>
//         <div className=" flex gap-2 items-center">
//           <a href="https://www.tiktok.com/@de_apex.autos?_t=ZM-8tFk5E9PSU9&_r=1">
//             <FaTiktok className=" lg:text-black md:text-black text-whiteColor" />
//           </a>
//           <a href="https://www.instagram.com/de_apexautos?igsh=cXN6MWdoeXNsdXN2&utm_source=qr">
//             <FaInstagramSquare className=" lg:text-black md:text-black text-whiteColor" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
