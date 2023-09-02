<script setup lang="ts">
import FileUpload from 'primevue/fileupload';
import type { FileUploadRemoveUploadedFile } from 'primevue/fileupload';
import { usePresentation } from '../../stores/presentation';
import { useIo } from '../../composables/useIo';

const { load } = useIo();
const presentation = usePresentation();
const emit = defineEmits(['loaded']);

const uploader = async (event: FileUploadRemoveUploadedFile) => {
  const file = event.files[0];
  const loaded = await load(file);
  presentation.load(loaded);
  emit('loaded');
};
</script>

<template>
  <FileUpload
    data-testid="load-input"
    mode="basic"
    name="presentation_upload"
    accept="application/json"
    custom-upload
    @select="uploader"
  />
</template>
