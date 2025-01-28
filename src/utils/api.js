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

import axios from "axios"

const instance = axios.create({
  baseURL: "https://de-apex-autos-backend.onrender.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance

