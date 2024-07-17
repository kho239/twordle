/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-20px)" },
          "40%": { transform: "translateX(20px)" },
          "60%": { transform: "translateX(-10px)" },
          "80%": { transform: "translateX(10px)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms linear 1"
      }
    },
  },
  plugins: [],
}

