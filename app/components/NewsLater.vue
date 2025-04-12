<script setup lang="ts">

</script>

<template>
  <section class="mb-24">
    <div class="border-4 border-black p-8">
      <h2 class="mb-6 text-3xl font-bold uppercase tracking-tighter md:text-5xl">NEWSLETTER</h2>
      <p class="mb-8 text-xl">Subscribe to get the latest posts delivered straight to your inbox.</p>
      <form class="flex flex-col md:flex-row">
        <input
            type="email"
            placeholder="YOUR EMAIL"
            class="mb-4 border-2 border-black p-4 text-lg md:mb-0 md:mr-4 md:flex-1"
            required
        />
        <button
            type="submit"
            class="border-2 border-black bg-black px-8 py-4 text-lg font-bold uppercase text-white hover:bg-white hover:text-black"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>

</style>