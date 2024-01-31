/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          redLight: '#D22F26',
          red: '#D22F26',
          redDark: '#B1060F',
        },
        neutral: {
          grey: '#737373',
          greyDark: '#323232',
          greyDark2: '#191919',
          greyDark3: '#010101',
          black: '#000000',
          white: '#FFFFFF',
          greyLight3: '#E6E6E6',
          greyLight2: '#CBCBCB',
          greyLight: '#B2B2B2',
        },
        system: {
          red: '#FE0202',
          blue: '#4B6AEA',
        },
      },
    },
  },
  plugins: [],
};
