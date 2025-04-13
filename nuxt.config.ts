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
        '@nuxt/image',
        'nuxt-og-image',
        '@nuxt/icon',
    ],
    css: ['~/assets/style/main.css'],
    image: {
        inject: true,
        provider: 'ipx',

    },
    ogImage: {
        zeroRuntime: true
    },
    content: {
        build: {
            markdown: {
                toc: {
                    depth: 3
                },
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