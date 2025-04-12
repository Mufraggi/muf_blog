import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

const defaultSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()).nonempty(),
  slug: z.string(),
  author: z.string(),
  readingTime: z.number(),
  cover: z.string(),
  related: z.array(z.string()).optional(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '**/*.md',
        schema: defaultSchema
      })),
    tech: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'tech/**/*.md',
        schema: defaultSchema
      }))
  }
})
