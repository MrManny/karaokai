<script setup lang="ts">
import { ipcRenderer } from 'electron';
import Button from 'primevue/button';
import { ref } from 'vue';

defineProps({
  label: {
    type: String,
    default: 'Pick',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:folder']);

const folder = ref<string>('');
const selectFolder = async () => {
  const selectedFolder: string | undefined = await ipcRenderer.invoke('select-folder');
  if (!selectedFolder) return;
  folder.value = selectedFolder;
  emit('update:folder', selectedFolder);
};
</script>

<template>
  <div class="folder-picker" data-testid="folder-picker">
    <Button :label="label" :disabled="disabled" @click="selectFolder" />
    <div class="folder" :title="folder">{{ folder }}</div>
  </div>
</template>

<style scoped>
.folder-picker {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.folder {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
