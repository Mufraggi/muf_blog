export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},

    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxt/ui'
    ],
    css: ['~/assets/style/main.css'],
    content: {

        build:
            {
                markdown: {
                    toc: {
                        depth: 3, searchDepth:
                            2
                    }, highlight: {
                        langs: ['go', 'rust', 'ts', 'bash'],
                        theme: {
                            // Default theme (same as single string)
                            default: 'github-light',
                            // Theme used if `html.dark`
                            dark: 'github-dark',
                            // Theme used if `html.sepia`
                            sepia: 'monokai'
                        }
                    }
                }
            },
    },
})