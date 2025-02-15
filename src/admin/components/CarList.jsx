//admin/components/CarList.jsx

import React from "react";

const CarList = () => {
  const cars = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2022,
      price: 25000,
      status: "Available",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2021,
      price: 22000,
      status: "Sold",
    },
    {
      id: 3,
      make: "Ford",
      model: "Mustang",
      year: 2023,
      price: 35000,
      status: "Available",
    },
    {
      id: 4,
      make: "Chevrolet",
      model: "Malibu",
      year: 2022,
      price: 23000,
      status: "Available",
    },
    {
      id: 5,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      price: 45000,
      status: "Sold",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Make</th>
            <th className="py-3 px-6 text-left">Model</th>
            <th className="py-3 px-6 text-center">Year</th>
            <th className="py-3 px-6 text-center">Price</th>
            <th className="py-3 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {cars.map((car) => (
            <tr
              key={car.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">{car.make}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <span>{car.model}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  <span>{car.year}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <span>${car.price.toLocaleString()}</span>
              </td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`${
                    car.status === "Available"
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-600"
                  } py-1 px-3 rounded-full text-xs`}
                >
                  {car.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
