<script setup lang="ts">

</script>

<template>
  <section class="mb-24">
    <div class="mb-12 border-4 border-black p-8">
      <div class="flex flex-col md:flex-row md:gap-8">
        <div class="mb-6 md:mb-0 md:w-1/3">
          <div class="aspect-square w-full border-2 border-black bg-gray-100 overflow-hidden">
          <!--  <img
                src="/placeholder.svg?height=400&width=400"
                alt="Profile photo"
                class="h-full w-full object-cover"
            />-->
          </div>
        </div>
        <div class="md:w-2/3">
          <h2 class="mb-4 text-4xl font-bold uppercase tracking-tighter md:text-5xl">ABOUT ME</h2>
          <p class="mb-4 text-xl">
            Hello, I'm [Your Name]. I'm a [your profession/role] with a passion for brutalist design and
            minimalist aesthetics.
          </p>
          <p class="mb-6 text-xl">
            My work focuses on creating raw, authentic experiences that cut through the noise of conventional
            design. I believe in the power of simplicity and the beauty of unfiltered expression.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink
                to='/blog'
                class="inline-flex items-center border-2 border-black bg-black px-6 py-3 text-lg font-bold text-white hover:bg-white hover:text-black">
              READ BLOG

            </NuxtLink>
            <NuxtLink
                to='/about'
                class="inline-flex items-center border-2 border-black px-6 py-3 text-lg font-bold hover:bg-black hover:text-white">
              READ BLOG

            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>