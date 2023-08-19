<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { ref } from 'vue';
import type { PropType } from 'vue';
import ActionBar from '../ActionBar/ActionBar.vue';

const props = defineProps({
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
const prompt = ref<string>(props.initialPrompt);

const onAccept = () => {
  emit('suggest', prompt.value);
  isDialogVisible.value = false;
};
const onCancel = () => {
  isDialogVisible.value = false;
};
</script>

<template>
  <Button
    :disabled="isDialogVisible"
    :loading="loading"
    :label="label"
    @click="() => (isDialogVisible = true)"
    icon="pi pi-search"
  />
  <Dialog :visible="isDialogVisible" @hide="onCancel" header="Suggest" modal>
    <p v-if="guidance">
      {{ guidance }}
    </p>
    <Textarea class="bigger" v-model.trim="prompt" />

    <div v-if="examples.length">
      <p>Examples:</p>
      <ul>
        <li v-for="example of examples" :key="example">
          {{ example }}
        </li>
      </ul>
    </div>

    <template #footer>
      <ActionBar>
        <Button label="Cancel" severity="secondary" @click="onCancel" />
        <Button :label="label" icon="pi pi-search" @click="onAccept" />
      </ActionBar>
    </template>
  </Dialog>
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
