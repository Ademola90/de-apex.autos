"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { IoCloudUpload, IoSave, IoArrowBack } from "react-icons/io5";
import Header from "../components/Header";

const AdvertisementForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "banner",
    category: "general",
    targetPages: ["home"],
    link: "",
    isActive: true,
    priority: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  // Available options for form selects
  const typeOptions = [
    { value: "banner", label: "Banner (Horizontal)" },
    { value: "sidebar", label: "Sidebar (Vertical)" },
    { value: "popup", label: "Popup" },
    { value: "inline", label: "Inline (Between Content)" },
  ];

  const categoryOptions = [
    { value: "general", label: "General" },
    { value: "cars", label: "Cars" },
    { value: "accessories", label: "Accessories" },
    { value: "car-hire", label: "Car Hire" },
  ];

  const pageOptions = [
    { value: "home", label: "Home Page" },
    { value: "cars", label: "Cars Listing" },
    { value: "accessories", label: "Accessories Listing" },
    { value: "car-hire", label: "Car Hire Page" },
    { value: "details", label: "Details Pages" },
    { value: "profile", label: "User Profile" },
    { value: "about", label: "About Page" },
    { value: "contact", label: "Contact Page" },
  ];

  useEffect(() => {
    if (isEditMode) {
      const fetchAdvertisement = async () => {
        try {
          setInitialLoading(true);
          const response = await api.get(`/advertisement/${id}`);
          const ad = response.data.advertisement;

          setFormData({
            title: ad.title,
            description: ad.description,
            type: ad.type,
            category: ad.category,
            targetPages: ad.targetPages,
            link: ad.link,
            isActive: ad.isActive,
            priority: ad.priority,
            startDate: ad.startDate
              ? new Date(ad.startDate).toISOString().split("T")[0]
              : "",
            endDate: ad.endDate
              ? new Date(ad.endDate).toISOString().split("T")[0]
              : "",
          });

          if (ad.image && ad.image.secure_url) {
            setImagePreview(ad.image.secure_url);
          }
        } catch (error) {
          console.error("Error fetching advertisement:", error);
          toast.error("Failed to load advertisement data");
          navigate("/admin/advertisement-list");
        } finally {
          setInitialLoading(false);
        }
      };

      fetchAdvertisement();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTargetPagesChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        targetPages: [...formData.targetPages, value],
      });
    } else {
      setFormData({
        ...formData,
        targetPages: formData.targetPages.filter((page) => page !== value),
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.link) {
      toast.error("Title and link are required");
      return;
    }

    if (!imageFile && !imagePreview) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      // Create FormData object for file upload
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("type", formData.type);
      data.append("category", formData.category);
      data.append("targetPages", JSON.stringify(formData.targetPages));
      data.append("link", formData.link);
      data.append("isActive", formData.isActive);
      data.append("priority", formData.priority);

      if (formData.startDate) {
        data.append("startDate", formData.startDate);
      }

      if (formData.endDate) {
        data.append("endDate", formData.endDate);
      }

      if (imageFile) {
        data.append("image", imageFile);
      }

      let response;

      if (isEditMode) {
        response = await api.put(`/advertisement/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Advertisement updated successfully");
      } else {
        response = await api.post("/advertisement", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Advertisement created successfully");
      }

      navigate("/admin/advertisement-list");
    } catch (error) {
      console.error("Error saving advertisement:", error);
      toast.error(
        error.response?.data?.message || "Failed to save advertisement"
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4 mt-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="lg:text-2xl md:text-2xl text-lg font-bold text-gray-800">
            {isEditMode ? "Edit Advertisement" : "Create New Advertisement"}
          </h2>
          <button
            onClick={() => navigate("/admin/advertisement-list")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <IoArrowBack className="mr-1" /> Back to List
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL *
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  placeholder="https://example.com"
                  required
                />
              </div>

              {/* Type and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  >
                    {typeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 text-mainBlue focus:ring-mainBlue border-gray-300 rounded"
                    />
                    <label
                      htmlFor="isActive"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Active
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority (Higher = More Important)
                  </label>
                  <input
                    type="number"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Target Pages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Pages
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {pageOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`page-${option.value}`}
                        value={option.value}
                        checked={formData.targetPages.includes(option.value)}
                        onChange={handleTargetPagesChange}
                        className="h-4 w-4 text-mainBlue focus:ring-mainBlue border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`page-${option.value}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advertisement Image *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div>
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="mx-auto h-64 w-auto object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setImageFile(null);
                          }}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-mainBlue hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image-upload"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Size Recommendations */}
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Recommended Image Sizes:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Banner: 1200 × 300 pixels</li>
                  <li>• Sidebar: 300 × 600 pixels</li>
                  <li>• Popup: 600 × 400 pixels</li>
                  <li>• Inline: 800 × 400 pixels</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/advertisement-list")}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mainBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <IoSave className="mr-2" />
                  {isEditMode ? "Update Advertisement" : "Create Advertisement"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvertisementForm;

// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../../utils/api";
// import { IoCloudUpload, IoSave, IoArrowBack } from "react-icons/io5";

// const AdvertisementForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEditMode = !!id;

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     type: "banner",
//     category: "general",
//     targetPages: ["home"],
//     link: "",
//     isActive: true,
//     priority: 0,
//     startDate: new Date().toISOString().split("T")[0],
//     endDate: "",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(isEditMode);

//   // Available options for form selects
//   const typeOptions = [
//     { value: "banner", label: "Banner (Horizontal)" },
//     { value: "sidebar", label: "Sidebar (Vertical)" },
//     { value: "popup", label: "Popup" },
//     { value: "inline", label: "Inline (Between Content)" },
//   ];

//   const categoryOptions = [
//     { value: "general", label: "General" },
//     { value: "cars", label: "Cars" },
//     { value: "accessories", label: "Accessories" },
//     { value: "car-hire", label: "Car Hire" },
//   ];

//   const pageOptions = [
//     { value: "home", label: "Home Page" },
//     { value: "cars", label: "Cars Listing" },
//     { value: "accessories", label: "Accessories Listing" },
//     { value: "car-hire", label: "Car Hire Page" },
//     { value: "details", label: "Details Pages" },
//     { value: "profile", label: "User Profile" },
//     { value: "about", label: "About Page" },
//     { value: "contact", label: "Contact Page" },
//   ];

//   useEffect(() => {
//     if (isEditMode) {
//       const fetchAdvertisement = async () => {
//         try {
//           setInitialLoading(true);
//           const response = await api.get(`/advertisement/${id}`);
//           const ad = response.data.advertisement;

//           setFormData({
//             title: ad.title,
//             description: ad.description,
//             type: ad.type,
//             category: ad.category,
//             targetPages: ad.targetPages,
//             link: ad.link,
//             isActive: ad.isActive,
//             priority: ad.priority,
//             startDate: ad.startDate
//               ? new Date(ad.startDate).toISOString().split("T")[0]
//               : "",
//             endDate: ad.endDate
//               ? new Date(ad.endDate).toISOString().split("T")[0]
//               : "",
//           });

//           if (ad.image && ad.image.secure_url) {
//             setImagePreview(ad.image.secure_url);
//           }
//         } catch (error) {
//           console.error("Error fetching advertisement:", error);
//           toast.error("Failed to load advertisement data");
//           navigate("/admin/advertisements");
//         } finally {
//           setInitialLoading(false);
//         }
//       };

//       fetchAdvertisement();
//     }
//   }, [id, isEditMode, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleTargetPagesChange = (e) => {
//     const { value, checked } = e.target;

//     if (checked) {
//       setFormData({
//         ...formData,
//         targetPages: [...formData.targetPages, value],
//       });
//     } else {
//       setFormData({
//         ...formData,
//         targetPages: formData.targetPages.filter((page) => page !== value),
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImageFile(file);

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.link) {
//       toast.error("Title and link are required");
//       return;
//     }

//     if (!imageFile && !imagePreview) {
//       toast.error("Please upload an image");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Create FormData object for file upload
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       data.append("type", formData.type);
//       data.append("category", formData.category);
//       data.append("targetPages", JSON.stringify(formData.targetPages));
//       data.append("link", formData.link);
//       data.append("isActive", formData.isActive);
//       data.append("priority", formData.priority);

//       if (formData.startDate) {
//         data.append("startDate", formData.startDate);
//       }

//       if (formData.endDate) {
//         data.append("endDate", formData.endDate);
//       }

//       if (imageFile) {
//         data.append("image", imageFile);
//       }

//       let response;

//       if (isEditMode) {
//         response = await api.put(`/advertisement/${id}`, data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Advertisement updated successfully");
//       } else {
//         response = await api.post("/advertisement", data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Advertisement created successfully");
//       }

//       navigate("/admin/advertisement-list");
//     } catch (error) {
//       console.error("Error saving advertisement:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to save advertisement"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//           <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
//           <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
//           <div className="h-40 bg-gray-200 rounded w-full mb-4"></div>
//           <div className="h-10 bg-gray-200 rounded w-1/4 mt-6"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">
//           {isEditMode ? "Edit Advertisement" : "Create New Advertisement"}
//         </h2>
//         <button
//           onClick={() => navigate("/admin/advertisement-list")}
//           className="flex items-center text-gray-600 hover:text-gray-900"
//         >
//           <IoArrowBack className="mr-1" /> Back to List
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             {/* Basic Information */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Title *
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//               ></textarea>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Link URL *
//               </label>
//               <input
//                 type="url"
//                 name="link"
//                 value={formData.link}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 placeholder="https://example.com"
//                 required
//               />
//             </div>

//             {/* Type and Category */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Ad Type
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 >
//                   {typeOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 >
//                   {categoryOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Status and Priority */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <div className="flex items-center mt-2">
//                   <input
//                     type="checkbox"
//                     name="isActive"
//                     id="isActive"
//                     checked={formData.isActive}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-mainBlue focus:ring-mainBlue border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="isActive"
//                     className="ml-2 block text-sm text-gray-700"
//                   >
//                     Active
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Priority (Higher = More Important)
//                 </label>
//                 <input
//                   type="number"
//                   name="priority"
//                   value={formData.priority}
//                   onChange={handleChange}
//                   min="0"
//                   max="100"
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 />
//               </div>
//             </div>

//             {/* Date Range */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   End Date (Optional)
//                 </label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {/* Target Pages */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Target Pages
//               </label>
//               <div className="grid grid-cols-2 gap-2">
//                 {pageOptions.map((option) => (
//                   <div key={option.value} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`page-${option.value}`}
//                       value={option.value}
//                       checked={formData.targetPages.includes(option.value)}
//                       onChange={handleTargetPagesChange}
//                       className="h-4 w-4 text-mainBlue focus:ring-mainBlue border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor={`page-${option.value}`}
//                       className="ml-2 block text-sm text-gray-700"
//                     >
//                       {option.label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Advertisement Image *
//               </label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                   {imagePreview ? (
//                     <div>
//                       <img
//                         src={imagePreview || "/placeholder.svg"}
//                         alt="Preview"
//                         className="mx-auto h-64 w-auto object-contain"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setImagePreview("");
//                           setImageFile(null);
//                         }}
//                         className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ) : (
//                     <div>
//                       <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
//                       <div className="flex text-sm text-gray-600">
//                         <label
//                           htmlFor="image-upload"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-mainBlue hover:text-blue-500 focus-within:outline-none"
//                         >
//                           <span>Upload a file</span>
//                           <input
//                             id="image-upload"
//                             name="image"
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-500">
//                         PNG, JPG, GIF up to 5MB
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Image Size Recommendations */}
//             <div className="bg-gray-50 p-3 rounded-md">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">
//                 Recommended Image Sizes:
//               </h4>
//               <ul className="text-xs text-gray-600 space-y-1">
//                 <li>• Banner: 1200 × 300 pixels</li>
//                 <li>• Sidebar: 300 × 600 pixels</li>
//                 <li>• Popup: 600 × 400 pixels</li>
//                 <li>• Inline: 800 × 400 pixels</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-8 flex justify-end">
//           <button
//             type="button"
//             onClick={() => navigate("/admin/advertisements")}
//             className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mainBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <IoSave className="mr-2" />
//                 {isEditMode ? "Update Advertisement" : "Create Advertisement"}
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdvertisementForm;
