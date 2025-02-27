//utils/jwy.js

import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded; // { id, role, etc. }
        } catch (error) {
            console.error('Invalid token');
            return null;
        }
    }
    return null; // No token found
};
