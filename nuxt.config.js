export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mecsenzo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/base.css', '@/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/global-components.js', '@/plugins/global-detective.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/fontawesome',
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
      },
      {
        code: 'vi',
        file: 'vi.js',
      },
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'vi',
  },

  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true,
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  env: {
    baseUrlAPI:
      'https://mecsenzo-default-rtdb.asia-southeast1.firebasedatabase.app',
    firebaseAPIKey: process.env.API_KEY,
  },
}
