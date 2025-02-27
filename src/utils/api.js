// import axios from "axios"

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Add a request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token")
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// export default instance

//utils/api.js

import axios from "axios";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://de-apex-autos-backend.onrender.com/api",
});

// Add the access token to the request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh when a 401 error occurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token');

          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const newAccessToken = data.accessToken;
          localStorage.setItem('token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Google authentication function
export const googleAuth = async (token) => {
  try {
    const { data } = await api.post("/auth/google-auth", { token });
    return data;
  } catch (error) {
    console.error("Error during Google authentication:", error.message);
    throw error;
  }
};

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
//   // baseURL: process.env.NEXT_PUBLIC_API_URL || "https://de-apex-autos-backend.onrender.com/api",
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("Refresh token missing");

//         // Refresh the token
//         const { data } = await axios.post("/auth/refresh-token", { refreshToken });
//         const newToken = data.accessToken;

//         // Update token in localStorage and headers
//         localStorage.setItem("token", newToken);
//         api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

//         // Retry the failed request
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login"; // Redirect to login
//       }
//     }
//     return Promise.reject(error);
//   }
// );


// // googleAuth function
// export const googleAuth = async (token) => {
//   try {
//     const { data } = await api.post("/auth/google-auth", { token });
//     return data;
//   } catch (error) {
//     console.error("Error during Google authentication:", error.message);
//     throw error;
//   }
// };

// export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
// });

// api.interceptors.request.use(
//   (config) => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("Token being sent:", token);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;



////////////////////////////////////////////////////////////////////////////////////
// import axios from "axios"

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
// })

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     console.log("Token being sent:", token) // Debug log
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error),
// )

// export default api

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Update this to your base URL
// });


// api.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token") || localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// export default api;


////////////////////
//////////////////////////////
// import axios from "axios"

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
//   // baseURL: "https://de-apex-autos-backend.onrender.com/api",
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// export default instance

