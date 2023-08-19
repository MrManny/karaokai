<script setup lang="ts">
import FileUpload from 'primevue/fileupload';
import type { FileUploadRemoveUploadedFile } from 'primevue/fileupload';
import { usePresentation } from '../../stores/presentation';
import { useRouter } from 'vue-router';
import { RouteNames } from '../../routes';
import { useIo } from '../../composables/useIo';

const { load } = useIo();
const presentation = usePresentation();
const router = useRouter();

const uploader = async (event: FileUploadRemoveUploadedFile) => {
  const file = event.files[0];
  const loaded = await load(file);
  presentation.load(loaded);

  void router.push({ name: RouteNames.Editor });
};
</script>

<template>
  <FileUpload mode="basic" name="presentation_upload" accept="application/json" custom-upload @uploader="uploader" />
</template>

<style scoped></style>
