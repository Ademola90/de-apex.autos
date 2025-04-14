import api from "./api"

// Car Hire API functions
export const fetchAllCars = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams()

        if (filters.location) queryParams.append("location", filters.location)
        if (filters.type) queryParams.append("type", filters.type)
        if (filters.status) queryParams.append("status", filters.status)

        const response = await api.get(`/car-hire/cars?${queryParams.toString()}`)
        return response.data
    } catch (error) {
        console.error("Error fetching cars:", error)
        throw error
    }
}

export const fetchCarById = async (id) => {
    try {
        const response = await api.get(`/car-hire/cars/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error fetching car with ID ${id}:`, error)
        throw error
    }
}

export const addCar = async (carData) => {
    try {
        // Create FormData for file uploads
        const formData = new FormData()

        // Append car details
        Object.keys(carData).forEach((key) => {
            if (key !== "images") {
                if (key === "features" && Array.isArray(carData[key])) {
                    formData.append(key, JSON.stringify(carData[key]))
                } else {
                    formData.append(key, carData[key])
                }
            }
        })

        // Append images
        if (carData.images && carData.images.length > 0) {
            carData.images.forEach((image) => {
                formData.append("images", image)
            })
        }

        const response = await api.post("/car-hire/cars", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 30000, // 30 second timeout
        })

        return response.data
    } catch (error) {
        console.error("Error adding car:", error)
        throw error
    }
}

export const updateCar = async (id, carData) => {
    try {
        // Create FormData for file uploads
        const formData = new FormData()

        // Append car details
        Object.keys(carData).forEach((key) => {
            if (key !== "images") {
                if (key === "features" && Array.isArray(carData[key])) {
                    formData.append(key, JSON.stringify(carData[key]))
                } else {
                    formData.append(key, carData[key])
                }
            }
        })

        // Append images
        if (carData.images && carData.images.length > 0) {
            carData.images.forEach((image) => {
                formData.append("images", image)
            })
        }

        // Append replaceImages flag
        if (carData.replaceImages !== undefined) {
            formData.append("replaceImages", carData.replaceImages)
        }

        const response = await api.put(`/car-hire/cars/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 30000, // 30 second timeout
        })

        return response.data
    } catch (error) {
        console.error(`Error updating car with ID ${id}:`, error)
        throw error
    }
}

export const deleteCar = async (id) => {
    try {
        const response = await api.delete(`/car-hire/cars/${id}`, {
            timeout: 10000, // 10 second timeout
        })
        return response.data
    } catch (error) {
        console.error(`Error deleting car with ID ${id}:`, error)
        throw error
    }
}

export const updateCarStatus = async (id, status) => {
    try {
        // Use PUT instead of PATCH as a workaround if PATCH is causing CORS issues
        const response = await api.put(
            `/car-hire/cars/${id}/status`,
            { status },
            {
                timeout: 10000, // 10 second timeout
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )
        return response.data
    } catch (error) {
        console.error(`Error updating status for car with ID ${id}:`, error)
        throw error
    }
}

export const deleteCarImage = async (carId, imageId) => {
    try {
        const response = await api.delete(`/car-hire/cars/${carId}/images/${imageId}`, {
            timeout: 10000, // 10 second timeout
        })
        return response.data
    } catch (error) {
        console.error(`Error deleting image for car with ID ${carId}:`, error)
        throw error
    }
}

// Booking API functions
export const createBooking = async (bookingData) => {
    try {
        // Log the booking data for debugging
        console.log("Creating booking with data:", JSON.stringify(bookingData, null, 2))

        // If basePrice or totalPrice are missing, calculate them from other fields
        if (!bookingData.basePrice && bookingData.carId && bookingData.totalDays) {
            // Fetch car details to get the price
            try {
                const carResponse = await fetchCarById(bookingData.carId)
                const carPrice = carResponse.car.price

                // Calculate basePrice
                bookingData.basePrice = carPrice * bookingData.totalDays

                // Calculate chauffeurFee if not provided
                if (!bookingData.chauffeurFee) {
                    bookingData.chauffeurFee = bookingData.driverOption === "chauffeur" ? 5000 * bookingData.totalDays : 0
                }

                // Calculate distancePrice if not provided
                if (!bookingData.distancePrice && bookingData.distance) {
                    const pricePerKm = 10000 // ₦10,000 per km
                    bookingData.pricePerKm = pricePerKm

                    let distPrice = bookingData.distance * pricePerKm
                    // Double the distance price for round trips
                    if (bookingData.journeyType === "round-trip") {
                        distPrice *= 2
                    }
                    bookingData.distancePrice = distPrice
                }

                // Calculate totalPrice
                bookingData.totalPrice =
                    bookingData.basePrice + (bookingData.chauffeurFee || 0) + (bookingData.distancePrice || 0)

                console.log("Calculated missing fields:", {
                    basePrice: bookingData.basePrice,
                    chauffeurFee: bookingData.chauffeurFee,
                    distancePrice: bookingData.distancePrice,
                    totalPrice: bookingData.totalPrice,
                })
            } catch (error) {
                console.error("Error fetching car details for price calculation:", error)
                throw new Error("Could not calculate prices. Please try again.")
            }
        }

        // Make sure all required fields are present
        const requiredFields = [
            "carId",
            "pickupLocation",
            "dropoffLocation",
            "pickupDate",
            "pickupTime",
            "returnDate",
            "returnTime",
            "totalDays",
            "driverOption",
            "journeyType",
            "distance",
            "duration",
            "basePrice",
            "totalPrice",
            "customerDetails",
        ]

        const missingFields = requiredFields.filter((field) => !bookingData[field])
        if (missingFields.length > 0) {
            console.error("Missing required fields:", missingFields)
            throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
        }

        // Send the request to create the booking
        const response = await api.post("/car-hire/bookings", bookingData, {
            timeout: 30000, // 30 second timeout
        })

        // Log the response for debugging
        console.log("Booking created successfully:", response.data)

        return response.data
    } catch (error) {
        console.error("Error creating booking:", error.response?.data || error.message)
        throw error
    }
}

export const fetchAllBookings = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams()

        if (filters.status) queryParams.append("status", filters.status)
        if (filters.date) queryParams.append("date", filters.date)

        const response = await api.get(`/car-hire/bookings?${queryParams.toString()}`, {
            timeout: 15000, // 15 second timeout
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error)
        throw error
    }
}

export const fetchBookingById = async (id) => {
    try {
        const response = await api.get(`/car-hire/bookings/${id}`, {
            timeout: 10000, // 10 second timeout
        })
        return response.data
    } catch (error) {
        console.error(`Error fetching booking with ID ${id}:`, error)
        throw error
    }
}

export const updateBookingStatus = async (id, status) => {
    try {
        const response = await api.put(
            `/car-hire/bookings/${id}/status`,
            { status },
            { timeout: 10000 }, // 10 second timeout
        )
        return response.data
    } catch (error) {
        console.error(`Error updating status for booking with ID ${id}:`, error)
        throw error
    }
}

export const updatePaymentStatus = async (id, paymentStatus, paymentMethod, paymentReference) => {
    try {
        const response = await api.put(
            `/car-hire/bookings/${id}/payment`,
            {
                paymentStatus,
                paymentMethod,
                paymentReference,
            },
            { timeout: 10000 }, // 10 second timeout
        )
        return response.data
    } catch (error) {
        console.error(`Error updating payment status for booking with ID ${id}:`, error)
        throw error
    }
}

export const cancelBooking = async (id) => {
    try {
        const response = await api.put(
            `/car-hire/bookings/${id}/cancel`,
            {},
            {
                timeout: 10000, // 10 second timeout
            },
        )
        return response.data
    } catch (error) {
        console.error(`Error cancelling booking with ID ${id}:`, error)
        throw error
    }
}

// Analytics API functions
export const fetchBookingStats = async () => {
    try {
        const response = await api.get("/car-hire/stats/bookings", {
            timeout: 15000, // 15 second timeout
        })
        return response.data
    } catch (error) {
        console.error("Error fetching booking stats:", error)
        throw error
    }
}

export const fetchCarHireAnalytics = async () => {
    try {
        const response = await api.get("/car-hire/stats/cars", {
            timeout: 15000, // 15 second timeout
        })
        return response.data
    } catch (error) {
        console.error("Error fetching car hire analytics:", error)
        throw error
    }
}




















// import api from "./api"

// // Car Hire API functions
// export const fetchAllCars = async (filters = {}) => {
//     try {
//         const queryParams = new URLSearchParams()

//         if (filters.location) queryParams.append("location", filters.location)
//         if (filters.type) queryParams.append("type", filters.type)
//         if (filters.status) queryParams.append("status", filters.status)

//         const response = await api.get(`/car-hire/cars?${queryParams.toString()}`)
//         return response.data
//     } catch (error) {
//         console.error("Error fetching cars:", error)
//         throw error
//     }
// }

// export const fetchCarById = async (id) => {
//     try {
//         const response = await api.get(`/car-hire/cars/${id}`)
//         return response.data
//     } catch (error) {
//         console.error(`Error fetching car with ID ${id}:`, error)
//         throw error
//     }
// }

// export const addCar = async (carData) => {
//     try {
//         // Create FormData for file uploads
//         const formData = new FormData()

//         // Append car details
//         Object.keys(carData).forEach((key) => {
//             if (key !== "images") {
//                 if (key === "features" && Array.isArray(carData[key])) {
//                     formData.append(key, JSON.stringify(carData[key]))
//                 } else {
//                     formData.append(key, carData[key])
//                 }
//             }
//         })

//         // Append images
//         if (carData.images && carData.images.length > 0) {
//             carData.images.forEach((image) => {
//                 formData.append("images", image)
//             })
//         }

//         const response = await api.post("/car-hire/cars", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//             timeout: 30000, // 30 second timeout
//         })

//         return response.data
//     } catch (error) {
//         console.error("Error adding car:", error)
//         throw error
//     }
// }

// export const updateCar = async (id, carData) => {
//     try {
//         // Create FormData for file uploads
//         const formData = new FormData()

//         // Append car details
//         Object.keys(carData).forEach((key) => {
//             if (key !== "images") {
//                 if (key === "features" && Array.isArray(carData[key])) {
//                     formData.append(key, JSON.stringify(carData[key]))
//                 } else {
//                     formData.append(key, carData[key])
//                 }
//             }
//         })

//         // Append images
//         if (carData.images && carData.images.length > 0) {
//             carData.images.forEach((image) => {
//                 formData.append("images", image)
//             })
//         }

//         // Append replaceImages flag
//         if (carData.replaceImages !== undefined) {
//             formData.append("replaceImages", carData.replaceImages)
//         }

//         const response = await api.put(`/car-hire/cars/${id}`, formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//             timeout: 30000, // 30 second timeout
//         })

//         return response.data
//     } catch (error) {
//         console.error(`Error updating car with ID ${id}:`, error)
//         throw error
//     }
// }

// export const deleteCar = async (id) => {
//     try {
//         const response = await api.delete(`/car-hire/cars/${id}`, {
//             timeout: 10000, // 10 second timeout
//         })
//         return response.data
//     } catch (error) {
//         console.error(`Error deleting car with ID ${id}:`, error)
//         throw error
//     }
// }

// export const updateCarStatus = async (id, status) => {
//     try {
//         // Use PUT instead of PATCH as a workaround if PATCH is causing CORS issues
//         const response = await api.put(
//             `/car-hire/cars/${id}/status`,
//             { status },
//             {
//                 timeout: 10000, // 10 second timeout
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             },
//         )
//         return response.data
//     } catch (error) {
//         console.error(`Error updating status for car with ID ${id}:`, error)
//         throw error
//     }
// }

// export const deleteCarImage = async (carId, imageId) => {
//     try {
//         const response = await api.delete(`/car-hire/cars/${carId}/images/${imageId}`, {
//             timeout: 10000, // 10 second timeout
//         })
//         return response.data
//     } catch (error) {
//         console.error(`Error deleting image for car with ID ${carId}:`, error)
//         throw error
//     }
// }

// // Booking API functions
// export const createBooking = async (bookingData) => {
//     try {
//         // Log the booking data for debugging
//         console.log("Creating booking with data:", JSON.stringify(bookingData, null, 2))

//         // If basePrice or totalPrice are missing, calculate them from other fields
//         if (!bookingData.basePrice && bookingData.carId && bookingData.totalDays) {
//             // Fetch car details to get the price
//             try {
//                 const carResponse = await fetchCarById(bookingData.carId)
//                 const carPrice = carResponse.car.price

//                 // Calculate basePrice
//                 bookingData.basePrice = carPrice * bookingData.totalDays

//                 // Calculate chauffeurFee if not provided
//                 if (!bookingData.chauffeurFee) {
//                     bookingData.chauffeurFee = bookingData.driverOption === "chauffeur" ? 5000 * bookingData.totalDays : 0
//                 }

//                 // Calculate distancePrice if not provided
//                 if (!bookingData.distancePrice && bookingData.distance) {
//                     const pricePerKm = 10000 // ₦10,000 per km
//                     bookingData.pricePerKm = pricePerKm

//                     let distPrice = bookingData.distance * pricePerKm
//                     // Double the distance price for round trips
//                     if (bookingData.journeyType === "round-trip") {
//                         distPrice *= 2
//                     }
//                     bookingData.distancePrice = distPrice
//                 }

//                 // Calculate totalPrice
//                 bookingData.totalPrice =
//                     bookingData.basePrice + (bookingData.chauffeurFee || 0) + (bookingData.distancePrice || 0)

//                 console.log("Calculated missing fields:", {
//                     basePrice: bookingData.basePrice,
//                     chauffeurFee: bookingData.chauffeurFee,
//                     distancePrice: bookingData.distancePrice,
//                     totalPrice: bookingData.totalPrice,
//                 })
//             } catch (error) {
//                 console.error("Error fetching car details for price calculation:", error)
//                 throw new Error("Could not calculate prices. Please try again.")
//             }
//         }

//         // Make sure all required fields are present
//         const requiredFields = [
//             "carId",
//             "pickupLocation",
//             "dropoffLocation",
//             "pickupDate",
//             "pickupTime",
//             "returnDate",
//             "returnTime",
//             "totalDays",
//             "driverOption",
//             "journeyType",
//             "distance",
//             "duration",
//             "basePrice",
//             "totalPrice",
//             "customerDetails",
//         ]

//         const missingFields = requiredFields.filter((field) => !bookingData[field])
//         if (missingFields.length > 0) {
//             console.error("Missing required fields:", missingFields)
//             throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
//         }

//         // Send the request to create the booking
//         const response = await api.post("/car-hire/bookings", bookingData, {
//             timeout: 30000, // 30 second timeout
//         })

//         // Log the response for debugging
//         console.log("Booking created successfully:", response.data)

//         return response.data
//     } catch (error) {
//         console.error("Error creating booking:", error.response?.data || error.message)
//         throw error
//     }
// }

// export const fetchAllBookings = async (filters = {}) => {
//     try {
//         const queryParams = new URLSearchParams()

//         if (filters.status) queryParams.append("status", filters.status)
//         if (filters.date) queryParams.append("date", filters.date)

//         const response = await api.get(`/car-hire/bookings?${queryParams.toString()}`, {
//             timeout: 15000, // 15 second timeout
//         })
//         return response.data
//     } catch (error) {
//         console.error("Error fetching bookings:", error)
//         throw error
//     }
// }

// export const fetchBookingById = async (id) => {
//     try {
//         const response = await api.get(`/car-hire/bookings/${id}`, {
//             timeout: 10000, // 10 second timeout
//         })
//         return response.data
//     } catch (error) {
//         console.error(`Error fetching booking with ID ${id}:`, error)
//         throw error
//     }
// }

// export const updateBookingStatus = async (id, status) => {
//     try {
//         const response = await api.put(
//             `/car-hire/bookings/${id}/status`,
//             { status },
//             { timeout: 10000 }, // 10 second timeout
//         )
//         return response.data
//     } catch (error) {
//         console.error(`Error updating status for booking with ID ${id}:`, error)
//         throw error
//     }
// }

// export const updatePaymentStatus = async (id, paymentStatus, paymentMethod, paymentReference) => {
//     try {
//         const response = await api.put(
//             `/car-hire/bookings/${id}/payment`,
//             {
//                 paymentStatus,
//                 paymentMethod,
//                 paymentReference,
//             },
//             { timeout: 10000 }, // 10 second timeout
//         )
//         return response.data
//     } catch (error) {
//         console.error(`Error updating payment status for booking with ID ${id}:`, error)
//         throw error
//     }
// }

// export const cancelBooking = async (id) => {
//     try {
//         const response = await api.put(
//             `/car-hire/bookings/${id}/cancel`,
//             {},
//             {
//                 timeout: 10000, // 10 second timeout
//             },
//         )
//         return response.data
//     } catch (error) {
//         console.error(`Error cancelling booking with ID ${id}:`, error)
//         throw error
//     }
// }

// // Analytics API functions
// export const fetchBookingStats = async () => {
//     try {
//         const response = await api.get("/car-hire/stats/bookings", {
//             timeout: 15000, // 15 second timeout
//         })
//         return response.data
//     } catch (error) {
//         console.error("Error fetching booking stats:", error)
//         throw error
//     }
// }

// export const fetchCarHireAnalytics = async () => {
//     try {
//         const response = await api.get("/car-hire/stats/cars", {
//             timeout: 15000, // 15 second timeout
//         })
//         return response.data
//     } catch (error) {
//         console.error("Error fetching car hire analytics:", error)
//         throw error
//     }
// }

















