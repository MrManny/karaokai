<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  hasOpenAiKey: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:openAiKey', 'save']);
</script>

<template>
  <div class="form">
    <label for="openAiKey"> OpenAI token </label>
    <InputText id="openAiKey" @update:modelValue="(key) => $emit('update:openAiKey', key)" required />

    <div class="actions">
      <Button :disabled="disabled" @click="$emit('save')" label="Save" />
    </div>
  </div>
</template>

<style scoped>
.form {
  @apply grid grid-cols-2 gap-2 max-w-md content-center;
}

.form .actions {
  @apply col-span-2 ml-auto;
}
</style>
