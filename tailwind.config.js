/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2e9ce9',
        primary_light: '#2e9ce9',
        dark_primary: '#ff7200',
        dark_primary_light: '#f49548',
        dark_bg: '#212332',
      },
    },
  },
  plugins: [],
}
