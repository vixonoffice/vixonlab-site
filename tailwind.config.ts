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
        ring: "#6e56cf",
        background: {
          DEFAULT: "#0b0b0d",
          secondary: "#131316",
          alt: "#101013",
        },
        foreground: "#f4f4f5",
        primary: {
          DEFAULT: "#6e56cf",
          foreground: "#ffffff",
          dark: "#5b45b8",
          light: "#b9adff",
        },
        secondary: {
          DEFAULT: "#131316",
          foreground: "#f4f4f5",
        },
        destructive: {
          DEFAULT: "#ef4343",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#131316",
          foreground: "#a8a8b3",
        },
        accent: {
          DEFAULT: "#6e56cf",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#151518",
          foreground: "#f4f4f5",
        },
        card: {
          DEFAULT: "#151518",
          foreground: "#f4f4f5",
          hover: "#1c1c20",
        },
        sidebar: {
          DEFAULT: "#0b0b0d",
          foreground: "#f4f4f5",
          primary: "#6e56cf",
          "primary-foreground": "#ffffff",
          accent: "#131316",
          "accent-foreground": "#f4f4f5",
          border: "rgba(255, 255, 255, 0.08)",
          ring: "#6e56cf",
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
