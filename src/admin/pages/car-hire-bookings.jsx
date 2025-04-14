"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from "lucide-react";
import Header from "../components/Header";
import {
  fetchAllBookings,
  updateBookingStatus,
  updatePaymentStatus,
} from "../../utils/carHireApi";
import { toast } from "react-toastify";

const CarHireBookings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");

  // Fetch bookings from API
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchAllBookings();
        setBookings(response.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const getDateFilteredBookings = (bookings) => {
    if (filterDate === "all") return bookings;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    switch (filterDate) {
      case "today":
        return bookings.filter((booking) => {
          const pickupDate = new Date(booking.pickupDate);
          return pickupDate.toDateString() === today.toDateString();
        });
      case "tomorrow":
        return bookings.filter((booking) => {
          const pickupDate = new Date(booking.pickupDate);
          return pickupDate.toDateString() === tomorrow.toDateString();
        });
      case "week":
        return bookings.filter((booking) => {
          const pickupDate = new Date(booking.pickupDate);
          return pickupDate >= today && pickupDate <= nextWeek;
        });
      case "month":
        return bookings.filter((booking) => {
          const pickupDate = new Date(booking.pickupDate);
          return pickupDate >= today && pickupDate <= nextMonth;
        });
      default:
        return bookings;
    }
  };

  const filteredBookings = getDateFilteredBookings(bookings).filter(
    (booking) => {
      const matchesSearch =
        booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.customerDetails?.fullName &&
          booking.customerDetails.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (booking.car &&
          booking.car.name &&
          booking.car.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        filterStatus === "all" || booking.status === filterStatus;

      return matchesSearch && matchesStatus;
    }
  );

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
      toast.success("Booking status updated successfully");
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status. Please try again.");
    }
  };

  const handlePaymentStatusChange = async (id, paymentStatus) => {
    try {
      await updatePaymentStatus(id, paymentStatus);
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, paymentStatus } : booking
        )
      );
      toast.success("Payment status updated successfully");
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            Pending
          </span>
        );
      case "completed":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            Unknown
          </span>
        );
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Paid
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            Pending
          </span>
        );
      case "refunded":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            Refunded
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            Unknown
          </span>
        );
    }
  };

  const exportBookings = () => {
    // In a real app, you would generate a CSV or PDF file
    // For now, we'll just log the bookings to the console
    console.log("Exporting bookings:", filteredBookings);
    toast.info(
      "Bookings export functionality will be implemented in production"
    );
  };

  // Helper function to safely render location objects
  const formatLocation = (location) => {
    if (!location) return "N/A";
    if (typeof location === "object") {
      return `${location.city || ""}, ${location.state || ""}`;
    }
    return location;
  };

  return (
    <div className="">
      <Header />
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Car Hire Bookings
            </h1>
            <p className="text-gray-600">Manage all car rental bookings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={exportBookings}
              className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Download size={18} className="mr-2" />
              Export Bookings
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by ID, customer name or car..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="lg:flex md:flex grid gap-4">
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  className="lg:pl-10 md:pl-8 pl-8 p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  className="pl-10 p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">Next 7 Days</option>
                  <option value="month">Next 30 Days</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Booking ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Car
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pickup
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Return
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
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
                      Payment
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
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No bookings found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.bookingId}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customerDetails?.fullName || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.customerDetails?.phone || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {booking.car?.name || "Car details not available"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.driverOption === "self"
                              ? "Self Drive"
                              : "With Chauffeur"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(booking.pickupDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.pickupTime},{" "}
                            {formatLocation(booking.pickupLocation)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.returnTime},{" "}
                            {formatLocation(booking.dropoffLocation)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ₦{booking.totalPrice?.toLocaleString() || "0"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.totalDays} day
                            {booking.totalDays > 1 ? "s" : ""}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative">
                            {getStatusBadge(booking.status)}
                            <select
                              className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                              value={booking.status}
                              onChange={(e) =>
                                handleStatusChange(booking._id, e.target.value)
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative">
                            {getPaymentStatusBadge(booking.paymentStatus)}
                            <select
                              className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                              value={booking.paymentStatus}
                              onChange={(e) =>
                                handlePaymentStatusChange(
                                  booking._id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() =>
                              (window.location.href = `/admin/booking-details/${booking._id}`)
                            }
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Total Bookings
              </h2>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {bookings.length}
            </div>
            <p className="text-gray-600 text-sm">All time bookings</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Confirmed</h2>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {
                bookings.filter((booking) => booking.status === "confirmed")
                  .length
              }
            </div>
            <p className="text-gray-600 text-sm">
              {bookings.length > 0
                ? `${Math.round(
                    (bookings.filter(
                      (booking) => booking.status === "confirmed"
                    ).length /
                      bookings.length) *
                      100
                  )}% of total bookings`
                : "0% of total bookings"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {
                bookings.filter((booking) => booking.status === "pending")
                  .length
              }
            </div>
            <p className="text-gray-600 text-sm">
              {bookings.length > 0
                ? `${Math.round(
                    (bookings.filter((booking) => booking.status === "pending")
                      .length /
                      bookings.length) *
                      100
                  )}% of total bookings`
                : "0% of total bookings"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Cancelled</h2>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle size={20} className="text-red-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {
                bookings.filter((booking) => booking.status === "cancelled")
                  .length
              }
            </div>
            <p className="text-gray-600 text-sm">
              {bookings.length > 0
                ? `${Math.round(
                    (bookings.filter(
                      (booking) => booking.status === "cancelled"
                    ).length /
                      bookings.length) *
                      100
                  )}% of total bookings`
                : "0% of total bookings"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHireBookings;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   Calendar,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Download,
// } from "lucide-react";
// import Header from "../components/Header";
// import {
//   fetchAllBookings,
//   updateBookingStatus,
//   updatePaymentStatus,
// } from "../../utils/carHireApi";
// import { toast } from "react-toastify";

// const CarHireBookings = () => {
//       useEffect(() => {
//         window.scrollTo(0, 0);
//       }, []);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterDate, setFilterDate] = useState("all");

//   // Fetch bookings from API
//   useEffect(() => {
//     const loadBookings = async () => {
//       try {
//         setLoading(true);
//         const response = await fetchAllBookings();
//         setBookings(response.bookings || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         toast.error("Failed to load bookings. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBookings();
//   }, []);

//   const getDateFilteredBookings = (bookings) => {
//     if (filterDate === "all") return bookings;

//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const nextWeek = new Date(today);
//     nextWeek.setDate(nextWeek.getDate() + 7);

//     const nextMonth = new Date(today);
//     nextMonth.setMonth(nextMonth.getMonth() + 1);

//     switch (filterDate) {
//       case "today":
//         return bookings.filter((booking) => {
//           const pickupDate = new Date(booking.pickupDate);
//           return pickupDate.toDateString() === today.toDateString();
//         });
//       case "tomorrow":
//         return bookings.filter((booking) => {
//           const pickupDate = new Date(booking.pickupDate);
//           return pickupDate.toDateString() === tomorrow.toDateString();
//         });
//       case "week":
//         return bookings.filter((booking) => {
//           const pickupDate = new Date(booking.pickupDate);
//           return pickupDate >= today && pickupDate <= nextWeek;
//         });
//       case "month":
//         return bookings.filter((booking) => {
//           const pickupDate = new Date(booking.pickupDate);
//           return pickupDate >= today && pickupDate <= nextMonth;
//         });
//       default:
//         return bookings;
//     }
//   };

//   const filteredBookings = getDateFilteredBookings(bookings).filter(
//     (booking) => {
//       const matchesSearch =
//         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (booking.customerDetails.fullName &&
//           booking.customerDetails.fullName
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase())) ||
//         (booking.car &&
//           booking.car.name &&
//           booking.car.name.toLowerCase().includes(searchTerm.toLowerCase()));

//       const matchesStatus =
//         filterStatus === "all" || booking.status === filterStatus;

//       return matchesSearch && matchesStatus;
//     }
//   );

//   const handleStatusChange = async (id, status) => {
//     try {
//       await updateBookingStatus(id, status);
//       setBookings(
//         bookings.map((booking) =>
//           booking._id === id ? { ...booking, status } : booking
//         )
//       );
//       toast.success("Booking status updated successfully");
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       toast.error("Failed to update booking status. Please try again.");
//     }
//   };

//   const handlePaymentStatusChange = async (id, paymentStatus) => {
//     try {
//       await updatePaymentStatus(id, paymentStatus);
//       setBookings(
//         bookings.map((booking) =>
//           booking._id === id ? { ...booking, paymentStatus } : booking
//         )
//       );
//       toast.success("Payment status updated successfully");
//     } catch (error) {
//       console.error("Error updating payment status:", error);
//       toast.error("Failed to update payment status. Please try again.");
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "confirmed":
//         return (
//           <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
//             Confirmed
//           </span>
//         );
//       case "pending":
//         return (
//           <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
//             Pending
//           </span>
//         );
//       case "completed":
//         return (
//           <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
//             Completed
//           </span>
//         );
//       case "cancelled":
//         return (
//           <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
//             Cancelled
//           </span>
//         );
//       default:
//         return (
//           <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
//             Unknown
//           </span>
//         );
//     }
//   };

//   const getPaymentStatusBadge = (status) => {
//     switch (status) {
//       case "paid":
//         return (
//           <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
//             Paid
//           </span>
//         );
//       case "pending":
//         return (
//           <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
//             Pending
//           </span>
//         );
//       case "refunded":
//         return (
//           <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
//             Refunded
//           </span>
//         );
//       default:
//         return (
//           <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
//             Unknown
//           </span>
//         );
//     }
//   };

//   const exportBookings = () => {
//     // In a real app, you would generate a CSV or PDF file
//     // For now, we'll just log the bookings to the console
//     console.log("Exporting bookings:", filteredBookings);
//     toast.info(
//       "Bookings export functionality will be implemented in production"
//     );
//   };

//   return (
//     <div className="">
//       <Header />
//       <div className="p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Car Hire Bookings
//             </h1>
//             <p className="text-gray-600">Manage all car rental bookings</p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <button
//               onClick={exportBookings}
//               className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center"
//             >
//               <Download size={18} className="mr-2" />
//               Export Bookings
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by ID, customer name or car..."
//                 className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="lg:flex md:flex grid gap-4">
//               <div className="relative">
//                 <Filter
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <select
//                   className="lg:pl-10 md:pl-8 pl-8 p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="pending">Pending</option>
//                   <option value="completed">Completed</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>

//               <div className="relative">
//                 <Calendar
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <select
//                   className="pl-10 p-2 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                 >
//                   <option value="all">All Dates</option>
//                   <option value="today">Today</option>
//                   <option value="tomorrow">Tomorrow</option>
//                   <option value="week">Next 7 Days</option>
//                   <option value="month">Next 30 Days</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainBlue"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Booking ID
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Customer
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Car
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Pickup
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Return
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Amount
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Status
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Payment
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredBookings.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="9"
//                         className="px-6 py-4 text-center text-gray-500"
//                       >
//                         No bookings found matching your criteria
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredBookings.map((booking) => (
//                       <tr key={booking._id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {booking.bookingId}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {new Date(booking.createdAt).toLocaleDateString()}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {booking.customerDetails.fullName}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {booking.customerDetails.phone}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {booking.car?.name || "Car details not available"}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {booking.driverOption === "self"
//                               ? "Self Drive"
//                               : "With Chauffeur"}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {new Date(booking.pickupDate).toLocaleDateString()}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {booking.pickupTime}, {booking.pickupLocation}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {new Date(booking.returnDate).toLocaleDateString()}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {booking.returnTime}, {booking.dropoffLocation}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             ₦{booking.totalPrice.toLocaleString()}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {booking.totalDays} day
//                             {booking.totalDays > 1 ? "s" : ""}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="relative">
//                             {getStatusBadge(booking.status)}
//                             <select
//                               className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
//                               value={booking.status}
//                               onChange={(e) =>
//                                 handleStatusChange(booking._id, e.target.value)
//                               }
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="completed">Completed</option>
//                               <option value="cancelled">Cancelled</option>
//                             </select>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="relative">
//                             {getPaymentStatusBadge(booking.paymentStatus)}
//                             <select
//                               className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
//                               value={booking.paymentStatus}
//                               onChange={(e) =>
//                                 handlePaymentStatusChange(
//                                   booking._id,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="paid">Paid</option>
//                               <option value="refunded">Refunded</option>
//                             </select>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <button
//                             className="text-blue-600 hover:text-blue-900"
//                             onClick={() =>
//                               (window.location.href = `/admin/booking-details/${booking._id}`)
//                             }
//                           >
//                             <Eye size={16} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Total Bookings
//               </h2>
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                 <Calendar size={20} className="text-blue-600" />
//               </div>
//             </div>
//             <div className="text-3xl font-bold text-gray-800 mb-2">
//               {bookings.length}
//             </div>
//             <p className="text-gray-600 text-sm">All time bookings</p>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Confirmed</h2>
//               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                 <CheckCircle size={20} className="text-green-600" />
//               </div>
//             </div>
//             <div className="text-3xl font-bold text-gray-800 mb-2">
//               {
//                 bookings.filter((booking) => booking.status === "confirmed")
//                   .length
//               }
//             </div>
//             <p className="text-gray-600 text-sm">
//               {bookings.length > 0
//                 ? `${Math.round(
//                     (bookings.filter(
//                       (booking) => booking.status === "confirmed"
//                     ).length /
//                       bookings.length) *
//                       100
//                   )}% of total bookings`
//                 : "0% of total bookings"}
//             </p>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
//               <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
//                 <Clock size={20} className="text-yellow-600" />
//               </div>
//             </div>
//             <div className="text-3xl font-bold text-gray-800 mb-2">
//               {
//                 bookings.filter((booking) => booking.status === "pending")
//                   .length
//               }
//             </div>
//             <p className="text-gray-600 text-sm">
//               {bookings.length > 0
//                 ? `${Math.round(
//                     (bookings.filter((booking) => booking.status === "pending")
//                       .length /
//                       bookings.length) *
//                       100
//                   )}% of total bookings`
//                 : "0% of total bookings"}
//             </p>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Cancelled</h2>
//               <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
//                 <XCircle size={20} className="text-red-600" />
//               </div>
//             </div>
//             <div className="text-3xl font-bold text-gray-800 mb-2">
//               {
//                 bookings.filter((booking) => booking.status === "cancelled")
//                   .length
//               }
//             </div>
//             <p className="text-gray-600 text-sm">
//               {bookings.length > 0
//                 ? `${Math.round(
//                     (bookings.filter(
//                       (booking) => booking.status === "cancelled"
//                     ).length /
//                       bookings.length) *
//                       100
//                   )}% of total bookings`
//                 : "0% of total bookings"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarHireBookings;
