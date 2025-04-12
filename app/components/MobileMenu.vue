<script setup lang="ts">
import {ref, defineComponent, h, markRaw} from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
const XIcon = defineComponent({
  setup() {
    return () =>
        h('svg', {class: 'h-8 w-8', viewBox: '0 0 24 24'}, [
          h('path', {
            d: 'M6 18L18 6M6 6l12 12',
            stroke: 'black',
            'stroke-width': '2',
            'stroke-linecap': 'round',
          }),
        ])
  },
})

// Composant Burger (3 barres)
const BurgerIcon = defineComponent({
  setup() {
    return () =>
        h('div', {class: 'space-y-2'}, [
          h('div', {class: 'h-1 w-8 bg-black'}),
          h('div', {class: 'h-1 w-8 bg-black'}),
          h('div', {class: 'h-1 w-8 bg-black'}),
        ])
  },
})
const navItems = [
  {name: 'ACCUEIL', path: '/'},
  {name: 'À PROPOS', path: '/about'},
  {name: 'PROJETS', path: '/projects'},
  {name: 'BLOG', path: '/blog'},
];
</script>

<template>
  <div>
    <button
        class="block md:hidden z-50"
        @click="toggleMenu"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    >
      <component :is="isOpen ? XIcon : BurgerIcon"/>
    </button>

    <div v-if="isOpen" class="fixed inset-0 z-40 bg-white">
      <div class="flex h-full flex-col p-8">
        <nav class="mt-16">
          <ul class="space-y-6 text-3xl font-bold uppercase">
            <li v-for="(item, index) in navItems" :key="index">
              <NuxtLink
                  :to="item.path"
                  class="hover:underline hover:text-yellow-300 transition-colors"
                  @click="toggleMenu"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="mt-auto">
          <div class="border-t-2 border-black pt-6">
            <h3 class="mb-4 text-lg font-bold uppercase">Connect</h3>
            <ul class="flex space-x-4">
              <li>
                <a href="#" class="inline-block border-2 border-black p-3 hover:bg-black hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" class="inline-block border-2 border-black p-3 hover:bg-black hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" class="inline-block border-2 border-black p-3 hover:bg-black hover:text-white">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>