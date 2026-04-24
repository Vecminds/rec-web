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
        /* ── Backgrounds ──────────────────────────────────────────────── */
        background: "#FFFFFF",
        "background-alt": "#F8F9FB",
        "background-dark": "#102770",       /* brand navy — used sparingly */
        "background-darkest": "#0C1D54",

        /* ── Surfaces ─────────────────────────────────────────────────── */
        surface: "#F2F4F7",
        "surface-light": "#E8ECF1",
        "surface-elevated": "#FFFFFF",

        /* ── Borders ──────────────────────────────────────────────────── */
        border: "#E2E6ED",
        "border-light": "#D0D5DE",

        /* ── Brand accent (navy blue) ─────────────────────────────────── */
        brand: {
          DEFAULT: "#102770",
          light: "#1A3A8C",
          lighter: "#EBF0FF",
          muted: "#10277015",
        },

        /* ── Accent (gold) ────────────────────────────────────────────── */
        accent: {
          DEFAULT: "#F2AE1C",
          hover: "#D99A10",
          light: "#FFF8E8",
          muted: "#F2AE1C20",
        },

        /* ── Text ─────────────────────────────────────────────────────── */
        text: {
          primary: "#1A1D26",
          secondary: "#4A5568",
          tertiary: "#8896AB",
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
