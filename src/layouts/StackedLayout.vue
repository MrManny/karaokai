<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  gap: {
    type: Number,
    default: 8,
    validator: (value) => typeof value === 'number' && value >= 0,
  },
});

const gapStyle = computed(() => `gap: ${props.gap}px`);
</script>

<template>
  <div class="stacked" :style="gapStyle">
    <slot />
  </div>
</template>

<style scoped>
.stacked {
  display: flex;
  flex-direction: column;
}
</style>
