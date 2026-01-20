// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/robots', '@vite-pwa/nuxt'],

  site: {
    url: 'https://applications-tracker.vercel.app',
    name: 'MSc Applications Tracker',
  },

  pwa: {
    manifest: {
      name: 'MSc Applications Tracker',
      short_name: 'MSc Tracker',
      description: 'Track your Master\'s degree applications, deadlines, and recommenders.',
      theme_color: '#0d9488',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '', // Overridden by NUXT_PUBLIC_API_BASE
    }
  },
  app: {
    head: {
      title: 'MSc Applications',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})