<script setup lang="ts">
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import ActionBar from '../ActionBar/ActionBar.vue';
import Button from 'primevue/button';
import { ref } from 'vue';

const props = defineProps({
  withNegative: {
    type: Boolean,
    default: false,
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
  initialPrompt: {
    type: String,
    default: () => '',
  },
  initialNegative: {
    type: String,
    default: () => '',
  },
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
});

const prompt = ref<string>(props.initialPrompt);
const negative = ref<string | undefined>(props.initialNegative);
const emit = defineEmits(['close', 'suggest']);

const onCancel = () => {
  emit('close');
};

const onAccept = () => {
  const negativeValue = props.withNegative ? negative.value : undefined;
  emit('suggest', prompt.value, negativeValue);
};
</script>

<template>
  <Dialog :visible="isDialogVisible" @hide="onCancel" header="Suggest" modal>
    <p v-if="guidance" data-testid="guidance">
      {{ guidance }}
    </p>
    <Textarea data-testid="prompt-input" class="bigger" v-model.trim="prompt" />

    <Textarea v-if="withNegative" data-testid="negative-input" class="bigger" v-model.trim="negative"></Textarea>

    <template #footer>
      <ActionBar>
        <Button data-testid="cancel-button" label="Cancel" @click="onCancel" />
        <Button data-testid="accept-button" :label="label" severity="success" icon="pi pi-search" @click="onAccept" />
      </ActionBar>
    </template>
  </Dialog>
</template>
