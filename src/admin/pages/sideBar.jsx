"use client";

import React from "react";
import { Home, Users, BarChart2, Settings, Car } from "lucide-react";
import logo from "../../assets/apexautologowhite.png";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home />, text: "Dashboard", route: "dashboard" },
    // { icon: <ShoppingCart />, text: "Inventory", route: "inventories" },
    { icon: <Car />, text: "Car Management", route: "car-management" },
    {
      icon: <FaTools />,
      text: "Accessories Management",
      route: "accessories-management",
    },
    {
      icon: <Car />,
      text: "Car Hire Management",
      route: "car-hire-management",
      subItems: [
        { text: "Manage Cars", route: "car-hire-management" },
        { text: "Bookings", route: "car-hire-bookings" },
        { text: "Add New Car", route: "add-hire-car" },
      ],
    },
    { icon: <Users />, text: "Advertisment", route: "advertisement-form" },
    { icon: <BarChart2 />, text: "Analytics", route: "" },
    { icon: <Settings />, text: "Settings", route: "settings" },
  ];

  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleExpand = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <div className="flex items-center justify-center h-20 shadow-md">
        <img
          className="w-[120px] md:w-[120px]"
          src={logo || "/placeholder.svg"}
          alt="Apex Auto Logo"
        />
      </div>
      <ul className="flex flex-col py-4 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.subItems ? (
              <div className=" relative">
                <p
                  onClick={() => toggleExpand(index)}
                  className="flex flex-row cursor-pointer items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-200"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    {item.icon}
                  </span>
                  <span className="text-sm truncate font-medium hidden md:inline-block">
                    {item.text}
                  </span>
                  <span className="ml-auto mr-6 hidden md:inline-block">
                    {expandedItem === index ? "▼" : "▶"}
                  </span>
                </p>
                {expandedItem === index && (
                  <ul className=" left-14 w-[150px] rounded-lg px-4 py-2 bg-mainBlue z-30  absolute">
                    {item.subItems.map((subItem, subIndex) => (
                      <li className="" key={subIndex}>
                        <p
                          onClick={() =>
                            subItem.route && navigate(subItem.route)
                          }
                          className="flex flex-row text-whiteColor  cursor-pointer items-center h-8 transform hover:translate-x-2 transition-transform ease-in duration-200"
                        >
                          <span className="text-sm relative z-30  font-medium ">
                            {subItem.text}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p
                onClick={() => item.route && navigate(item.route)}
                className="flex flex-row cursor-pointer items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-200"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  {item.icon}
                </span>
                <span className="text-sm font-medium hidden md:inline-block">
                  {item.text}
                </span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

// import React from "react";
// import {
//   Home,
//   ShoppingCart,
//   Users,
//   BarChart2,
//   Settings,
//   Car,
// } from "lucide-react";
// import logo from "../../assets/apexautologowhite.png";
// import { useNavigate } from "react-router-dom";
// import { FaTools } from "react-icons/fa";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { icon: <Home />, text: "Dashboard", route: "dashboard" },
//     { icon: <ShoppingCart />, text: "Inventory", route: "inventories" },
//     { icon: <Car />, text: "Car Management", route: "car-management" },
//     {
//       icon: <FaTools />,
//       text: "Accessories Management",
//       route: "accessories-management",
//     },
//     { icon: <Users />, text: "Customers", route: "" },
//     { icon: <BarChart2 />, text: "Analytics", route: "" },
//     { icon: <Settings />, text: "Settings", route: "settings" },
//   ];

//   return (
//     <div className="flex flex-col h-screen bg-gray-800">
//       <div className="flex items-center justify-center h-20 shadow-md">
//         <img
//           className="w-[120px] md:w-[120px]"
//           src={logo || "/placeholder.svg"}
//           alt="Apex Auto Logo"
//         />
//       </div>
//       <ul className="flex flex-col py-4 space-y-2">
//         {menuItems.map((item, index) => (
//           <li key={index}>
//             <p
//               onClick={() => item.route && navigate(item.route)}
//               className="flex flex-row cursor-pointer items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-200"
//             >
//               <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
//                 {item.icon}
//               </span>
//               <span className="text-sm font-medium hidden md:inline-block">
//                 {item.text}
//               </span>
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
