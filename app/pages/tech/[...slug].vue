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

<style>
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;

    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;

    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;

    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;

    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;

    --radius: 0rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;

    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;

    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;

    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

.prose h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #333; /* ou votre couleur préférée */
}

.prose h2 {
  font-size: 1.875rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #000000;
}

</style>