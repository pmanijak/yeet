export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'yeet',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '628' }
      // other meta defined in the pwa module config below
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Quicksand&display=swap"}
    ]
  },

  pwa: {
    meta: {
      name: 'yeet',
      description: 'A small experiment in community funding, by Philip M.',
      ogHost: 'https://yeet.website',
      ogImage: '/img/ograph-banner-nov-27.jpg',
      // defaults take care of the rest
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
  ],

  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
