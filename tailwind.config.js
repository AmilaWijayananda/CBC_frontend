/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ece2d6',
        secondary: '#e6950e',
        accent: '#0a0a0a',
      },
    },
  },
  plugins: [],
}

