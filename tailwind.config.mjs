/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "realistic-wiggle 2s ease-in-out infinite", // Adjust duration
      },
      keyframes: {
        "realistic-wiggle": {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(3deg)" },
          "30%": { transform: "rotate(-3deg)" },
          "45%": { transform: "rotate(2deg)" },
          "60%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(1deg)" },
          "90%": { transform: "rotate(-1deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
