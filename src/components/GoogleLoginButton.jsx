import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../data/store/store";
import api from "../utils/api";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      if (!credential) throw new Error("Google credential not found");

      // Authenticate with the backend
      const { data } = await api.post("/auth/google-auth", {
        token: credential,
      });

      // Update tokens in both localStorage and state
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // Update the store state
      login(data.user, {
        accessToken: data.token,
        refreshToken: data.refreshToken,
      });

      // Redirect based on user role
      if (data.user.role === "superadmin" || data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error(
        error.response?.data?.message ||
          "Google login failed. Please try again."
      );
    }
  };

  const handleError = () => {
    console.error("Google login failed");
    toast.error("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text="signin_with"
        useOneTap
        redirectUri={`${frontendUrl}/auth/google/callback`}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

// import React from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { googleAuth } from "../utils/googleAuth";
// import useStore from "../data/store/store";
// import api from "../utils/api";

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();
//   const login = useStore((state) => state.login);

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const { credential } = credentialResponse;

//       if (!credential) throw new Error("Google credential not found");

//       // Authenticate with the backend
//       const { data } = await api.post("/auth/google-auth", {
//         token: credential,
//       });

//       // Update tokens in both localStorage and state
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("refreshToken", data.refreshToken);
//       sessionStorage.setItem("user", JSON.stringify(data.user));

//       // Update the store state
//       login(data.user, {
//         accessToken: data.token,
//         refreshToken: data.refreshToken,
//       });

//       // Redirect based on user role
//       if (data.user.role === "superadmin" || data.user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error during Google login:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Google login failed. Please try again."
//       );
//     }
//   };

//   const handleError = () => {
//     console.error("Google login failed");
//     toast.error("Google login failed. Please try again.");
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={handleError}
//         text="signin_with"
//       />
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;

// import React from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { FaGoogle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Import toast for error messages
// import api from "../utils/api";

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();

//   const handleGoogleLogin = async (googleToken) => {
//     try {
//       const response = await axios.post(
//         `${
//           process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
//         }/api/auth/google`,
//         { token: googleToken },
//         { withCredentials: true }
//       );
//       console.log("Google login successful:", response.data);
//     } catch (error) {
//       console.error("Error during Google login:", error);
//     }
//   };

//   const handleSuccess = async (credentialResponse) => {
//     const { credential } = credentialResponse;

//     try {
//       // Send the credential to your backend for verification
//       const { data } = await api.post("/auth/google", { token: credential });

//       console.log("Google login successful:", data);

//       // Save the token and user data in your app (e.g., Redux, localStorage)
//       localStorage.setItem("token", data.token);

//       // Navigate based on the user's role
//       if (data.user.role === "superadmin" || data.user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/"); // Redirect to the homepage
//       }
//     } catch (error) {
//       console.error("Error during Google login:", error);

//       // Display error message
//       if (error.response) {
//         toast.error(error.response.data.message || "Google login failed");
//       } else {
//         toast.error("An error occurred during Google login");
//       }
//     }
//   };

//   const handleError = () => {
//     console.error("Google login failed");
//     toast.error("Google login failed. Please try again."); // Display error message
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={handleError}
//         render={(renderProps) => (
//           <button
//             onClick={renderProps.onClick}
//             disabled={renderProps.disabled}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "10px",
//               backgroundColor: "#4285F4",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             <FaGoogle style={{ marginRight: "10px" }} />
//             Login with Google
//           </button>
//         )}
//       />
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;
