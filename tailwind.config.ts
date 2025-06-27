import { table } from "console";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "#FFF",
        button: "#62C1BF",
        buttonColor: "#224443",
        ring: "hsl(var(--ring))",
        sidebarBg: "#27484C",
        sidebarColor: "#E0E0E0",
        headerBg: "#27484C",
        bodyBg: "#1B1B1B",
        bodyColor: "#E0E0E0",
        tableHeaderBg: "#6ECEDA",
        tableHeaderColor: "#224443",
        starCardBg: "#27484C",
        starCardColor: "#EBEBEB",
        tableBg: "#fff",
        tableColor: "#E0E0E0",
        settingBg: "#373737",
        settingColor: "#62C1BF",
        borderColor: "#62C1BF",
        tableRowColor: "#EBEBEB",
        paginationBg: "#62C1BF",
        paginationColor: "#224443",
        authFormBg: "#373737",
        authFormColor: "#E0E0E0",
        inputBg: "#535353",
        inputColor: "#E0E0E0",
        inputIconColor: "#62C1BF",
        background: "#FFFFFF",
        background2: "#000",
        foreground: "hsl(var(--foreground))",
        primary: {
          // only for primary color
          DEFAULT: "#FFF",
          foreground: "hsl(var(--primary-foreground))",
        },
        primary2: {
          DEFAULT: "#726547",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          // only for secondary color
          DEFAULT: "#C3C3C3",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        teal: {
          800: "#1e4e4e",
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

export default config;
