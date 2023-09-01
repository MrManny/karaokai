<script setup lang="ts">
import type { Slide } from '../../types/slide-schema';
import type { PropType } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  slide: {
    type: Object as PropType<Slide>,
    required: true,
  },
});

const imageBackgroundStyle = computed(() => ({
  'background-image': `url(${props.slide.image?.base64})`,
}));
</script>

<template>
  <div class="slide" :style="imageBackgroundStyle">
    <div class="text-container">
      <p v-if="slide.text?.text">
        {{ slide.text?.text }}
      </p>
    </div>

    <div class="image-container"></div>
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

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

p {
  font-size: 24pt;
  hyphens: auto;
}

.text-container {
  background-color: rgba(0, 0, 0, 0.33);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 24px 32px;
}

img {
  aspect-ratio: 16/9;
  height: auto;
  width: 100%;
}
</style>
