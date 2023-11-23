<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  activeSlide: {
    type: Number,
    default: 0,
  },
  totalSlides: {
    type: Number,
    default: 0,
  },
});

const gridCss = computed(() => ({
  'grid-template-columns': `repeat(${props.totalSlides}, 1fr) auto`,
}));

const slideNumbers = computed(() => {
  const numbers: number[] = [];
  for (let i = 0; i < props.totalSlides; i++) {
    numbers.push(i);
  }
  return numbers;
});
</script>

<template>
  <div class="slide-progress" :style="gridCss">
    <div
      v-for="n of slideNumbers"
      :key="n"
      class="segment"
      :class="{ active: n === activeSlide, past: n < activeSlide }"
    ></div>
    <div class="progress">{{ activeSlide + 1 }} / {{ totalSlides }}</div>
  </div>
</template>

<style scoped>
.slide-progress {
  display: grid;
  align-items: center;
  gap: 4px;
}

.segment {
  background-color: var(--surface-50);
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  height: 12px;
}

.segment.active {
  background-color: var(--surface-700);
}

.segment.past {
  background-color: var(--surface-400);
  border-color: var(--gray-300);
}

.progress {
  justify-self: end;
  font-size: 90%;
}
</style>
