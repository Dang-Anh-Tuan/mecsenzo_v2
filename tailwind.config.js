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
        success: '#00c24e',
      },
      keyframes: {
        scaleDown: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        leftIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        dotTyping: {
          '0%': {
            boxShadow:
              '9989px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10009px 0 0 0 #9880ff;',
          },
          '16.667%': {
            boxShadow:
              '9989px -10px 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10009px 0 0 0 #9880ff;',
          },
          '33.333%': {
            boxShadow:
              '9989px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10009px 0 0 0 #9880ff;',
          },
          '50%': {
            boxShadow:
              '9989px 0 0 0 #9880ff, 9999px -10px 0 0 #9880ff, 10009px 0 0 0 #9880ff;',
          },
          '66.667%': {
            boxShadow:
              '9989px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10009px 0 0 0 #9880ff;',
          },
          '83.333%': {
            boxShadow:
              '9989px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10009px -10px 0 0 #9880ff;',
          },
          '100%': {
            boxShadow:
              '9989px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10009px 0 0 0 #9880ff;',
          },
        },
      },
    },
  },
  plugins: [],
}
