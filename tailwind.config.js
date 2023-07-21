/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // https://coolors.co/palette/e63946-f1faee-a8dadc-457b9d-1d3557
      red: '#E63946',
      honeydew: '#F1FAEE',
      blue: '#A8DADC',
      cerulean: '#457B9D',
      berkeley: '#1D3557',
      black: '#212121',
    },
    fontFamily: {
      body: ['OpenSans'],
    },
    extend: {},
  },
  plugins: [],
};
