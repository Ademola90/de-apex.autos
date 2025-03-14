"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import Header from "../components/Header";

const AddHireCar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    seats: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    fuelEfficiency: "",
    location: "",
    description: "",
    features: ["Air Conditioning"],
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // In a real app, you would upload these files to a server
    // For now, we'll just create object URLs for preview
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedImages[index].preview);

    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Car name is required";
    if (!formData.type.trim()) newErrors.type = "Car type is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    if (!formData.seats.trim()) newErrors.seats = "Number of seats is required";
    if (isNaN(Number(formData.seats)) || Number(formData.seats) <= 0) {
      newErrors.seats = "Seats must be a positive number";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/car-hire-management", {
        state: { success: true, message: "Car added successfully" },
      });
    }, 1500);
  };

  return (
    <div className="">
      <Header />
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/admin/car-hire-management")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Car</h1>
            <p className="text-gray-600">Add a new car to your rental fleet</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Toyota Camry"
                  className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                    errors.type ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                  <option value="Convertible">Convertible</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.type}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Day (₦)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 15000"
                  className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Seats
                </label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  placeholder="e.g. 5"
                  className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                    errors.seats ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.seats && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.seats}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Efficiency
                </label>
                <input
                  type="text"
                  name="fuelEfficiency"
                  value={formData.fuelEfficiency}
                  onChange={handleInputChange}
                  placeholder="e.g. 12km/L"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Location</option>
                  <option value="Osogbo">Osogbo, Osun State</option>
                  <option value="Akure">Akure, Ondo State</option>
                </select>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe the car and its features..."
                className={`w-full p-2 border rounded-md focus:ring-mainBlue focus:border-mainBlue ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 error-message">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Features
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g. Air Conditioning"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                    disabled={formData.features.length <= 1}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 flex items-center text-mainBlue hover:text-blue-700"
              >
                <Plus size={16} className="mr-1" />
                Add Feature
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt={`Car preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <label className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center h-32 cursor-pointer hover:border-mainBlue">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-500 error-message">
                  {errors.images}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Upload at least one image of the car. First image will be used
                as the main image.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/car-hire-management")}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save Car"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHireCar;
