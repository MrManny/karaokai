<script setup lang="ts">
import SlideEditor from '../components/SlideEditor/SlideEditor.vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '../routes';

const { push } = useRouter();

const playPresentation = () => {
  void push({ name: RouteNames.Presenter });
};
</script>

<template>
  <div class="editor">
    <SlideEditor @play="playPresentation" />
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
