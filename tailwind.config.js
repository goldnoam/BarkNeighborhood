
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#4f46e5",
      },
    },
  },
  plugins: [],
};
