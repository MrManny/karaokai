<script setup lang="ts">
import Brand from '../components/Brand/Brand.vue';
import MainActions from '../components/MainActions/MainActions.vue';
</script>

<template>
  <div class="layout">
    <div class="top h-group">
      <Brand />

      <MainActions @onClickSettings="$router.push({ name: 'vault' })" />
    </div>
    <main class="v-group">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  @apply flex flex-col gap-4 m-4;
}

.top {
  @apply flex-nowrap ml-0 mr-0;
  @apply bg-totalBlack;
  @apply sticky top-0 -m-4 p-4;
}

main {
  @apply mt-4 mx-6;
}

@media screen and (min-width: 1280px) {
  main {
    @apply ml-auto mr-auto w-[1280px];
  }
}
</style>
