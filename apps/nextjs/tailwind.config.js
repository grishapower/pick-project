/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "!./node_modules",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#15171E",
      lightBlue: "#149DDB",
      lighBlue2: "#779cf4",
      lightBlue3: "#1888B8",

      yellow: "#E9C91E",

      gold: "#DBBA08",
      silver: "#A9B4BE",
      red: "#A84A2F",

      bgMain: "#222429",
      grey: "#8B9094",
      grey2: "#777773",

      darkGrey: "#373A41",
      green: "#98B818", // from figma
      blueSecond: "#7BC5D9",
      bgSecond: "#1C1E23",
      bgBlue: "#48616F",
      blueMain: "#2EB5F2",
      darkBlue: "#404EED", //todo rename

      orange: "#FEAC03",
    },
  },
  plugins: [],
  // mode: "jit",
};
