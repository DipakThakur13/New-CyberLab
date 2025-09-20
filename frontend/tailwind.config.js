/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class", // <--- important: use class strategy
  theme: {
    extend: {},
  },
  plugins: [],
};
