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
        @openEditor="$router.push({ name: RouteNames.Editor })"
        @openSettings="$router.push({ name: RouteNames.Vault })"
      />
    </div>
    <div>
      <slot />
    </div>
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
  display: flex;
  flex-direction: row;
  gap: 16px;
  position: sticky;
  top: 0;
  margin: -16px;
  padding: 16px;
  z-index: 1;
}

.top *:first-child {
  flex-grow: 1;
}
</style>
