import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure this is imported
import api from "../../utils/api";
import useStore from "../../data/store/store";
import Header from "../components/Header";
import DraggableImageGrid from "../components/DraggableImage";

const CarManagement = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [carForm, setCarForm] = useState({
    make: "",
    model: "",
    year: "",
    type: "",
    price: "",
    description: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [editingCarId, setEditingCarId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Predefined lists for dropdowns
  const carMakes = [
    "Toyota",
    "Lexus",
    "Mercedes-Benz",
    "BMW",
    "Honda",
    "Hyundai",
    "Audi",
    "Kia",
    "Nissan",
    "Mazda",
    "Ford",
    "Jeep",
    "Chevrolet",
    "Volkswagen",
    "Tesla",
    "Subaru",
  ];

  const carTypes = [
    "Sedan",
    "SUV",
    "Truck",
    "Buses & Vans",
    "Pick-up",
    "Hatchback",
    "Coupe",
  ];

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated.");
      navigate("/");
    } else if (!["admin", "superadmin"].includes(user.role)) {
      alert("Access Denied: You do not have permission to manage cars.");
      navigate("/");
    } else {
      fetchCars(); // Fetch all cars
    }
  }, [user, navigate]);

  const fetchCars = async () => {
    try {
      const response = await api.get(`/car/public-cars`); // No pagination params

      if (response.data?.success) {
        setCars(response.data.cars); // Set all cars
        setTotalPages(Math.ceil(response.data.cars.length / limit)); // Calculate total pages
      } else {
        console.error("Failed to fetch cars:", response.data?.message);
      }
    } catch (error) {
      console.error("Error fetching cars:", error.message || error);
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Changing page to:", newPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarForm({ ...carForm, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (imageFiles.length + files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }
    setImageFiles([...imageFiles, ...files]);
  };

  const removeImage = (index) => {
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { make, model, year, type, price, description } = carForm;

    if (!make || !model || !year || !type || !price || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    if (imageFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsLoading(true);

    try {
      const token = user?.token;
      if (!token) {
        throw new Error("No token available for the request.");
      }

      const formData = new FormData();
      Object.keys(carForm).forEach((key) => formData.append(key, carForm[key]));
      imageFiles.forEach((file, index) =>
        file instanceof File
          ? formData.append("images", file)
          : formData.append("existingImages", file)
      );

      // Append the image order to the form data
      formData.append(
        "imageOrder",
        JSON.stringify(imageFiles.map((file, index) => index))
      );

      const endpoint = editingCarId ? `/car/cars/${editingCarId}` : "/car/cars";
      const method = editingCarId ? api.put : api.post;

      const response = await method(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (editingCarId) {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === editingCarId ? { ...car, ...response.data.car } : car
          )
        );
        alert("Car updated successfully");
      } else {
        alert("Car added successfully");
        fetchCars(page, limit);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving car:", error.response?.data || error.message);
      alert("An error occurred while saving the car.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCarForm({
      make: "",
      model: "",
      year: "",
      type: "",
      price: "",
      description: "",
    });
    setImageFiles([]);
    setEditingCarId(null);
  };

  const handleEdit = (car) => {
    const { make, model, year, type, price, description, images } = car;
    setCarForm({ make, model, year, type, price, description });
    setImageFiles(images || []);
    setEditingCarId(car._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const token = user?.token;
        if (!token) {
          alert("You are not authorized to perform this action.");
          return;
        }

        await api.delete(`/car/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Car deleted successfully");
        fetchCars(page, limit);
      } catch (error) {
        console.error(
          "Error deleting car:",
          error.response?.data || error.message
        );
        alert("Failed to delete car.");
      }
    }
  };

  const handleMoveImage = async (carId, fromIndex, toIndex) => {
    try {
      // Find the car by ID
      const car = cars.find((c) => c._id === carId);
      if (!car) return;

      // Update the images order locally
      const updatedImages = [...car.images];
      const [movedImage] = updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);

      // Update the state
      const updatedCars = cars.map((c) =>
        c._id === carId ? { ...c, images: updatedImages } : c
      );
      setCars(updatedCars);

      // Persist changes to the backend
      const token = user?.token;
      if (!token) throw new Error("User not authenticated.");

      await api.put(
        `/car/cars/${carId}`,
        { images: updatedImages },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Image order updated successfully.");
    } catch (error) {
      console.error("Error updating image order:", error);
      alert("Failed to update image order. Please try again.");
    }
  };

  // Calculate the cars to display for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentCars = cars.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Car Management</h1>

      {user && (
        <p className="mb-4 text-sm text-gray-500">
          Logged in as:{" "}
          <span className="font-semibold">
            {user.role === "superadmin" ? "Super Admin" : "Admin"}
          </span>
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow-md rounded-md mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingCarId ? "Edit Car" : "Add New Car"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Make Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Make</label>
            <select
              name="make"
              value={carForm.make}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select Make</option>
              {carMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={carForm.type}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select Type</option>
              {carTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Other Fields */}
          {["model", "price", "year", "description"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "price" || field === "year" ? "number" : "text"}
                name={field}
                value={carForm[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
          ))}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-md"
              multiple
              accept="image/*"
            />
          </div>
        </div>

        <DraggableImageGrid
          images={imageFiles}
          setImages={setImageFiles}
          onRemoveImage={removeImage}
          onMove={(fromIndex, toIndex) =>
            handleMoveImage(editingCarId, fromIndex, toIndex)
          }
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : editingCarId ? "Update Car" : "Add Car"}
        </button>
      </form>

      <div className=" overflow-x-scroll">
        <table className=" bg-white border lg:w-full border-gray-200">
          <thead>
            <tr>
              <th className="p-2">SN</th>
              <th className="p-2">Image</th>
              <th className="p-2">Make</th>
              <th className="p-2">Model</th>
              <th className="p-2">Year</th>
              <th className="p-2">Type</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCars.map((car, index) => (
              <tr key={car._id}>
                <td>{index + 1 + (page - 1) * limit}</td>
                <td className="p-2">
                  {car.images &&
                  car.images.length > 0 &&
                  car.images[0].secure_url ? (
                    <img
                      src={
                        car.images[0].secure_url.startsWith("http")
                          ? car.images[0].secure_url
                          : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0].secure_url}`
                      }
                      alt={`${car.make} ${car.model}`}
                      className="h-20 w-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=80&width=80";
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                  {/* {car.images && car.images[0] ? (
                    <img
                      src={
                        car.images[0].startsWith("http")
                          ? car.images[0]
                          : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0]}`
                      }
                      alt={`${car.make} ${car.model}`}
                      className="h-20 w-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=80&width=80";
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    "No Image"
                  )} */}
                </td>

                <td className="p-2">{car.make}</td>
                <td className="p-2">{car.model}</td>
                <td className="p-2">{car.year}</td>
                <td className="p-2">{car.type}</td>
                <td className="p-2">
                  {parseInt(car.price, 10).toLocaleString()}
                </td>
                <td className="border px-2 py-2">
                  <button
                    className="text-blue-500 mr-2 "
                    onClick={() => handleEdit(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-md mr-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarManagement;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Ensure this is imported
// import api from "../../utils/api";
// import useStore from "../../data/store/store";
// import Header from "../components/Header";
// import DraggableImageGrid from "../components/DraggableImage";

// const CarManagement = () => {
//   const { user } = useStore();
//   const navigate = useNavigate();
//   const [cars, setCars] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [totalPages, setTotalPages] = useState(0);
//   const [carForm, setCarForm] = useState({
//     make: "",
//     model: "",
//     year: "",
//     type: "",
//     price: "",
//     description: "",
//   });
//   const [imageFiles, setImageFiles] = useState([]);
//   const [editingCarId, setEditingCarId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       console.error("User is not authenticated.");
//       navigate("/");
//     } else if (!["admin", "superadmin"].includes(user.role)) {
//       alert("Access Denied: You do not have permission to manage cars.");
//       navigate("/");
//     } else {
//       fetchCars(); // Fetch all cars
//     }
//   }, [user, navigate]); // Remove page and limit dependencies

//   const fetchCars = async () => {
//     try {
//       const response = await api.get(`/car/public-cars`); // No pagination params

//       if (response.data?.success) {
//         setCars(response.data.cars); // Set all cars
//         setTotalPages(Math.ceil(response.data.cars.length / limit)); // Calculate total pages
//       } else {
//         console.error("Failed to fetch cars:", response.data?.message);
//       }
//     } catch (error) {
//       console.error("Error fetching cars:", error.message || error);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     console.log("Changing page to:", newPage);
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCarForm({ ...carForm, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (imageFiles.length + files.length > 10) {
//       alert("You can only upload up to 10 images.");
//       return;
//     }
//     setImageFiles([...imageFiles, ...files]);
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...imageFiles];
//     updatedImages.splice(index, 1);
//     setImageFiles(updatedImages);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { make, model, year, type, price, description } = carForm;

//     if (!make || !model || !year || !type || !price || !description) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     if (imageFiles.length === 0) {
//       alert("Please upload at least one image.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const token = user?.token;
//       if (!token) {
//         throw new Error("No token available for the request.");
//       }

//       const formData = new FormData();
//       Object.keys(carForm).forEach((key) => formData.append(key, carForm[key]));
//       imageFiles.forEach((file, index) =>
//         file instanceof File
//           ? formData.append("images", file)
//           : formData.append("existingImages", file)
//       );

//       // Append the image order to the form data
//       formData.append(
//         "imageOrder",
//         JSON.stringify(imageFiles.map((file, index) => index))
//       );

//       const endpoint = editingCarId ? `/car/cars/${editingCarId}` : "/car/cars";
//       const method = editingCarId ? api.put : api.post;

//       const response = await method(endpoint, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (editingCarId) {
//         setCars((prevCars) =>
//           prevCars.map((car) =>
//             car._id === editingCarId ? { ...car, ...response.data.car } : car
//           )
//         );
//         alert("Car updated successfully");
//       } else {
//         alert("Car added successfully");
//         fetchCars(page, limit);
//       }

//       resetForm();
//     } catch (error) {
//       console.error("Error saving car:", error.response?.data || error.message);
//       alert("An error occurred while saving the car.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setCarForm({
//       make: "",
//       model: "",
//       year: "",
//       type: "",
//       price: "",
//       description: "",
//     });
//     setImageFiles([]);
//     setEditingCarId(null);
//   };

//   const handleEdit = (car) => {
//     const { make, model, year, type, price, description, images } = car;
//     setCarForm({ make, model, year, type, price, description });
//     setImageFiles(images || []);
//     setEditingCarId(car._id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this car?")) {
//       try {
//         const token = user?.token;
//         if (!token) {
//           alert("You are not authorized to perform this action.");
//           return;
//         }

//         await api.delete(`/car/cars/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         alert("Car deleted successfully");
//         fetchCars(page, limit);
//       } catch (error) {
//         console.error(
//           "Error deleting car:",
//           error.response?.data || error.message
//         );
//         alert("Failed to delete car.");
//       }
//     }
//   };

//   const handleMoveImage = async (carId, fromIndex, toIndex) => {
//     try {
//       // Find the car by ID
//       const car = cars.find((c) => c._id === carId);
//       if (!car) return;

//       // Update the images order locally
//       const updatedImages = [...car.images];
//       const [movedImage] = updatedImages.splice(fromIndex, 1);
//       updatedImages.splice(toIndex, 0, movedImage);

//       // Update the state
//       const updatedCars = cars.map((c) =>
//         c._id === carId ? { ...c, images: updatedImages } : c
//       );
//       setCars(updatedCars);

//       // Persist changes to the backend
//       const token = user?.token;
//       if (!token) throw new Error("User not authenticated.");

//       await api.put(
//         `/car/cars/${carId}`,
//         { images: updatedImages },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Image order updated successfully.");
//     } catch (error) {
//       console.error("Error updating image order:", error);
//       alert("Failed to update image order. Please try again.");
//     }
//   };

//   // Calculate the cars to display for the current page
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;
//   const currentCars = cars.slice(startIndex, endIndex);

//   return (
//     <div className="p-6">
//       <Header />
//       <h1 className="text-2xl font-bold mb-4">Car Management</h1>

//       {user && (
//         <p className="mb-4 text-sm text-gray-500">
//           Logged in as:{" "}
//           <span className="font-semibold">
//             {user.role === "superadmin" ? "Super Admin" : "Admin"}
//           </span>
//         </p>
//       )}

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 shadow-md rounded-md mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-4">
//           {editingCarId ? "Edit Car" : "Add New Car"}
//         </h2>
//         <div className="grid grid-cols-2 gap-4">
//           {["make", "model", "type", "price", "year", "description"].map(
//             (field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium mb-1 capitalize">
//                   {field}
//                 </label>
//                 <input
//                   type={
//                     field === "price" || field === "year" ? "number" : "text"
//                   }
//                   name={field}
//                   value={carForm[field]}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded-md"
//                   required
//                 />
//               </div>
//             )
//           )}
//           <div>
//             <label className="block text-sm font-medium mb-1">Images</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="w-full border p-2 rounded-md"
//               multiple
//               accept="image/*"
//             />
//           </div>
//         </div>

//         <DraggableImageGrid
//           images={imageFiles}
//           setImages={setImageFiles}
//           onRemoveImage={removeImage}
//           onMove={(fromIndex, toIndex) =>
//             handleMoveImage(editingCarId, fromIndex, toIndex)
//           }
//         />

//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//           disabled={isLoading}
//         >
//           {isLoading ? "Saving..." : editingCarId ? "Update Car" : "Add Car"}
//         </button>
//       </form>

//       <div className=" overflow-x-scroll">
//         <table className=" bg-white border lg:w-full border-gray-200">
//           <thead>
//             <tr>
//               <th className="p-2">SN</th>
//               <th className="p-2">Image</th>
//               <th className="p-2">Make</th>
//               <th className="p-2">Model</th>
//               <th className="p-2">Year</th>
//               <th className="p-2">Type</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentCars.map((car, index) => (
//               <tr key={car._id}>
//                 <td>{index + 1 + (page - 1) * limit}</td>
//                 <td className="p-2">
//                   {car.images && car.images[0] ? (
//                     <img
//                       src={
//                         car.images[0].startsWith("http")
//                           ? car.images[0]
//                           : `${process.env.NEXT_PUBLIC_API_URL}${car.images[0]}`
//                       }
//                       alt={`${car.make} ${car.model}`}
//                       className="h-20 w-20 object-cover rounded-md"
//                       onError={(e) => {
//                         e.target.src = "/placeholder.svg?height=80&width=80";
//                         e.target.onerror = null;
//                       }}
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>

//                 <td className="p-2">{car.make}</td>
//                 <td className="p-2">{car.model}</td>
//                 <td className="p-2">{car.year}</td>
//                 <td className="p-2">{car.type}</td>
//                 <td className="p-2">
//                   {parseInt(car.price, 10).toLocaleString()}
//                 </td>
//                 <td className="border px-2 py-2">
//                   <button
//                     className="text-blue-500 mr-2 "
//                     onClick={() => handleEdit(car)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="text-red-500"
//                     onClick={() => handleDelete(car._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//           className="px-4 py-2 bg-gray-200 rounded-md mr-2"
//         >
//           Previous
//         </button>
//         <span className="px-4 py-2">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page === totalPages}
//           className="px-4 py-2 bg-gray-200 rounded-md ml-2"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarManagement;

////////////////////////////////////////////////////////////////////////////////////////////////////
