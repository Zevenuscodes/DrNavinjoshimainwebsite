/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        herbal: {
          50: "#f4f7f4",
          100: "#e8efe9",
          200: "#cfe0d3",
          300: "#a9c6b2",
          400: "#7aa58b",
          500: "#2e5c4f",
          600: "#244940",
          700: "#1d3b34",
          800: "#162d28",
          900: "#0f201c"
        },
        sandal: "#A77C55",
        cream: "#D1C7A3"
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.08)" }
    }
  },
  plugins: [],
};
