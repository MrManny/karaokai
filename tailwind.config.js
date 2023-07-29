/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // https://coolors.co/palette/e63946-f1faee-a8dadc-457b9d-1d3557
      danger: '#E63946',
      success: '#39e642',
      default: '#F1FAEE',
      primary: '#0094C6',
      black: '#212121',
      totalBlack: '#101010',
    },
    fontFamily: {
      body: ['Arial', 'OpenSans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
