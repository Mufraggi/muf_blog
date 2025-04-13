<script setup lang="ts">
defineProps<{
  post: {
    tags: string[]
  }
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-4"> <!-- Déplacez le v-for vers NuxtLink -->
    <NuxtLink
        v-for="tag in post.tags"
        :key="tag"
        class="inline-flex items-center border-2 border-black px-3 py-1 text-sm font-bold hover:bg-black hover:text-white"
    >
      <Icon name="heroicons:tag" class="w-4 h-4"/>
      {{ tag.toUpperCase() }}
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>