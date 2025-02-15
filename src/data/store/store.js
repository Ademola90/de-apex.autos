// import { create } from "zustand";

// const useStore = create((set) => ({
//     user: null, // Initially, no user is logged in
//     login: (userData) => set({ user: userData }),
//     logout: () => set({ user: null }),
// }));

// export default useStore;

//data/store/store.js


import { create } from "zustand";

// Retrieve user data from sessionStorage during initialization
const storedUser = JSON.parse(sessionStorage.getItem("user"));


const useStore = create((set) => ({
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    login: (userData, tokens = { accessToken: null, refreshToken: null }) => {
        sessionStorage.setItem("user", JSON.stringify(userData));
        if (tokens.accessToken) {
            localStorage.setItem("token", tokens.accessToken);
        }
        if (tokens.refreshToken) {
            localStorage.setItem("refreshToken", tokens.refreshToken);
        }
        set({
            user: userData,
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    },

    logout: () => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("likes");
        set({ user: null, token: null, refreshToken: null });
    },
}));




export default useStore;


// const useStore = create((set) => ({
//     user: storedUser || null,
//     login: (userData) => {
//         sessionStorage.setItem("user", JSON.stringify(userData));
//         set({ user: userData });
//     },
//     logout: () => {
//         sessionStorage.removeItem("user");
//         set({ user: null });
//     },
// }));

//////////////////////////////////////////////////////////////////////////
// import { create } from "zustand";

// // Retrieve user data from sessionStorage during initialization
// const storedUser = JSON.parse(sessionStorage.getItem("user"));

// const useStore = create((set) => ({
//     user: storedUser || null,
//     login: (userData) => {
//         // Save user data to sessionStorage
//         sessionStorage.setItem("user", JSON.stringify(userData));
//         set({ user: userData });
//     },
//     logout: () => {
//         // Remove user data from sessionStorage
//         sessionStorage.removeItem("user");
//         set({ user: null });
//     },
// }));

// export default useStore;

////////////////////////////////////////////////////////////////////////////////

