import React from "react";

const StatusBadge = ({ status }) => {
  const colors = {
    "In Stock": "bg-green-50 text-green-700",
    "Out of Stock": "bg-red-50 text-red-700",
    "Low Stock": "bg-yellow-50 text-yellow-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
