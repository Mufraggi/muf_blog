<script setup lang="ts">
defineProps<{
  post: {
    id: string
    slug: string
    path: string
    title: string
    excerpt: string
    date: string
  }
}>()
</script>

<template>
  <article :key="post.id" class="border-2 border-black">
    <NuxtLink :to="post.path" class="absolute inset-0" />
    <div class="aspect-video w-full bg-gray-200"/>
    <div class="p-6">
      <p class="mb-2 text-sm font-bold uppercase">CATEGORY</p>
      <h3 class="mb-4 text-2xl font-bold">{{ post.title || 'Post Title Goes Here With Some Length' }}</h3>
      <p class="mb-6 text-lg">
        {{ post.excerpt || 'A brief excerpt from the blog post that gives readers an idea of what the content is about...' }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-sm">{{ post.date || 'MAY 15, 2023' }}</span>
        <!--<router-link
            :to="`/blog/post-${post.id}`"
            class="inline-flex items-center font-bold uppercase hover:underline"
        >
          READ
        </router-link>-->
      </div>
    </div>
  </article>
</template>
