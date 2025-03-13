//components/nabbar/nabvar.jsx

//components/nabbar/nabvar.jsx

import React, { useState } from "react";
import deapexlogoblack from "../../assets/deapexlogoblack.png";
import { Buttons } from "../buttons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import useStore from "../../data/store/store";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path is related to stocks (cars or accessories)
  const isStocksActive =
    location.pathname.includes("/cars") ||
    location.pathname.includes("/accessories");
  location.pathname.includes("/car-hire");

  const UserDropdown = () => (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton>
        <FaCircleUser className="text-2xl text-mainBlue cursor-pointer" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <MenuItem>
          {({ active }) => (
            <button
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Account Settings
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Support
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              License
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className={`block w-full px-4 py-2 text-left text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Sign Out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );

  // Stocks Dropdown Component
  const StocksDropdown = () => (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className={`flex items-center gap-1 font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
          isStocksActive ? "text-mainBlue" : "text-[#535551]"
        }`}
      >
        Stocks
        <IoChevronDown className="text-sm" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => navigate("/cars")}
              className={`block w-full px-4 py-2 text-left text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Vehicles
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => navigate("/accessories")}
              className={`block w-full px-4 py-2 text-left text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Accessories
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => navigate("/car-hire")}
              className={`block w-full px-4 py-2 text-left text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Hire Car
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );

  // Mobile Stocks Dropdown
  const MobileStocksDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
            isStocksActive ? "text-mainBlue" : "text-[#535551]"
          }`}
        >
          Stocks
          <IoChevronDown
            className={`text-sm transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="ml-4 mt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate("/cars");
                setIsMenuOpen(false);
              }}
              className="text-left font-Poppins text-base text-[#535551] hover:text-mainBlue transition duration-300"
            >
              Vehicles
            </button>
            <button
              onClick={() => {
                navigate("/accessories");
                setIsMenuOpen(false);
              }}
              className="text-left font-Poppins text-base text-[#535551] hover:text-mainBlue transition duration-300"
            >
              Accessories
            </button>
            <button
              onClick={() => {
                navigate("/car-hire");
                setIsMenuOpen(false);
              }}
              className="text-left font-Poppins text-base text-[#535551] hover:text-mainBlue transition duration-300"
            >
              Hire car
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 right-0 left-0 z-40">
      <div className="flex items-center justify-between lg:px-16 md:px-10 px-8 py-4">
        <div>
          <img
            onClick={() => navigate("/")}
            className="w-32 h-10"
            src={deapexlogoblack || "/placeholder.svg"}
            alt="Logo"
          />
        </div>
        <ul className="hidden md:flex items-center gap-8 text-[#535551]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
                isActive ? "text-mainBlue" : "text-[#535551]"
              }`
            }
          >
            Home
          </NavLink>

          {/* Stocks Dropdown */}
          <StocksDropdown />

          <NavLink
            to="/about/about-page"
            className={({ isActive }) =>
              `font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
                isActive ? "text-mainBlue" : "text-[#535551]"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/service/services-page"
            className={({ isActive }) =>
              `font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
                isActive ? "text-mainBlue" : "text-[#535551]"
              }`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/contact/contact-page"
            className={({ isActive }) =>
              `font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
                isActive ? "text-mainBlue" : "text-[#535551]"
              }`
            }
          >
            Contact
          </NavLink>
        </ul>

        <div className="hidden md:flex items-center">
          {user ? (
            <UserDropdown />
          ) : (
            <>
              <Buttons
                onClick={() => navigate("/signup")}
                text="Register"
                css="Poppins text-base font-semibold text-white w-28 h-10 bg-mainBlue hover:scale-105 transition duration-300"
              />
              <Buttons
                onClick={() => navigate("/login")}
                text="Login"
                css="Poppins text-base font-semibold text-mainBlue w-28 h-10 bg-white border-mainBlue border-[1px] hover:scale-105 transition duration-300"
              />
            </>
          )}
        </div>
        <div
          className="md:hidden text-2xl text-[#535551] cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white px-8 pb-4 animate-slideInDown">
          <ul className="grid items-center gap-4 text-[#535551]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer ${
                  isActive ? "text-mainBlue" : "text-[#535551]"
                }`
              }
            >
              Home
            </NavLink>

            {/* Mobile Stocks Dropdown */}
            <MobileStocksDropdown />

            <NavLink
              to="/about/about-page"
              className={({ isActive }) =>
                `font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer ${
                  isActive ? "text-mainBlue" : "text-[#535551]"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/service/services-page"
              className={({ isActive }) =>
                `font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer ${
                  isActive ? "text-mainBlue" : "text-[#535551]"
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/contact/contact-page"
              className={({ isActive }) =>
                `font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer ${
                  isActive ? "text-mainBlue" : "text-[#535551]"
                }`
              }
            >
              Contact
            </NavLink>
          </ul>

          <div className="flex flex-col gap-4 mt-4">
            {user ? (
              <UserDropdown />
            ) : (
              <>
                <Buttons
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  text="Register"
                  css="Poppins text-base font-semibold text-white w-full h-10 bg-mainBlue hover:scale-105 transition duration-300"
                />
                <Buttons
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  text="Login"
                  css="Poppins text-base font-semibold text-mainBlue w-full h-10 bg-white border-mainBlue border-[1px] hover:scale-105 transition duration-300"
                />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import deapexlogoblack from "../../assets/deapexlogoblack.png";
// import { Buttons } from "../buttons";
// import { NavLink, useNavigate } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io5";
// import { FaCircleUser } from "react-icons/fa6";
// import useStore from "../../data/store/store";
// import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useStore();
//   const navigate = useNavigate();

//   const UserDropdown = () => (
//     <Menu as="div" className="relative inline-block text-left">
//       <MenuButton>
//         <FaCircleUser className="text-2xl text-mainBlue cursor-pointer" />
//       </MenuButton>
//       <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
//         <MenuItem>
//           {({ active }) => (
//             <button
//               className={`block px-4 py-2 text-sm ${
//                 active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//               }`}
//             >
//               Account Settings
//             </button>
//           )}
//         </MenuItem>
//         <MenuItem>
//           {({ active }) => (
//             <button
//               className={`block px-4 py-2 text-sm ${
//                 active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//               }`}
//             >
//               Support
//             </button>
//           )}
//         </MenuItem>
//         <MenuItem>
//           {({ active }) => (
//             <button
//               className={`block px-4 py-2 text-sm ${
//                 active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//               }`}
//             >
//               License
//             </button>
//           )}
//         </MenuItem>
//         <MenuItem>
//           {({ active }) => (
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/");
//               }}
//               className={`block w-full px-4 py-2 text-left text-sm ${
//                 active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//               }`}
//             >
//               Sign Out
//             </button>
//           )}
//         </MenuItem>
//       </MenuItems>
//     </Menu>
//   );

//   return (
//     <nav className="bg-white shadow-md fixed top-0 right-0 left-0 z-40">
//       <div className="flex items-center justify-between lg:px-16 md:px-10 px-8 py-4">
//         <div>
//           <img className="w-32 h-10" src={deapexlogoblack} alt="Logo" />
//         </div>
//         <ul className=" hidden md:flex items-center gap-8 text-[#535551]">
//           {[
//             { name: "Home", path: "/" },
//             { name: "Stocks", path: "/cars" },
//             { name: "About", path: "/about/about-page" },
//             { name: "Services", path: "/service/services-page" },
//             { name: "Contact", path: "/contact/contact-page" },
//           ].map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.path}
//               className={({ isActive }) =>
//                 `font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
//                   isActive ? "text-mainBlue" : "text-[#535551]"
//                 }`
//               }
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </ul>

//         {/* <ul className="hidden md:flex items-center gap-8 text-[#535551]">
//           {["Home", "About", "Services", "Contact"].map((item) => (
//            <NavLink
//            to={item.path}
//            className={({ isActive }) =>
//              `font-Poppins text-lg font-normal transition duration-300 cursor-pointer ${
//                isActive ? "text-mainBlue" : "text-[#535551]"
//              }`
//            }
//          >
//            {item.name}
//          </NavLink>;
//           ))}
//         </ul> */}
//         <div className="hidden md:flex items-center">
//           {user ? (
//             <UserDropdown />
//           ) : (
//             <>
//               <Buttons
//                 onClick={() => navigate("/signup")}
//                 text="Register"
//                 css="Poppins text-base font-semibold text-white w-28 h-10 bg-mainBlue hover:scale-105 transition duration-300"
//               />
//               <Buttons
//                 onClick={() => navigate("/login")}
//                 text="Login"
//                 css="Poppins text-base font-semibold text-mainBlue w-28 h-10 bg-white border-mainBlue border-[1px] hover:scale-105 transition duration-300"
//               />
//             </>
//           )}
//         </div>
//         <div
//           className="md:hidden text-2xl text-[#535551] cursor-pointer"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
//         </div>
//       </div>

//       {isMenuOpen && (
//         <div className="md:hidden bg-white px-8 pb-4 animate-slideInDown">
//           <ul className=" grid items-center gap-8 text-[#535551]">
//             {[
//               { name: "Home", path: "/" },
//               { name: "Stocks", path: "/cars" },
//               { name: "About", path: "/about/about-page" },
//               { name: "Services", path: "/service/services-page" },
//               { name: "Contact", path: "/contact/contact-page" },
//             ].map((item) => (
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer  ${
//                     isActive ? "text-mainBlue" : "text-[#535551]"
//                   }`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             ))}
//           </ul>
//           {/* <ul className="flex flex-col gap-4 text-[#535551]">
//             {["Home", "About", "Services", "Contact"].map((item) => (
//               <li
//                 key={item}
//                 className="font-Poppins text-lg font-normal hover:text-mainBlue transition duration-300 cursor-pointer"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item}
//               </li>
//             ))}
//           </ul> */}
//           <div className="flex flex-col gap-4 mt-4">
//             {user ? (
//               <UserDropdown />
//             ) : (
//               <>
//                 <Buttons
//                   onClick={() => {
//                     navigate("/signup");
//                     setIsMenuOpen(false);
//                   }}
//                   text="Register"
//                   css="Poppins text-base font-semibold text-white w-full h-10 bg-mainBlue hover:scale-105 transition duration-300"
//                 />
//                 <Buttons
//                   onClick={() => {
//                     navigate("/login");
//                     setIsMenuOpen(false);
//                   }}
//                   text="Login"
//                   css="Poppins text-base font-semibold text-mainBlue w-full h-10 bg-white border-mainBlue border-[1px] hover:scale-105 transition duration-300"
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
