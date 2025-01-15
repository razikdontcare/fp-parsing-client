/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#6880DE",
          secondary: "#4652BE",
        },
        button: "#5CE0E6",
        title: "#5CE0E6",
      },
    },
  },
  plugins: [],
};
