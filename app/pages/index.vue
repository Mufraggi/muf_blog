<template>
  <div>
    <MufSection/>
    <section class="mb-24">
      <h2 class="mb-12 text-3xl font-bold uppercase tracking-tighter md:text-5xl">LATEST POSTS</h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CardArticle v-for="item in techPosts" :key="item.path" :post="item"/>
      </div>
    </section>
    <NewsLater/>
  </div>
</template>

<script setup lang="ts">
const {data: techPosts, error} = await useAsyncData("techPosts", () =>
    queryCollection("tech").limit(3).order("date", "DESC").all()
)
if (error.value) {
  console.error("Une erreur est survenue :", error.value);
}

if (techPosts.value) {
  console.log("Articles tech récupérés :", techPosts.value);
} else {
  console.log("Aucun article tech trouvé.");
}
</script>
