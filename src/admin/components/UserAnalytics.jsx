// admin/components/UserAnalytics.jsx
import React, { useState, useEffect } from "react";
import { Users, Calendar, Clock } from "lucide-react";
import useStore from "../../data/store/store";
import api from "../../utils/api";

const UserAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    dailyUsers: 0,
    weeklyUsers: 0,
    monthlyUsers: 0,
    activeUsers: 0,
  });

  const { user } = useStore();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Call the API endpoint
        const response = await api.get("/users/analytics");
        // Update state with the fetched analytics data
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", {
          message: error.message,
          request: error.config,
          response: error.response ? error.response.data : null,
        });
      }
    };

    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">
              {analytics.totalUsers}
            </p>
          </div>
          <Users className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      {/* Daily Active Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Daily Active Users
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {analytics.dailyUsers}
            </p>
          </div>
          <Clock className="w-8 h-8 text-green-600" />
        </div>
      </div>

      {/* Weekly Active Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Weekly Active Users
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {analytics.weeklyUsers}
            </p>
          </div>
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* Monthly Active Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Monthly Active Users
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {analytics.monthlyUsers}
            </p>
          </div>
          <Users className="w-8 h-8 text-purple-600" />
        </div>
      </div>

      {/* Active Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-semibold text-gray-900">
              {analytics.activeUsers}
            </p>
          </div>
          <Users className="w-8 h-8 text-orange-600" />
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;

// // admin/components/UserAnalytics
// import React, { useState, useEffect } from "react"
// import { Users, Calendar, Clock } from "lucide-react"
// import useStore from "../../data/store/store"
// import api from "../../utils/api"

// const UserAnalytics = () => {
//   const [analytics, setAnalytics] = useState({
//     totalUsers: 0,
//     dailyUsers: 0,
//     weeklyUsers: 0,
//     monthlyUsers: 0,
//   })
//   const { user } = useStore()

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await api.get("/auth/user-analytics", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         })
//         setAnalytics(response.data)
//       } catch (error) {
//         console.error("Error fetching analytics:", error)
//       }
//     }

//     if (user && user.token) {
//       fetchAnalytics()
//     }
//   }, [user])

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">Total Users</p>
//             <p className="text-2xl font-semibold text-gray-900">{analytics.totalUsers}</p>
//           </div>
//           <Users className="w-8 h-8 text-indigo-600" />
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">Daily Active Users</p>
//             <p className="text-2xl font-semibold text-gray-900">{analytics.dailyUsers}</p>
//           </div>
//           <Clock className="w-8 h-8 text-green-600" />
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">Weekly Active Users</p>
//             <p className="text-2xl font-semibold text-gray-900">{analytics.weeklyUsers}</p>
//           </div>
//           <Calendar className="w-8 h-8 text-blue-600" />
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">Monthly Active Users</p>
//             <p className="text-2xl font-semibold text-gray-900">{analytics.monthlyUsers}</p>
//           </div>
//           <Users className="w-8 h-8 text-purple-600" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserAnalytics

// import React, { useState, useEffect } from "react";
// import { Users, Calendar, Clock } from "lucide-react";
// import axios from "axios";
// import useStore from "../../data/store/store";

// const UserAnalytics = () => {
//   const [analytics, setAnalytics] = useState({
//     totalUsers: 0,
//     dailyUsers: 0,
//     weeklyUsers: 0,
//     monthlyUsers: 0,
//   });
//   const { user } = useStore();

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/user-analytics",
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         setAnalytics(response.data);
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//       }
//     };

//     if (user && user.token) {
//       fetchAnalytics();
//     }
//   }, [user]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">Total Users</p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {analytics.totalUsers}
//             </p>
//           </div>
//           <Users className="w-8 h-8 text-indigo-600" />
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">
//               Daily Active Users
//             </p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {analytics.dailyUsers}
//             </p>
//           </div>
//           <Clock className="w-8 h-8 text-green-600" />
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">
//               Weekly Active Users
//             </p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {analytics.weeklyUsers}
//             </p>
//           </div>
//           <Calendar className="w-8 h-8 text-blue-600" />
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-600">
//               Monthly Active Users
//             </p>
//             <p className="text-2xl font-semibold text-gray-900">
//               {analytics.monthlyUsers}
//             </p>
//           </div>
//           <Users className="w-8 h-8 text-purple-600" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAnalytics;
