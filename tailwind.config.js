/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        16: "1.6%",
      },
      colors: {
        main: "#197277",
        focus: "#1D6B6F",
        mdp: "#1D6B6F",
      },
      boxShadow: {
        connect: "-19px -19px 37px #145c60, 19px 19px 37px #1e888e",
      },
      keyframes: {
        breathing: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.07)" },
        },
      },
      animation: {
        breathing: "breathing 3s ease-in-out infinite",
        border: "text-xs text-base -top-4 left-3",
      },
      scale: {
        98: ".98",
      },
    },
    plugins: [],
  },
};
