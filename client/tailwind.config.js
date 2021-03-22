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
        modalunderlay: 'rgba(0,0,0,0.4)',
        darksand: '#b68973',
        wine: '#835858',
        diarrheagreen: '#799351',
        tangerine: '#f9813a',
        junglegreen: '#81b214',
        skyblue: '#1cb3c8'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
