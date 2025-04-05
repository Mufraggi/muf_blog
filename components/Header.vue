<template>
  <header class="border-b-4 border-black px-4 py-6 md:px-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold uppercase tracking-tighter md:text-4xl">BRUTAL</h1>
      <nav class="hidden md:block">
        <ul class="flex space-x-8 text-lg font-medium uppercase">
          <li v-for="(item, index) in navItems" :key="index">
            <NuxtLink :to="item.path" class="hover:underline hover:text-yellow-300 transition-colors">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <MobileMenu class="md:hidden" />
    </div>
  </header>
</template>
<script setup lang="ts">
const navItems = [
  { name: 'ACCUEIL', path: '/' },
  { name: 'À PROPOS', path: '/about' },
  { name: 'PROJETS', path: '/projects' },
  { name: 'BLOG', path: '/blog' },
];
</script>