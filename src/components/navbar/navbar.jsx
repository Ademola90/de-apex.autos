import React, { useState } from "react";
import deapexlogoblack from "../../assets/deapexlogoblack.png";
import { Buttons } from "../buttons";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-whiteColor shadow-md">
      {/* Navbar Container */}
      <div className="flex items-center justify-between lg:px-16 md:px-10 px-8 py-4">
        {/* Logo */}
        <div>
          <img className="w-32 h-10" src={deapexlogoblack} alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-[#535551]">
          <li className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer">
            Home
          </li>
          <li className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer">
            About
          </li>
          <li className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer">
            Services
          </li>
          <li className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer">
            Contact
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center">
          <Buttons
            onClick={() => navigate("/signup")}
            text="Register"
            css="Poppins text-base font-semibold text-whiteColor w-28 h-10 bg-mainBlue hover:scale-105 transition duration-300"
          />
          <Buttons
            onClick={() => navigate("/login")}
            text="Login"
            css="Poppins text-base font-semibold text-mainBlue w-28 h-10 bg-whiteColor border-mainBlue border-[1px] hover:scale-105 transition duration-300"
          />
        </div>

        {/* Hamburger Menu Icon */}
        <div
          className="md:hidden text-2xl text-[#535551] cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-whiteColor px-8 pb-4 animate-slideInDown">
          <ul className="flex flex-col gap-4 text-[#535551]">
            <li
              className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </li>
            <li
              className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </li>
            <li
              className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </li>
            <li
              className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </li>
          </ul>
          <div className="flex flex-col gap-4 mt-4">
            <Buttons
              onClick={() => {
                navigate("/signup");
                setIsMenuOpen(false);
              }}
              text="Register"
              css="Poppins text-base font-semibold text-whiteColor w-full h-10 bg-mainBlue hover:scale-105 transition duration-300"
            />
            <Buttons
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              text="Login"
              css="Poppins text-base font-semibold text-mainBlue w-full h-10 bg-whiteColor border-mainBlue border-[1px] hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Link, useNavigate } from "react-router-dom";
// import { StoreContext } from "../context/StoreContext";

// const Navbar = ({ setShowLogin }) => {
//     const [menu, setMenu] = useState("home");
//     const [showMenu, setShowMenu] = useState(false);
//     const [isProfile, setIsProfile] = useState(false);
//     const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
//     const navigate = useNavigate();
//     const Logout = () => {
//         localStorage.removeItem("token");
//         setToken("");
//         navigate("/");
//     };

//     return (
//         <div className="flex items-center justify-between py-4 lg:px-16 md:px-10 px-8">
//             <div>
//                 {/* <img className="w-36" src={assets.logo} alt="Logo" /> */}
//                 <Link to="/" className=" font-bold text-4xl text-[#FF4C24]">
//                     NEXTREND.
//                 </Link>
//             </div>

//             {/* Large screens */}
//             <ul className="lg:flex md:flex hidden items-center gap-10 list-none text-[#49557e] text-base">
//                 <Link
//                     to="/"
//                     className={`cursor-pointer pb-2 ${menu === "home" ? "border-b-2 borderb-[#49557e]" : ""
//                         }`}
//                     onClick={() => setMenu("home")}
//                 >
//                     Home
//                 </Link>
//                 <a
//                     href="#explore-menu"
//                     className={`cursor-pointer pb-2 ${menu === "menu" ? "border-b-2 borderb-[#49557e]" : ""
//                         }`}
//                     onClick={() => setMenu("menu")}
//                 >
//                     Menu
//                 </a>
//                 <a
//                     href="#app-download"
//                     className={`cursor-pointer pb-2 ${menu === "mobile-app" ? "border-b-2 borderb-[#49557e]" : ""
//                         }`}
//                     onClick={() => setMenu("mobile-app")}
//                 >
//                     Mobile-app
//                 </a>
//                 <a
//                     href="#footer"
//                     className={`cursor-pointer pb-2 ${menu === "contact-us" ? "border-b-2 borderb-[#49557e]" : ""
//                         }`}
//                     onClick={() => setMenu("contact-us")}
//                 >
//                     Contact us
//                 </a>
//             </ul>

//             {/* Large screen icons */}
//             <div className="lg:flex md:hidden hidden items-center gap-5">
//                 <img className="cursor-pointer" src={assets.search_icon} alt="Search" />
//                 <div className="relative px-2">
//                     <Link to="/cart">
//                         <img
//                             className="cursor-pointer"
//                             src={assets.basket_icon}
//                             alt="Basket"
//                         />
//                     </Link>

//                     <div
//                         className={`${getTotalCartAmount() === 0
//                                 ? ""
//                                 : " bg-orange-600 rounded-full w-2 h-2 absolute top-0 right-0"
//                             }   `}
//                     ></div>
//                 </div>
//                 {!token ? (
//                     <button
//                         onClick={() => setShowLogin(true)}
//                         className="hover:bg-[#fff4f2] bg-transparent text-base border border-orange-600 text-[#49557e] px-4 py-2 rounded-full"
//                     >
//                         Sign in
//                     </button>
//                 ) : (
//                     <div className="navbar-profile relative  ">
//                         <img
//                             onClick={() => setIsProfile(!isProfile)}
//                             src={assets.profile_icon}
//                             alt=""
//                         />
//                         {isProfile && (
//                             <ul className="nav-profile-dropdown space-y-3 grid justify-center absolute right-0 top-10 z-40 bg-[#fff] border text-[#EE4722] border-[#EE4722] px-10 py-5">
//                                 <li className=" cursor-pointer flex items-center gap-2">
//                                     <img className=" w-5" src={assets.bag_icon} alt="" />{" "}
//                                     <p className=" hover:text-[#FF8872]">Orders</p>
//                                 </li>{" "}
//                                 <hr className=" " />
//                                 <li
//                                     onClick={Logout}
//                                     className=" cursor-pointer flex items-center gap-2"
//                                 >
//                                     <img className=" w-5" src={assets.logout_icon} alt="" />{" "}
//                                     <p className=" hover:text-[#FF8872]">Logout</p>
//                                 </li>
//                             </ul>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Small screens */}
//             <div className="lg:hidden md:block block">
//                 <GiHamburgerMenu
//                     onClick={() => setShowMenu(!showMenu)}
//                     className="lg:hidden md:block block"
//                     size={24}
//                 />

//                 {/* Mobile Menu */}
//                 {showMenu && (
//                     <div
//                         onClick={() => setShowMenu(false)}
//                         className="absolute z-40 bg-slate-600 justify-center grid items-center top-0 bottom-0 left-0 right-0"
//                     >
//                         <ul className=" lg:hidden md:hidden grid items-center gap-10 list-none text-[#fff] text-base">
//                             <li
//                                 className={`cursor-pointer pb-2 ${menu === "home" ? "border-b borderb-[#49557e]" : ""
//                                     }`}
//                                 onClick={() => {
//                                     setMenu("home");
//                                     setShowMenu(false);
//                                 }}
//                             >
//                                 Home
//                             </li>
//                             <li
//                                 className={`cursor-pointer pb-2 ${menu === "menu" ? "border-b-2 borderb-[#49557e]" : ""
//                                     }`}
//                                 onClick={() => {
//                                     setMenu("menu");
//                                     setShowMenu(false);
//                                 }}
//                             >
//                                 Menu
//                             </li>
//                             <li
//                                 className={`cursor-pointer pb-2 ${menu === "mobile-app" ? "border-b-2 borderb-[#49557e]" : ""
//                                     }`}
//                                 onClick={() => {
//                                     setMenu("mobile-app");
//                                     setShowMenu(false);
//                                 }}
//                             >
//                                 Mobile-app
//                             </li>
//                             <li
//                                 className={`cursor-pointer pb-2 ${menu === "contact-us" ? "border-b-2 borderb-[#49557e]" : ""
//                                     }`}
//                                 onClick={() => {
//                                     setMenu("contact-us");
//                                     setShowMenu(false);
//                                 }}
//                             >
//                                 Contact us
//                             </li>
//                         </ul>

//                         <div className="flex items-center gap-5 bg-white px-4 py-2">
//                             <img
//                                 className="cursor-pointer"
//                                 src={assets.search_icon}
//                                 alt="Search"
//                             />
//                             <div className="relative px-2">
//                                 <Link to="/cart">
//                                     <img
//                                         className="cursor-pointer"
//                                         src={assets.basket_icon}
//                                         alt="Basket"
//                                     />
//                                 </Link>

//                                 <div className="bg-orange-600 rounded-full w-2 h-2 absolute top-0 right-0"></div>
//                             </div>
//                             <button
//                                 onClick={() => setShowLogin(true)}
//                                 className="hover:bg-[#fff4f2] bg-transparent text-base border border-orange-600 text-[#49557e] px-4 py-2 rounded-full"
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Navbar;
