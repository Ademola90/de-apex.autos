import React from "react";
import {
  Home,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  Car,
} from "lucide-react";
import logo from "../../assets/apexautologowhite.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home />, text: "Dashboard", route: "dashboard" },
    { icon: <ShoppingCart />, text: "Inventory", route: "" },
    { icon: <Car />, text: "Car Management", route: "car-management" },
    { icon: <Users />, text: "Customers", route: "" },
    { icon: <BarChart2 />, text: "Analytics", route: "" },
    { icon: <Settings />, text: "Settings", route: "settings" },
  ];

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
