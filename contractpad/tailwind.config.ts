import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Unified with FieldPass landing — dark thermal base
        paper: "#0a0c10",          // page background
        "paper-raised": "#11141a", // slightly elevated background
        surface: "#181c24",         // card surface
        "surface-hi": "#212634",    // hover / focus surface
        ink: "#f0ece4",             // primary text (was dark; now light for dark bg)
        "ink-soft": "rgba(240, 236, 228, 0.78)",
        "ink-muted": "rgba(240, 236, 228, 0.48)",
        "ink-faint": "rgba(240, 236, 228, 0.22)",
        rule: "rgba(240, 236, 228, 0.08)",
        "rule-strong": "rgba(240, 236, 228, 0.16)",
        // Accent — deep thermal orange (matches FieldPass)
        brand: {
          50: "rgba(232, 114, 58, 0.08)",
          100: "rgba(232, 114, 58, 0.14)",
          200: "rgba(232, 114, 58, 0.28)",
          300: "#ff9d63",
          400: "#ff7a36",
          500: "#e8723a",
          600: "#d4553a",
          700: "#9e3e15",
          800: "#6f2c10",
          900: "#3d180a",
        },
        cool: {
          500: "#3a8ee8",
          700: "#3a6be8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.25)",
        "card-lg": "0 2px 4px rgba(0, 0, 0, 0.35), 0 20px 48px rgba(0, 0, 0, 0.4)",
        "inner-ink": "inset 0 0 0 1px rgba(240, 236, 228, 0.08)",
        "glow-brand": "0 0 32px rgba(232, 114, 58, 0.15)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "thermal-gradient":
          "linear-gradient(135deg, #e8723a 0%, #d4553a 30%, #8a3ae8 60%, #3a8ee8 100%)",
        "surface-grad":
          "linear-gradient(180deg, #181c24 0%, #11141a 100%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.4s ease",
        "pulse-glow": "pulse-glow 2s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
