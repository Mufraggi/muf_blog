import {defineContentConfig, defineCollection, z} from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
    collections: {
        content: defineCollection(   asSeoCollection({
            type: 'page',
            source: '**/*.md',
            schema: z.object({
                title: z.string().min(5),
                description: z.string().min(10),
                date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
                    message: "La date doit être au format YYYY-MM-DD",
                }),
                tags: z.array(z.string()).nonempty(),
                language: z.enum(["fr", "en"]),
                slug: z.string().min(3),
                author: z.string().min(2),
                readingTime: z.number().min(1),
                cover: z.string().url().or(z.string().startsWith("/")), // URL ou chemin local
                related: z.array(z.string()).optional(),
            })
        }))
        ,tech:  defineCollection(   asSeoCollection({
            type: 'page',
            source: 'tech/*.md',
            schema: z.object({
                title: z.string().min(5),
                description: z.string().min(10),
                date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
                    message: "La date doit être au format YYYY-MM-DD",
                }),
                tags: z.array(z.string()).nonempty(),
                language: z.enum(["fr", "en"]),
                slug: z.string().min(3),
                author: z.string().min(2),
                readingTime: z.number().min(1),
                cover: z.string().url().or(z.string().startsWith("/")), // URL ou chemin local
                related: z.array(z.string()).optional(),
            })
        }))
    }
})
