<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:value']);

const onInput = (event: Event) => {
  if (!event.target) return;
  if (!('value' in event.target)) return;
  const key = String(event.target.value).trim();
  emit('update:value', key);
};
</script>

<template>
  <input :id="id" type="password" :disabled="disabled" :aria-label="label" :placeholder="placeholder" :value="value" :required="required" @input="onInput" />
</template>
