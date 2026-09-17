import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EDE7D9",
        ink: "#211D17",
        brass: "#9C7A3D",
        brassLight: "#C9A469",
        blueprint: "#26425E",
        panel: "#F6F2E8",
        line: "#D9D0BC"
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
