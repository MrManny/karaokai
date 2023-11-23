<script setup lang="ts">
import SlideViewer from '../components/SlideViewer/SlideViewer.vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '../routes';
import { useKeyDown, WellKnownKeys } from '../composables/useKeyDown';
import { usePresenter } from '../composables/usePresenter';
import SlideProgress from '../components/SlideProgress/SlideProgress.vue';

const { push } = useRouter();
const { activeSlide, activeSlideIndex, goForward, goBack, totalSlides } = usePresenter();

const end = () => {
  void push({ name: RouteNames.Main });
};

useKeyDown([
  { key: WellKnownKeys.Escape, then: end },
  { key: WellKnownKeys.ArrowLeft, then: goBack },
  { key: WellKnownKeys.ArrowRight, then: goForward },
]);
</script>

<template>
  <main data-testid="presentation">
    <SlideViewer :slide="activeSlide ?? {}" />

    <SlideProgress :active-slide="activeSlideIndex" :total-slides="totalSlides" />
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
