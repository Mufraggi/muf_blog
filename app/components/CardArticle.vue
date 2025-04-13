<script setup lang="ts">
defineProps<{
  post: {
    id: string
    slug: string
    path: string
    title: string
    excerpt: string
    date: string
    cover: string
    tags: string[]
  }
}>()
</script>

<template>
  <article :key="post.id" class="border-2 border-black">
    <NuxtPicture
        class="aspect-video w-full object-cover"
        :src="post.cover"
        :placeholder="[30, 20]"
        sizes="sm:100vw"
        format="webp"
        fit="cover"
    />
    <div class="p-6">
      <p class="mb-2 text-sm font-bold uppercase">CATEGORY</p>
      <h3 class="mb-4 text-2xl font-bold">{{ post.title || 'Post Title Goes Here With Some Length' }}</h3>
      <TagsArticles :post="post" />
      <p class="mb-6 text-lg">
        {{
          post.excerpt || 'A brief excerpt from the blog post that gives readers an idea of what the content is about...'
        }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-sm">{{ post.date || 'MAY 15, 2023' }}</span>
        <NuxtLink class="inline-flex items-center font-bold uppercase hover:underline" :to="post.path">READ
          <Icon name="heroicons:arrow-right" class="py-1 w-4 h-4"/>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
