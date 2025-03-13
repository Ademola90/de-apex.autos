import api from "./api";

// Car Hire API functions
export const fetchAllCars = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams();

        if (filters.location) queryParams.append("location", filters.location);
        if (filters.type) queryParams.append("type", filters.type);
        if (filters.status) queryParams.append("status", filters.status);

        const response = await api.get(`/car-hire/cars?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
};

export const fetchCarById = async (id) => {
    try {
        const response = await api.get(`/car-hire/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching car with ID ${id}:`, error);
        throw error;
    }
};

export const addCar = async (carData) => {
    try {
        // Create FormData for file uploads
        const formData = new FormData();

        // Append car details
        Object.keys(carData).forEach(key => {
            if (key !== "images") {
                if (key === "features" && Array.isArray(carData[key])) {
                    formData.append(key, JSON.stringify(carData[key]));
                } else {
                    formData.append(key, carData[key]);
                }
            }
        });

        // Append images
        if (carData.images && carData.images.length > 0) {
            carData.images.forEach(image => {
                formData.append("images", image);
            });
        }

        const response = await api.post("/car-hire/cars", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error adding car:", error);
        throw error;
    }
};

export const updateCar = async (id, carData) => {
    try {
        // Create FormData for file uploads
        const formData = new FormData();

        // Append car details
        Object.keys(carData).forEach(key => {
            if (key !== "images") {
                if (key === "features" && Array.isArray(carData[key])) {
                    formData.append(key, JSON.stringify(carData[key]));
                } else {
                    formData.append(key, carData[key]);
                }
            }
        });

        // Append images
        if (carData.images && carData.images.length > 0) {
            carData.images.forEach(image => {
                formData.append("images", image);
            });
        }

        // Append replaceImages flag
        if (carData.replaceImages !== undefined) {
            formData.append("replaceImages", carData.replaceImages);
        }

        const response = await api.put(`/car-hire/cars/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Error updating car with ID ${id}:`, error);
        throw error;
    }
};

export const deleteCar = async (id) => {
    try {
        const response = await api.delete(`/car-hire/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting car with ID ${id}:`, error);
        throw error;
    }
};

export const updateCarStatus = async (id, status) => {
    try {
        const response = await api.patch(`/car-hire/cars/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error(`Error updating status for car with ID ${id}:`, error);
        throw error;
    }
};

export const deleteCarImage = async (carId, imageId) => {
    try {
        const response = await api.delete(`/car-hire/cars/${carId}/images/${imageId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting image for car with ID ${carId}:`, error);
        throw error;
    }
};

// Booking API functions
export const createBooking = async (bookingData) => {
    try {
        const response = await api.post("/car-hire/bookings", bookingData);
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const fetchAllBookings = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams();

        if (filters.status) queryParams.append("status", filters.status);
        if (filters.date) queryParams.append("date", filters.date);

        const response = await api.get(`/car-hire/bookings?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};

export const fetchBookingById = async (id) => {
    try {
        const response = await api.get(`/car-hire/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching booking with ID ${id}:`, error);
        throw error;
    }
};

export const updateBookingStatus = async (id, status) => {
    try {
        const response = await api.patch(`/car-hire/bookings/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error(`Error updating status for booking with ID ${id}:`, error);
        throw error;
    }
};

export const updatePaymentStatus = async (id, paymentStatus, paymentDetails = {}) => {
    try {
        const response = await api.patch(`/car-hire/bookings/${id}/payment`, {
            paymentStatus,
            paymentDetails
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating payment status for booking with ID ${id}:`, error);
        throw error;
    }
};

export const cancelBooking = async (id) => {
    try {
        const response = await api.patch(`/car-hire/bookings/${id}/cancel`);
        return response.data;
    } catch (error) {
        console.error(`Error cancelling booking with ID ${id}:`, error);
        throw error;
    }
};

// Analytics API functions
export const fetchBookingStats = async () => {
    try {
        const response = await api.get("/car-hire/stats/bookings");
        return response.data;
    } catch (error) {
        console.error("Error fetching booking stats:", error);
        throw error;
    }
};

export const fetchCarHireAnalytics = async () => {
    try {
        const response = await api.get("/car-hire/stats/cars");
        return response.data;
    } catch (error) {
        console.error("Error fetching car hire analytics:", error);
        throw error;
    }
};