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
        button: "#6ECEDA",
        buttonColor: "#4A4A4A",
        ring: "hsl(var(--ring))",
        sidebarBg: "#27484C",
        sidebarLinkBg: "#6ECEDA",
        sidebarColor: "#F2F2F2",
        sidebarActiveColor: "#4A4A4A",
        headerBg: "#27484C",
        bodyBg: "#1B1B1B",
        bodyColor: "#E0E0E0",
        tableHeaderBg: "#6ECEDA",
        tableHeaderColor: "#224443",
        starCardBg: "#27484C",
        starCardColor: "#EBEBEB",
        tableBg: "#fff",
        tableColor: "#000",
        settingBg: "#F2F2F2",
        settingColor: "#62C1BF",
        borderColor: "#62C1BF",
        tableRowColor: "#767676",
        paginationBg: "#62C1BF",
        paginationColor: "#224443",
        authFormBg: "#315D62",
        authFormColor: "#EFF9F9",
        inputBg: "#58A5AF", 
        inputColor: "#F2F2F2",
        inputIconColor: "#62C1BF",
        background: "#FFFFFF",
        background2: "#000",
        foreground: "hsl(var(--foreground))",
        primary: {
          // only for primary color
          DEFAULT: "#000",
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
