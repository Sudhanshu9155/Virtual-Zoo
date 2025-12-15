/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zooGreen: "#006B3C",
        zooYellow: "#FFD700",
        zooBeige: "#FAF3E0"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        mont: ['Montserrat', 'sans-serif'],

      }
    },
  },
  plugins: [],
}
