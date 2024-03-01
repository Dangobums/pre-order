/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#040f0f',
        secondary: '#0e3013',
        'primary-gray': '#656665',
        'light-green': '#289944',
        'light-gray': '#e8e8e9'
      },
    },
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
};
