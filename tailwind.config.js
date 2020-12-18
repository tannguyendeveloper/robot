/*
  Removes unused css classes from tailwind
*/
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        Arvo: ["Arvo", "system-ui"],
        "Luckiest-Guy": ['"Luckiest Guy"', "Arvo", "system-ui"],
        Montserrat: ["Montserrat", "ui-serif", "Georgia"],
      },
    },
    colors: {
      "tulip-tree": {
        50: "#fffcf5",
        100: "#fff8eb",
        200: "#feeecd",
        300: "#fde4af",
        400: "#fcd073",
        500: "#FABC37",
        600: "#e1a932",
        700: "#bc8d29",
        800: "#967121",
        900: "#7b5c1b",
      },
      "cyan-aqua": {
        50: "#f5ffff",
        100: "#ebfeff",
        200: "#cefdfe",
        300: "#b0fcfe",
        400: "#74fafd",
        500: "#39f8fc",
        600: "#33dfe3",
        700: "#2bbabd",
        800: "#229597",
        900: "#1c7a7b",
      },
      ...colors
    },
    screens: {
      xxs: "300px",
      xs: "480px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {},
  plugins: [],
};
