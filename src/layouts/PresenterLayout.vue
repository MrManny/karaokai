<script setup lang="ts">
import SlideViewer from '../components/SlideViewer/SlideViewer.vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '../routes';
import { useKeyDown, WellKnownKeys } from '../composables/useKeyDown';
import { usePresenter } from '../composables/usePresenter';
import SlideProgress from '../components/SlideProgress/SlideProgress.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const { push } = useRouter();
const isNextDue = ref<boolean>(false);

const end = () => {
  void push({ name: RouteNames.Main });
};

const { activeSlide, activeSlideIndex, goForward, goBack, setFullscreen, start, stop, totalSlides } = usePresenter({
  onTickDue: () => {
    isNextDue.value = true;
  },
  onTick: () => {
    isNextDue.value = false;
  },
});

useKeyDown([
  { key: WellKnownKeys.Escape, then: end },
  { key: WellKnownKeys.ArrowLeft, then: goBack },
  { key: WellKnownKeys.ArrowRight, then: goForward },
]);

onMounted(() => {
  setFullscreen(true);
  start();
});

onBeforeUnmount(() => {
  stop();
  setFullscreen(false);
});
</script>

<template>
  <main data-testid="presentation">
    <SlideViewer :slide="activeSlide ?? {}" />

    <SlideProgress :active-slide="activeSlideIndex" :total-slides="totalSlides" :next-due="isNextDue" />
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
