<script setup lang="ts">
import KeyInput from '../KeyInput/KeyInput.vue';
import Button from '../Button/Button.vue';

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  hasOpenAiKey: {
    type: Boolean,
    default: false,
  },
  hasStabilityAiKey: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:openAiKey', 'update:stabilityAiKey', 'save']);
</script>

<template>
  <div class="form">
    <label for="openAiKey"> OpenAI token </label>
    <KeyInput id="openAiKey" :value="hasOpenAiKey ? 'set' : ''" @update:value="(key: string) => $emit('update:openAiKey', key)" />

    <label for="stabilityAiKey"> StabilityAI token </label>
    <KeyInput id="stabilityAiKey" :value="hasStabilityAiKey ? 'set' : ''" @update:value="(key: string) => $emit('update:stabilityAiKey', key)" />

    <div class="actions">
      <Button :disabled="disabled" @click="$emit('save')">Save</Button>
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
