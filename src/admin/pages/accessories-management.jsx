import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import useStore from "../../data/store/store";
import Header from "../components/Header";
import DraggableImageGrid from "../components/DraggableImage";

const AccessoriesManagement = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [accessoryForm, setAccessoryForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    make: "",
    stock: 0,
    status: "In Stock",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [editingAccessoryId, setEditingAccessoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Predefined lists for dropdowns
  const categories = ["Exterior", "Interior", "Others"];
  const carMakes = [
    "Other",
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

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated.");
      navigate("/");
    } else if (!["admin", "superadmin"].includes(user.role)) {
      alert("Access Denied: You do not have permission to manage accessories.");
      navigate("/");
    } else {
      fetchAccessories(); // Fetch all accessories
    }
  }, [user, navigate]);

  const fetchAccessories = async () => {
    try {
      const response = await api.get("/accessory/accessories");
      if (response && response.data?.accessories) {
        setAccessories(response.data.accessories);
        setTotalPages(Math.ceil(response.data.accessories.length / limit));
      } else {
        console.error(
          "Failed to fetch accessories:",
          response?.data?.message || "No accessories in response"
        );
      }
    } catch (error) {
      console.error("Error fetching accessories:", error.message || error);
      if (error.response) {
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
      }
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
    setAccessoryForm({ ...accessoryForm, [name]: value });
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
    const { name, description, price, category, make } = accessoryForm;

    if (!name || !description || !price || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    if (category === "Make" && !make) {
      alert("Please select a make.");
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
      Object.keys(accessoryForm).forEach((key) =>
        formData.append(key, accessoryForm[key])
      );
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

      const endpoint = editingAccessoryId
        ? `/accessory/accessories/${editingAccessoryId}`
        : "/accessory/accessories";
      const method = editingAccessoryId ? api.put : api.post;

      const response = await method(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (editingAccessoryId) {
        setAccessories((prevAccessories) =>
          prevAccessories.map((accessory) =>
            accessory._id === editingAccessoryId
              ? { ...accessory, ...response.data.accessory }
              : accessory
          )
        );
        alert("Accessory updated successfully");
      } else {
        alert("Accessory added successfully");
        fetchAccessories(page, limit);
      }

      resetForm();
    } catch (error) {
      console.error(
        "Error saving accessory:",
        error.response?.data || error.message
      );
      alert("An error occurred while saving the accessory.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setAccessoryForm({
      name: "",
      description: "",
      price: "",
      category: "",
      make: "",
    });
    setImageFiles([]);
    setEditingAccessoryId(null);
  };

  const handleEdit = (accessory) => {
    const { name, description, price, category, make, images } = accessory;
    setAccessoryForm({ name, description, price, category, make });
    setImageFiles(images || []);
    setEditingAccessoryId(accessory._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this accessory?")) {
      try {
        const token = user?.token;
        if (!token) {
          alert("You are not authorized to perform this action.");
          return;
        }

        await api.delete(`/accessory/accessories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Accessory deleted successfully");
        fetchAccessories(page, limit);
      } catch (error) {
        console.error(
          "Error deleting accessory:",
          error.response?.data || error.message
        );
        alert("Failed to delete accessory.");
      }
    }
  };

  const handleMoveImage = async (accessoryId, fromIndex, toIndex) => {
    try {
      // Find the accessory by ID
      const accessory = accessories.find((a) => a._id === accessoryId);
      if (!accessory) return;

      // Update the images order locally
      const updatedImages = [...accessory.images];
      const [movedImage] = updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);

      // Update the state
      const updatedAccessories = accessories.map((a) =>
        a._id === accessoryId ? { ...a, images: updatedImages } : a
      );
      setAccessories(updatedAccessories);

      // Persist changes to the backend
      const token = user?.token;
      if (!token) throw new Error("User not authenticated.");

      await api.put(
        `/accessory/accessories/${accessoryId}`,
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

  // Calculate the accessories to display for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentAccessories = accessories.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Accessories Management</h1>

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
          {editingAccessoryId ? "Edit Accessory" : "Add New Accessory"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={accessoryForm.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={accessoryForm.category}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Make Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Make</label>
            <select
              name="make"
              value={accessoryForm.make}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="" disabled>
                Select a make
              </option>
              {carMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Make Dropdown (Conditional Rendering) */}
          {accessoryForm.category === "Make" && (
            <div>
              <label className="block text-sm font-medium mb-1">Make</label>
              <select
                name="make"
                value={accessoryForm.make}
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
          )}

          {/* Other Fields */}
          {["description", "price"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "price" ? "number" : "text"}
                name={field}
                value={accessoryForm[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={accessoryForm.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={accessoryForm.status}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

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
            handleMoveImage(editingAccessoryId, fromIndex, toIndex)
          }
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading
            ? "Saving..."
            : editingAccessoryId
            ? "Update Accessory"
            : "Add Accessory"}
        </button>
      </form>

      <div className="overflow-x-scroll">
        <table className="bg-white border lg:w-full border-gray-200">
          <thead>
            <tr>
              <th className="p-2">SN</th>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Make</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentAccessories.map((accessory, index) => (
              <tr key={accessory._id}>
                <td>{index + 1 + (page - 1) * limit}</td>
                <td className="p-2">
                  {accessory.images &&
                  Array.isArray(accessory.images) &&
                  accessory.images.length > 0 &&
                  accessory.images[0].secure_url ? (
                    <img
                      src={
                        accessory.images[0].secure_url.startsWith("http")
                          ? accessory.images[0].secure_url
                          : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0].secure_url}`
                      }
                      alt={`${accessory.name}`}
                      className="h-20 w-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=80&width=80";
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    "No Image"
                  )}

                  {/* {accessory.images && accessory.images[0] ? (
                    <img
                      src={
                        accessory.images[0].startsWith("http")
                          ? accessory.images[0]
                          : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0]}`
                      }
                      alt={`${accessory.name}`}
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
                <td className="p-2">{accessory.name}</td>
                <td className="p-2">{accessory.category}</td>
                <td className="p-2">{accessory.make}</td>
                <td className="p-2">
                  #{parseInt(accessory.price, 10).toLocaleString()}
                </td>
                <td className="p-2">{accessory.stock}</td>
                <td className="p-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      accessory.status === "In Stock"
                        ? "bg-green-50 text-green-700"
                        : accessory.status === "Low Stock"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {accessory.status}
                  </span>
                </td>
                <td className="border px-2 py-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEdit(accessory)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(accessory._id)}
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

export default AccessoriesManagement;
