// utils/googleAuth.js
import api from "./api";

export const googleAuth = async (googleToken) => {
    try {
        const response = await api.post("/auth/google-auth", { token: googleToken });

        if (response.data.success) {
            console.log("Authenticated user:", response.data.user);
            return response.data;
        } else {
            console.error("Google authentication failed:", response.data.error);
            throw new Error(response.data.error);
        }
    } catch (error) {
        console.error("Error during Google authentication:", error.message);
        throw error;
    }
};
