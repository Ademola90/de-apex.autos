// screen/Login.jsx

// screen/Login.jsx (modified)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginimg from "../assets/signupimg.jpg";
import apexblacklogo from "../assets/apexautologowhite.png";
import { Input } from "../components/inputs";
import { Buttons } from "../components/buttons";
import useStore from "../data/store/store";
import api from "../utils/api";
import { Eye, EyeOff } from "lucide-react";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check form validity whenever credentials change
  useEffect(() => {
    const { email, password } = credentials;
    const isValid = email.trim() !== "" && password.trim() !== "";
    setIsFormValid(isValid);
  }, [credentials]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Add explicit validation to show toast message
    if (!credentials.email || !credentials.password) {
      toast.error("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", credentials);
      const { user, token } = response.data;
      // Store the token in localStorage
      localStorage.setItem("token", token);
      console.log("Token stored:", token);
      login({ ...user, token });
      toast.success("Login successful");

      // Navigate based on role
      if (user.role === "superadmin" || user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:mt-0 md:mt-10 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div
          className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
          style={{
            backgroundImage: `url(${loginimg})`,
          }}
        >
          <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
            <img
              className="w-56 h-20 animate-pulse"
              src={apexblacklogo || "/placeholder.svg"}
              alt="Apex Auto Logo"
            />
          </div>
        </div>

        <div className="lg:w-1/2 md:w-full w-full h-full grid">
          <div className="lg:px-20 md:px-10 px-8">
            <p className="text-center text-4xl font-Poppins font-bold">Login</p>
            <form onSubmit={handleLogin}>
              <div className="grid mt-5">
                <label
                  className="font-Poppins text-base text-blackColor"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={credentials.email}
                  onChange={handleChange}
                  css="border border-mainBlue h-[40px] w-full mt-1 px-2"
                  required
                />
              </div>
              <div className="grid mt-5">
                <label
                  className="font-Poppins text-base text-blackColor"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={handleChange}
                    css="border border-mainBlue h-[40px] w-full mt-1 px-2 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2 mt-1"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="justify-between flex items-center">
                <Buttons
                  type="submit"
                  css={`bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 
                      ${
                        isFormValid && !isLoading
                          ? "hover:scale-105 ease-in duration-300"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                  text={isLoading ? "Logging in..." : "Login"}
                  disabled={!isFormValid || isLoading}
                />
                <p
                  onClick={() => navigate("/forgot-password")}
                  className=" cursor-pointer text-mainBlue"
                >
                  Forgot Password
                </p>
              </div>
              {/* <div className=" mt-2">
                <GoogleLoginButton />
              </div> */}
            </form>
            <div className="flex items-center gap-2 mt-5">
              <p className="text-base text-blackColor font-Poppins">
                Don't Have An Account?
              </p>
              <p
                onClick={() => navigate("/signup")}
                className="text-mainBlue font-Poppins text-base cursor-pointer"
              >
                Sign Up
              </p>
            </div>
          </div>
          <div
            className="bg-cover bg-center h-screen mt-5 lg:w-1/2 md:w-full w-full lg:hidden md:hidden block"
            style={{
              backgroundImage: `url(${loginimg})`,
            }}
          >
            <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
              <img
                className="w-56 h-20 animate-pulse"
                src={apexblacklogo || "/placeholder.svg"}
                alt="Apex Auto Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import loginimg from "../assets/signupimg.jpg";
// import apexblacklogo from "../assets/apexautologowhite.png";
// import { Input } from "../components/inputs";
// import { Buttons } from "../components/buttons";
// import useStore from "../data/store/store";
// import api from "../utils/api";
// import { Eye, EyeOff } from "lucide-react";
// import GoogleLoginButton from "../components/GoogleLoginButton";

// const Login = () => {
//   const { login } = useStore();
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await api.post("/auth/login", credentials);
//       const { user, token } = response.data;
//       // Store the token in localStorage
//       localStorage.setItem("token", token);
//       console.log("Token stored:", token);
//       login({ ...user, token });
//       toast.success("Login successful");

//       // Navigate based on role
//       if (user.role === "superadmin" || user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="lg:mt-0 md:mt-10 mt-10">
//       <div className="flex flex-col md:flex-row items-center justify-center">
//         <div
//           className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
//           style={{
//             backgroundImage: `url(${loginimg})`,
//           }}
//         >
//           <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
//             <img
//               className="w-56 h-20 animate-pulse"
//               src={apexblacklogo || "/placeholder.svg"}
//               alt="Apex Auto Logo"
//             />
//           </div>
//         </div>

//         <div className="lg:w-1/2 md:w-full w-full h-full grid">
//           <div className="lg:px-20 md:px-10 px-8">
//             <p className="text-center text-4xl font-Poppins font-bold">Login</p>
//             <form onSubmit={handleLogin}>
//               <div className="grid mt-5">
//                 <label
//                   className="font-Poppins text-base text-blackColor"
//                   htmlFor="email"
//                 >
//                   Email
//                 </label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email address"
//                   value={credentials.email}
//                   onChange={handleChange}
//                   css="border border-mainBlue h-[40px] w-full mt-1 px-2"
//                   required
//                 />
//               </div>
//               <div className="grid mt-5">
//                 <label
//                   className="font-Poppins text-base text-blackColor"
//                   htmlFor="password"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Input
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     css="border border-mainBlue h-[40px] w-full mt-1 px-2 pr-10"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="absolute inset-y-0 right-0 flex items-center px-2 mt-1"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-500" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div className="justify-between flex items-center">
//                 <Buttons
//                   type="submit"
//                   css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300"
//                   text={isLoading ? "Logging in..." : "Login"}
//                   disabled={isLoading}
//                 />
//                 <p
//                   onClick={() => navigate("/forgot-password")}
//                   className=" cursor-pointer text-mainBlue"
//                 >
//                   Forgot Password
//                 </p>
//               </div>
//               {/* <div className=" mt-2">
//                 <GoogleLoginButton />
//               </div> */}
//             </form>
//             <div className="flex items-center gap-2 mt-5">
//               <p className="text-base text-blackColor font-Poppins">
//                 Don't Have An Account?
//               </p>
//               <p
//                 onClick={() => navigate("/signup")}
//                 className="text-mainBlue font-Poppins text-base cursor-pointer"
//               >
//                 Sign Up
//               </p>
//             </div>
//           </div>
//           <div
//             className="bg-cover bg-center h-screen mt-5 lg:w-1/2 md:w-full w-full lg:hidden md:hidden block"
//             style={{
//               backgroundImage: `url(${loginimg})`,
//             }}
//           >
//             <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
//               <img
//                 className="w-56 h-20 animate-pulse"
//                 src={apexblacklogo || "/placeholder.svg"}
//                 alt="Apex Auto Logo"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import loginimg from "../assets/signupimg.jpg";
// import apexblacklogo from "../assets/apexautologowhite.png";
// import { Input } from "../components/inputs";
// import { Buttons } from "../components/buttons";
// import useStore from "../data/store/store";
// import api from "../utils/api";

// const Login = () => {
//   const { login } = useStore();
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: "", password: "" });

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/auth/login", credentials);
//       login({ ...response.data.user, token: response.data.token });
//       toast.success("Login successful");

//       // Navigate based on role
//       const userRole = response.data.user.role;
//       if (userRole === "super_admin") {
//         navigate("/admin/dashboard");
//       } else if (userRole === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="lg:mt-0 md:mt-10 mt-10">
//       <div className="flex flex-col md:flex-row items-center justify-center">
//         <div
//           className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
//           style={{
//             backgroundImage: `url(${loginimg})`,
//           }}
//         >
//           <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
//             <img
//               className="w-56 h-20 animate-pulse"
//               src={apexblacklogo || "/placeholder.svg"}
//               alt=""
//             />
//           </div>
//         </div>

//         <div className="lg:w-1/2 md:w-full w-full h-full grid">
//           <div className="lg:px-20 md:px-10 px-8">
//             <p className="text-center text-4xl font-Poppins font-bold">Login</p>
//             <form onSubmit={handleLogin}>
//               <div className="grid mt-5">
//                 <label
//                   className="font-Poppins text-base text-blackColor"
//                   htmlFor="email"
//                 >
//                   Email
//                 </label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email address"
//                   value={credentials.email}
//                   onChange={handleChange}
//                   css="border border-mainBlue h-[40px] w-full mt-1 px-2"
//                   required
//                 />
//               </div>
//               <div className="grid mt-5">
//                 <label
//                   className="font-Poppins text-base text-blackColor"
//                   htmlFor="password"
//                 >
//                   Password
//                 </label>
//                 <Input
//                   name="password"
//                   type="password"
//                   placeholder="Enter password"
//                   value={credentials.password}
//                   onChange={handleChange}
//                   css="border border-mainBlue h-[40px] w-full mt-1 px-2"
//                   required
//                 />
//               </div>

//               <div className="justify-center flex items-center">
//                 <Buttons
//                   type="submit"
//                   css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300"
//                   text="Login"
//                 />
//               </div>
//             </form>
//             <div className="flex items-center gap-2 mt-5">
//               <p className="text-base text-blackColor font-Poppins">
//                 Don't Have An Account?
//               </p>
//               <p
//                 onClick={() => navigate("/signup")}
//                 className="text-mainBlue font-Poppins text-base cursor-pointer"
//               >
//                 Sign Up
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import loginimg from "../assets/signupimg.jpg"
// import apexblacklogo from "../assets/apexautologowhite.png"
// import { Input } from "../components/inputs"
// import { Buttons } from "../components/buttons"
// import useStore from "../data/store/store"
// import api from "../utils/api"

// const Login = () => {
//   const { login } = useStore()
//   const navigate = useNavigate()
//   const [credentials, setCredentials] = useState({ email: "", password: "" })

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value })
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await api.post("/auth/login", credentials)
//       login({ ...response.data.user, token: response.data.token })
//       toast.success("Login successful")
//       navigate("/")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed")
//     }
//   }

//   return (
//     <div className="lg:mt-0 md:mt-10 mt-10">
//       <div className="flex flex-col md:flex-row items-center justify-center">
//         <div
//           className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
//           style={{
//             backgroundImage: `url(${loginimg})`,
//           }}
//         >
//           <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
//             <img className="w-56 h-20 animate-pulse" src={apexblacklogo || "/placeholder.svg"} alt="" />
//           </div>
//         </div>

//         <div className="lg:w-1/2 md:w-full w-full h-full grid">
//           <div className="lg:px-20 md:px-10 px-8">
//             <p className="text-center text-4xl font-Poppins font-bold">Login</p>
//             <form onSubmit={handleLogin}>
//               <div className="grid mt-5">
//                 <label className="font-Poppins text-base text-blackColor" htmlFor="email">
//                   Email
//                 </label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email address"
//                   value={credentials.email}
//                   onChange={handleChange}
//                   css="border border-mainBlue h-[40px] w-full mt-1 px-2"
//                   required
//                 />
//               </div>
//               <div className="grid mt-5">
//                 <label className="font-Poppins text-base text-blackColor" htmlFor="password">
//                   Password
//                 </label>
//                 <Input
//                   name="password"
//                   type="password"
//                   placeholder="Enter password"
//                   value={credentials.password}
//                   onChange={handleChange}
//                   css="border border-mainBlue h-[40px] w-full mt-1 px-2"
//                   required
//                 />
//               </div>

//               <div className="justify-center flex items-center">
//                 <Buttons
//                   type="submit"
//                   css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300"
//                   text="Login"
//                 />
//               </div>
//             </form>
//             <div className="flex items-center gap-2 mt-5">
//               <p className="text-base text-blackColor font-Poppins">Don't Have An Account?</p>
//               <p onClick={() => navigate("/signup")} className="text-mainBlue font-Poppins text-base cursor-pointer">
//                 Sign Up
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

// import React, { useEffect } from "react";
// import loginimg from "../assets/signupimg.jpg";
// import apexblacklogo from "../assets/apexautologowhite.png";
// import { Input } from "../components/inputs";
// import { Buttons } from "../components/buttons";
// import { useNavigate } from "react-router-dom";
// import useStore from "../data/store/store";

// const Login = () => {
//   const { login } = useStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleLogin = () => {
//     // Simulate login
//     login({ name: "John Doe", email: "johndoe@example.com" });
//     navigate("/");
//   };

//   return (
//     <div className="lg:mt-0 md:mt-10 mt-10">
//       <div className="flex flex-col md:flex-row items-center justify-center">
//         {/* Left Section */}
//         <div
//           className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
//           style={{
//             backgroundImage: `url(${loginimg})`,
//           }}
//         >
//           <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
//             <img
//               className="w-56 h-20 animate-pulse"
//               src={apexblacklogo}
//               alt=""
//             />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="lg:w-1/2 md:w-full w-full h-full grid">
//           <div className="lg:px-20 md:px-10 px-8">
//             <p className="text-center text-4xl font-Poppins font-bold">Login</p>
//             {/* Email */}
//             <div className="grid mt-5">
//               <label
//                 className="font-Poppins text-base text-blackColor"
//                 htmlFor=""
//               >
//                 Email
//               </label>
//               <Input
//                 placeholder="Enter your email address"
//                 css="border border-mainBlue h-[40px] w-full mt-1 px-2"
//               />
//             </div>
//             {/* Password */}
//             <div className="grid mt-5">
//               <label
//                 className="font-Poppins text-base text-blackColor"
//                 htmlFor=""
//               >
//                 Password
//               </label>
//               <Input
//                 placeholder="Enter password"
//                 css="border border-mainBlue h-[40px] w-full mt-1 px-2"
//               />
//             </div>

//             {/* Submit */}
//             <div className="justify-center flex items-center">
//               <Buttons
//                 onClick={handleLogin}
//                 css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300"
//                 text="Login"
//               />
//             </div>
//             <div className=" flex items-center gap-2 mt-5">
//               <p className=" text-base text-blackColor font-Poppins">
//                 Don't Have An Account?
//               </p>
//               <p
//                 onClick={() => navigate("/signup")}
//                 className=" text-mainBlue font-Poppins text-base cursor-pointer"
//               >
//                 Sign Up
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useEffect } from "react";
// import loginimg from "../assets/signupimg.jpg";
// import apexblacklogo from "../assets/apexautologowhite.png";
// import { Input } from "../components/inputs";
// import { Buttons } from "../components/buttons";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const navigate = useNavigate();
//   return (
//     <div className=" lg:mt-0 md:mt-10 mt-10 ">
//       <div className=" flex flex-col md:flex-row items-center justify-center ">
//         <div
//           className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
//           style={{
//             backgroundImage: `url(${loginimg})`, // Inline style for the dynamic background
//           }}
//         >
//           <div className=" bg-black bg-opacity-55 flex items-center h-full justify-center">
//             <img
//               className="w-56 h-20 animate-pulse"
//               src={apexblacklogo}
//               alt=""
//             />
//           </div>
//         </div>
//         <div className=" lg:w-1/2 md:w-full w-full h-full lg:items-center md:items-center grid">
//           <div className=" lg:px-20 md:px-10 px-8">
//             <p className=" text-center text-4xl font-Poppins font-bold">
//               Login
//             </p>

//             {/* Email */}
//             <div className=" grid mt-5">
//               <label
//                 className=" font-Poppins text-base text-blackColor"
//                 htmlFor=""
//               >
//                 Email
//               </label>
//               <Input
//                 placeholder="Enter your email address"
//                 css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
//               />
//             </div>
//             {/* Password */}
//             <div className=" grid mt-5">
//               <label
//                 className=" font-Poppins text-base text-blackColor"
//                 htmlFor=""
//               >
//                 Password
//               </label>
//               <Input
//                 placeholder="Enter password"
//                 css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
//               />
//               <p className=" text-red-400 font-Poppins text-sm hidden">
//                 {" "}
//                 Uppercase, number and more than eight{" "}
//               </p>
//             </div>
//             <div className=" flex justify-end">
//               <p className=" text-base font-Poppins text-mainBlue mt-2 cursor-pointer">
//                 Forgot Password?
//               </p>
//             </div>

//             <div className=" justify-center flex items-center ">
//               <Buttons
//                 onClick={() => navigate("/")}
//                 css={
//                   "bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300 "
//                 }
//                 text="Login"
//               />
//             </div>
//             <div className=" flex items-center gap-2 mt-5">
//               <p className=" text-base text-blackColor font-Poppins">
//                 Don't Have An Account?
//               </p>
//               <p
//                 onClick={() => navigate("/signup")}
//                 className=" text-mainBlue font-Poppins text-base cursor-pointer"
//               >
//                 Sign Up
//               </p>
//             </div>
//           </div>
//         </div>

//         <div
//           className="bg-cover bg-center h-screen  mt-10 md:w-full w-full lg:hidden md:hidden block "
//           style={{
//             backgroundImage: `url(${loginimg})`, // Inline style for the dynamic background
//           }}
//         >
//           <div className=" bg-black bg-opacity-55 flex items-center h-full justify-center">
//             <img
//               className="w-56 h-20 animate-pulse"
//               src={apexblacklogo}
//               alt=""
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
