// import { create } from "zustand";

// const useStore = create((set) => ({
//     user: null, // Initially, no user is logged in
//     login: (userData) => set({ user: userData }),
//     logout: () => set({ user: null }),
// }));

// export default useStore;
import { create } from "zustand";

// Retrieve user data from localStorage (if available) during initialization
const storedUser = JSON.parse(localStorage.getItem("user"));

const useStore = create((set) => ({
    user: storedUser || null, // Initially, check localStorage for user data
    login: (userData) => {
        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
    },
    logout: () => {
        // Remove user data from localStorage
        localStorage.removeItem("user");
        set({ user: null });
    },
}));

export default useStore;
