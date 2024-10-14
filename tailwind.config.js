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
        Noto: ["Noto Kufi Arabic", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
