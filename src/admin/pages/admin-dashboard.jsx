import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, DollarSign, Users, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import CarList from "../components/CarList";
import RecentSales from "../components/RecentSales";
import StatCard from "../components/StatCard";
import UserAnalytics from "../components/UserAnalytics";
import useStore from "../../data/store/store";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">
              Welcome {user.role === "superadmin" ? "Super Admin" : "Admin"}
            </h3>
            <div className="mt-4">
              <div className="w-full lg:grid-cols-4 md:grid-cols-2 justify-between grid-cols-1 grid -mx-6">
                <StatCard
                  title="Total Cars"
                  value="50"
                  icon={<Car className="h-6 w-6" />}
                />
                <StatCard
                  title="Total Sales"
                  value="$500,000"
                  icon={<DollarSign className="h-6 w-6" />}
                />
                <StatCard
                  title="Customers"
                  value="100"
                  icon={<Users className="h-6 w-6" />}
                />
                <StatCard
                  title="Growth"
                  value="15%"
                  icon={<TrendingUp className="h-6 w-6" />}
                />
              </div>
            </div>
            <div>
              <UserAnalytics />
            </div>
            {/* <div className="mt-8">
              <CarList />
            </div>
            <div className="mt-8">
              <RecentSales />
            </div> */}
          </div>

          <div className="mt-8 px-6">
            {user.role === "superadmin" && (
              <button
                onClick={() => navigate("/create-admin")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create Admin
              </button>
            )}
            {["superadmin", "admin"].includes(user.role) && (
              <button
                onClick={() => navigate("/manage-cars")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors ml-4"
              >
                Manage Cars
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

// import React, { useEffect, useState } from "react";
// import { Car, DollarSign, Users, TrendingUp } from "lucide-react";
// import Header from "../components/Header";
// import CarList from "../components/CarList";
// import RecentSales from "../components/RecentSales";

// import StatCard from "../components/StatCard";
// import UserAnalytics from "../components/UserAnalytics";
// import { getUserFromToken } from "../../utils/jwt";
// import { useNavigate } from "react-router-dom";

// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userFromToken = getUserFromToken();
//     setUser(userFromToken);
//   }, []);
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
//           <div className="container mx-auto px-6 py-8">
//             <h3 className="text-gray-700 text-3xl font-medium">
//               {role === "superadmin"
//                 ? " Welcome Super Admin"
//                 : " Welcome Admin"}
//             </h3>
//             <div className="mt-4">
//               <div className="flex flex-wrap -mx-6">
//                 <StatCard
//                   title="Total Cars"
//                   value="50"
//                   icon={<Car className="h-6 w-6" />}
//                 />
//                 <StatCard
//                   title="Total Sales"
//                   value="$500,000"
//                   icon={<DollarSign className="h-6 w-6" />}
//                 />
//                 <StatCard
//                   title="Total Customers"
//                   value="100"
//                   icon={<Users className="h-6 w-6" />}
//                 />
//                 <StatCard
//                   title="Growth"
//                   value="15%"
//                   icon={<TrendingUp className="h-6 w-6" />}
//                 />
//               </div>
//             </div>
//             <div>
//               <UserAnalytics />
//             </div>
//             <div className="mt-8">
//               <CarList />
//             </div>
//             <div className="mt-8">
//               <RecentSales />
//             </div>
//           </div>

//           <div>
//             {user && user.role === "superadmin" && (
//               <button>Create Admin</button>
//             )}
//             {user && ["superadmin", "admin"].includes(user.role) && (
//               <button>Manage Cars</button>
//             )}
//           </div>

//           <div>
//             {user?.role === "super_admin" && (
//               <button onClick={() => navigate("/create-admin")}>
//                 Click here to create an admin
//               </button>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
