<script setup lang="ts">
import { useIo } from '../../composables/useIo';
import { usePresentation } from '../../stores/presentation';
import { computed, unref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import StackedLayout from '../../layouts/StackedLayout.vue';

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
  <StackedLayout class="dialog">
    <span class="p-float-label">
      <InputText id="text-input" data-testid="filename-input" v-model="fileName" />
      <label for="text-input">File name</label>
    </span>
    <Button @click="saver" label="Save" />
  </StackedLayout>
</template>

<style scoped>
.dialog {
  align-items: stretch;
}
</style>
