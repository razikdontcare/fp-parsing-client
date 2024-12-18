/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbar: "#222831",
        background: "#393E46",
        button: "#5CE0E6",
        title: "#5CE0E6",
      },
    },
  },
  plugins: [],
};
