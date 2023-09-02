<script setup lang="ts">
import { useIo } from '../../composables/useIo';
import { usePresentation } from '../../stores/presentation';
import { computed, unref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const emit = defineEmits(['saved']);
const presentation = usePresentation();
const { save } = useIo();
const fileName = computed({
  get: () => presentation.meta?.fileName ?? 'presentation.json',
  set: (value?: string) => (presentation.meta = { ...presentation.meta, fileName: value }),
});

const saver = () => {
  const copy = {
    meta: unref(presentation.meta),
    topic: unref(presentation.topic),
    slides: unref(presentation.slides),
  };

  save(fileName.value, copy);
  emit('saved');
};
</script>

<template>
  <div class="dialog">
    <span class="p-float-label">
      <InputText id="text-input" data-testid="filename-input" v-model="fileName" />
      <label for="text-input">File name</label>
    </span>
    <Button @click="saver" label="Save" />
  </div>
</template>

<style scoped>
.dialog {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
}
</style>
