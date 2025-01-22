/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteColor: "#fff",
        blackColor: "#111111",
        mainBlue: "#415CF2",
        textBlue: "#23AAF2"
      },
      fontFamily: {
        Poppins: ["Poppins", "serif"]
      }
    },
  },
  plugins: [],
}