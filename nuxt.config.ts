// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiKey: process.env.MY_API_KEY,
    public:{
      API_KEY: process.env.MY_API_KEY,
    }
  },
  devtools: { enabled: true },
  app:{
    head:{
      //add cdn
    }
  },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
