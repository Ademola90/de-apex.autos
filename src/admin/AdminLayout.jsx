import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "./pages/sideBar";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[20%] ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className=" w-full overflow-y-auto">
        {/* topbar */}
        {/* Admin-pages */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

// import React from "react";

// const AdminLayout = () => {
//   return (
//     <div>
//       <p>Admin Layout</p>
//     </div>
//   );
// };

// export default AdminLayout;
