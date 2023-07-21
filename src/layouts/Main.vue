<script setup lang="ts">
import Brand from '../components/brand/Brand.vue';
</script>

<template>
  <div class="app">
    <div class="top">
      <Brand />
    </div>
    <nav>
      Side
    </nav>
    <main>
      Main
    </main>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  gap: 8px;
  grid-template-columns: 240px auto;
  grid-template-rows: 48px auto;
  grid-template-areas: "top top" "side main";
}

.top {
  grid-area: top;
}

nav {
  grid-area: side;
}

main {
  grid-area: main;
}
</style>
