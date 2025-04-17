export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    future: {
        compatibilityVersion: 4
    },
    modules: [
        '@nuxtjs/robots',
        '@nuxtjs/seo',
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/image',
        'nuxt-og-image',
        '@nuxt/icon',

    ],
    tailwindcss: {
        cssPath: [`~/assets/style/main.css`, { injectPosition: "first" }],
        config: {},
        viewer: true,
        exposeConfig: false,
    },
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