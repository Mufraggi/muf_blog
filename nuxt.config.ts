export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image'
  ],
  css: ['~/assets/style/main.css'],
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['go', 'rust', 'ts', 'bash'],
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'monokai'
          }
        }
      }
    },
  },
})
