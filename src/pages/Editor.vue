<script setup lang="ts">
import SlideEditor from '../components/SlideEditor/SlideEditor.vue';
</script>

<template>
  <div class="editor">
    <SlideEditor />
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
