<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import type { PropType } from 'vue';
import SuggestDialog from './SuggestDialog.vue';

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  examples: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  guidance: {
    type: String,
    default: '',
    required: false,
  },
  label: {
    type: String,
    default: () => 'Suggest',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  initialPrompt: {
    type: String,
    default: () => '',
  },
});
const emit = defineEmits(['suggest']);
const isDialogVisible = ref<boolean>(false);

const onAccept = (prompt: string) => {
  emit('suggest', prompt);
  isDialogVisible.value = false;
};
const onCancel = () => {
  isDialogVisible.value = false;
};
</script>

<template>
  <Button
    data-testid="suggest-toggle"
    :disabled="isDialogVisible"
    :loading="loading"
    :label="label"
    @click="() => (isDialogVisible = true)"
    icon="pi pi-search"
  />
  <SuggestDialog
    :initial-prompt="initialPrompt"
    :examples="examples"
    :guidance="guidance"
    :label="label"
    :is-dialog-visible="isDialogVisible"
    @close="onCancel"
    @suggest="onAccept"
  />
</template>

<style scoped>
.bigger {
  min-width: 60vw;
}

textarea {
  resize: vertical;
  width: 100%;
}
</style>
