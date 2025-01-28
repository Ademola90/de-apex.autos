import React from "react";
import { Car, DollarSign, Users, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import CarList from "../components/CarList";
import RecentSales from "../components/RecentSales";

import StatCard from "../components/StatCard";
import UserAnalytics from "../components/UserAnalytics";

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
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
                  title="Total Customers"
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
            <div className="mt-8">
              <CarList />
            </div>
            <div className="mt-8">
              <RecentSales />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

// import React from "react";

// function DashboardPage() {
//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <p>Welcome to the dashboard page.</p>
//     </div>
//   );
// }

// export default DashboardPage;
