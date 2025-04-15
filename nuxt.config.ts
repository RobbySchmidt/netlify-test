import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['shadcn-nuxt', '@pinia/nuxt', 'nuxt-directus'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  directus: {      
    url: process.env.DIRECTUS_URL,
    autoFetch: false,
  },
 
  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL,
    },
    
    redirects: false,
  },

  // routeRules: {
  //   '/api/**': {
  //     proxy: {
  //       to: 'https://directuscon.axtlust.de/**',
  //     },
  //   },
  // },
  
  devtools: { enabled: false },

  compatibilityDate: '2025-04-10'
})
