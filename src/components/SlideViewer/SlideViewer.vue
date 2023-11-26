<script setup lang="ts">
import type { Slide } from '../../types/slide-schema';
import type { PropType } from 'vue';
import { computed } from 'vue';
import SplitLayout from './SplitLayout.vue';
import StandaloneLayout from './StandaloneLayout.vue';

const props = defineProps({
  slide: {
    type: Object as PropType<Slide>,
    required: true,
  },
});

const standalone = computed(() => props.slide.layout === 'intro' || props.slide.layout === 'outro');
</script>

<template>
  <div class="viewer full">
    <StandaloneLayout v-if="standalone" class="full" :text="slide.text?.text ?? 'Karaokai'" is-heading />
    <SplitLayout v-else class="full" :text="slide.text?.text ?? ''" :image="slide.image?.base64 ?? ''" />
  </div>
</template>

<style scoped>
.full {
  width: 100%;
  height: 100%;
}

.viewer {
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  background-color: #000000;
  font-size: 24pt;
  hyphens: auto;
}
</style>
