<script setup lang="ts">
import SlideEditor from '../components/SlideEditor/SlideEditor.vue';
import { usePresenter } from '../composables/usePresenter';
import type { Presentation } from '../types/presentation-schema';

const { start, isRunning } = usePresenter();

const playPresentation = (presentation: Presentation) => {
  start(presentation);
};
</script>

<template>
  <div class="editor">
    <SlideEditor @play="(presentation: Presentation) => playPresentation(presentation)" :disabled="isRunning" />
  </div>
</template>

<style scoped>
.editor {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
}
</style>
