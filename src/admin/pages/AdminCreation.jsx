// AdminCreation.jsx

import { useState } from "react";
import { toast } from "react-toastify";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import api from "../../utils/api";
import { Buttons } from "../../components/buttons";
import { useNavigate } from "react-router-dom";

const AdminCreation = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic form validation
    if (
      !adminData.firstName ||
      !adminData.lastName ||
      !adminData.email ||
      !adminData.password
    ) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debugging: Log the token

      if (!token) {
        toast.error("You are not logged in. Please log in.");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Request config:", config); // Debugging: Log the request config

      await api.post("/super-admin/create-admin", adminData, config);
      toast.success("Admin created successfully");
      setAdminData({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      console.error("Error creating admin:", error); // Debugging: Log the full error
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      toast.error(error.response?.data?.message || "Error creating admin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Create New Admin</h2>
      <form
        onSubmit={handleCreateAdmin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={adminData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={adminData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 pl-10 pr-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
              placeholder="******************"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              required
            />
            {/* Show/Hide Password Icon */}
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Admin"}
          </button>

          <Buttons
            css=" text-main font-Poppins text-base font-normal px-4 py-2 hover:scale-105 ease-in duration-300"
            text="Go To Login Page"
            disabled={isLoading}
            onClick={() => navigate("/login")}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminCreation;

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { User, Mail, Lock } from "lucide-react";
// import api from "../../utils/api";

// const AdminCreation = () => {
//   const [adminData, setAdminData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setAdminData({ ...adminData, [e.target.name]: e.target.value });
//   };

//   const handleCreateAdmin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Basic form validation
//     if (
//       !adminData.firstName ||
//       !adminData.lastName ||
//       !adminData.email ||
//       !adminData.password
//     ) {
//       toast.error("Please fill in all fields");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await api.post("/super-admin/create-admin", adminData);
//       toast.success("Admin created successfully");
//       // Reset form after successful creation
//       setAdminData({ firstName: "", lastName: "", email: "", password: "" });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error creating admin");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-5 text-center">Create New Admin</h2>
//       <form
//         onSubmit={handleCreateAdmin}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//       >
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="name"
//           >
//             Name
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <User className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               type="text"
//               placeholder="Full Name"
//               name="name"
//               value={adminData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={adminData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="******************"
//               name="password"
//               value={adminData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               isLoading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Creating..." : "Create Admin"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminCreation;
