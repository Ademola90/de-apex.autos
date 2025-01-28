import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/4 px-6 py-2">
      <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
        <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
          {icon}
        </div>
        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">{value}</h4>
          <div className="text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
