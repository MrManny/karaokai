<script setup lang="ts">
import type { Slide } from '../../types/slide-schema';
import type { PropType } from 'vue';
import { computed } from 'vue';
import { ensureDataUri } from '../../utils/img-util';
import MultilineText from '../MutlilineText/MultilineText.vue';

const props = defineProps({
  slide: {
    type: Object as PropType<Slide>,
    required: true,
  },
});

const imageBackgroundStyle = computed(() => {
  const dataUri = ensureDataUri(props.slide.image?.base64 ?? '', 'image/png');
  return { 'background-image': `url(${dataUri})` };
});
</script>

<template>
  <div class="slide" data-testid="slide" :style="imageBackgroundStyle">
    <div class="text-container" v-if="slide.text?.text">
      <MultilineText :text="slide.text?.text" data-testid="slide-text" />
    </div>

    <div></div>
  </div>
</template>

<style scoped>
.slide {
  aspect-ratio: 16/9;
  background-color: #000000;
  display: grid;
  gap: 8px;
  grid-template-columns: minmax(160px, 1fr) 2fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.text-container {
  background-color: rgba(0, 0, 0, 0.67);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 24px 32px;

  font-size: 24pt;
  hyphens: auto;
}

img {
  aspect-ratio: 16/9;
  height: auto;
  width: 100%;
}
</style>
