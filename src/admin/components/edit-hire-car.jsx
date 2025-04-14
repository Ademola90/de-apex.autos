"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { fetchCarById, updateCar } from "../../utils/carHireApi";

const EditHireCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Sedan",
    price: "",
    seats: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    fuelEfficiency: "",
    location: "Osogbo",
    description: "",
    features: [],
    status: "available",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [replaceImages, setReplaceImages] = useState(false);

  // Fetch car details
  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchCarById(id);
        setCar(response.car);

        // Populate form data
        setFormData({
          name: response.car.name || "",
          type: response.car.type || "Sedan",
          price: response.car.price || "",
          seats: response.car.seats || "",
          transmission: response.car.transmission || "Automatic",
          fuelType: response.car.fuelType || "Petrol",
          fuelEfficiency: response.car.fuelEfficiency || "",
          location: response.car.location || "Osogbo",
          description: response.car.description || "",
          features: response.car.features || [],
          status: response.car.status || "available",
        });

        // Set preview images
        if (response.car.images && response.car.images.length > 0) {
          setPreviewImages(response.car.images.map((img) => img.secure_url));
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to load car details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCarDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFeaturesChange = (e) => {
    const features = e.target.value.split(",").map((feature) => feature.trim());
    setFormData({
      ...formData,
      features,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    if (replaceImages) {
      setPreviewImages(previews);
    } else {
      setPreviewImages([...previewImages, ...previews]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      // Prepare data for submission
      const carData = {
        ...formData,
        images,
        replaceImages: replaceImages.toString(),
      };

      await updateCar(id, carData);
      toast.success("Car updated successfully");
      navigate("/admin/car-hire-management");
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Car</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  required
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Pick-up">Pick-up</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Day (₦)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Seats
                </label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="e.g., 15 km/l"
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
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  required
                >
                  <option value="Osogbo">Osogbo</option>
                  <option value="Akure">Akure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                >
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features (comma-separated)
              </label>
              <textarea
                name="features"
                value={formData.features.join(", ")}
                onChange={handleFeaturesChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                placeholder="e.g., Air Conditioning, Bluetooth, GPS, Leather Seats"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Images
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="replaceImages"
                  checked={replaceImages}
                  onChange={() => setReplaceImages(!replaceImages)}
                  className="mr-2"
                />
                <label
                  htmlFor="replaceImages"
                  className="text-sm text-gray-600"
                >
                  Replace existing images
                </label>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
              />
              <p className="text-sm text-gray-500 mt-1">
                You can select multiple images
              </p>
            </div>

            {previewImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((src, index) => (
                    <div
                      key={index}
                      className="relative h-32 bg-gray-100 rounded-md overflow-hidden"
                    >
                      <img
                        src={src || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/admin/car-hire-management")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditHireCar;
