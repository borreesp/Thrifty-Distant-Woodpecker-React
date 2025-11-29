const tokens = require("./tokens.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: tokens.brandColors.primary,
          dark: tokens.brandColors.primaryDark,
          accent: tokens.brandColors.accent
        },
        surface: {
          DEFAULT: tokens.brandColors.surface,
          alt: tokens.brandColors.surfaceAlt
        },
        text: tokens.brandColors.text
      },
      fontFamily: {
        sans: tokens.fonts.sans
      },
      borderRadius: {
        md: tokens.radii.md,
        lg: tokens.radii.lg,
        xl: tokens.radii.xl
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: []
};
