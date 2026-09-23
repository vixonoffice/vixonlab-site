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
        border: "rgba(255, 255, 255, 0.08)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "#7c3aed",
        background: {
          DEFAULT: "#0b0a16",
          secondary: "#13112a",
          alt: "#0f0d20",
        },
        foreground: "#f5f3ff",
        primary: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff",
          dark: "#6d28d9",
          light: "#c4b5fd",
        },
        secondary: {
          DEFAULT: "#13112a",
          foreground: "#f5f3ff",
        },
        destructive: {
          DEFAULT: "#ef4343",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#13112a",
          foreground: "#b8b5d0",
        },
        accent: {
          DEFAULT: "#d946ef",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#15132b",
          foreground: "#f5f3ff",
        },
        card: {
          DEFAULT: "#15132b",
          foreground: "#f5f3ff",
          hover: "#1c1938",
        },
        sidebar: {
          DEFAULT: "#0b0a16",
          foreground: "#f5f3ff",
          primary: "#7c3aed",
          "primary-foreground": "#ffffff",
          accent: "#13112a",
          "accent-foreground": "#f5f3ff",
          border: "rgba(255, 255, 255, 0.08)",
          ring: "#7c3aed",
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
