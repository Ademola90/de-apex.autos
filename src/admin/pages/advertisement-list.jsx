"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import {
  IoAdd,
  IoTrash,
  IoPencil,
  IoEye,
  IoEyeOff,
  IoSearch,
} from "react-icons/io5";
import Header from "../components/Header";

const AdvertisementList = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      setLoading(true);
      const response = await api.get("/advertisement");
      setAdvertisements(response.data.advertisements);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
      toast.error("Failed to load advertisements");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await api.put(`/advertisement/${id}`, {
        isActive: !currentStatus,
      });

      // Update local state
      setAdvertisements(
        advertisements.map((ad) =>
          ad._id === id ? { ...ad, isActive: !currentStatus } : ad
        )
      );

      toast.success(
        `Advertisement ${!currentStatus ? "activated" : "deactivated"}`
      );
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update advertisement status");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this advertisement?")
    ) {
      return;
    }

    try {
      await api.delete(`/advertisement/${id}`);
      setAdvertisements(advertisements.filter((ad) => ad._id !== id));
      toast.success("Advertisement deleted successfully");
    } catch (error) {
      console.error("Error deleting advertisement:", error);
      toast.error("Failed to delete advertisement");
    }
  };

  // Filter advertisements based on search and filters
  const filteredAdvertisements = advertisements.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || ad.category === filterCategory;
    const matchesType = filterType === "all" || ad.type === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && ad.isActive) ||
      (filterStatus === "inactive" && !ad.isActive);

    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const categories = {
      general: "General",
      cars: "Cars",
      accessories: "Accessories",
      "car-hire": "Car Hire",
    };
    return categories[category] || category;
  };

  // Get type label
  const getTypeLabel = (type) => {
    const types = {
      banner: "Banner",
      sidebar: "Sidebar",
      popup: "Popup",
      inline: "Inline",
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-16 bg-gray-200 rounded w-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Advertisements</h2>
          <button
            onClick={() => navigate("/admin/advertisement-form")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mainBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
          >
            <IoAdd className="mr-2" /> New Ads
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search advertisements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="cars">Cars</option>
                <option value="accessories">Accessories</option>
                <option value="car-hire">Car Hire</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="banner">Banner</option>
                <option value="sidebar">Sidebar</option>
                <option value="popup">Popup</option>
                <option value="inline">Inline</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredAdvertisements.length} of {advertisements.length}{" "}
          advertisements
        </div>

        {/* Table */}
        {filteredAdvertisements.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Advertisement
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Performance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdvertisements.map((ad) => (
                  <tr key={ad._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          {ad.image && ad.image.secure_url ? (
                            <img
                              className="h-16 w-16 object-cover rounded"
                              src={ad.image.secure_url || "/placeholder.svg"}
                              alt={ad.title}
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {ad.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {ad.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getTypeLabel(ad.type)} /{" "}
                        {getCategoryLabel(ad.category)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(ad.startDate)} -{" "}
                        {ad.endDate ? formatDate(ad.endDate) : "No End Date"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Priority: {ad.priority}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ad.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ad.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>Clicks: {ad.clicks || 0}</span>
                        <span>Impressions: {ad.impressions || 0}</span>
                        <span>
                          CTR:{" "}
                          {ad.impressions
                            ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
                            : 0}
                          %
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleToggleStatus(ad._id, ad.isActive)
                          }
                          className={`p-1 rounded-full ${
                            ad.isActive
                              ? "text-green-600 hover:text-green-900"
                              : "text-red-600 hover:text-red-900"
                          }`}
                          title={ad.isActive ? "Deactivate" : "Activate"}
                        >
                          {ad.isActive ? <IoEye /> : <IoEyeOff />}
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/advertisement-form/${ad._id}`)
                          }
                          className="p-1 text-indigo-600 hover:text-indigo-900 rounded-full"
                          title="Edit"
                        >
                          <IoPencil />
                        </button>
                        <button
                          onClick={() => handleDelete(ad._id)}
                          className="p-1 text-red-600 hover:text-red-900 rounded-full"
                          title="Delete"
                        >
                          <IoTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No advertisements found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setFilterType("all");
                setFilterStatus("all");
              }}
              className="mt-2 text-mainBlue hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementList;

// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../../utils/api";
// import {
//   IoAdd,
//   IoTrash,
//   IoPencil,
//   IoEye,
//   IoEyeOff,
//   IoSearch,
// } from "react-icons/io5";

// const AdvertisementList = () => {
//   const [advertisements, setAdvertisements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [filterType, setFilterType] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAdvertisements();
//   }, []);

//   const fetchAdvertisements = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/advertisement");
//       setAdvertisements(response.data.advertisements);
//     } catch (error) {
//       console.error("Error fetching advertisements:", error);
//       toast.error("Failed to load advertisements");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleStatus = async (id, currentStatus) => {
//     try {
//       await api.put(`/advertisement/${id}`, {
//         isActive: !currentStatus,
//       });

//       // Update local state
//       setAdvertisements(
//         advertisements.map((ad) =>
//           ad._id === id ? { ...ad, isActive: !currentStatus } : ad
//         )
//       );

//       toast.success(
//         `Advertisement ${!currentStatus ? "activated" : "deactivated"}`
//       );
//     } catch (error) {
//       console.error("Error toggling status:", error);
//       toast.error("Failed to update advertisement status");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (
//       !window.confirm("Are you sure you want to delete this advertisement?")
//     ) {
//       return;
//     }

//     try {
//       await api.delete(`/advertisement/${id}`);
//       setAdvertisements(advertisements.filter((ad) => ad._id !== id));
//       toast.success("Advertisement deleted successfully");
//     } catch (error) {
//       console.error("Error deleting advertisement:", error);
//       toast.error("Failed to delete advertisement");
//     }
//   };

//   // Filter advertisements based on search and filters
//   const filteredAdvertisements = advertisements.filter((ad) => {
//     const matchesSearch =
//       ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ad.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       filterCategory === "all" || ad.category === filterCategory;
//     const matchesType = filterType === "all" || ad.type === filterType;
//     const matchesStatus =
//       filterStatus === "all" ||
//       (filterStatus === "active" && ad.isActive) ||
//       (filterStatus === "inactive" && !ad.isActive);

//     return matchesSearch && matchesCategory && matchesType && matchesStatus;
//   });

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   // Get category label
//   const getCategoryLabel = (category) => {
//     const categories = {
//       general: "General",
//       cars: "Cars",
//       accessories: "Accessories",
//       "car-hire": "Car Hire",
//     };
//     return categories[category] || category;
//   };

//   // Get type label
//   const getTypeLabel = (type) => {
//     const types = {
//       banner: "Banner",
//       sidebar: "Sidebar",
//       popup: "Popup",
//       inline: "Inline",
//     };
//     return types[type] || type;
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//           <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
//           <div className="space-y-4">
//             {[...Array(5)].map((_, index) => (
//               <div
//                 key={index}
//                 className="h-16 bg-gray-200 rounded w-full"
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Advertisements</h2>
//         <button
//           onClick={() => navigate("/admin/advertisement-form")}
//           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mainBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBlue"
//         >
//           <IoAdd className="mr-2" /> New Advertisement
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="mb-6 bg-gray-50 p-4 rounded-lg">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <IoSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search advertisements..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
//             >
//               <option value="all">All Categories</option>
//               <option value="general">General</option>
//               <option value="cars">Cars</option>
//               <option value="accessories">Accessories</option>
//               <option value="car-hire">Car Hire</option>
//             </select>

//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
//             >
//               <option value="all">All Types</option>
//               <option value="banner">Banner</option>
//               <option value="sidebar">Sidebar</option>
//               <option value="popup">Popup</option>
//               <option value="inline">Inline</option>
//             </select>

//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Results count */}
//       <div className="mb-4 text-sm text-gray-600">
//         Showing {filteredAdvertisements.length} of {advertisements.length}{" "}
//         advertisements
//       </div>

//       {/* Table */}
//       {filteredAdvertisements.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Advertisement
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Details
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Status
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Performance
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredAdvertisements.map((ad) => (
//                 <tr key={ad._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-16 w-16">
//                         {ad.image && ad.image.secure_url ? (
//                           <img
//                             className="h-16 w-16 object-cover rounded"
//                             src={ad.image.secure_url || "/placeholder.svg"}
//                             alt={ad.title}
//                           />
//                         ) : (
//                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
//                             No Image
//                           </div>
//                         )}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {ad.title}
//                         </div>
//                         <div className="text-sm text-gray-500 line-clamp-1">
//                           {ad.description}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {getTypeLabel(ad.type)} / {getCategoryLabel(ad.category)}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {formatDate(ad.startDate)} -{" "}
//                       {ad.endDate ? formatDate(ad.endDate) : "No End Date"}
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       Priority: {ad.priority}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         ad.isActive
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {ad.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex flex-col">
//                       <span>Clicks: {ad.clicks || 0}</span>
//                       <span>Impressions: {ad.impressions || 0}</span>
//                       <span>
//                         CTR:{" "}
//                         {ad.impressions
//                           ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
//                           : 0}
//                         %
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleToggleStatus(ad._id, ad.isActive)}
//                         className={`p-1 rounded-full ${
//                           ad.isActive
//                             ? "text-green-600 hover:text-green-900"
//                             : "text-red-600 hover:text-red-900"
//                         }`}
//                         title={ad.isActive ? "Deactivate" : "Activate"}
//                       >
//                         {ad.isActive ? <IoEye /> : <IoEyeOff />}
//                       </button>
//                       <button
//                         onClick={() =>
//                           navigate(`/admin/advertisements/edit/${ad._id}`)
//                         }
//                         className="p-1 text-indigo-600 hover:text-indigo-900 rounded-full"
//                         title="Edit"
//                       >
//                         <IoPencil />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(ad._id)}
//                         className="p-1 text-red-600 hover:text-red-900 rounded-full"
//                         title="Delete"
//                       >
//                         <IoTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-10 bg-gray-50 rounded-lg">
//           <p className="text-gray-500">No advertisements found</p>
//           <button
//             onClick={() => {
//               setSearchTerm("");
//               setFilterCategory("all");
//               setFilterType("all");
//               setFilterStatus("all");
//             }}
//             className="mt-2 text-mainBlue hover:text-blue-700"
//           >
//             Clear filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdvertisementList;
