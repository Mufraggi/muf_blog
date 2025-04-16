<script setup lang="ts">
const route = useRoute()
const {data: page} = await useAsyncData(route.path, () => {
  return queryCollection('tech').path(route.path).first()
})

</script>

<template>
  <div v-if="page" class="max-w-4xl mx-auto px-4 py-12">

    <HeaderArticle :post="page"/>

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <ContentRenderer :value="page"/>
    </div>
  </div>

</template>
