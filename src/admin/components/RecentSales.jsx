import React from "react";

const RecentSales = () => {
  const sales = [
    {
      id: 1,
      customer: "John Doe",
      car: "Toyota Camry",
      date: "2023-05-15",
      amount: 25000,
    },
    {
      id: 2,
      customer: "Jane Smith",
      car: "Honda Civic",
      date: "2023-05-14",
      amount: 22000,
    },
    {
      id: 3,
      customer: "Bob Johnson",
      car: "Ford Mustang",
      date: "2023-05-13",
      amount: 35000,
    },
    {
      id: 4,
      customer: "Alice Brown",
      car: "Tesla Model 3",
      date: "2023-05-12",
      amount: 45000,
    },
  ];

  return (
    <div className="bg-white shadow-md rounded my-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Recent Sales</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {sale.customer}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">{sale.car}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{sale.date}</td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  ${sale.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSales;
