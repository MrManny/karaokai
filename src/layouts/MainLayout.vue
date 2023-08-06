<script setup lang="ts">
import Brand from '../components/Brand/Brand.vue';
import MainActions from '../components/MainActions/MainActions.vue';
import { RouteNames } from '../routes';
</script>

<template>
  <div class="layout">
    <div class="top">
      <Brand @click="$router.push({ name: RouteNames.Main })" />

      <MainActions
        data-testid="main-actions"
        @openEditor="$router.push({ name: RouteNames.Editor })"
        @openSettings="$router.push({ name: RouteNames.Vault })"
      />
    </div>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.top {
  background-color: var(--surface-b);
  position: sticky;
  top: 0;
  margin: -16px;
  padding: 16px;
  z-index: 1;
}
</style>
