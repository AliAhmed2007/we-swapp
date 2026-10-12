import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        mint: {
          DEFAULT: "#10D08A",
          50: "#E6FBF4",
          100: "#CCF7E9",
          200: "#99EFD3",
          300: "#66E7BD",
          400: "#33DFA7",
          500: "#10D08A",
          600: "#0DA672",
          700: "#0A7D59",
          800: "#075341",
          900: "#042A28",
        },
        emerald: {
          DEFAULT: "#009F6B",
          50: "#E6F7F1",
          100: "#CCEFE3",
          200: "#99DFC7",
          300: "#66CFAB",
          400: "#33BF8F",
          500: "#009F6B",
          600: "#008056",
          700: "#006040",
          800: "#00402B",
          900: "#002015",
        },
        darkAccent: {
          DEFAULT: "#0B4F3A",
          50: "#E8F2EE",
          100: "#D1E5DD",
          200: "#A3CBBB",
          300: "#75B199",
          400: "#479777",
          500: "#0B4F3A",
          600: "#093F2E",
          700: "#072F23",
          800: "#052017",
          900: "#02100C",
        },
        
        // Canvas & Surface
        canvas: {
          dark: "#0D1117",
          light: "#F8FAFC",
        },
        surface: {
          dark: "#161B22",
          light: "#FFFFFF",
        },
        border: {
          dark: "#21262D",
          light: "#E2E8F0",
        },
        
        // Text Colors
        text: {
          slate: "#0F172A",
          muted: "#64748B",
          light: "#94A3B8",
          dark: "#E2E8F0",
        },
        
        // Shadcn/ui Compatibility
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "medium": "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "hard": "0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
