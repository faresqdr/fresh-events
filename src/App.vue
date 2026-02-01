<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterUtils from './components/FooterUtils.vue'
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
