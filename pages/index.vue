<template>
  <div>
    <MufSection/>
    <section class="mb-24">
      <h2 class="mb-12 text-3xl font-bold uppercase tracking-tighter md:text-5xl">LATEST POSTS</h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CardArticle v-for="item in [{id:1, title: 'Post 1'}, {id:2, title: 'Post 2'}, {id:3, title: 'Post 3'}]"
                     :key="item.id"
                     :post="item"/>
      </div>
    </section>
    <NewsLater/>
  </div>
</template>
<script setup lang="ts">
import NewsLater from "~/components/NewsLater.vue";

const allPosts = await queryCollection('tech').order('date', 'DESC').all()

console.log(allPosts)
</script>