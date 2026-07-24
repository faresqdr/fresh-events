<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import NavBar from './components/NavBar.vue'
import FooterUtils from './components/FooterUtils.vue'

const route = useRoute()
const canonicalUrl = computed(() => `https://fresh-events.fr${route.path}`)

useHead({
  title: computed(() => route.meta.title || 'Fresh Events'),
  meta: [
    {
      name: 'description',
      content: computed(() => route.meta.description || 'Fresh Events - Restauration événémentielle premium à Amnéville'),
    },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:title', content: computed(() => route.meta.title || 'Fresh Events') },
    { property: 'og:description', content: computed(() => route.meta.description || 'Fresh Events - Restauration événémentielle premium à Amnéville') },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl },
  ],
})
</script>

<template>
  <div class="app-layout">
    <NavBar />
    <main>
      <RouterView />
    </main>
    <FooterUtils />
  </div>
</template>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
