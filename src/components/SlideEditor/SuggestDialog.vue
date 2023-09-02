<script setup lang="ts">
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import ActionBar from '../ActionBar/ActionBar.vue';
import Button from 'primevue/button';
import type { PropType } from 'vue';
import { ref } from 'vue';

const props = defineProps({
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
  initialPrompt: {
    type: String,
    default: () => '',
  },
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
});

const prompt = ref<string>(props.initialPrompt);
const emit = defineEmits(['close', 'suggest']);

const onCancel = () => {
  emit('close');
};

const onAccept = () => {
  emit('suggest', prompt.value);
};
</script>

<template>
  <Dialog :visible="isDialogVisible" @hide="onCancel" header="Suggest" modal>
    <p v-if="guidance" data-testid="guidance">
      {{ guidance }}
    </p>
    <Textarea data-testid="prompt-input" class="bigger" v-model.trim="prompt" />

    <div v-if="examples.length">
      <p>Examples:</p>
      <ul>
        <li v-for="example of examples" data-testid="example" :key="example">
          {{ example }}
        </li>
      </ul>
    </div>

    <template #footer>
      <ActionBar>
        <Button data-testid="cancel-button" label="Cancel" @click="onCancel" />
        <Button data-testid="accept-button" :label="label" severity="success" icon="pi pi-search" @click="onAccept" />
      </ActionBar>
    </template>
  </Dialog>
</template>
