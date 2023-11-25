<script setup lang="ts">
import MultilineText from '../MultilineText/MultilineText.vue';
import { computed } from 'vue';
import { ensureDataUri } from '../../utils/img-util';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
});

const imageBackgroundStyle = computed(() => {
  const dataUri = ensureDataUri(props.image, 'image/png');
  return { 'background-image': `url(${dataUri})` };
});
</script>

<template>
  <div class="slide" data-testid="slide" :style="imageBackgroundStyle">
    <div class="text-container" v-if="text">
      <MultilineText :text="text" data-testid="slide-text" />
    </div>

    <div></div>
  </div>
</template>

<style scoped>
.slide {
  display: grid;
  gap: 8px;
  grid-template-columns: minmax(160px, 1fr) 2fr;
  align-items: center;
  justify-items: center;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.text-container {
  background-color: rgba(0, 0, 0, 0.67);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 24px 32px;
}
</style>
