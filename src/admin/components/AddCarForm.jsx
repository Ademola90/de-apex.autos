//admin/components/AddCarFrom.jsx

// import React, { useState, useEffect } from "react";
// import SuccessModal from "./SuccessModal";
// import api from "../../utils/api";

// const AddCarForm = ({
//   onCloseForm,
//   cars,
//   setCars,
//   editingCar,
//   setEditingCar,
// }) => {
//   const [carData, setCarData] = useState({
//     make: "",
//     model: "",
//     year: "",
//     type: "",
//     price: "",
//     description: "",
//   });
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   useEffect(() => {
//     if (editingCar) {
//       setCarData(editingCar);
//     }
//   }, [editingCar]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCarData({ ...carData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let response;
//       if (editingCar) {
//         response = await api.put(`/car/cars/${editingCar.id}`, carData); // Update car
//         setCars(
//           cars.map((car) => (car.id === editingCar.id ? response.data : car))
//         );
//       } else {
//         response = await api.post("/car/cars", carData); // Add new car
//         setCars([...cars, response.data]);
//       }
//       setShowSuccessModal(true);
//       setTimeout(() => setShowSuccessModal(false), 2000); // Auto-close success modal
//       onCloseForm();
//       setEditingCar(null);
//     } catch (error) {
//       alert("Failed to save car: " + error.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-lg font-semibold mb-4">
//         {editingCar ? "Edit Car" : "Add New Car"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {["make", "model", "year", "type", "price", "description"].map(
//           (field) => (
//             <div key={field} className="flex flex-col">
//               <label htmlFor={field} className="text-sm font-medium capitalize">
//                 {field}
//               </label>
//               <input
//                 id={field}
//                 name={field}
//                 type="text"
//                 value={carData[field]}
//                 onChange={handleInputChange}
//                 className="border rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//           )
//         )}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={onCloseForm}
//             className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             {editingCar ? "Update Car" : "Add Car"}
//           </button>
//         </div>
//       </form>

//       {showSuccessModal && (
//         <SuccessModal onClose={() => setShowSuccessModal(false)} />
//       )}
//     </div>
//   );
// };

// export default AddCarForm;

// import React, { useState } from "react";
// import axios from "axios";
// import SuccessModal from "./SuccessModal";
// import api from "../../utils/api";

// const AddCarForm = ({ onCloseForm, cars, setCars }) => {
//   const [carData, setCarData] = useState({
//     make: "",
//     model: "",
//     year: "",
//     type: "",
//     price: "",
//     description: "",
//   });
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-lg font-semibold mb-4">Add New Car</h2>
//       <form className="space-y-4">
//         {["make", "model", "year", "type", "price", "description"].map(
//           (field) => (
//             <div key={field} className="flex flex-col">
//               <label htmlFor={field} className="text-sm font-medium capitalize">
//                 {field}
//               </label>
//               <input
//                 id={field}
//                 name={field}
//                 type="text"
//                 value={carData[field]}
//                 className="border rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//           )
//         )}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={onCloseForm}
//             className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Car
//           </button>
//         </div>
//       </form>

//       {showSuccessModal && (
//         <SuccessModal onClose={() => setShowSuccessModal(false)} />
//       )}
//     </div>
//   );
// };

// export default AddCarForm;
