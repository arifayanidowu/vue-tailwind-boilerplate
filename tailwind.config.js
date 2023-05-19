/** @type {import('tailwindcss').Config} */
export default {
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
  plugins: [import('@tailwindcss/aspect-ratio')]
}
