/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf7',
          100: '#d5f4e9',
          500: '#0f9f8a',
          600: '#087f70',
          700: '#06665b',
          900: '#123d3a',
        },
      },
    },
  },
  plugins: [],
}
