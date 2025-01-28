import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupimg from "../assets/signupimg.jpg";
import apexblacklogo from "../assets/apexautologowhite.png";
import { Input } from "../components/inputs";
import { Buttons } from "../components/buttons";
import instance from "../utils/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", formData); // Debugging line

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await instance.post("/auth/signup", formData);
      toast.success(response.data.message);
      navigate("/email-verification", { state: { email: formData.email } });
    } catch (error) {
      console.error(error.response?.data); // Log backend error
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="lg:mt-0 md:mt-10 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div
          className="bg-cover bg-center h-screen lg:w-1/2 md:w-full w-full lg:block md:block hidden"
          style={{
            backgroundImage: `url(${signupimg})`,
          }}
        >
          <div className="bg-black bg-opacity-55 flex items-center h-full justify-center">
            <img
              className="w-56 h-20 animate-pulse"
              src={apexblacklogo || "/placeholder.svg"}
              alt=""
            />
          </div>
        </div>
        <div className="lg:w-1/2 md:w-full w-full h-full lg:items-center md:items-center grid">
          <div className="lg:px-20 md:px-10 px-8">
            <p className="text-center text-4xl font-Poppins font-bold">
              Sign Up
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid mt-5">
                <label
                  className="font-Poppins text-base text-blackColor"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <Input
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  css="border border-mainBlue h-[40px] w-full mt-1 px-2"
                  required
                />
              </div>
              <div className="grid mt-5">
                <label
                  className="font-Poppins text-base text-blackColor"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <Input
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  css="border border-mainBlue h-[40px] w-full mt-1 px-2"
                  required
                />
              </div>
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
                  value={formData.email}
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
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  css="border border-mainBlue h-[40px] w-full mt-1 px-2"
                  required
                />
              </div>
              <div className="justify-center flex items-center">
                <Buttons
                  type="submit"
                  css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300"
                  text="Sign Up"
                />
              </div>
            </form>
            <div className="flex items-center gap-2 mt-5">
              <p className="text-base text-blackColor font-Poppins">
                Already Have An Account?
              </p>
              <p
                onClick={() => navigate("/login")}
                className="text-mainBlue font-Poppins text-base cursor-pointer"
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// // screen/Signup.jsx
// import React, { useEffect } from "react";
// import signupimg from "../assets/signupimg.jpg";
// import apexblacklogo from "../assets/apexautologowhite.png";
// import { Input } from "../components/inputs";
// import { Buttons } from "../components/buttons";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
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
//             backgroundImage: `url(${signupimg})`, // Inline style for the dynamic background
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
//               Sign Up
//             </p>
//             <div className=" grid mt-5">
//               <label
//                 className=" font-Poppins text-base text-blackColor"
//                 htmlFor=""
//               >
//                 First Name
//               </label>
//               <Input
//                 placeholder="Enter your first name"
//                 css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
//               />
//             </div>
//             {/* Lastname */}
//             <div className=" grid mt-5">
//               <label
//                 className=" font-Poppins text-base text-blackColor"
//                 htmlFor=""
//               >
//                 Last Name
//               </label>
//               <Input
//                 placeholder="Enter your last name"
//                 css={"border border-mainBlue h-[40px] w-full mt-1 px-2"}
//               />
//             </div>
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

//             <div className=" justify-center flex items-center ">
//               <Buttons
//                 onClick={() => navigate("/email-verification")}
//                 css={
//                   "bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300 "
//                 }
//                 text="Sign Up"
//               />
//             </div>
//             <div className=" flex items-center gap-2 mt-5">
//               <p className=" text-base text-blackColor font-Poppins">
//                 Already Have An Account?
//               </p>
//               <p
//                 onClick={() => navigate("/login")}
//                 className=" text-mainBlue font-Poppins text-base cursor-pointer"
//               >
//                 Login
//               </p>
//             </div>
//           </div>
//         </div>

//         <div
//           className="bg-cover bg-center h-screen  mt-10 md:w-full w-full lg:hidden md:hidden block "
//           style={{
//             backgroundImage: `url(${signupimg})`, // Inline style for the dynamic background
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

// export default Signup;
