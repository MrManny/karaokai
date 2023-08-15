<script setup lang="ts">
import type { Slide } from '../../types/slide';
import type { PropType } from 'vue';

defineProps({
  slide: {
    type: Object as PropType<Slide>,
    required: true,
  },
});
</script>

<template>
  <div class="slide">
    <div>
      <p v-if="slide.text?.text">
        {{ slide.text?.text }}
      </p>
    </div>

    <div>
      <img v-if="slide.image?.base64" :src="slide.image?.base64" alt="" />
    </div>
  </div>
</template>

<style scoped>
.slide {
  aspect-ratio: 16/9;
  background-color: #000000;
  display: grid;
  gap: 8px;
  grid-template-columns: minmax(160px, 1fr) 3fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
}

p {
  font-size: 24pt;
  hyphens: auto;
}

img {
  aspect-ratio: 16/9;
  height: auto;
  width: 100%;
}
</style>
