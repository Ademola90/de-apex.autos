import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 text-center">
      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Car Added Successfully!</h3>
      <p className="text-gray-600 mb-4">The car has been added to the list.</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Close
      </button>
    </div>
  </div>
);

export default SuccessModal;
