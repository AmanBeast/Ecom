import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3525cd",
        "primary-container": "#4f46e5",
        "on-primary": "#ffffff",
        "on-primary-container": "#dad7ff",
        "primary-fixed": "#e2dfff",
        "primary-fixed-dim": "#c3c0ff",
        "on-primary-fixed": "#0f0069",
        "on-primary-fixed-variant": "#3323cc",
        "inverse-primary": "#c3c0ff",

        secondary: "#006c49",
        "secondary-container": "#6cf8bb",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#00714d",
        "secondary-fixed": "#6ffbbe",
        "secondary-fixed-dim": "#4edea3",
        "on-secondary-fixed": "#002113",
        "on-secondary-fixed-variant": "#005236",

        tertiary: "#3a2cc1",
        "tertiary-container": "#534ada",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#dbd8ff",
        "tertiary-fixed": "#e3dfff",
        "tertiary-fixed-dim": "#c3c0ff",

        surface: "#fbf8fc",
        "surface-dim": "#dcd9dd",
        "surface-bright": "#fbf8fc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f2f7",
        "surface-container": "#f0edf1",
        "surface-container-high": "#eae7eb",
        "surface-container-highest": "#e4e1e6",
        "surface-variant": "#e4e1e6",
        "surface-tint": "#4d44e3",

        "on-surface": "#1b1b1e",
        "on-surface-variant": "#464555",
        "on-background": "#1b1b1e",
        background: "#fbf8fc",

        outline: "#777587",
        "outline-variant": "#c7c4d8",

        "inverse-surface": "#303033",
        "inverse-on-surface": "#f3f0f4",

        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        gutter: "1rem",
        "gutter-mobile": "0.75rem",
        margin: "1.5rem",
        "margin-mobile": "1rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
