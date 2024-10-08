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
        newfont: "Playwrite DE Grund"
      },
      colors: {
        primary: "white",
        secondary: "#344646",
        third: "#ffb6ad",
        fourth: "#0C2B63",

        transAmr:
          "border-none bg-transparent text-white focus:border-none focus:ring-none dark:border-none dark:bg-transparent dark:text-white dark:placeholder-white dark:focus:border-none dark:focus:white",
      },
      writingMode: {
        "vertical-rl": "vertical-rl",
        "vertical-lr": "vertical-lr",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

// main green  #7A8371
// Beige  #9E9586
// light green #8E9387
// old green  #025048
