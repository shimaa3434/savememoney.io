const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        vh50: '50vh'
      },
      backgroundImage: (theme) => ({
        'hero-pattern': "url('./Media/Images/heroimage3.svg')"
      })
    },
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      indigo: colors.indigo,
      pink: colors.pink,
      seagreen: '#16c79a',
      darkblue: '#19456b',
      lighterblue: '#11698e',
      coolwhite: '#f8f1f1'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
