// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // <--- ADD THIS
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        primary: "rgb(var(--color-text) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary-text) / <alpha-value>)",
        tint: "rgb(var(--color-tint) / <alpha-value>)",
        icon: "rgb(var(--color-icon) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
