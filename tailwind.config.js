/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        PrimaryGold: '#FFD700',
        SecondaryGold: '#D4AF37',
        Background: '#FFF8E7',
        Text: '#333333',
        Accent: '#C0A080',
      },
    },
  },
  plugins: [],
}

