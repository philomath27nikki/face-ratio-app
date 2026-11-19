import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rausch: {
          DEFAULT: "#ff385c",
          active: "#e00b41",
          disabled: "#ffd1da",
          soft: "#fff0f3",
        },
        primary: {
          DEFAULT: "#ff385c",
          active: "#e00b41",
          disabled: "#ffd1da",
        },
        ink: "#222222",
        body: "#3f3f3f",
        muted: "#6a6a6a",
        mutedSoft: "#929292",
        hairline: "#dddddd",
        hairlineSoft: "#ebebeb",
        borderStrong: "#c1c1c1",
        canvas: "#ffffff",
        surfaceSoft: "#f7f7f7",
        surfaceCard: "#ffffff",
        surfaceStrong: "#f2f2f2",
        star: "#222222",
        // Backward-compat aliases for smooth migration
        paper: "#ffffff",
        panel: "#ffffff",
        brass: "#ff385c",
        line: "#dddddd",
      },
      boxShadow: {
        airbnb: "rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0",
        airbnbHover: "rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.08) 0 4px 14px 0, rgba(0, 0, 0, 0.12) 0 8px 24px 0",
      },
      borderRadius: {
        airbnbSm: "8px",
        airbnbMd: "14px",
        airbnbLg: "20px",
        airbnbXl: "32px",
      },
      fontFamily: {
        sans: [
          "'Airbnb Cereal VF'",
          "Circular",
          "-apple-system",
          "BlinkMacSystemFont",
          "Roboto",
          "'Helvetica Neue'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
