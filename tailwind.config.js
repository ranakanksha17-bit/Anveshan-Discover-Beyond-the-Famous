/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#EAE1D2',
          400: '#D8CBBA',
          500: '#C2B19D',
        },
        forest: {
          50: '#F0F5F2',
          100: '#E1ECE6',
          200: '#C3DAD0',
          600: '#265744',
          700: '#1C4234',
          800: '#142F25',
          900: '#0E221A',
          950: '#081510',
        },
        saffron: {
          50: '#FFF8F1',
          100: '#FDF1E6',
          200: '#FADFC7',
          500: '#D96B27',
          600: '#C3532B',
          700: '#A43E1B',
        },
        charcoal: {
          50: '#F6F7F7',
          100: '#EBEDED',
          400: '#86948D',
          600: '#4D5B53',
          800: '#2B3530',
          900: '#1A211D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(14, 34, 26, 0.06)',
        'card': '0 8px 30px -4px rgba(14, 34, 26, 0.08)',
        'lift': '0 16px 40px -8px rgba(14, 34, 26, 0.14)',
        'gold': '0 6px 20px -2px rgba(217, 107, 39, 0.25)',
      }
    },
  },
  plugins: [],
}
