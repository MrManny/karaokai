<script setup lang="ts">
import SlideViewer from '../components/SlideViewer/SlideViewer.vue';
import { usePresentation } from '../stores/presentation';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '../routes';

const { push } = useRouter();
const presentation = usePresentation();
const activeSlideIndex = ref<number>(0);
const activeSlide = computed(() => presentation.slides[activeSlideIndex.value]);

const end = () => {
  void push({ name: RouteNames.Main });
};

const handleExit = (ev: KeyboardEvent) => {
  if (ev.key !== 'Escape') return;
  console.debug('Ending presentation');
  ev.preventDefault();

  end();
};
</script>

<template>
  <main data-testid="presentation">
    <Transition>
      <SlideViewer :key="activeSlideIndex" :slide="activeSlide ?? {}" @keydown="handleExit" />
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
