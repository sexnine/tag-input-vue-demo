const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      // slate: colors.slate,
      gray: colors.gray,
      // zinc: colors.zinc,
      // neutral: colors.neutral,
      // stone: colors.stone,
      red: colors.red,
      // orange: colors.orange,
      // amber: colors.amber,
      // yellow: colors.yellow,
      // lime: colors.lime,
      // green: colors.green,
      // emerald: colors.emerald,
      // teal: colors.teal,
      // cyan: colors.cyan,
      // sky: colors.sky,
      blue: colors.blue,
      // indigo: colors.indigo,
      // violet: colors.violet,
      // purple: colors.purple,
      // fuchsia: colors.fuchsia,
      // pink: colors.pink,
      // rose: colors.rose,
    },
  },
  plugins: [],
};
