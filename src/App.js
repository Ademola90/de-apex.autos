// src/app.js
import React, { Suspense, lazy, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../src/style/style.css"
import useStore from "./data/store/store"
import CarManagement from "./admin/pages/car-management"
import AddCar from "./admin/pages/add-car"
import AdminCreation from "./admin/pages/AdminCreation"
import ForgotPassword from "./screen/forgot-password"
import Cars from "./screen/cars"
import Details from "./screen/details"
import InventoryTable from "./admin/pages/inventory"
import AccessoriesManagement from "./admin/pages/accessories-management"
import Accessories from "./screen/accessories"
import AccessoryDetails from "./screen/accessory-details"
import ServicesPage from "./screen/services/services-page"
import ContactPage from "./screen/contact/contact"
import WhatsAppButton from "./components/buttons/WhatsAppButton"


const AboutPage = lazy(() => import("./screen/about/about-page"))
const LandingPage = lazy(() => import("./screen/landing-page"))
const Signup = lazy(() => import("./screen/Signup"))
const Login = lazy(() => import("./screen/Login"))
const EmailVerification = lazy(() => import("./screen/email-verification"))
const AdminLayout = lazy(() => import("./admin/AdminLayout"))
const DashboardPage = lazy(() => import("./admin/pages/admin-dashboard"))
const SettingsPage = lazy(() => import("./admin/pages/settings-page"))

function App() {
  const { login, logout } = useStore()

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (userData && token && refreshToken) {
      login(JSON.parse(userData), { accessToken: token, refreshToken });
    }
  }, [login]);

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (userData) {
      login(JSON.parse(userData))
    }
  }, [login])

  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about/about-page" element={<AboutPage />} />
            <Route path="/service/services-page" element={<ServicesPage />} />
            <Route path="/contact/contact-page" element={<ContactPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-admin" element={<AdminCreation />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/details/:carId" element={<Details />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/accessory-details/:accessoryId" element={<AccessoryDetails />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="car-management" element={<CarManagement />} />
              <Route path="add-car" element={<AddCar />} />
              <Route path="inventories" element={<InventoryTable />} />
              <Route path="accessories-management" element={<AccessoriesManagement />} />


            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <WhatsAppButton />
      <ToastContainer />
    </div>
  )
}

export default App






// import React, { Suspense, lazy, useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "../src/style/style.css";
// import useStore from "./data/store/store";
// import CarManagement from "./admin/pages/car-management";

// const AboutPage = lazy(() => import("./screen/about/about-page"));
// const LandingPage = lazy(() => import("./screen/landing-page"));
// const Signup = lazy(() => import("./screen/Signup"));
// const Login = lazy(() => import("./screen/Login"));
// const EmailVerification = lazy(() => import("./screen/email-verification"));
// const AdminLayout = lazy(() => import("./admin/AdminLayout"));
// const DashboardPage = lazy(() => import("./admin/pages/admin-dashboard"));
// const SettingsPage = lazy(() => import("./admin/pages/settings-page"));

// function App() {
//   const { login, logout } = useStore(); // Use 'login' instead of 'setUser'

//   // Restore user session on page reload
//   useEffect(() => {
//     const userData = sessionStorage.getItem("user");
//     if (userData) {
//       login(JSON.parse(userData)); // Use 'login' to set user data
//     }
//   }, [login]);

//   return (
//     <div>
//       <BrowserRouter>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/about/about-page" element={<AboutPage />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/email-verification" element={<EmailVerification />} />
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route path="dashboard" element={<DashboardPage />} />
//               <Route path="settings" element={<SettingsPage />} />
//               <Route path="car-management" element={<CarManagement />} />
//             </Route>
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;





// import React, { Suspense, lazy, useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "../src/style/style.css";
// import useStore from "./data/store/store";

// // Website pages
// import AboutPage from "./screen/about/about-page";
// import LandingPage from "./screen/landing-page";
// import Signup from "./screen/Signup";
// import Login from "./screen/Login";
// import EmailVerification from "./screen/email-verification";

// // Lazy-loaded admin pages
// const AdminLayout = lazy(() => import("./admin/AdminLayout"));
// const DashboardPage = lazy(() => import("./admin/pages/admin-dashboard"));
// const SettingsPage = lazy(() => import("./admin/pages/settings-page"));

// function App() {
//   const { setUser, logout } = useStore();

//   // Restore user session on refresh
//   useEffect(() => {
//     const userData = sessionStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, [setUser]);

//   // Log out on tab close
//   useEffect(() => {
//     const handleTabClose = (event) => {
//       sessionStorage.removeItem("user");
//       logout();
//     };

//     window.addEventListener("unload", handleTabClose);

//     return () => {
//       window.removeEventListener("unload", handleTabClose);
//     };
//   }, [logout]);

//   return (
//     <div>
//       <BrowserRouter>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             {/* Website Routes */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/about/about-page" element={<AboutPage />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/email-verifivation" element={<EmailVerification />} />

//             {/* Admin Routes */}
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route path="dashboard" element={<DashboardPage />} />
//               <Route path="settings" element={<SettingsPage />} />
//             </Route>
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;






// import React, { Suspense, lazy } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "../src/style/style.css";

// // Website pages
// import AboutPage from "./screen/about/about-page";
// import LandingPage from "./screen/landing-page";
// import Signup from "./screen/Signup";
// import Login from "./screen/Login";
// import EmailVerification from "./screen/email-verification";

// // Lazy-loaded admin pages
// const AdminLayout = lazy(() => import("./admin/AdminLayout"));
// const DashboardPage = lazy(() => import("./admin/pages/admin-dashboard"));
// const SettingsPage = lazy(() => import("./admin/pages/settings-page"));

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             {/* Website Routes */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/about/about-page" element={<AboutPage />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/email-verifivation" element={<EmailVerification />} />

//             {/* Admin Routes */}
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route path="dashboard" element={<DashboardPage />} />
//               <Route path="settings" element={<SettingsPage />} />
//             </Route>
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;



// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import "../src/style/style.css"
// import AboutPage from './screen/about/about-page';
// import LandingPage from './screen/landing-page';
// import Signup from './screen/Signup';
// import Login from './screen/Login';
// import EmailVerification from './screen/email-verification';

// function App() {
//   return (
//     <div>
//       <BrowserRouter>

//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/about/about-page" element={<AboutPage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/email-verifivation" element={<EmailVerification />} />

//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
