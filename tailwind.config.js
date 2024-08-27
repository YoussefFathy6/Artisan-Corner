/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      screens: {
        // sm: { max: "500px" }, // ==> min 0 to 500px
        Md: { max: "992px" },
        // lg: { min: "769px", max: "992px" },
        Xl: { min: "993px", max: "1200px" },
        Xxl: { min: "1200px" },

        zeroToTo768: { max: "700px" },
        from768: { min: "701px" },
      },

      gridTemplateColumns: {
        autoFill: "repeat(auto-fit, minmax(150px, 1fr))",
      },
      container: {
        center: true,
        padding: "2rem",
        // padding: {
        //   DEFAULT: "1rem",
        //   sm: "2rem",
        //   lg: "4rem",
        //   xl: "5rem",
        //   "2xl": "6rem",
        // },
      },
      fontFamily: {
        lora: ['"Lora", serif'],
        Rosario: ['"Rosario", sans-serif'],
      },
      colors: {
        primary: "#f9f2e6",
        secondary: "#778C7E",
        third: "#913B10",
        fourth: "#0C2B63",
        color1: "#292A2D",
        color2: "#0000001A",
        color3: "#24426A",
        color4: "#18574A",
        color5: "#666689",
        color6: "#C2BEB6",
        color7: "#AAABA7",
        color8: "#971E34",
        color9: "#CBA13E",
        color10: "#73513C",
        color11: "#DAB1B1",
        color12: "#2B9FA7",
        transAmr:
          "border-none bg-transparent text-white focus:border-none focus:ring-none dark:border-none dark:bg-transparent dark:text-white dark:placeholder-white dark:focus:border-none dark:focus:white",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
