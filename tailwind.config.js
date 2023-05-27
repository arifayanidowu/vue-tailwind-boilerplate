/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["'Barlow Condensed'", 'sans-serif']
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
