import axios from "axios"

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://de-apex-autos-backend.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add the access token and API key to the request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "api_key_here"

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (apiKey) {
      config.headers["api_key"] = apiKey
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Handle token refresh when a 401 error occurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Only redirect to login for protected routes, not for public data fetching
    // This is the key change that will fix the issue
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("public-cars") &&
      !error.config.url.includes("accessories")
    ) {
      const originalRequest = error.config
      if (!originalRequest._retry) {
        originalRequest._retry = true
        try {
          const refreshToken = localStorage.getItem("refreshToken")
          if (!refreshToken) throw new Error("No refresh token")

          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, { refreshToken })

          const newAccessToken = data.accessToken
          localStorage.setItem("token", newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return api(originalRequest)
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError)
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = "/login"
        }
      }
    }
    return Promise.reject(error)
  },
)

// Google authentication function
export const googleAuth = async (token) => {
  try {
    const { data } = await api.post("/auth/google-auth", { token })
    return data
  } catch (error) {
    console.error("Error during Google authentication:", error.message)
    throw error
  }
}

export default api











// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
//   // baseURL: process.env.NEXT_PUBLIC_API_URL || "https://de-apex-autos-backend.onrender.com/api",
// });

// // Add the access token and API key to the request headers
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     const apiKey = process.env.NEXT_PUBLIC_API_KEY || "api_key_here";

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (apiKey) {
//       config.headers["api_key"] = apiKey;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle token refresh when a 401 error occurs
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const originalRequest = error.config;
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const refreshToken = localStorage.getItem("refreshToken");
//           if (!refreshToken) throw new Error("No refresh token");

//           const { data } = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//             { refreshToken }
//           );

//           const newAccessToken = data.accessToken;
//           localStorage.setItem("token", newAccessToken);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//           return api(originalRequest);
//         } catch (refreshError) {
//           console.error("Failed to refresh token:", refreshError);
//           localStorage.clear();
//           sessionStorage.clear();
//           window.location.href = "/login";
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Google authentication function
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
//   //
// });

// // Add the access token to the request headers
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

// // Handle token refresh when a 401 error occurs
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const originalRequest = error.config;
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const refreshToken = localStorage.getItem('refreshToken');
//           if (!refreshToken) throw new Error('No refresh token');

//           const { data } = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//             { refreshToken }
//           );

//           const newAccessToken = data.accessToken;
//           localStorage.setItem('token', newAccessToken);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//           return api(originalRequest);
//         } catch (refreshError) {
//           console.error('Failed to refresh token:', refreshError);
//           localStorage.clear();
//           sessionStorage.clear();
//           window.location.href = '/login';
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Google authentication function
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



