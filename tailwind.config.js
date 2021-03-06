module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        none: "0rem",
        '4xl': "clamp(1.5rem, 3vw, 2.25rem)"
      },
      colors: {
        gray: {
          800: "#2E303F",
          900: "#262837",
        },
        yellow: {
          500: "#FFAA2E",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
