const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        vh50: '50vh'
      },
      screens: {
        phone: '200px'
      },
      backgroundImage: (theme) => ({
        'hero-pattern': "url('./Media/Images/heroimageclearlefttorightslow.svg')"
      }),
      colors: {
        seagreen: '#16c79a',
        darkblue: '#19456b',
        lighterblue: '#11698e',
        coolwhite: '#ffffff'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
