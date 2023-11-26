<script setup lang="ts">
import Brand from '../components/Brand/Brand.vue';
import MainActions from '../components/MainActions/MainActions.vue';
import { RouteNames } from '../routes';
import { useRouter } from 'vue-router';
import { useElectron } from '../composables/useElectron/useElectron';

const { push } = useRouter();
const { quit } = useElectron();

const goTo = (place: RouteNames) => {
  void push({ name: place });
};
</script>

<template>
  <div class="layout">
    <div class="top">
      <Brand @click="goTo(RouteNames.Main)" />

      <MainActions
        @openEditor="goTo(RouteNames.Editor)"
        @openSettings="goTo(RouteNames.Vault)"
        @openWizard="goTo(RouteNames.Wizard)"
        @exit="() => quit()"
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
