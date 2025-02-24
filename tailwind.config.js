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
        SecondaryBackground: '#fff1ce',
        Text: '#333333',
        Accent: '#C0A080',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slideUp 1s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
      },
    },
  },
  plugins: [],
};

