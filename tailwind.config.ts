import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        content: "1152px",
      },
      colors: {
        border: "rgba(255, 255, 255, 0.06)",
        input: "rgba(255, 255, 255, 0.06)",
        ring: "#7f3bed",
        background: {
          DEFAULT: "#15142e",
          secondary: "#1f1d3e",
          alt: "#1c1a37",
        },
        foreground: "#f5f5fa",
        primary: {
          DEFAULT: "#7f3bed",
          foreground: "#ffffff",
          dark: "#6819e6",
          light: "#d4c5f7",
        },
        secondary: {
          DEFAULT: "#1f1d3e",
          foreground: "#f5f5fa",
        },
        destructive: {
          DEFAULT: "#ef4343",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1f1d3e",
          foreground: "#babac9",
        },
        accent: {
          DEFAULT: "#ec4699",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#2c2654",
          foreground: "#f5f5fa",
        },
        card: {
          DEFAULT: "#2c2654",
          foreground: "#f5f5fa",
          hover: "#382a6a",
        },
        sidebar: {
          DEFAULT: "#15142e",
          foreground: "#f5f5fa",
          primary: "#7f3bed",
          "primary-foreground": "#ffffff",
          accent: "#1f1d3e",
          "accent-foreground": "#f5f5fa",
          border: "rgba(255, 255, 255, 0.06)",
          ring: "#7f3bed",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
