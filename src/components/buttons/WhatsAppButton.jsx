// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import useStore from "../../data/store/store";

const WhatsAppButton = () => {
  const location = useLocation();
  const { user } = useStore();

  // Get current path
  const currentPath = location.pathname;

  // Check if current path is login or signup page
  const isAuthPage = currentPath === "/login" || currentPath === "/signup";

  // Don't show button on login/signup pages or when user is not logged in
  if (isAuthPage || !user) {
    return null;
  }

  // Add Nigeria's country code (+234) and remove the first '0' from the number
  const phoneNumber = "2349032976552";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsAppButton;

// // src/components/WhatsAppButton.jsx
// import React from "react";
// import { FaWhatsapp } from "react-icons/fa";

// const WhatsAppButton = () => {
//   // Add Nigeria's country code (+234) and remove the first '0' from the number
//   const phoneNumber = "2349032976552"; // Converting 2349032976552 to international format
//   const whatsappUrl = `https://wa.me/${phoneNumber}`;

//   return (
//     <a
//       href={whatsappUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
//       aria-label="Chat on WhatsApp"
//     >
//       <FaWhatsapp className="text-3xl" />
//     </a>
//   );
// };

// export default WhatsAppButton;
