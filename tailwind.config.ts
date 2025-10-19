/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'neuropol': ['Neuropol', 'Inter', 'Arial Black', 'sans-serif'],
        'sans': ['Neuropol', 'Inter', 'Arial Black', 'system-ui', 'sans-serif'],
        'display': ['Neuropol', 'Inter', 'Arial Black', 'sans-serif'],
      },
      fontSize: {
        'fluid-xl': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-2xl': 'clamp(2rem, 5vw, 4rem)',
        'fluid-3xl': 'clamp(2.5rem, 6vw, 5rem)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1e40af", // IPOS-Steel primary blue
          foreground: "hsl(var(--primary-foreground))",
          blue: "#1e40af",
        },
        secondary: {
          DEFAULT: "#0f172a", // IPOS-Steel navy
          foreground: "hsl(var(--secondary-foreground))",
          navy: "#0f172a",
        },
        destructive: {
          DEFAULT: "#dc2626", // IPOS-Steel error red
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#DCDCDC", // IPOS-Steel gray
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
        success: "#059669", // IPOS-Steel success green
        warning: "#d97706", // IPOS-Steel warning orange
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}