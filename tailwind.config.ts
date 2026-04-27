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
        /* ── Base Colors ──────────────────────────────────────────────── */
        white: "#ffffff",
        navy: "#1e3a8a",
        "navy-mid": "#1e40af",
        blue: "#2952cc",
        "blue-light": "#3b82f6",
        gold: "#d97706",
        "gold-light": "#f59e0b",
        cream: "#f8f9ff",
        "cream-dark": "#eef2ff",

        /* ── Semantic Mappings ────────────────────────────────────────── */
        background: {
          DEFAULT: "#f8f9ff",
          white: "#ffffff",
          dark: "#1e3a8a",
        },
        brand: {
          DEFAULT: "#1e3a8a",
          mid: "#1e40af",
          light: "#3b82f6",
          blue: "#2952cc",
        },
        accent: {
          DEFAULT: "#d97706",
          hover: "#f59e0b",
          light: "#fef3c7",
          muted: "#d9770615",
        },
        text: {
          primary: "#0b1f3a",
          secondary: "#5a6a82",
          tertiary: "#8fa0b8",
        },
        border: {
          DEFAULT: "rgba(11, 31, 58, 0.12)",
          light: "rgba(11, 31, 58, 0.07)",
        },
        success: "#166534",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        lg: "8px",
        xl: "12px",
        "2xl": "14px",
      },
      boxShadow: {
        card: "0 8px 48px rgba(30, 58, 138, 0.1)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
        "slide-in": "slideIn 0.45s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(14px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
