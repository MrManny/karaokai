<script setup lang="ts">
import Brand from '../components/brand/Brand.vue';
</script>

<template>
  <div class="app">
    <div class="top">
      <Brand />
    </div>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  gap: 8px;
  grid-template-columns: 240px auto;
  grid-template-rows: 48px auto;
  grid-template-areas: 'top' 'main';
  margin: 16px;
}

.top {
  grid-area: top;
}

main {
  grid-area: main;
}
</style>
