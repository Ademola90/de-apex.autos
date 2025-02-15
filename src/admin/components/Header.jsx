//admin/components/Header.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";
import useStore from "../../data/store/store";
import { Bell, Search } from "lucide-react";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none lg:hidden">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {/* ... (previous header content) */}

      <div className="flex items-center">
        <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-5 w-5 text-gray-500" />
          </span>
          <input
            className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
            type="text"
            placeholder="Search"
          />
        </div>
        <button className="flex mx-4 text-gray-600 focus:outline-none">
          <Bell className="h-6 w-6" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="relative z-10 block h-8 w-8 rounded-full overflow-hidden focus:outline-none"
          >
            <img
              className="h-full w-full object-cover"
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
              }
              alt="Your avatar"
            />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-800">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
                <User className="inline-block w-4 h-4 mr-2" />
                Profile
              </p>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
                <Settings className="inline-block w-4 h-4 mr-2" />
                Settings
              </p>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >
                <LogOut className="inline-block w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React from "react";
// import { Bell, Search, User } from "lucide-react";

// const Header = () => {
//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
//       <div className="flex items-center">
//         <button className="text-gray-500 focus:outline-none lg:hidden">
//           <svg
//             className="h-6 w-6"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M4 6H20M4 12H20M4 18H11"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>
//       <div className="flex items-center">
//         <div className="relative mx-4 lg:mx-0">
//           <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//             <Search className="h-5 w-5 text-gray-500" />
//           </span>
//           <input
//             className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
//             type="text"
//             placeholder="Search"
//           />
//         </div>
//         <button className="flex mx-4 text-gray-600 focus:outline-none">
//           <Bell className="h-6 w-6" />
//         </button>
//         <div className="relative">
//           <button className="relative z-10 block h-8 w-8 rounded-full overflow-hidden focus:outline-none">
//             <img
//               className="h-full w-full object-cover"
//               src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
//               alt="Your avatar"
//             />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
