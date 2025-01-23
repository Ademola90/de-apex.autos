import React from "react";
import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-4">
          <Link
            to="dashboard"
            className="py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
          >
            Dashboard
          </Link>
          <Link
            to="settings"
            className="py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
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
