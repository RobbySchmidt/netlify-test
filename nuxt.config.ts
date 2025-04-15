// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [    
    '~/assets/fonts/fonts.css',
    '~/assets/css/main.scss', 
    ],

  app: {
  pageTransition: { name: 'page', mode: 'out-in' },
  head: {
    link: [{rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"}]
  },
},

  devtools: { enabled: false },
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@pinia/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxt/ui',
    'nuxt-swiper',
  ],

  pinia: {
    autoImports: ["defineStore"],
  },

  imports: {
    dirs: [".stores"],
  },

  compatibilityDate: '2025-03-10',
})