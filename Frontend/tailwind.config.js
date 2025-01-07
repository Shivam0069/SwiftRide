/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        move: "move 1s infinite ease-in-out",
      },
      keyframes: {
        move: {
          "0%, 100%": { transform: "translateX(1px)" }, // Move forward slightly
          "50%": { transform: "translateX(-5px)" }, // Move backward slightly
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(94deg, #2BDF68 28.85%, #B4F463 97.68%)",
      },
    },
  },
  plugins: [],
};
