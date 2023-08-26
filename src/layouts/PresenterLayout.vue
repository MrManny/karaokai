<script setup lang="ts">
import type { PropType } from 'vue';
import type { Presentation } from '../types/presentation-schema';

defineProps({
  presentation: {
    type: Object as PropType<Presentation>,
    required: true,
  },
});
</script>

<template>
  <main data-testid="presentation">
    <slot />
  </main>
</template>

<style scoped>
main {
  width: 100vh;
  height: 100vw;
  overflow: hidden;
}
</style>
