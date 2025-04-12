<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('tech').path(route.path).first()
})
</script>

<template>
  <div v-if="page">
    <ContentRenderer :value="page" />
  </div>
</template>
