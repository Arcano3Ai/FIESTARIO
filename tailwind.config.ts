import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fiestario: {
          carbon: "#111111",
          dark: "#1A1A1A",
          surface: "#222222",
          border: "#2E2E2E",
          warmWhite: "#FAF9F6",
          cream: "#F4F1EA",
          champagne: "#E7D8BF",
          arena: "#D8C7AE",
          gold: "#B89B5E",
          goldLight: "#D4BC7D",
          goldDark: "#94793B",
          stone: "#77736C",
          stoneLight: "#A39E96",
          stoneMuted: "#E2DDD6",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 10px 30px -10px rgba(17, 17, 17, 0.07)",
        dropdown: "0 20px 40px -15px rgba(17, 17, 17, 0.12)",
        glow: "0 0 25px rgba(184, 155, 94, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
