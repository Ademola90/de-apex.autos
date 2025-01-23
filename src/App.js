import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/style/style.css";
import useStore from "./data/store/store";

const AboutPage = lazy(() => import("./screen/about/about-page"));
const LandingPage = lazy(() => import("./screen/landing-page"));
const Signup = lazy(() => import("./screen/Signup"));
const Login = lazy(() => import("./screen/Login"));
const EmailVerification = lazy(() => import("./screen/email-verification"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const DashboardPage = lazy(() => import("./admin/pages/admin-dashboard"));
const SettingsPage = lazy(() => import("./admin/pages/settings-page"));

function App() {
  const { login, logout } = useStore(); // Use 'login' instead of 'setUser'

  // Restore user session on page reload
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      login(JSON.parse(userData)); // Use 'login' to set user data
    }
  }, [login]);

  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about/about-page" element={<AboutPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;





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
