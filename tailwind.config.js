/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cormorant Garant', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50:  '#fdf6e3',
          100: '#f5e6c8',
          200: '#ebd49a',
          300: '#e8c87a',
          400: '#d4a43a',
          500: '#b8860b',
          600: '#8b6508',
          700: '#6b4e06',
          800: '#4d3804',
          900: '#332502',
          950: '#1a1200',
        },
        accent: {
          400: '#cd7f32',
          500: '#b87333',
          600: '#8b5a24',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
