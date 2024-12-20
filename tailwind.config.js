/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container
        padding: "1rem", // Adds consistent padding on both sides
      },
      screens: {
        sm: "640px", // For small devices
        md: "768px", // For medium devices
        lg: "1024px", // For large devices
        xl: "1280px", // For extra-large devices
        "2xl": "1320px", // Custom max-width for your design
      },
    },
  },
  plugins: [],
};
