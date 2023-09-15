<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import SuggestDialog from './SuggestDialog.vue';

defineProps({
  canAutomate: {
    type: Boolean,
    default: false,
  },
  withNegative: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
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
  initialNegative: {
    type: String,
    default: () => '',
  },
});
const emit = defineEmits(['suggest', 'automate']);
const isDialogVisible = ref<boolean>(false);

const onAccept = (prompt: string, negative?: string) => {
  emit('suggest', prompt, negative);
  isDialogVisible.value = false;
};
const onCancel = () => {
  isDialogVisible.value = false;
};

const onAutomate = () => {
  emit('automate');
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
    :can-automate="canAutomate"
    :initial-prompt="initialPrompt"
    :initial-negative="initialNegative"
    :with-negative="withNegative"
    :label="label"
    :is-dialog-visible="isDialogVisible"
    @close="onCancel"
    @suggest="onAccept"
    @automate="onAutomate"
  >
    <template #guidance>
      <slot name="guidance" />
    </template>
  </SuggestDialog>
</template>
