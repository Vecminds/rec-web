import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#102770",
        "background-dark": "#0C1D54",
        "background-darkest": "#081440",
        surface: "#15307A",
        "surface-light": "#1A3A8C",
        border: "#1E4299",
        "border-light": "#2A53B0",
        accent: {
          DEFAULT: "#F2AE1C",
          hover: "#D99A10",
          light: "#FFF4D6",
          muted: "#F2AE1C33",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#B8C5E8",
          tertiary: "#7A8DBF",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
