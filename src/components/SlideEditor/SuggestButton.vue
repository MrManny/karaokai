<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import ActionBar from '../ActionBar/ActionBar.vue';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import StackedLayout from '../../layouts/StackedLayout.vue';

const props = defineProps({
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
const prompt = ref<string>(props.initialPrompt);
const negative = ref<string | undefined>(props.initialNegative);

const onAccept = () => {
  emit('suggest', prompt.value, negative.value);
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

  <Dialog v-model:visible="isDialogVisible" :header="label" modal>
    <StackedLayout>
      <slot name="guidance" />

      <Button v-if="canAutomate" label="Automate" data-testid="automate-button" @click="onAutomate" />

      <Textarea data-testid="prompt-input" class="bigger" v-model.trim="prompt" placeholder="Prompt" required />

      <Textarea
        v-if="withNegative"
        data-testid="negative-input"
        class="bigger"
        placeholder="Negative prompt"
        v-model.trim="negative"
      />
    </StackedLayout>

    <template #footer>
      <ActionBar>
        <Button data-testid="cancel-button" label="Cancel" @click="onCancel" />
        <Button data-testid="accept-button" :label="label" severity="success" icon="pi pi-search" @click="onAccept" />
      </ActionBar>
    </template>
  </Dialog>
</template>
