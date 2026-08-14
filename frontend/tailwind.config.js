/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7A0C1E",
          dark: "#5C0916",
          darker: "#3D0610",
        },
        gold: {
          DEFAULT: "#D4A017",
          light: "#F5C542",
          dark: "#A87D0E",
        },
        cream: "#FFF8ED",
      },
      fontFamily: {
        display: ["Merriweather", "Georgia", "serif"],
        body: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(122,12,30,0.08)",
      },
    },
  },
  plugins: [],
};
