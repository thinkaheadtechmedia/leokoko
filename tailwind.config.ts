import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal purple + gold gospel palette
        royal: {
          50:  "#f5f1fb",
          100: "#ebe1f7",
          200: "#d4bff0",
          300: "#b594e3",
          400: "#9568d3",
          500: "#7a47c2",
          600: "#6532aa",
          700: "#4e2585",
          800: "#36195e",
          900: "#1f0e38",
          950: "#120721",
        },
        gold: {
          50:  "#fdf9ec",
          100: "#fbf0c5",
          200: "#f6e088",
          300: "#f0c94a",
          400: "#e8b020",
          500: "#d4961a", // primary gold
          600: "#b4760f",
          700: "#8f5810",
          800: "#774614",
          900: "#653b16",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "royal-gradient":
          "linear-gradient(135deg, #1f0e38 0%, #36195e 50%, #4e2585 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #f0c94a 0%, #d4961a 50%, #8f5810 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
