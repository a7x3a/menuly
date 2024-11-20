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
        elmessiri: ["El Messiri", "sans-serif"],
        nrt: ["NRT-Reg", "sans-serif"],
      },      
    },
  },
  plugins: [require("daisyui")],
};
