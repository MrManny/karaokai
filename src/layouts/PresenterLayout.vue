<script setup lang="ts">
import SlideViewer from '../components/SlideViewer/SlideViewer.vue';
import { usePresentation } from '../stores/presentation';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '../routes';
import { useKeyDown, WellKnownKeys } from '../composables/useKeyDown';

const { push } = useRouter();
const presentation = usePresentation();
const activeSlideIndex = ref<number>(0);
const activeSlide = computed(() => presentation.slides[activeSlideIndex.value]);

const end = () => {
  void push({ name: RouteNames.Main });
};

const goForward = () => {
  if (activeSlideIndex.value >= presentation.slideCount) return;
  activeSlideIndex.value++;
};

const goBackward = () => {
  if (activeSlideIndex.value <= 0) return;
  activeSlideIndex.value--;
};

useKeyDown([
  { key: WellKnownKeys.Escape, then: end },
  { key: WellKnownKeys.ArrowLeft, then: goBackward },
  { key: WellKnownKeys.ArrowRight, then: goForward },
]);
</script>

<template>
  <main data-testid="presentation">
    <Transition>
      <SlideViewer :key="activeSlideIndex" :slide="activeSlide ?? {}" />
    </Transition>
  </main>
</template>

<style scoped>
main {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
