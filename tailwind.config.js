/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "ipad-mini": "820px",
        "ipad-air": "768px",
      },
      fontFamily: {
        popins: ["Poppins", "sans-serif"],
        ibm: ["IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
