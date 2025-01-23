// import { create } from "zustand";

// const useStore = create((set) => ({
//     user: null, // Initially, no user is logged in
//     login: (userData) => set({ user: userData }),
//     logout: () => set({ user: null }),
// }));

// export default useStore;
import { create } from "zustand";

// Retrieve user data from sessionStorage during initialization
const storedUser = JSON.parse(sessionStorage.getItem("user"));

const useStore = create((set) => ({
    user: storedUser || null,
    login: (userData) => {
        // Save user data to sessionStorage
        sessionStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
    },
    logout: () => {
        // Remove user data from sessionStorage
        sessionStorage.removeItem("user");
        set({ user: null });
    },
}));

export default useStore;

