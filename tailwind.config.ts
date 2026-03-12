import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dim: "#4f46e5",
        },
        surface: {
          base: "#0a0e1a",
          elevated: "#1a1f2e",
          hover: "rgba(255, 255, 255, 0.03)",
        },
        border: {
          subtle: "#2a3042",
          hover: "#3a4562",
        },
      },
    },
  },
  plugins: [],
};

export default config;
