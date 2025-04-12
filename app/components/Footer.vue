<template>
  <footer class="border-t-4 border-black px-4 py-12 md:px-6">
    <div class="flex flex-col items-start justify-between md:flex-row">
      <div class="mb-8 md:mb-0">
        <h2 class="mb-4 text-2xl font-bold uppercase tracking-tighter">BRUTAL</h2>
        <p class="max-w-md text-lg">A brutalist and minimalist blog showcasing the beauty of raw design.</p>
      </div>
      <div>
        <h3 class="mb-4 text-lg font-bold uppercase">Connect</h3>
        <ul class="space-y-2 text-lg">
          <li v-for="(item, index) in navItems" :key="index">
            <NuxtLink :to="item.path" class="hover:underline hover:text-yellow-300 transition-colors">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-12 border-t-2 border-black pt-8 text-center">
      <p>© {new Date().getFullYear()} BRUTAL. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navItems = [
  { name: 'ACCUEIL', path: '/' },
  { name: 'À PROPOS', path: '/about' },
  { name: 'PROJETS', path: '/projects' },
  { name: 'BLOG', path: '/blog' },
];
</script>
