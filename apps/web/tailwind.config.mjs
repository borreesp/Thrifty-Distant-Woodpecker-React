import baseConfig from "@thrifty/config/tailwind.config.base.cjs";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    ...(baseConfig.theme || {}),
    extend: {
      ...(baseConfig.theme?.extend || {})
    }
  },
  plugins: baseConfig.plugins || []
};

export default config;
