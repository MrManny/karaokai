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
  nextDue: {
    type: Boolean,
    default: false,
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
      :class="{ active: n === activeSlide, next: nextDue && n === activeSlide + 1 }"
    ></div>
    <div class="progress">{{ activeSlide + 1 }} / {{ totalSlides }}</div>
  </div>
</template>

<style scoped>
.slide-progress {
  display: grid;
  align-items: center;
  gap: 8px;
  margin: 8px 8px 4px;
}

.segment {
  background-color: var(--surface-100);
  border-radius: 5px;
  height: 12px;
}

.segment.next {
  background-color: var(--surface-200) !important;
}

.segment.active {
  background-color: var(--primary-color);
}

.progress {
  justify-self: end;
  font-size: 90%;
}
</style>
