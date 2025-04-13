<script setup lang="ts">
defineProps<{
  post: {
    id: string
    tags: string[]
    title: string
    description: string
    author: string
    date: string
    readingTime: number
    cover: string
  }
}>()
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

</script>

<template>
  <div class="mb-8">
    <div class="mb-12">
      <div class="mb-6">
        <TagsArticles :post="post"/>
        <h1 class="mb-6 text-4xl font-bold md:text-5xl">{{ post.title }}</h1>
        <p class="mb-6 text-xl">{{ post.description }}</p>
      </div>

      <div class="mb-12 flex items-center justify-between border-b-2 border-t-2 border-black py-4">
        <div class="flex items-center">
          <div>
            <p class="font-bold">{{ formatDate(post.date) }}</p>
            <p class="text-sm">{{ post.date }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <Icon name="heroicons:clock" class="w-4 h-4"/>
          <span>{{ post.readingTime }} min</span>
        </div>
      </div>
    </div>


    <div class="mb-12 border-4 border-black max-w-4xl mx-auto aspect-video bg-gray-200">
      <NuxtPicture
          :src="post.cover"
          class="w-full h-full object-cover"
          :alt="post.title"
          format="webp"
          fit="cover"
      />
    </div>
  </div>
</template>
